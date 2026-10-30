const pages=['home','o-que-sao','mitos','quem-somos','contato'];
function show(){
  let h=(location.hash||'#home').slice(1);if(!pages.includes(h))h='home';
  document.querySelectorAll('.page').forEach(s=>s.classList.toggle('active',s.id===h));
  document.querySelectorAll('.nav-link').forEach(a=>a.classList.toggle('on',a.dataset.p===h));
  document.getElementById('mobileNav').classList.add('hidden');
  document.getElementById('menuBtn').setAttribute('aria-expanded','false');
  window.scrollTo(0,0);
  document.title=(h==='home'?'':document.querySelector('#'+h+' h1')?.textContent+' | ')+'Explorando os OMGT’S';
}
window.addEventListener('hashchange',show);show();
window.addEventListener('load',()=>window.scrollTo(0,0));

document.getElementById('menuBtn').addEventListener('click',e=>{
  const n=document.getElementById('mobileNav'),open=n.classList.toggle('hidden');
  e.currentTarget.setAttribute('aria-expanded',String(!open));
  if(!open)n.style.display='flex';else n.style.display='';
});

const myths=[
['“Transgênicos causam câncer.”','Não há evidência de que os transgênicos aprovados causem câncer. Revisões de agências de saúde e de academias de ciências não encontraram risco maior do que o de alimentos convencionais. Cada OGM só é liberado após testes de toxicidade e alergenicidade.'],
['“Comer transgênicos altera o nosso DNA.”','O DNA dos alimentos, transgênicos ou não, é digerido em nucleotídeos durante a digestão. Ele não se integra ao genoma humano.'],
['“Sementes transgênicas são estéreis (terminator).”','A tecnologia de esterilização de sementes (GURT) nunca foi comercializada. As sementes são viáveis. O que existe são contratos e patentes que, em alguns casos, limitam o replantio.'],
['“Transgênicos sempre aumentam o uso de agrotóxicos.”','Depende da característica. Plantas Bt podem reduzir o uso de inseticidas. Já as tolerantes a herbicidas exigem manejo adequado para evitar plantas daninhas resistentes. O efeito varia conforme a cultura e a prática agrícola.'],
['“Alterar genes é algo totalmente antinatural.”','A transferência de genes ocorre na natureza, como na bactéria Agrobacterium, que insere DNA em plantas. Além disso, o melhoramento convencional modifica genomas há milênios: o milho atual difere muito do seu ancestral, o teosinto.'],
['“Transgênicos só existem para dar lucro às empresas.”','Há também pesquisa pública e de interesse social, como o feijão resistente ao mosaico dourado, da Embrapa, o mamão resistente a vírus e o arroz dourado, enriquecido com precursor de vitamina A. O debate sobre patentes e acesso é legítimo, mas não resume a tecnologia.']
];
const grid=document.getElementById('mythGrid');
myths.forEach(([m,r],i)=>{
  const c=document.createElement('article');c.className='myth surface rounded-2xl p-6';
  c.innerHTML='<button class="text-left w-full" aria-expanded="false"><span class="font-semibold" style="color:#b4432f">Mito</span><h3 class="text-xl font-bold mt-1">'+m+'</h3><span class="muted text-sm block mt-3 hint">Toque para ver a realidade</span></button><div class="real mt-4 pt-4" style="border-top:1px solid var(--line)"><span class="font-semibold" style="color:var(--brand)">Realidade</span><p class="mt-1">'+r+'</p></div>';
  c.querySelector('button').onclick=()=>{const o=c.classList.toggle('open');c.querySelector('button').setAttribute('aria-expanded',o);c.querySelector('.hint').style.display=o?'none':'block'};
  grid.appendChild(c);
});
const setAll=o=>grid.querySelectorAll('.myth').forEach(c=>{c.classList.toggle('open',o);c.querySelector('button').setAttribute('aria-expanded',o);c.querySelector('.hint').style.display=o?'none':'block'});
document.getElementById('openAll').onclick=()=>setAll(true);
document.getElementById('closeAll').onclick=()=>setAll(false);

