/*
Simple sound helper using Web Audio API.
Usage: import { playSound, resumeAudioContext, setMuted } from './sound.js';
playSound('compare'); // types: compare, swap, pivot, add, remove
*/

let audioCtx = null;
let muted = false;

// Do NOT create AudioContext automatically; create/resume it after a user gesture.
export async function resumeAudioContext(){
  if(!audioCtx){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if(audioCtx.state === 'suspended'){
    try{ await audioCtx.resume(); }catch(e){ /* ignore */ }
  }
}

export function setMuted(v = true){ muted = !!v; }
export function isMuted(){ return !!muted; }

export function playSound(type = 'compare', duration = 0.08){
  try{
    if(muted) return;
    if(!audioCtx) return; // not yet enabled by user gesture
    if(audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;
    const map = {
      compare: 880,
      swap: 440,
      pivot: 660,
      add: 980,
      remove: 300,
      click: 1200,
    };
    osc.frequency.value = map[type] || 600;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
    osc.start(now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.stop(now + duration + 0.02);
  }catch(e){
    // Audio may still throw if browser blocks; ignore.
  }
}
