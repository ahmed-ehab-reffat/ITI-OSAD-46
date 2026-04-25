let OPENAI_KEY = '';
let TAVILY_KEY = '';
let MODEL = 'gpt-4o-mini';
let messages = [];
let cases = [];
let currentImage = null;
let isThinking = false;

const SYSTEM_PROMPT = `You are a Medical AI Assistant Agent that analyzes patient cases using MRI descriptions and text symptoms.

Your capabilities:
- Analyze text symptoms and medical image descriptions
- Provide safe general medical insights and information
- Help locate nearby hospitals based on diagnosis using web_search
- Store structured patient cases using store_case

Tools you have:
1. web_search(diagnoses, location) - Search for nearest hospitals based on medical condition and location
2. store_case(patient_name, symptoms, summary, recommendation) - Store a patient case to the database

IMPORTANT RULES:
- NEVER provide a definitive medical diagnosis
- NEVER prescribe medications or dosages
- Always end responses with: "⚠ This is not a medical diagnosis. Consult a doctor."
- Use web_search ONLY when the user explicitly asks about finding hospitals or clinics
- Use store_case when the user asks to log or save a case
- Be empathetic and professional`;

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'web_search',
      description:
        'Search for the nearest hospital or clinic based on diagnosis and location',
      parameters: {
        type: 'object',
        properties: {
          diagnoses: {
            type: 'string',
            description: 'The medical condition or symptom to search for'
          },
          location: {
            type: 'string',
            description: 'The city or area to search in'
          }
        },
        required: ['diagnoses', 'location']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'store_case',
      description: 'Store a structured patient case to the database',
      parameters: {
        type: 'object',
        properties: {
          patient_name: {type: 'string', description: 'Name of the patient'},
          symptoms: {type: 'string', description: 'Patient symptoms described'},
          summary: {type: 'string', description: 'AI case summary'},
          recommendation: {
            type: 'string',
            description: 'Recommendation for the patient'
          }
        },
        required: ['patient_name', 'symptoms', 'summary', 'recommendation']
      }
    }
  }
];

// ─── SETUP ───────────────────────────────────────────────
function startApp() {
  const ok = document.getElementById('openai-key').value.trim();
  const tk = document.getElementById('tavily-key').value.trim();
  const model = document.getElementById('model-select').value;
  if (!ok) {
    alert('Please enter your OpenAI API key.');
    return;
  }
  OPENAI_KEY = ok;
  TAVILY_KEY = tk;
  MODEL = model;
  document.getElementById('model-label').textContent = model;
  document.getElementById('setup-overlay').style.display = 'none';
}

function showSetup() {
  document.getElementById('setup-overlay').style.display = 'flex';
}

// ─── CHAT ─────────────────────────────────────────────────
function newChat() {
  messages = [];
  currentImage = null;
  removeImage();
  document.getElementById('messages').innerHTML = '';
  document.getElementById('messages').appendChild(emptyState());
}

function emptyState() {
  const div = document.createElement('div');
  div.id = 'empty-state';
  div.innerHTML = `
    <div class="big-icon">🩺</div>
    <h3>Medical AI Assistant</h3>
    <p>Describe your symptoms, upload an MRI or scan image, and ask about nearby hospitals.</p>
    <div class="chips">
      <div class="chip" onclick="sendChip('I have chest pain and shortness of breath for 2 days')">Chest pain & breathlessness</div>
      <div class="chip" onclick="sendChip('Can you search for the nearest cardiology hospital in Cairo?')">Find cardiology hospital</div>
      <div class="chip" onclick="sendChip('Severe headache with blurred vision and nausea for 3 days')">Severe headaches</div>
      <div class="chip" onclick="sendChip('Store this case: Patient Jane Doe, 32 years, migraines with aura')">Store a patient case</div>
    </div>`;
  return div;
}

