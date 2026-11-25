const $=s=>document.querySelector(s);
const getJSON=(u,ms=7000)=>{const c=new AbortController(),t=setTimeout(()=>c.abort(),ms);return fetch(u,{signal:c.signal}).then(r=>{if(!r.ok)throw 0;return r.json()}).finally(()=>clearTimeout(t))};
const fmt=n=>Math.round(n).toLocaleString('hu-HU');

const bg=$('#bg'),bx=bg.getContext('2d');
let W,H,stars=[],shoots=[],bits=[],mx=0,my=0,tx=0,ty=0;
function resize(){W=bg.width=innerWidth;H=bg.height=innerHeight;const cols=['#ffffff','#bfe6ff','#ffd9f5','#ffe9a8'];stars=Array.from({length:Math.floor(W*H/2800)},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*2.6+.4,p:Math.random()*6.28,c:cols[Math.random()*4|0]}))}
function burst(x,y,n=40){for(let i=0;i<n;i++){const a=Math.random()*6.28,s=Math.random()*5+1;bits.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,h:Math.random()*360})}}
function frame(t){
tx+=(mx-tx)*.05;ty+=(my-ty)*.05;
bx.clearRect(0,0,W,H);
for(const s of stars){
const x=((s.x-tx*s.z*28)%W+W)%W,y=((s.y-ty*s.z*28)%H+H)%H;
bx.globalAlpha=.45+.55*Math.sin(t/600*s.z+s.p);
bx.fillStyle=s.c;bx.beginPath();bx.arc(x,y,s.z*.65,0,6.283);bx.fill();
}
bx.globalAlpha=1;
if(Math.random()<.012)shoots.push({x:Math.random()*W,y:Math.random()*H*.5,vx:9+Math.random()*6,vy:4+Math.random()*3,l:1});
for(const s of shoots){
const g=bx.createLinearGradient(s.x,s.y,s.x-s.vx*9,s.y-s.vy*9);
g.addColorStop(0,`rgba(255,255,255,${s.l})`);g.addColorStop(1,'rgba(124,92,255,0)');
bx.strokeStyle=g;bx.lineWidth=2;bx.beginPath();bx.moveTo(s.x,s.y);bx.lineTo(s.x-s.vx*9,s.y-s.vy*9);bx.stroke();
s.x+=s.vx;s.y+=s.vy;s.l-=.012;
}
shoots=shoots.filter(s=>s.l>0);
for(const b of bits){bx.fillStyle=`hsla(${b.h},100%,70%,${b.l})`;bx.beginPath();bx.arc(b.x,b.y,2.4*b.l+.5,0,6.283);bx.fill();b.x+=b.vx;b.y+=b.vy;b.vx*=.97;b.vy*=.97;b.l-=.015}
bits=bits.filter(b=>b.l>0);
requestAnimationFrame(frame);
}
addEventListener('resize',resize);
addEventListener('mousemove',e=>{mx=e.clientX/W-.5;my=e.clientY/H-.5;const g=$('#glow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
addEventListener('click',e=>burst(e.clientX,e.clientY));
$('#nova').onclick=e=>{e.stopPropagation();const r=e.target.getBoundingClientRect();for(let i=0;i<6;i++)setTimeout(()=>burst(innerWidth*Math.random(),innerHeight*Math.random()*.8,70),i*140)};
$('#orb').onclick=e=>{e.stopPropagation();burst(e.clientX,e.clientY,90)};
resize();requestAnimationFrame(frame);

const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');e.target.querySelectorAll('[data-n]').forEach(el=>{if(el.done)return;el.done=1;const end=+el.dataset.n,d=+el.dataset.d||0,sfx=el.dataset.s||"",t0=performance.now();(function step(t){const k=Math.min((t-t0)/2200,1);el.textContent=(end*(1-Math.pow(1-k,3))).toLocaleString("hu-HU",{minimumFractionDigits:d,maximumFractionDigits:d})+sfx;if(k<1)requestAnimationFrame(step)})(t0)});if(e.target.id==='suly')drawWeight()}),{threshold:.2});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

const facts=['Egy kanálnyi neutroncsillag-anyag kb. egymilliárd tonnát nyomna.','A Nap fénye átlagosan 8 perc 20 másodperc alatt ér a Földre.','A Vénuszon egy nap hosszabb, mint egy év.','A világűr csendes: nincs levegő, ami továbbítaná a hangot.','A Voyager–1 több mint 24 milliárd kilométerre jár tőlünk.','A Jupiter Nagy Vörös Foltja több mint 150 éve tomboló vihar.'];
let fi=0;const fe=$('#fact');
function nextFact(){fe.style.opacity=0;setTimeout(()=>{fe.textContent=facts[fi++%facts.length];fe.style.opacity=1},500)}
nextFact();setInterval(nextFact,5000);

const P=[
{id:'mercure',n:'Merkúr',r:4,T:88,c:'#b9b3ad',g:3.7,t:167,m:0,rad:2440,d:'A Naphoz legközelebbi és legkisebb bolygó. Egy nap-éjszaka ciklus 176 földi napig tart.'},
{id:'venus',n:'Vénusz',r:6,T:224.7,c:'#ffcf8a',g:8.87,t:464,m:0,rad:6052,d:'Az üvegházhatás bajnoka: a felszíni hőség ólmot olvasztana. Fordítva forog a többi bolygóhoz képest.'},
{id:'terre',n:'Föld',r:7,T:365.25,c:'#4da3ff',g:9.81,t:15,m:1,rad:6371,d:'Az egyetlen ismert élő bolygó, felszínének 71%-át víz borítja.'},
{id:'mars',n:'Mars',r:5,T:687,c:'#ff6a3d',g:3.71,t:-63,m:2,rad:3390,d:'A vörös bolygó. Itt áll a Naprendszer legnagyobb vulkánja, az Olympus Mons.'},
{id:'jupiter',n:'Jupiter',r:13,T:4333,c:'#e6b88a',g:24.79,t:-108,m:95,rad:69911,d:'Gázóriás, benne több Föld is elférne. A Nagy Vörös Folt egy évszázadok óta tartó vihar.'},
{id:'saturne',n:'Szaturnusz',r:11,T:10759,c:'#f3dca0',g:10.44,t:-139,m:146,rad:58232,d:'Látványos jégtörmelék-gyűrűi vannak, sűrűsége kisebb, mint a vízé.'},
{id:'uranus',n:'Uránusz',r:9,T:30687,c:'#8ff3f0',g:8.87,t:-197,m:28,rad:25362,d:'Oldalán fekve kering: tengelye 98 fokkal dőlt.'},
{id:'neptune',n:'Neptunusz',r:9,T:60190,c:'#4a6bff',g:11.15,t:-201,m:16,rad:24622,d:'A Naprendszer leggyorsabb szelei: akár 2000 km/h.'}
];
P.forEach((p,i)=>{p.a=Math.random()*6.28;p.w=4/Math.pow(p.T,.55);p.i=i});
const sc=$('#sys'),sx=sc.getContext('2d');
let cw,ch,sel=P[2],hov=null,paused=false,speed=2,last=0;
function ssz(){const dpr=devicePixelRatio||1;cw=sc.clientWidth;ch=Math.min(cw,620);sc.style.height=ch+'px';sc.width=cw*dpr;sc.height=ch*dpr;sx.setTransform(dpr,0,0,dpr,0,0)}
ssz();addEventListener('resize',ssz);
function pos(p){const maxR=Math.min(cw,ch)/2-14,R=52+(p.i+1)*(maxR-52)/8;return{R,x:cw/2+Math.cos(p.a)*R,y:ch/2+Math.sin(p.a)*R}}
function solar(t){
const dt=Math.min((t-last)/1000,.1);last=t;
sx.clearRect(0,0,cw,ch);
const sg=sx.createRadialGradient(cw/2,ch/2,2,cw/2,ch/2,60);
sg.addColorStop(0,'#fff6c2');sg.addColorStop(.3,'#ffb627');sg.addColorStop(1,'rgba(255,120,0,0)');
sx.fillStyle=sg;sx.beginPath();sx.arc(cw/2,ch/2,60+Math.sin(t/400)*3,0,6.283);sx.fill();
for(const p of P){
if(!paused)p.a+=p.w*speed*dt;
const q=pos(p);p.q=q;
sx.strokeStyle=p===sel?'#00e5ff88':'#7c5cff33';sx.lineWidth=p===sel?1.6:1;
sx.beginPath();sx.arc(cw/2,ch/2,q.R,0,6.283);sx.stroke();
if(p.id==='saturne'){sx.strokeStyle='#f3dca0aa';sx.lineWidth=2;sx.beginPath();sx.ellipse(q.x,q.y,p.r*1.9,p.r*.6,-.4,0,6.283);sx.stroke()}
const g=sx.createRadialGradient(q.x-p.r*.3,q.y-p.r*.3,1,q.x,q.y,p.r);
g.addColorStop(0,'#fff');g.addColorStop(.25,p.c);g.addColorStop(1,'#000');
sx.shadowColor=p.c;sx.shadowBlur=p===hov||p===sel?24:8;
sx.fillStyle=g;sx.beginPath();sx.arc(q.x,q.y,p.r,0,6.283);sx.fill();sx.shadowBlur=0;
if(p.id==='terre'){const ma=t/500;sx.fillStyle='#ddd';sx.beginPath();sx.arc(q.x+Math.cos(ma)*14,q.y+Math.sin(ma)*14,2,0,6.283);sx.fill()}
if(p===sel){const k=(t/900)%1;sx.strokeStyle=`rgba(0,229,255,${1-k})`;sx.lineWidth=2;sx.beginPath();sx.arc(q.x,q.y,p.r+5+k*16,0,6.283);sx.stroke()}
if(p===sel||p===hov){sx.fillStyle='#fff';sx.font='500 14px Exo 2,sans-serif';sx.fillText(p.n,q.x+p.r+8,q.y-p.r)}
}
requestAnimationFrame(solar);
}
requestAnimationFrame(solar);
const hit=e=>{const r=sc.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;return P.find(p=>p.q&&Math.hypot(p.q.x-x,p.q.y-y)<p.r+8)};
sc.onmousemove=e=>{hov=hit(e)||null;sc.style.cursor=hov?'pointer':'default'};
sc.onclick=e=>{const p=hit(e);if(p){e.stopPropagation();burst(e.clientX,e.clientY,30);select(p)}};
$('#pause').onclick=e=>{paused=!paused;e.target.textContent=paused?'Folytatás':'Szünet'};
$('#spd').oninput=e=>speed=+e.target.value;

async function select(p){
sel=p;
const render=(o,live)=>{$('#info').innerHTML=`<h3>${p.n}</h3><span class="tag ${live?'live':'off'}">${live?'élő API adat':'helyi adat'}</span><p style="margin-top:12px">${p.d}</p><dl><dt>Gravitáció</dt><dd>${o.g.toFixed(2)} m/s²</dd><dt>Átlaghőmérséklet</dt><dd>${fmt(o.t)} °C</dd><dt>Holdak</dt><dd>${o.m}</dd><dt>Keringési idő</dt><dd>${fmt(o.T)} nap</dd><dt>Sugár</dt><dd>${fmt(o.rad)} km</dd></dl>`};
render(p,false);
try{
const d=await getJSON('https://api.le-systeme-solaire.net/rest/bodies/'+p.id);
if(sel!==p)return;
render({g:d.gravity||p.g,t:d.avgTemp?d.avgTemp-273.15:p.t,m:Array.isArray(d.moons)?d.moons.length:p.m,T:d.sideralOrbit||p.T,rad:d.meanRadius||p.rad},true);
}catch{}
}
select(P[2]);

const wl=[['Merkúr',3.7],['Vénusz',8.87],['Föld',9.81],['Hold',1.62],['Mars',3.71],['Jupiter',24.79],['Szaturnusz',10.44],['Neptunusz',11.15],['Nap',274]];
function drawWeight(){
const m=Math.max(+$('#mass').value||0,0),mx2=274;
$('#wlist').innerHTML=wl.map(([n,g])=>`<div class="wrow"><span>${n}</span><div class="bar"><span data-w="${Math.max(g/mx2*100,2)}"></span></div><output>${(m*g/9.81).toFixed(1)} kg</output></div>`).join('');
requestAnimationFrame(()=>requestAnimationFrame(()=>document.querySelectorAll('.bar span').forEach(s=>s.style.width=s.dataset.w+'%')));
}
$('#mass').oninput=drawWeight;drawWeight();

const ic=$('#issc'),ix=ic.getContext('2d');
let iw,ih,trail=[],cur=null,live=false;
function isz(){iw=ic.width=ic.clientWidth;ih=ic.height=Math.round(iw/2.2);ic.style.height=ih+'px'}
isz();addEventListener('resize',isz);
const t0=Date.now();
function simISS(){const s=(Date.now()-t0)/1000+900,ph=s/5560*6.2832,i=.9006;return{latitude:Math.asin(Math.sin(i)*Math.sin(ph))*57.2958,longitude:((Math.atan2(Math.cos(i)*Math.sin(ph),Math.cos(ph))*57.2958-s/86164*360+540)%360+360)%360-180,altitude:420,velocity:27600}}
function updISS(d){cur=d;trail.push([d.latitude,d.longitude]);if(trail.length>90)trail.shift();$('#la').textContent=d.latitude.toFixed(2)+'°';$('#lo').textContent=d.longitude.toFixed(2)+'°';$('#al').textContent=fmt(d.altitude)+' km';$('#ve').textContent=fmt(d.velocity)+' km/h';const st=$('#st');st.textContent=live?'élő adat':'szimuláció (API nem elérhető)';st.className='tag '+(live?'live':'off')}
async function poll(){try{updISS(await getJSON('https://api.wheretheiss.at/v1/satellites/25544',5000));}catch{live=false;updISS(simISS());return}live=true;$('#st').textContent='élő adat';$('#st').className='tag live'}
poll();setInterval(poll,5000);
const X=lo=>(lo+180)/360*iw,Y=la=>(90-la)/180*ih;
function issDraw(t){
ix.clearRect(0,0,iw,ih);
ix.strokeStyle='#7c5cff33';ix.lineWidth=1;ix.fillStyle='#8d98ff';ix.font='11px Exo 2,sans-serif';
for(let lo=-180;lo<=180;lo+=30){ix.beginPath();ix.moveTo(X(lo),0);ix.lineTo(X(lo),ih);ix.stroke();ix.fillText(lo+'°',X(lo)+3,ih-4)}
for(let la=-60;la<=60;la+=30){ix.beginPath();ix.moveTo(0,Y(la));ix.lineTo(iw,Y(la));ix.stroke();ix.fillText(la+'°',4,Y(la)-3)}
ix.strokeStyle='#ff4fd866';ix.beginPath();ix.moveTo(0,Y(0));ix.lineTo(iw,Y(0));ix.stroke();
ix.lineWidth=2.5;ix.strokeStyle='#00e5ff';ix.shadowColor='#00e5ff';ix.shadowBlur=10;
for(let i=1;i<trail.length;i++){if(Math.abs(trail[i][1]-trail[i-1][1])>180)continue;ix.globalAlpha=i/trail.length;ix.beginPath();ix.moveTo(X(trail[i-1][1]),Y(trail[i-1][0]));ix.lineTo(X(trail[i][1]),Y(trail[i][0]));ix.stroke()}
ix.globalAlpha=1;ix.shadowBlur=0;
if(cur){const x=X(cur.longitude),y=Y(cur.latitude),k=(t/1200)%1;
ix.strokeStyle=`rgba(255,216,107,${1-k})`;ix.beginPath();ix.arc(x,y,8+k*26,0,6.283);ix.stroke();
ix.fillStyle='#ffd86b';ix.shadowColor='#ffd86b';ix.shadowBlur=18;ix.beginPath();ix.arc(x,y,6,0,6.283);ix.fill();ix.shadowBlur=0;
ix.fillStyle='#fff';ix.font='500 13px Exo 2,sans-serif';ix.fillText('ISS',x+12,y-10)}
requestAnimationFrame(issDraw);
}
requestAnimationFrame(issDraw);

let apBusy=false;
const apBtns=[$('#apnew'),$('#aptoday')],APKEY='MwqwRmTkQWHnzMTWrqcrW9C6fLgPwFn7Bmc8pzLH';
const APOD_BASE='https://science.nasa.gov/wp-json/wp/v2/apod-basic';

function setBusy(v){apBusy=v;apBtns.forEach(x=>x.disabled=v);$('#apimg').classList.toggle('busy',v)}

function randDateISO(){
  const a=new Date(2016,0,1).getTime(),b=Date.now()-864e5*3;
  return new Date(a+Math.random()*(b-a)).toISOString().slice(0,10);
}

function toYYMMDD(iso){
  return iso.slice(2,4)+iso.slice(5,7)+iso.slice(8,10);
}

function cleanExplanation(htmlStr){
  const tmp=document.createElement('div');
  tmp.innerHTML=htmlStr||'';
  return (tmp.textContent||'')
    .replace(/^\s*Explanation\s*:\s*/i,'')
    .replace(/\s+/g,' ')
    .trim();
}

function showImg(urls,alt,done){
  const u=urls.shift();
  if(!u){done(false);return}
  const im=new Image();
  im.alt=alt;
  im.onload=()=>{$('#apimg').replaceChildren(im);requestAnimationFrame(()=>im.classList.add('on'));done(true)};
  im.onerror=()=>showImg(urls,alt,done);
  im.src=u;
}

async function fetchApodData(random){
  const iso=randDateISO();
  const yymmdd=toYYMMDD(iso);

  // 1. Próbálkozás: új NASA APOD végpont
  try{
    const endpoint=random ? `${APOD_BASE}/${yymmdd}` : APOD_BASE;
    const res=await getJSON(endpoint,12000);
    const item=Array.isArray(res)?res[0]:res;
    if(item && item.title && item.title!=='NASA Science') return item;
  }catch{}

  // 2. Tartalék: klasszikus api.nasa.gov végpont
  try{
    const legacyUrl=`https://api.nasa.gov/planetary/apod?thumbs=true&api_key=${APKEY}`+(random?`&date=${iso}`:'');
    const item=await getJSON(legacyUrl,12000);
    if(item && item.title && item.title!=='NASA Science') return item;
  }catch{}

  return null;
}

async function apod(random){
  if(apBusy)return;
  setBusy(true);
  $('#apst').textContent=random?'Véletlen nap keresése…':'Mai kép lekérése…';
  let d=null;

  for(let i=0;i<3&&!d;i++){
    d=await fetchApodData(random);
  }

  if(!d){
    $('#apst').textContent='A NASA szervere most nem válaszol. Próbáld újra pár másodperc múlva.';
    setBusy(false);
    return;
  }

  $('#aptitle').textContent=(d.title||'NASA APOD')+(d.date?' ('+d.date+')':'');
  const cleanDesc=cleanExplanation(d.explanation);
  $('#apdesc').textContent=cleanDesc.length>420?cleanDesc.slice(0,420)+'…':cleanDesc;

  const urls=d.media_type==='image'
    ? [d.hdurl,d.url].filter(u=>u && !u.includes('nasa-logo'))
    : [d.thumbnail_url,d.hdurl].filter(Boolean);

  $('#apst').textContent='Kép betöltése…';
  showImg(urls,d.title||'NASA APOD',ok=>{
    const link=d.permalink||d.url;
    if(!ok && link){
      $('#apimg').innerHTML=`<a class="btn" href="${link}" target="_blank" rel="noopener">${d.media_type==='image'?'Kép':'Videó'} megnyitása új lapon</a>`;
    }
    $('#apst').textContent=ok?('Kész'+(d.date?': '+d.date:'')):'';
    setBusy(false);
  });
}

$('#apnew').onclick=()=>apod(true);
$('#aptoday').onclick=()=>apod(false);
apod(false);

const topBtn=$('#top');
addEventListener('scroll',()=>topBtn.classList.toggle('show',scrollY>500));
topBtn.onclick=e=>{e.stopPropagation();scrollTo({top:0,behavior:'smooth'})};