['Isabella Sakai Correa da Silva','Julya Karoline Fernandes','Kemilly Lima Nunes','Mayra Rodrigues Binotti'].forEach(n=>{
  const d=document.createElement('div');d.className='surface rounded-2xl p-5 flex items-center gap-4';
  d.innerHTML='<span class="serif text-xl font-bold rounded-full flex items-center justify-center shrink-0" style="width:3.5rem;height:3.5rem;background:var(--brand);color:var(--on-brand)">'+n[0]+'</span><div><h3 class="font-bold text-lg">'+n+'</h3><p class="muted text-sm">Ciências Biológicas · FHO</p></div>';
  document.getElementById('team').appendChild(d);
});

(function(){
  const svg=document.getElementById('helix'),NS='http://www.w3.org/2000/svg',cx=150,A=78,Y0=18,H=384,TURNS=2.25,RUNGS=24,SEG=48;
  const mk=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);svg.appendChild(e);return e};
  const segs=[],rungs=[];
  for(let s=0;s<2;s++)for(let i=0;i<SEG;i++)segs.push({s,i,el:mk('line',{'stroke-linecap':'round',stroke:s?'#8fd18a':'#2a8048'})});
  for(let i=0;i<RUNGS;i++)rungs.push({i,a:mk('line',{'stroke-width':4,'stroke-linecap':'round',stroke:'#2a8048'}),b:mk('line',{'stroke-width':4,'stroke-linecap':'round',stroke:'#a9dca3'}),n1:mk('circle',{fill:'#2a8048'}),n2:mk('circle',{fill:'#8fd18a'})});
  const P=(t,ph,s)=>{const a=ph+t*TURNS*Math.PI*2+(s?Math.PI:0);return{x:cx+A*Math.sin(a),y:Y0+t*H,z:Math.cos(a)}};
  function frame(ms){
    const ph=ms/1400,items=[];
    segs.forEach(o=>{
      const p=P(o.i/SEG,ph,o.s),q=P((o.i+1)/SEG,ph,o.s),d=((p.z+q.z)/2+1)/2;
      const e=o.el;e.setAttribute('x1',p.x);e.setAttribute('y1',p.y);e.setAttribute('x2',q.x);e.setAttribute('y2',q.y);
      e.setAttribute('stroke-width',(3+4*d).toFixed(2));e.setAttribute('opacity',(.35+.65*d).toFixed(2));
      items.push([(p.z+q.z)/2,[e]]);
    });
    rungs.forEach(r=>{
      const t=(r.i+.5)/RUNGS,p=P(t,ph,0),q=P(t,ph,1),mx=(p.x+q.x)/2,dp=(p.z+1)/2,dq=(q.z+1)/2,w=Math.abs(p.x-q.x)/(2*A);
      r.a.setAttribute('x1',p.x);r.a.setAttribute('y1',p.y);r.a.setAttribute('x2',mx);r.a.setAttribute('y2',p.y);
      r.b.setAttribute('x1',mx);r.b.setAttribute('y1',p.y);r.b.setAttribute('x2',q.x);r.b.setAttribute('y2',p.y);
      r.a.setAttribute('opacity',(.25+.6*w).toFixed(2));r.b.setAttribute('opacity',(.25+.6*w).toFixed(2));
      r.n1.setAttribute('cx',p.x);r.n1.setAttribute('cy',p.y);r.n1.setAttribute('r',(3+4*dp).toFixed(2));r.n1.setAttribute('opacity',(.4+.6*dp).toFixed(2));
      r.n2.setAttribute('cx',q.x);r.n2.setAttribute('cy',q.y);r.n2.setAttribute('r',(3+4*dq).toFixed(2));r.n2.setAttribute('opacity',(.4+.6*dq).toFixed(2));
      items.push([0,[r.a,r.b]],[p.z+.01,[r.n1]],[q.z+.01,[r.n2]]);
    });
    items.sort((a,b)=>a[0]-b[0]).forEach(it=>it[1].forEach(el=>svg.appendChild(el)));
  }
  const slow=matchMedia('(prefers-reduced-motion:reduce)').matches?.3:1;
  const loop=t=>{if(document.getElementById('home').classList.contains('active'))frame(t*slow);requestAnimationFrame(loop)};
  requestAnimationFrame(loop);
})();