function sendChip(text) {
  document.getElementById('user-input').value = text;
  sendMessage();
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

// ─── IMAGE ────────────────────────────────────────────────
function handleImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const dataUrl = ev.target.result;
    const base64 = dataUrl.split(',')[1];
    currentImage = {
      base64,
      mimeType: file.type || 'image/jpeg',
      name: file.name
    };
    document.getElementById('preview-img').src = dataUrl;
    document.getElementById('img-name').textContent = file.name;
    document.getElementById('img-type').textContent = 'Medical Image / Scan';
    document.getElementById('image-preview-area').classList.add('active');
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  currentImage = null;
  document.getElementById('image-preview-area').classList.remove('active');
  document.getElementById('file-input').value = '';
}

// ─── TRIM MESSAGES (Context Optimization) ─────────────────
function trimMessages(msgs) {
  // Remove tool messages to save context, keep last 20 messages max
  let filtered = msgs.filter((m) => m.role !== 'tool');
  if (filtered.length > 20) {
    // Keep system would be first, keep last 20 non-tool messages
    filtered = filtered.slice(-20);
  }
  return filtered;
}

// ─── SEND MESSAGE ─────────────────────────────────────────
async function sendMessage() {
  if (isThinking) return;
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text && !currentImage) return;

  // Remove empty state
  const es = document.getElementById('empty-state');
  if (es) es.remove();

  // Build user message content
  let content;
  if (currentImage) {
    content = [
      {type: 'text', text: text || 'Please analyze this medical image.'},
      {
        type: 'image_url',
        image_url: {
          url: `data:${currentImage.mimeType};base64,${currentImage.base64}`
        }
      }
    ];
  } else {
    content = text;
  }

  // Add to messages history
  messages.push({role: 'user', content});

  // Display user message
  appendUserMessage(text, currentImage);

  // Clear input
  input.value = '';
  input.style.height = 'auto';
  removeImage();

  // Show thinking
  const thinkingEl = showThinking();
  isThinking = true;
  document.getElementById('send-btn').disabled = true;

  try {
    await runAgentLoop(thinkingEl);
  } catch (err) {
    thinkingEl.remove();
    appendAIMessage(`⚡ Error: ${err.message}`, false);
  }

  isThinking = false;
  document.getElementById('send-btn').disabled = false;
}

// ─── AGENT LOOP ───────────────────────────────────────────
async function runAgentLoop(thinkingEl) {
  const MAX_ITERATIONS = 5;
  let iteration = 0;

  while (iteration < MAX_ITERATIONS) {
    iteration++;

    // Build request messages (with trimming for context optimization)
    const trimmed = trimMessages(messages);
    const requestMessages = [
      {role: 'system', content: SYSTEM_PROMPT},
      ...trimmed
    ];

    if (trimmed.length < messages.length) {
      // Show trim notice once
      if (iteration === 1) showTrimNotice(messages.length - trimmed.length);
    }

    const response = await callOpenAI(requestMessages);
    const choice = response.choices[0];
    const assistantMsg = choice.message;

    // Add to history
    messages.push(assistantMsg);

    if (choice.finish_reason === 'tool_calls' || assistantMsg.tool_calls) {
      // Process tool calls
      thinkingEl.remove();

      for (const toolCall of assistantMsg.tool_calls) {
        const fnName = toolCall.function.name;
        const fnArgs = JSON.parse(toolCall.function.arguments);

        showToolCall(fnName, fnArgs);

        let toolResult;
        if (fnName === 'web_search') {
          toolResult = await executeWebSearch(
            fnArgs.diagnoses,
            fnArgs.location
          );
        } else if (fnName === 'store_case') {
          toolResult = executeStoreCase(fnArgs);
        } else {
          toolResult = 'Tool not found.';
        }

        showToolResult(fnName, toolResult);

        // Add tool result to messages
        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content:
            typeof toolResult === 'string'
              ? toolResult
              : JSON.stringify(toolResult)
        });
      }

      // Show thinking again for next iteration
      thinkingEl = showThinking();
    } else {
      // Final response
      thinkingEl.remove();
      const content = assistantMsg.content || '';
      appendAIMessage(content, true);
      break;
    }
  }
}

