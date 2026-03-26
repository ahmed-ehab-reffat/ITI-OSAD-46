import { playSound } from '../sound.js';
/* Queue visualizer with improved UI (sample/clear/front/back/count) and animations */
export class QueueVisualizer{
  constructor(container){ this.container=container; this.queue=[]; }
  init(){
    const controls = document.createElement('div'); controls.className='ds-panel-controls';
    const input = document.createElement('input'); input.placeholder='value';
    const enq = document.createElement('button'); enq.textContent='Enqueue';
    const deq = document.createElement('button'); deq.textContent='Dequeue';
    const sampleBtn = document.createElement('button'); sampleBtn.textContent='Sample';
    const clearBtn = document.createElement('button'); clearBtn.textContent='Clear';
    const count = document.createElement('span'); count.className='ds-meta'; count.textContent='Count: 0';
    controls.appendChild(input); controls.appendChild(enq); controls.appendChild(deq); controls.appendChild(sampleBtn); controls.appendChild(clearBtn); controls.appendChild(count);
    const result = document.createElement('div'); result.className='ds-result'; controls.appendChild(result);
    this.container.appendChild(controls);

    this.nodes = document.createElement('div'); this.nodes.className='ds-visualizer';
    this.container.appendChild(this.nodes);

    enq.addEventListener('click', ()=>{ const v = input.value || Math.floor(Math.random()*100); this._enqueueAnimated(v); playSound('add'); input.value=''; });
    deq.addEventListener('click', ()=>{ this._dequeueAnimated(); playSound('remove'); });
    sampleBtn.addEventListener('click', ()=>{ this.sample(); });
    clearBtn.addEventListener('click', ()=>{ this.queue = []; this._resultEl.textContent = 'Cleared'; this.render(); });

    this._countEl = count;
    this._resultEl = result;
    // support Enter key on input to trigger primary action (Enter enqueues)
    input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ enq.click(); } });
    this.render();
  }
  sample(){
    this.queue = [5, 15, 25, 35];
    this._resultEl.textContent = 'Sample loaded';
    this.render();
  }
  _enqueueAnimated(v){
    this.queue.push(v);
    this.render(true, {highlight:'add'});
  }
  _dequeueAnimated(){
    if(this.queue.length === 0) return;
    // animate first node removal
    const firstNode = this.nodes.querySelectorAll('.node')[0];
    if(firstNode){
      firstNode.classList.add('anim-remove');
      firstNode.addEventListener('animationend', ()=>{ const deq = this.queue.shift(); this._resultEl.textContent = deq === undefined ? 'Queue empty' : 'Dequeued: ' + deq; this.render(); }, {once:true});
    }else{ const deq = this.queue.shift(); this._resultEl.textContent = deq === undefined ? 'Queue empty' : 'Dequeued: ' + deq; this.render(); }
  }
  render(animated=false, opts={}){
    this._countEl.textContent = `Count: ${this.queue.length}`;
    this.nodes.innerHTML='';
    if(this.queue.length === 0){ const e = document.createElement('div'); e.className='ds-meta'; e.textContent='Queue is empty'; this.nodes.appendChild(e); return; }
    const front = document.createElement('div'); front.className='queue-indicator'; front.textContent='Front'; this.nodes.appendChild(front);
    this.queue.forEach((v,i)=>{
      const n=document.createElement('div'); n.className='node'; n.textContent=v;
      if(animated && i === this.queue.length-1 && opts.highlight === 'add') n.classList.add('anim-add');
      this.nodes.appendChild(n);
      if(i < this.queue.length-1){ const ar=document.createElement('div'); ar.className='link-arrow'; ar.textContent='→'; this.nodes.appendChild(ar); }
    });
    const back = document.createElement('div'); back.className='queue-indicator'; back.textContent='Back'; this.nodes.appendChild(back);
  }
}
