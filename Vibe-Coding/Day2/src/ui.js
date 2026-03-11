/* ui.js
 * DOM helpers and rendering logic. Keeps UI code separate from business logic.
 */

const chatEl = document.getElementById('chat');
const promptEl = document.getElementById('prompt');
const composer = document.getElementById('composer');
const modeTextBtn = document.getElementById('mode-text');
const modeImageBtn = document.getElementById('mode-image');
const modelSelect = document.getElementById('model-select');

/** Create a message bubble element. msg: { role, type, content } */
export function createBubble(msg) {
  const div = document.createElement('div');
  div.className = 'bubble ' + (msg.role === 'user' ? 'user' : 'ai');

  if (msg.type === 'image' && typeof msg.content === 'string' && msg.content.startsWith('data:')) {
    const img = document.createElement('img');
    img.src = msg.content;
    img.alt = 'Generated image';
    div.appendChild(img);
  } else {
    div.textContent = msg.content;
  }
  return div;
}

/** Render full history (array of messages) into the chat container. */
export function renderHistory(history) {
  chatEl.innerHTML = '';
  history.forEach(msg => chatEl.appendChild(createBubble(msg)));
  chatEl.scrollTop = chatEl.scrollHeight;
}

export function appendMessage(msg) {
  chatEl.appendChild(createBubble(msg));
  chatEl.scrollTop = chatEl.scrollHeight;
}

export function clearInput() { promptEl.value = ''; promptEl.style.height = 'auto'; }

export function getInput() { return promptEl.value.trim(); }

export function onSubmit(handler) {
  composer.addEventListener('submit', e => { e.preventDefault(); handler(); });
}

/**
 * Call handler when Enter is pressed inside the prompt textarea.
 * Shift+Enter (or Ctrl/Alt/Meta) will still insert a newline.
 */
export function onEnterSend(handler) {
  const el = document.getElementById('prompt');
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      handler();
    }
  });
}

export function setModeUI(mode) {
  modeTextBtn.classList.toggle('active', mode === 'text');
  modeImageBtn.classList.toggle('active', mode === 'image');
  modelSelect.disabled = mode !== 'text';
}

export function onModeChange(handler) {
  modeTextBtn.addEventListener('click', () => handler('text'));
  modeImageBtn.addEventListener('click', () => handler('image'));
}

export function getSelectedModel() { return modelSelect.value; }

export function initAutoResize() {
  const el = promptEl;
  el.addEventListener('input', () => { el.style.height = 'auto'; el.style.height = (el.scrollHeight) + 'px'; });
}

// API key UI helpers: create small top-right control
export function createApiKeyControls(onSave, onClear) {
  // container anchored top-right
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '12px';
  container.style.right = '12px';
  container.style.zIndex = 1000;

  const input = document.createElement('input');
  input.placeholder = 'OpenAI API key (paste)';
  input.style.padding = '8px';
  input.style.borderRadius = '8px';
  input.style.marginRight = '6px';
  input.style.width = '260px';
  input.type = 'password';

  // Only provide a Clear button. Saving is automatic on input (sessionStorage only).
  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear';

  // Debounce helper
  let timer = null;
  function debounceSave() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      onSave(input.value);
    }, 350);
  }

  input.addEventListener('input', () => debounceSave());
  clearBtn.addEventListener('click', () => { input.value = ''; onClear(); });

  container.appendChild(input);
  container.appendChild(clearBtn);
  document.body.appendChild(container);

  return { setInput: v => (input.value = v) };
}
