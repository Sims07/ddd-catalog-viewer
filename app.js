const PDF="https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf",OFF=7,G4="IV. Context Mapping for Strategic Design";
const COL={root:['#bbf7d0','#16a34a'],vo:['#bfdbfe','#2563eb'],ext:['#e2e8f0','#475569'],acl:['#ddd6fe','#7c3aed'],core:['#fed7aa','#ea580c'],gen:['#f1f5f9','#94a3b8'],repo:['#fde68a','#d97706']};
const CATS={fondations:['Fondations','f'],tactique:['Tactique','t'],strategique:['Stratégique','s']};
const TABS=[['strategique','Stratégique'],['ctx','★ Context Map'],['tactique','Tactique'],['fondations','Fondations'],['all','Tous']];
const ORDER=['context-map','partnership','shared-kernel','customer-supplier','conformist','anticorruption-layer','open-host-service','published-language','separate-ways','big-ball-of-mud'];
const ORDER2=['bounded-context','ubiquitous-language','core-domain','generic-subdomains','domain-vision-statement','highlighted-core','cohesive-mechanisms','segregated-core','abstract-core','evolving-order','system-metaphor','responsibility-layers','knowledge-level','pluggable-component-framework'];
const REL=[["Mutually Dependent",['partnership','shared-kernel']],["Upstream / Downstream",['customer-supplier','conformist','anticorruption-layer','open-host-service','published-language']],["Free",['separate-ways']],["Démarcation",['big-ball-of-mud']]];
const r=p=>p.group===G4?ORDER.indexOf(p.id):(ORDER2.indexOf(p.id)<0?99:20+ORDER2.indexOf(p.id));
let PATTERNS=[],cat='strategique',q='';
const $=s=>document.querySelector(s),has=id=>PATTERNS.some(p=>p.id===id);

function anchor(n,tx,ty){const cx=n.x+n.w/2,cy=n.y+n.h/2,dx=tx-cx,dy=ty-cy,s=Math.min(dx?n.w/2/Math.abs(dx):1e9,dy?n.h/2/Math.abs(dy):1e9);return[cx+dx*s,cy+dy*s]}
function renderDiagram(d,id){
 const N=Object.fromEntries(d.n.map(n=>[n.id,n]));
 let o=`<svg viewBox="0 0 ${d.w} ${d.h}" role="img" aria-label="Diagramme du pattern"><defs><marker id="ar${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--fg)"/></marker></defs>`;
 d.b.forEach(b=>o+=`<rect class="bd0" rx="10" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}"/><text class="bl" x="${b.x+10}" y="${b.y+16}">${b.l}</text>`);
 d.e.forEach(e=>{const A=N[e.a],B=N[e.b],p=anchor(A,B.x+B.w/2,B.y+B.h/2),t=anchor(B,A.x+A.w/2,A.y+A.h/2);
  o+=`<line class="ed${e.d?' d':''}" x1="${p[0]}" y1="${p[1]}" x2="${t[0]}" y2="${t[1]}" marker-end="url(#ar${id})"/>`;
  if(e.l)o+=`<text class="el" x="${(p[0]+t[0])/2}" y="${(p[1]+t[1])/2-5}" text-anchor="middle">${e.l}</text>`});
 d.n.forEach(n=>{const c=COL[n.k],f=Math.min(14.5,(n.w-10)/(n.t.length*.58)),g=n.s?Math.min(11.5,(n.w-8)/(n.s.length*.54)):0;
  o+=`<g class="nd"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="8" fill="${c[0]}" stroke="${c[1]}" stroke-width="1.6"/><text x="${n.x+n.w/2}" y="${n.y+n.h/2+(n.s?-2:5)}" text-anchor="middle" font-weight="600" font-size="${f}">${n.t}</text>`+(n.s?`<text class="sub" x="${n.x+n.w/2}" y="${n.y+n.h/2+14}" text-anchor="middle" font-size="${g}">${n.s}</text>`:'')+`</g>`});
 return o+'</svg>'}

const pdfUrl=p=>`${PDF}#page=${p.page+OFF}`;
function card(p){const c=CATS[p.cat];
 return `<article class="card${p.group===G4?' ctx':''}" id="${p.id}">
 <button class="fig" data-z="${p.id}" aria-label="Agrandir le diagramme de ${p.name}">${renderDiagram(p.dg,p.id)}<span class="zh">⤢ Agrandir</span></button>
 <div class="bd"><div class="meta"><span class="tag ${c[1]}">${c[0]}</span><span class="grp">${p.group}</span></div>
 <h2>${p.name}</h2><p class="sum">${p.summary}</p>
 <div class="blk p"><b>Problème</b><p>${p.pShort}</p></div><div class="blk s"><b>Solution</b><p>${p.sShort}</p></div>
 <details class="neg"><summary>Effets négatifs</summary><ul>${p.neg.map(n=>`<li><b>${n.t}</b> : ${n.d}</li>`).join('')}</ul></details>
 <details><summary>Texte complet (Evans)</summary><h3>Problème</h3><p>${p.problem}</p><h3>Solution</h3><p>${p.solution}</p>${p.note?`<h3>Complément DDD Crew</h3><p class="note">${p.note}</p>`:''}</details>
 <div class="see">Voir aussi : ${p.see.map(([i,n])=>has(i)?`<a class="chip" href="#${i}">${n}</a>`:`<span class="chip m">${n}</span>`).join('')}</div>
 <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div></div>
 <div class="ft"><button data-c="${p.id}">📋 Copier MD</button><span>${p.crew?`<a href="${p.crew[1]}" target="_blank" rel="noopener">${p.crew[0]} ↗</a>`:''}<a href="${pdfUrl(p)}" target="_blank" rel="noopener">Evans p. ${p.page} ↗</a></span></div></article>`}
