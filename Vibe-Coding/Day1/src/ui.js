/*
 UI module: handles DOM, controls, and connects visualizer + algorithms.
 Added step controls, keyboard shortcuts, and improved interactions.
*/

import { drawArray, setContainerDisabled } from './visualizer.js';
import * as sortAlgos from './algorithms/sort.js';
import { playSound, resumeAudioContext, setMuted, isMuted } from './sound.js';
import { StackVisualizer } from './datastructures/stack.js';
import { QueueVisualizer } from './datastructures/queue.js';
import { LinkedListVisualizer } from './datastructures/linkedlist.js';

let array = [];
let running = false;

// Speed slider mapping: slider value (1..1000) -> delay ms
// We invert it so higher slider = faster (smaller delay).
// Use a compressed mapping so the max slider value yields near-zero delay.
function speedToDelay(value){
  const v = Math.max(1, Math.min(1000, value));
  // linear->faster mapping: delay = (1001 - v) * SCALE
  // SCALE controls how aggressive the speed is; reduce to make faster.
  const SCALE = 0.12; // smaller -> faster overall (0.12 gives ~0ms at max, ~30ms at v=800)
  const delay = Math.round((1001 - v) * SCALE);
  return Math.max(0, delay);
}

export function initUI(){
  const sizeRange = document.getElementById('size-range');
  const speedRange = document.getElementById('speed-range');
  const shuffleBtn = document.getElementById('shuffle-btn');
  const sortBtn = document.getElementById('sort-btn');
  const algoSelect = document.getElementById('algorithm-select');
  const visualizer = document.getElementById('visualizer');
  const pauseBtn = document.getElementById('pause-btn');
  const terminateBtn = document.getElementById('terminate-btn');
  const sortingControls = document.getElementById('sorting-controls');
  const stepToggle = document.getElementById('step-toggle');
  const stepNext = document.getElementById('step-next');
  const stepBack = document.getElementById('step-back');

  // keyboard shortcuts
  function onKey(e){
    if(!running) return;
    // Space toggles pause
    if(e.code === 'Space'){ e.preventDefault(); pauseBtn.click(); }
    // T terminates
    if(e.key.toLowerCase() === 't') terminateBtn.click();
    // N steps next when in step mode
    if(e.key.toLowerCase() === 'n') stepNext.click();
    if(e.key.toLowerCase() === 'b') stepBack.click();
  }
  document.addEventListener('keydown', onKey);

  // initial array
  array = makeArray(+sizeRange.value);
  drawArray(visualizer, array);

  sizeRange.addEventListener('input', ()=>{
    array = makeArray(+sizeRange.value);
    drawArray(visualizer, array);
  });


  shuffleBtn.addEventListener('click', ()=>{
    if(running) return;
    shuffle(array);
    drawArray(visualizer, array);
  });

  sortBtn.addEventListener('click', async ()=>{
    if(running) return;
    running = true;
    sortBtn.disabled = true;
    setContainerDisabled(true);
    pauseBtn.disabled = false;
    terminateBtn.disabled = false;

    // do NOT capture speed here — read it dynamically so user can change speed while running
    const algo = algoSelect.value;

    // control object to support pause/terminate and step-mode
    const control = {
      aborted: false,
      paused: false,
      mode: stepToggle.checked ? 'step' : 'auto',
      _resume: null,
      history: [],
      historyIndex: -1,
      _stepResolver: null,
    };

    // clicking step toggle while running updates mode
    stepToggle.addEventListener('change', ()=>{ control.mode = stepToggle.checked ? 'step' : 'auto'; });

    pauseBtn.textContent = 'Pause';

    pauseBtn.onclick = ()=>{
      if(control.aborted) return;
      control.paused = !control.paused;
      if(!control.paused && control._resume){
        control._resume();
        control._resume = null;
      }
      pauseBtn.textContent = control.paused ? 'Resume' : 'Pause';
    };

    terminateBtn.onclick = ()=>{
      control.aborted = true;
      // if paused, resume so running code can detect abort
      if(control.paused && control._resume){ control._resume(); control._resume = null; }
      // if waiting in step, resolve it so algorithm can detect abort
      if(control._stepResolver){ control._stepResolver({action:'terminate'}); control._stepResolver = null; }
    };

    stepNext.onclick = ()=>{
      if(control.mode !== 'step') return;
      // if algorithm waiting for step, resolve to advance
      if(control._stepResolver){ control._stepResolver({action:'next'}); control._stepResolver = null; }
      // otherwise, move history pointer forward (visual-only)
      else if(control.historyIndex < control.history.length -1){ control.historyIndex++; const s = control.history[control.historyIndex]; drawArray(visualizer, s.arr, s.meta); }
    };

    stepBack.onclick = ()=>{
      if(control.historyIndex > 0){ control.historyIndex--; const s = control.history[control.historyIndex]; drawArray(visualizer, s.arr, s.meta); }
    };

    // enable/disable step buttons based on mode
    function updateStepButtons(){
      const enabled = control.mode === 'step';
      stepNext.disabled = !enabled;
      stepBack.disabled = !enabled;
    }
    updateStepButtons();
    stepToggle.addEventListener('change', updateStepButtons);

    // mapping algorithm name -> function
    const algoMap = {
      bubble: sortAlgos.bubbleSort,
      selection: sortAlgos.selectionSort,
      insertion: sortAlgos.insertionSort,
      merge: sortAlgos.mergeSort,
      quick: sortAlgos.quickSort,
    };

    const fn = algoMap[algo];
    if(fn){
      // provide a visualize wrapper that respects pause/terminate and step mode
      const visualize = async (arrCopy, meta)=>{
        if(control.aborted) throw new Error('ABORT');
        // push snapshot
        control.history.push({arr: arrCopy.slice(), meta});
        control.historyIndex = control.history.length -1;
        drawArray(visualizer, arrCopy, meta);

        if(control.mode === 'auto'){
          // read current slider value each step so the user can change speed on the fly
          const currentDelay = speedToDelay(+speedRange.value);
          await controlledDelay(currentDelay, control);
        }else{
          // step mode: wait for next/back/terminate
          await new Promise(res=>{
            control._stepResolver = (payload)=>{
              if(payload && payload.action === 'terminate'){ res(); }
              else res();
            };
          });
          if(control.aborted) throw new Error('ABORT');
        }
      };

      try{
        await fn(array, visualize);
      }catch(err){
        if(err && err.message === 'ABORT'){
          // terminated by user; we stop silently
        }else{
          console.error(err);
        }
      }
    }

    running = false;
    sortBtn.disabled = false;
    setContainerDisabled(false);
    pauseBtn.disabled = true;
    terminateBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    stepNext.disabled = true;
    stepBack.disabled = true;
  });

  // Tabs: show/hide sorting controls when switching
  document.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');

      const isSorting = btn.dataset.target === 'sorting';
      // show sorting controls only when sorting tab active
      sortingControls.style.display = isSorting ? 'flex' : 'none';
    });
  });

  // Data structures: clicking creates an enhanced visualizer instance
  const themeToggle = document.getElementById('theme-toggle');
  // theme toggle: persist in localStorage
  function setTheme(light){
    if(light) document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
    localStorage.setItem('vc_theme_light', light ? '1' : '0');
    playSound('click');
  }
  // initialize theme
  const saved = localStorage.getItem('vc_theme_light');
  setTheme(saved === '1');
  themeToggle.addEventListener('click', ()=>{ const isLight = document.documentElement.classList.contains('light'); setTheme(!isLight); });
  // sound toggle
  const soundToggle = document.getElementById('sound-toggle');
  if(soundToggle){
    // try to resume audio on first click and toggle mute
    soundToggle.addEventListener('click', async ()=>{
      try{ await resumeAudioContext(); }catch(e){}
      const currentlyMuted = isMuted();
      setMuted(!currentlyMuted);
      soundToggle.textContent = isMuted() ? 'Sound (off)' : 'Sound (on)';
      playSound('click');
    });
    // attempt a resume on first user gesture (click anywhere)
    document.addEventListener('click', ()=>{ resumeAudioContext().catch(()=>{}); }, {once:true});
    // set initial label
    soundToggle.textContent = isMuted() ? 'Sound (off)' : 'Sound (on)';
  }
  const dsVis = document.getElementById('ds-visualizer');
  document.getElementById('ds-stack').addEventListener('click', ()=>{
    dsVis.innerHTML = '';
    const s = new StackVisualizer(dsVis);
    s.init();
    s.sample();
  });
  document.getElementById('ds-queue').addEventListener('click', ()=>{
    dsVis.innerHTML = '';
    const q = new QueueVisualizer(dsVis);
    q.init();
    q.sample();
  });
  document.getElementById('ds-linkedlist').addEventListener('click', ()=>{
    dsVis.innerHTML = '';
    const l = new LinkedListVisualizer(dsVis);
    l.init();
    l.sample();
  });
}

// helpers
function makeArray(n){
  const arr = Array.from({length:n}, (_,i)=>Math.floor(Math.random()*100)+5);
  return arr;
}

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
}

// controlled delay that respects pause and abort signals
async function controlledDelay(ms, control){
  const step = 20;
  let elapsed = 0;
  while(elapsed < ms){
    if(control.aborted) throw new Error('ABORT');
    if(control.paused){
      // wait until resumed; store resolver so terminate can resume
      await new Promise(res=> control._resume = res);
      if(control.aborted) throw new Error('ABORT');
    }
    const toWait = Math.min(step, ms - elapsed);
    await new Promise(res=> setTimeout(res, toWait));
    elapsed += toWait;
  }
}

function delay(ms){
  return new Promise(res=>setTimeout(res, ms));
}

// export helpers for tests or the visualizer
export { makeArray, shuffle };

