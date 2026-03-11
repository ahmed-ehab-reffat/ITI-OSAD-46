/* storage.js
 * Small module to persist chat history and API key in browser storage.
 * Uses localStorage for history and sessionStorage for API key by default.
 */

const HISTORY_KEY = 'chat_history_v1';
const APIKEY_KEY = 'openai_api_key';

/** Load chat history (array). Returns [] if nothing stored or parse error. */
export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/** Save chat history (array) */
export function saveHistory(history) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch (e) { /* ignore */ }
}

/** Store API key in sessionStorage (temporary) or localStorage (persist)
 * by default we keep it in sessionStorage to reduce accidental leakage.
 */
/**
 * Save API key in sessionStorage only. This avoids persisting the key to localStorage
 * where it would remain across browser sessions. Storing in sessionStorage keeps it
 * in memory for the current tab session and reduces accidental long-term exposure.
 */
export function saveApiKey(key) {
  try { sessionStorage.setItem(APIKEY_KEY, key); } catch (e) { /* ignore */ }
}

/** Load API key from sessionStorage only. Returns empty string if not present. */
export function loadApiKey() {
  return sessionStorage.getItem(APIKEY_KEY) || '';
}

export function clearApiKey() {
  sessionStorage.removeItem(APIKEY_KEY);
}