function strip(it){if(!['strategique','ctx'].includes(cat)||!it.some(p=>p.group===G4))return'';
 return`<div class="strip"><b>★ Context Map</b>`+REL.map(([t,l])=>{const v=l.filter(i=>it.some(p=>p.id===i));return v.length?`<span>${t} :</span>`+v.map(i=>`<a class="chip" href="#${i}">${it.find(p=>p.id===i).name}</a>`).join(''):''}).join('')+`</div>`}
function render(){const s=q.toLowerCase();
 const it=PATTERNS.filter(p=>(cat==='all'||p.cat===cat||(cat==='ctx'&&p.group===G4))&&(!s||[p.name,p.summary,p.problem,p.solution,...p.tags].join(' ').toLowerCase().includes(s))).sort((a,b)=>r(a)-r(b));
 let sep=0;$('#strip').innerHTML=strip(it);
 $('#list').innerHTML=it.length?it.map(p=>{let h='';if(p.group!==G4&&!sep&&it.some(x=>x.group===G4)){sep=1;h='<h2 class="sep">Bounded Context, distillation et structure à grande échelle</h2>'}return h+card(p)}).join(''):'<div class="empty">Aucun pattern ne correspond.</div>';
 try{history.replaceState(null,'','?t='+cat+(q?'&q='+encodeURIComponent(q):''))}catch(e){}}
function tabs(){$('#tabs').innerHTML=TABS.map(([k,l])=>`<button class="pill${k===cat?' on':''}" data-k="${k}">${l}</button>`).join('')+'<span class="vr"></span><button class="pill c" id="cb" aria-expanded="false">💡 Concepts</button>'}
const md=p=>`## ${p.name}\n\n*${CATS[p.cat][0]} · ${p.group}*\n\n${p.summary}\n\n**Problème** : ${p.pShort}\n\n**Solution** : ${p.sShort}\n\n**Effets négatifs**\n${p.neg.map(n=>`- ${n.t} : ${n.d}`).join('\n')}\n\n**Voir aussi** : ${p.see.map(x=>x[1]).join(', ')}\n\nSource : DDD Reference (Evans, 2015), p. ${p.page}\n`;
function copy(t,b){const ok=()=>{const o=b.textContent;b.textContent='✓ Copié';setTimeout(()=>b.textContent=o,1500)};
 if(navigator.clipboard)navigator.clipboard.writeText(t).then(ok,()=>fb());else fb();
 function fb(){const a=document.createElement('textarea');a.value=t;a.setAttribute('readonly','');a.style.cssText='position:fixed;top:0;opacity:0';document.body.appendChild(a);a.select();a.setSelectionRange(0,t.length);try{document.execCommand('copy');ok()}catch(e){}a.remove()}}
document.addEventListener('click',e=>{const t=e.target,k=t.closest('[data-k]'),z=t.closest('[data-z]'),c=t.closest('[data-c]');
 if(k){cat=k.dataset.k;tabs();render()}
 else if(t.closest('#cb')){const s=$('#concepts');s.hidden=!s.hidden;$('#cb').setAttribute('aria-expanded',!s.hidden)}
 else if(z){const p=PATTERNS.find(x=>x.id===z.dataset.z);$('#zoom').innerHTML=`<div><button class="zc">✕ Fermer</button>${renderDiagram(p.dg,'z'+p.id)}</div>`;$('#zoom').hidden=false}
 else if(c)copy(md(PATTERNS.find(x=>x.id===c.dataset.c)),c);
 else if(t.id==='zoom'||t.closest('.zc'))$('#zoom').hidden=true});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#zoom').hidden=true});
$('#q').addEventListener('input',e=>{q=e.target.value;render()});
const P=new URLSearchParams(location.search);if(TABS.some(t=>t[0]===P.get('t')))cat=P.get('t');q=P.get('q')||'';$('#q').value=q;
(window.__DATA?Promise.resolve(window.__DATA):fetch('data/patterns.json').then(x=>x.json())).then(d=>{PATTERNS=d;tabs();render()}).catch(()=>{$('#list').innerHTML='<div class="empty">Impossible de charger data/patterns.json (lancer via un serveur HTTP).</div>'});
