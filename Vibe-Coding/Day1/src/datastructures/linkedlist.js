import { playSound } from '../sound.js';
/* Very small linked list UI for learning with sample/clear and arrows and simple animations */
export class LinkedListVisualizer{
  constructor(container){ this.container=container; this.list=[]; }
  init(){
    const controls = document.createElement('div'); controls.className='ds-panel-controls';
    const input = document.createElement('input'); input.placeholder='value';
    const addBtn = document.createElement('button'); addBtn.textContent='Add';
    const removeBtn = document.createElement('button'); removeBtn.textContent='Remove';
    const sampleBtn = document.createElement('button'); sampleBtn.textContent='Sample';
    const clearBtn = document.createElement('button'); clearBtn.textContent='Clear';
    const count = document.createElement('span'); count.className='ds-meta'; count.textContent='Count: 0';
    controls.appendChild(input); controls.appendChild(addBtn); controls.appendChild(removeBtn); controls.appendChild(sampleBtn); controls.appendChild(clearBtn); controls.appendChild(count);
    const result = document.createElement('div'); result.className='ds-result'; controls.appendChild(result);
    this.container.appendChild(controls);
    this.nodes = document.createElement('div'); this.nodes.className='ds-visualizer';
    this.container.appendChild(this.nodes);

    addBtn.addEventListener('click', ()=>{ const v=input.value || Math.floor(Math.random()*100); this._addAnimated(v); playSound('add'); input.value=''; });
    removeBtn.addEventListener('click', ()=>{ this._removeAnimated(); playSound('remove'); });
    sampleBtn.addEventListener('click', ()=>{ this.sample(); });
    clearBtn.addEventListener('click', ()=>{ this.list = []; this._resultEl.textContent = 'Cleared'; this.render(); });

    this._countEl = count;
    this._resultEl = result;
    // support Enter key on input to trigger primary action (Enter adds)
    input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ addBtn.click(); } });
    this.render();
  }
  sample(){
    this.list = [11,22,33]; this._resultEl.textContent = 'Sample loaded'; this.render();
  }
  _addAnimated(v){
    this.list.push(v);
    this.render(true, {highlight:'add'});
  }
  _removeAnimated(){
    if(this.list.length === 0) return;
    // remove head with animation
    const firstNode = this.nodes.querySelectorAll('.node')[0];
    if(firstNode){
      firstNode.classList.add('anim-remove');
      firstNode.addEventListener('animationend', ()=>{ const rem = this.list.shift(); this._resultEl.textContent = rem === undefined ? 'List empty' : 'Removed: ' + rem; this.render(); }, {once:true});
    }else{ const rem = this.list.shift(); this._resultEl.textContent = rem === undefined ? 'List empty' : 'Removed: ' + rem; this.render(); }
  }
  render(animated=false, opts={}){
    this._countEl.textContent = `Count: ${this.list.length}`;
    this.nodes.innerHTML='';
    if(this.list.length === 0){ const e=document.createElement('div'); e.className='ds-meta'; e.textContent='List is empty'; this.nodes.appendChild(e); return; }
    this.list.forEach((v,i)=>{
      const n=document.createElement('div'); n.className='node'; n.textContent = `${v}`;
      if(animated && i === this.list.length-1 && opts.highlight === 'add') n.classList.add('anim-add');
      this.nodes.appendChild(n);
      if(i < this.list.length-1){ const ar=document.createElement('div'); ar.className='link-arrow'; ar.textContent='→'; this.nodes.appendChild(ar); }
    });
  }
}
