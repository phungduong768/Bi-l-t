// App bi-a bắn đền – lưu điểm + lịch sử (local)
const KEY="bida_state_v1";
let state=JSON.parse(localStorage.getItem(KEY)||'{"players":[]}');

function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }

function render(){
  const el=document.getElementById('list');
  if(!el) return;
  el.innerHTML='';
  state.players.forEach((p,i)=>{
    el.innerHTML+=`
    <div class="card player">
      <b>${p.name}</b>
      <div class="score">${p.score}</div>
      <div class="row">
        <button onclick="chg(${i},1)">+1</button>
        <button onclick="chg(${i},-1)">-1</button>
        <button onclick="del(${i})">Xoá</button>
      </div>
      <small>${(p.hist||[]).slice(-3).map(h=>h).join(" | ")}</small>
    </div>`;
  });
}
function add(){
  const n=document.getElementById('name').value.trim();
  if(!n) return;
  state.players.push({name:n,score:0,hist:[]});
  document.getElementById('name').value='';
  save(); render();
}
function chg(i,d){
  const p=state.players[i];
  p.score+=d;
  p.hist=p.hist||[];
  p.hist.push(`${d>0?'+':''}${d} @ ${new Date().toLocaleTimeString()}`);
  save(); render();
}
function del(i){
  state.players.splice(i,1);
  save(); render();
}
window.addEventListener('load',render);