// ─── OpenAI CALL ──────────────────────────────────────────
async function callOpenAI(msgs) {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: msgs,
      tools: TOOLS,
      tool_choice: 'auto',
      max_tokens: 1500
    })
  });

  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.error?.message || `HTTP ${resp.status}`);
  }
  return resp.json();
}

// ─── WEB SEARCH TOOL ──────────────────────────────────────
async function executeWebSearch(diagnoses, location) {
  if (!TAVILY_KEY) {
    return `[Web Search] Tavily API key not configured. For demo purposes: Searching for "${diagnoses}" hospitals near "${location}" would return results like local hospitals and clinics specializing in that condition. Please add your Tavily API key in Settings.`;
  }
  try {
    const query = `nearest hospital for ${diagnoses} near ${location}`;
    const resp = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        api_key: TAVILY_KEY,
        query,
        search_depth: 'basic',
        max_results: 5
      })
    });
    if (!resp.ok) {
      const e = await resp.json();
      return `Search failed: ${e.message || resp.status}`;
    }
    const data = await resp.json();
    const results = (data.results || [])
      .map(
        (r) => `• ${r.title}\n  ${r.url}\n  ${r.content?.slice(0, 200) || ''}`
      )
      .join('\n\n');
    return results || 'No results found.';
  } catch (e) {
    return `Search error: ${e.message}`;
  }
}

// ─── STORE CASE TOOL ──────────────────────────────────────
function executeStoreCase(args) {
  const caseEntry = {
    id: Date.now(),
    timestamp: new Date().toLocaleString(),
    patient_name: args.patient_name || 'Unknown',
    symptoms: args.symptoms || '',
    summary: args.summary || '',
    recommendation: args.recommendation || ''
  };
  cases.push(caseEntry);
  updateCaseSidebar();
  return `Case stored successfully for patient "${caseEntry.patient_name}" at ${caseEntry.timestamp}.`;
}

// ─── SIDEBAR ──────────────────────────────────────────────
function updateCaseSidebar() {
  const list = document.getElementById('case-list');
  document.getElementById('case-count').textContent = cases.length;
  if (cases.length === 0) {
    list.innerHTML =
      '<div style="text-align:center;padding:24px 10px;font-size:12px;color:var(--muted);font-family:\'DM Mono\',monospace;">No cases stored yet.</div>';
    return;
  }
  list.innerHTML = cases
    .map(
      (c, i) => `
    <div class="case-card">
      <div class="case-name">👤 ${c.patient_name}</div>
      <div class="case-time">${c.timestamp}</div>
      <div class="case-sym">${c.symptoms.slice(0, 80)}${c.symptoms.length > 80 ? '…' : ''}</div>
      <span class="case-tag">Case #${i + 1}</span>
    </div>
  `
    )
    .reverse()
    .join('');
}

