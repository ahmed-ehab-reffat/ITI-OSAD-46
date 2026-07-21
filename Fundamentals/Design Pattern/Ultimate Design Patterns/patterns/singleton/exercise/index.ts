import { SessionManager } from './sessionManager';

// const sessionManager = new (SessionManager as any)();
const sessionManager = SessionManager.getInstance();

console.log(sessionManager.setting);
sessionManager.setting = 1;
console.log(sessionManager.setting);
