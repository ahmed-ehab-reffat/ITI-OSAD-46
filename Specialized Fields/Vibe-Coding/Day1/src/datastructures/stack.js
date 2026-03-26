import { playSound } from '../sound.js';
/*
 Simple Stack visualizer: supports push/pop with improved UI (sample/clear/count).
 Adds small animations for push/pop.
*/

export class StackVisualizer{
  constructor(container){ this.container = container; this.stack = []; }
  init(){
    const controls = document.createElement('div'); controls.className='ds-panel-controls';
    const input = document.createElement('input'); input.placeholder = 'value';
    const pushBtn = document.createElement('button'); pushBtn.textContent = 'Push';
    const popBtn = document.createElement('button'); popBtn.textContent = 'Pop';
    const sampleBtn = document.createElement('button'); sampleBtn.textContent = 'Sample';
    const clearBtn = document.createElement('button'); clearBtn.textContent = 'Clear';
    const count = document.createElement('span'); count.className='ds-meta'; count.textContent='Count: 0';
    controls.appendChild(input); controls.appendChild(pushBtn); controls.appendChild(popBtn); controls.appendChild(sampleBtn); controls.appendChild(clearBtn); controls.appendChild(count);
    const result = document.createElement('div'); result.className='ds-result'; controls.appendChild(result);
    this.container.appendChild(controls);

    this.nodes = document.createElement('div'); this.nodes.className='ds-visualizer';
    this.container.appendChild(this.nodes);

    pushBtn.addEventListener('click', ()=>{
      const v = input.value || Math.floor(Math.random()*100);
      this._pushAnimated(v); playSound('add');
      input.value='';
    });
    popBtn.addEventListener('click', ()=>{ this._popAnimated(); playSound('remove'); });
    sampleBtn.addEventListener('click', ()=>{ this.sample(); });
    clearBtn.addEventListener('click', ()=>{ this.stack = []; this._resultEl.textContent = 'Cleared'; this.render(); });

    this._countEl = count;
    this._resultEl = result;
    // support Enter key on input to trigger primary action
    input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ pushBtn.click ? pushBtn.click() : addBtn && addBtn.click && addBtn.click(); } });
    this.render();
  }
  sample(){
    // example stack values
    this.stack = [10, 20, 30, 40];
    this._resultEl.textContent = 'Sample loaded';
    this.render();
  }
  _pushAnimated(v){
    this.stack.push(v);
    this.render(true, {highlight: 'add'});
  }
  _popAnimated(){
    if(this.stack.length === 0) return;
    // mark top node for removal animation
    const topEl = this.nodes.querySelector('.node');
    if(topEl){
      topEl.classList.add('anim-remove');
      topEl.addEventListener('animationend', ()=>{
        const popped = this.stack.pop(); this._resultEl.textContent = popped === undefined ? 'Stack empty' : 'Popped: ' + popped; this.render();
      }, {once:true});
    }else{ const popped = this.stack.pop(); this._resultEl.textContent = popped === undefined ? 'Stack empty' : 'Popped: ' + popped; this.render(); }
  }
  render(animated=false, opts={}){
    this._countEl.textContent = `Count: ${this.stack.length}`;
    this.nodes.innerHTML='';
    const meta = document.createElement('div'); meta.className='stack-top'; meta.textContent = 'Top →';
    this.nodes.appendChild(meta);
    for(let i=this.stack.length-1;i>=0;i--){
      const n = document.createElement('div'); n.className='node'; n.textContent = this.stack[i];
      if(animated && i === this.stack.length -1 && opts.highlight === 'add'){
        n.classList.add('anim-add');
      }
      this.nodes.appendChild(n);
    }
  }
}