// ─── CSV DOWNLOAD ─────────────────────────────────────────
function downloadCSV() {
  if (cases.length === 0) {
    alert('No cases to download yet.');
    return;
  }
  const headers = [
    'ID',
    'Timestamp',
    'Patient Name',
    'Symptoms',
    'Summary',
    'Recommendation'
  ];
  const rows = cases.map((c) =>
    [
      c.id,
      c.timestamp,
      c.patient_name,
      c.symptoms,
      c.summary,
      c.recommendation
    ].map((v) => `"${String(v).replace(/"/g, '""')}"`)
  );
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], {type: 'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `medical_cases_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── RENDER HELPERS ───────────────────────────────────────
function appendUserMessage(text, image) {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'msg user';
  div.innerHTML = `
    <div class="msg-avatar">👤</div>
    <div class="msg-body">
      <div class="msg-label">You</div>
      <div class="msg-bubble">
        ${text ? escapeHtml(text) : ''}
        ${image ? `<br/><img src="data:${image.mimeType};base64,${image.base64}" alt="scan" />` : ''}
      </div>
    </div>`;
  msgs.appendChild(div);
  scrollToBottom();
}

function appendAIMessage(content, addDisclaimer = true) {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'msg ai';
  const formatted = formatAIText(content);
  div.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-body">
      <div class="msg-label">Medical Agent</div>
      <div class="msg-bubble">
        ${formatted}
        ${addDisclaimer && !content.includes('⚠') ? '<div class="disclaimer">⚠ This is not a medical diagnosis. Consult a doctor.</div>' : ''}
      </div>
    </div>`;
  msgs.appendChild(div);
  scrollToBottom();
}

function showThinking() {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'msg ai';
  div.id = 'thinking-el';
  div.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-body">
      <div class="msg-label">Medical Agent</div>
      <div class="thinking-indicator">
        <div class="thinking-dots">
          <span></span><span></span><span></span>
        </div>
        <span style="font-size:12px;color:var(--muted);font-family:'DM Mono',monospace;">Analyzing...</span>
      </div>
    </div>`;
  msgs.appendChild(div);
  scrollToBottom();
  return div;
}

function showToolCall(name, args) {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'msg tool';
  const icon = name === 'web_search' ? '🔍' : '💾';
  const label = name === 'web_search' ? 'Web Search' : 'Store Case';
  div.innerHTML = `
    <div class="msg-avatar">${icon}</div>
    <div class="msg-body">
      <div class="msg-label">Tool Call</div>
      <div class="msg-bubble">
        <span class="tool-call-badge">${icon} ${label}</span><br/>
        ${Object.entries(args)
          .map(([k, v]) => `<strong>${k}:</strong> ${v}`)
          .join('<br/>')}
      </div>
    </div>`;
  msgs.appendChild(div);
  scrollToBottom();
}

function showToolResult(name, result) {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'msg tool';
  const icon = name === 'web_search' ? '📡' : '✅';
  div.innerHTML = `
    <div class="msg-avatar">${icon}</div>
    <div class="msg-body">
      <div class="msg-label">Tool Result</div>
      <div class="msg-bubble">
        ${typeof result === 'string' ? escapeHtml(result.slice(0, 600)) + (result.length > 600 ? '…' : '') : JSON.stringify(result, null, 2)}
      </div>
    </div>`;
  msgs.appendChild(div);
  scrollToBottom();
}

function showTrimNotice(removed) {
  const msgs = document.getElementById('messages');
  const div = document.createElement('div');
  div.className = 'trim-notice';
  div.textContent = `✂ Context trimmed: ${removed} tool message(s) removed to optimize token usage.`;
  msgs.appendChild(div);
  scrollToBottom();
}

function scrollToBottom() {
  const msgs = document.getElementById('messages');
  msgs.scrollTop = msgs.scrollHeight;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');
}

function formatAIText(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br/>');
}

const startAppButton = document.getElementById('start-app-button');
startAppButton.addEventListener('click', startApp);

const settingsButton = document.getElementById('settings-button');
settingsButton.addEventListener('click', showSetup);

const newChatButton = document.getElementById('new-chat-button');
newChatButton.addEventListener('click', newChat);

const downloadCsvButton = document.getElementById('download-csv');
downloadCsvButton.addEventListener('click', downloadCSV);

const chipButton1 = document.getElementById('chip-1');
chipButton1.addEventListener('click', () => {
  sendChip('I have chest pain and shortness of breath for 2 days');
});

const chipButton2 = document.getElementById('chip-2');
chipButton2.addEventListener('click', () => {
  sendChip('Can you search for the nearest cardiology hospital in Cairo?');
});

const chipButton3 = document.getElementById('chip-3');
chipButton3.addEventListener('click', () => {
  sendChip('Severe headache with blurred vision and nausea for 3 days');
});

const chipButton4 = document.getElementById('chip-4');
chipButton4.addEventListener('click', () => {
  sendChip(
    'Store this case: Patient John Doe, 45 years, hypertension symptoms'
  );
});

const sendButton = document.getElementById('send-btn');
sendButton.addEventListener('click', sendMessage);

const removeImgButton = document.getElementById('remove-img');
removeImgButton.addEventListener('click', removeImage);
