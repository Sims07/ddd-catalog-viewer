const COL={root:['#bbf7d0','#16a34a'],vo:['#bfdbfe','#2563eb'],ext:['#e2e8f0','#475569'],acl:['#ddd6fe','#7c3aed'],core:['#fed7aa','#ea580c'],gen:['#f1f5f9','#94a3b8'],repo:['#fde68a','#d97706']};
const CATS={fondations:'Fondations',tactique:'Tactique',strategique:'Stratégique'};

const G4="IV. Context Mapping for Strategic Design";
let PATTERNS=[];

function anchor(n,tx,ty){const cx=n.x+n.w/2,cy=n.y+n.h/2,dx=tx-cx,dy=ty-cy;
 const s=Math.min(dx?n.w/2/Math.abs(dx):1e9,dy?n.h/2/Math.abs(dy):1e9);return[cx+dx*s,cy+dy*s]}

function renderDiagram(d,id){
 const N=Object.fromEntries(d.n.map(n=>[n.id,n]));
 let o=`<svg viewBox="0 0 ${d.w} ${d.h}" role="img" aria-label="Diagramme"><defs><marker id="ar${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--fg)"/></marker></defs>`;
 d.b.forEach(b=>o+=`<rect class="bd" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}"/><text class="bl" x="${b.x+10}" y="${b.y+15}">${b.l}</text>`);
 d.e.forEach(e=>{const A=N[e.a],B=N[e.b];
  const p=anchor(A,B.x+B.w/2,B.y+B.h/2),q=anchor(B,A.x+A.w/2,A.y+A.h/2);
  o+=`<line class="ed${e.d?' d':''}" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" marker-end="url(#ar${id})"/>`;
  if(e.l)o+=`<text class="el" x="${(p[0]+q[0])/2}" y="${(p[1]+q[1])/2-5}" text-anchor="middle">${e.l}</text>`});
 d.n.forEach(n=>{const c=COL[n.k];
  o+=`<g class="nd"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="8" fill="${c[0]}" stroke="${c[1]}" stroke-width="1.6"/>`+
  `<text x="${n.x+n.w/2}" y="${n.y+n.h/2+(n.s?-2:4)}" text-anchor="middle" font-weight="600">${n.t}</text>`+
  (n.s?`<text class="sub" x="${n.x+n.w/2}" y="${n.y+n.h/2+13}" text-anchor="middle">${n.s}</text>`:'')+`</g>`});
 return o+'</svg>'}

let cat='strategique',q='';
const ORDER=['context-map','partnership','shared-kernel','customer-supplier','conformist','anticorruption-layer','open-host-service','published-language','separate-ways','big-ball-of-mud'];
const ORDER2=['bounded-context','ubiquitous-language','core-domain','generic-subdomains','domain-vision-statement','highlighted-core','cohesive-mechanisms','segregated-core','abstract-core','evolving-order','system-metaphor','responsibility-layers','knowledge-level','pluggable-component-framework'];
const r=p=>p.group===G4?ORDER.indexOf(p.id):(ORDER2.indexOf(p.id)<0?99:20+ORDER2.indexOf(p.id)),rk=(a,b)=>r(a)-r(b);
const REL=[["Mutually Dependent","Les deux contextes doivent réussir ensemble.",['partnership','shared-kernel']],["Upstream / Downstream","Les actions de l’amont affectent l’aval, pas l’inverse.",['customer-supplier','conformist','anticorruption-layer','open-host-service','published-language']],["Free","Aucun lien organisationnel ni technique.",['separate-ways']],["Démarcation","Zone dont le désordre ne doit pas se propager.",['big-ball-of-mud']]];
let SEP={};
function sepH(p,items){if(p.group!==G4&&!SEP.d&&items.some(x=>x.group===G4)){SEP.d=1;return'<h2 class="sep">'+(cat==='strategique'?'Bounded Context, distillation et structure à grande échelle':'Autres patterns')+'</h2>'}return''}
function ctxBlock(items){SEP={};if(!items.some(p=>p.group===G4))return'';
 const ids=items.map(p=>p.id),nm=Object.fromEntries(PATTERNS.map(p=>[p.id,p.name]));
 return`<section class="ctxhead"><h2>★ Context Map : les relations entre bounded contexts</h2><p>Une context map décrit les points de contact entre bounded contexts et équipes. Les patterns de relation sont regroupés ci-dessous par type (regroupement indicatif d’après le DDD Reference et DDD Crew) ; cliquez pour accéder à la fiche.</p><div class="rel">`+REL.map(([t,d,l])=>`<div><h4>${t}</h4><p>${d}</p><div class="chips">${l.filter(i=>ids.includes(i)).map(i=>`<a href="#${i}">${nm[i]}</a>`).join('')||'—'}</div></div>`).join('')+`</div></section>`}
function render(){
 const items=PATTERNS.filter(p=>(cat==='all'||p.cat===cat||(cat==='ctx'&&p.group===G4))&&(p.name+p.problem+p.solution).toLowerCase().includes(q));
 document.getElementById('list').innerHTML=items.length?ctxBlock(items)+items.slice().sort(rk).map(p=>`
 ${sepH(p,items)}<article class="card${p.group===G4?' ctx':''}" id="${p.id}">
  <h2>${p.name}</h2>
  <span class="badge ${({tactique:'t',fondations:'f'})[p.cat]||'s'}">${CATS[p.cat]}</span><span class="badge">${p.group}</span>
  <h3>Problème</h3><p>${p.problem}</p>
  <h3>Solution</h3><p>${p.solution}</p>
  ${p.note?`<h3>Complément DDD Crew</h3><p>${p.note}</p>`:''}
  <details open><summary>Voir le diagramme</summary><div class="dg">${renderDiagram(p.dg,p.id)}</div></details>
  <div class="src">Source : ${p.src}</div>
 </article>`).join(''):'<div class="empty">Aucun pattern dans cette catégorie pour l’instant (échantillon).</div>'}
function tabs(){
 const t=[['strategique','Stratégique'],['ctx','★ Context Map'],['tactique','Tactique'],['fondations','Fondations'],['all','Tous']];
 document.getElementById('tabs').innerHTML=t.map(([k,l])=>`<button class="tab${k===cat?' on':''}" data-k="${k}">${l}</button>`).join('')+'<input id="q" placeholder="Rechercher un pattern…">';
 document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{cat=b.dataset.k;tabs();render()});
 const i=document.getElementById('q');i.value=q;i.oninput=e=>{q=e.target.value.toLowerCase();render()}}
fetch('data/patterns.json').then(r=>r.json()).then(d=>{PATTERNS=d;tabs();render()}).catch(e=>{document.getElementById('list').innerHTML='<div class="empty">Impossible de charger data/patterns.json (lancer via un serveur HTTP).</div>'});
