/* app.js
 * App orchestration: ties UI, storage and API together.
 * Written in simple, easy-to-follow plain JavaScript.
 */

import * as API from './api.js';
import * as Store from './storage.js';
import * as UI from './ui.js';

const MODE_TEXT = 'text';
const MODE_IMAGE = 'image';

let mode = MODE_TEXT;
let history = Store.loadHistory();
let apiKey = Store.loadApiKey();

// Token limits and heuristics
// We estimate tokens as roughly characters / 4. This is a simple heuristic and
// not exact, but reduces prompt size sent to the API to avoid excessive token usage.
const TOKEN_ESTIMATE_CHARS = 4;
const MAX_PROMPT_TOKENS = 1500; // tokens allowed for the prompt (messages)
const MAX_RESPONSE_TOKENS = 512; // tokens allowed for the model to generate

/** Estimate token count for a string using a simple heuristic. */
function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / TOKEN_ESTIMATE_CHARS);
}

/** Trim messages so that total estimated tokens <= maxTokens.
 * Keeps the most recent messages (end of array). Returns a new array.
 */
function trimMessagesToTokenLimit(messages, maxTokens) {
  // include messages from the end until we hit the budget
  const out = [];
  let tokens = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    const t = estimateTokens(m.content || '');
    if (tokens + t > maxTokens) break;
    tokens += t;
    out.unshift(m);
  }
  // If nothing fits (single very long message), include the last message truncated
  if (out.length === 0 && messages.length > 0) {
    const last = messages[messages.length - 1];
    // truncate content to fit roughly half the maxTokens in chars
    const maxChars = Math.max(100, Math.floor(maxTokens * TOKEN_ESTIMATE_CHARS));
    const truncated = { ...last, content: last.content.slice(-maxChars) };
    return [truncated];
  }
  return out;
}

function init() {
  UI.renderHistory(history);
  UI.initAutoResize();
  UI.setModeUI(mode);
  UI.onModeChange(setMode);
  UI.onSubmit(onSubmit);
  // Send when Enter is pressed (Enter sends, Shift+Enter for newline)
  UI.onEnterSend(onSubmit);

  const apiUi = UI.createApiKeyControls(onSaveApiKey, onClearApiKey);
  apiUi.setInput(apiKey);
  // New session button - clears history after confirmation
  const newBtn = document.getElementById('new-session');
  if (newBtn) {
    newBtn.addEventListener('click', () => {
      const ok = confirm('Start a new session? This will clear the current chat history.');
      if (!ok) return;
      history = [];
      Store.saveHistory(history);
      UI.renderHistory(history);
    });
  }
}

function setMode(m) {
  mode = m;
  UI.setModeUI(m);
}

function saveAndRender() {
  Store.saveHistory(history);
  UI.renderHistory(history);
}

async function onSubmit() {
  const text = UI.getInput();
  if (!text) return;

  const userMsg = { role: 'user', type: mode, content: text, time: Date.now() };
  history.push(userMsg);
  saveAndRender();
  UI.clearInput();

  if (!apiKey) {
    const err = { role: 'assistant', type: 'text', content: 'Missing API key. Please paste your OpenAI API key.' };
    history.push(err);
    saveAndRender();
    return;
  }

  if (mode === MODE_TEXT) await handleTextReply();
  else await handleImageReply();
}

async function handleTextReply() {
  // show typing
  const typing = { role: 'assistant', type: 'text', content: '...', time: Date.now(), pending: true };
  history.push(typing); saveAndRender();

  try {
    const model = UI.getSelectedModel();
    // prepare messages for the API: map stored history to role/content
    const fullMsgs = history.filter(h => h.role).map(h => ({ role: h.role, content: h.content }));
    // Trim the messages to fit the prompt token budget. Reserve space for the response.
    const promptTokenBudget = Math.max(200, MAX_PROMPT_TOKENS - MAX_RESPONSE_TOKENS);
    const msgs = trimMessagesToTokenLimit(fullMsgs, promptTokenBudget);
    const text = await API.sendChat(model, msgs, apiKey, MAX_RESPONSE_TOKENS);

    // remove typing placeholder
    history = history.filter(h => !h.pending);
    history.push({ role: 'assistant', type: 'text', content: text, time: Date.now() });
    saveAndRender();
  } catch (err) {
    history = history.filter(h => !h.pending);
    history.push({ role: 'assistant', type: 'text', content: 'Error: ' + err.message, time: Date.now() });
    saveAndRender();
  }
}

async function handleImageReply() {
  const typing = { role: 'assistant', type: 'image', content: 'Generating image...', time: Date.now(), pending: true };
  history.push(typing); saveAndRender();
  try {
    // use last user message as prompt
    const lastUser = [...history].reverse().find(m => m.role === 'user');
    const prompt = lastUser ? lastUser.content : '';
    const dataUrl = await API.generateImage(prompt, apiKey);

    history = history.filter(h => !h.pending);
    history.push({ role: 'assistant', type: 'image', content: dataUrl, time: Date.now() });
    saveAndRender();
  } catch (err) {
    history = history.filter(h => !h.pending);
    history.push({ role: 'assistant', type: 'image', content: 'Error: ' + err.message, time: Date.now() });
    saveAndRender();
  }
}

function onSaveApiKey(key) {
  apiKey = key.trim();
  // save temporarily (session) by default
  Store.saveApiKey(apiKey);
}

function onClearApiKey() {
  apiKey = '';
  Store.clearApiKey();
}

export { init };
