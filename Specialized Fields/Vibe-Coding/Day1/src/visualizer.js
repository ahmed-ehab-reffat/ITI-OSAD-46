/*
 Visualizer module: draws arrays as bars and exposes a small API.
 Adds small visual easing and optional sound hooks via playSound.
*/
import { playSound } from './sound.js';

export function drawArray(container, array, meta = {}){
  // meta: {compare:[i,j], swap:[i,j], pivot: idx}
  container.innerHTML = '';
  const max = Math.max(...array);
  array.forEach((v, i)=>{
    const bar = document.createElement('div');
    bar.className = 'bar';
    const height = Math.max(4, Math.round((v / max) * 100));
    bar.style.height = height + '%';
    // add a small per-bar stagger for nicer motion
    bar.style.setProperty('--d', `${(i % 20) * 8}ms`);
    if(meta.compare && meta.compare.includes(i)){
      bar.classList.add('compare');
      playSound('compare');
    }
    if(meta.swap && meta.swap.includes(i)){
      bar.classList.add('swap');
      playSound('swap');
    }
    if(meta.pivot === i){
      bar.classList.add('pivot');
      playSound('pivot');
    }
    container.appendChild(bar);
  });
}

// keep pause/terminate buttons enabled even when other controls are disabled
export function setContainerDisabled(disabled){
  document.querySelectorAll('button,select,input').forEach(el=>{
    if(el.id === 'pause-btn' || el.id === 'terminate-btn') return;
    el.disabled = disabled;
  });
}

