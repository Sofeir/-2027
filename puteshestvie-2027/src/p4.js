const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const MON=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
const addDays=(iso,n)=>{const d=new Date(iso+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+n);return d};
const dm=d=>d.getUTCDate()+" "+MON[d.getUTCMonth()];
const range=(iso,n)=>{const a=addDays(iso,0),b=addDays(iso,n);return a.getUTCMonth()==b.getUTCMonth()?a.getUTCDate()+"–"+dm(b):dm(a)+" – "+dm(b)};
const nf=new Intl.NumberFormat("ru-RU");
const ils=v=>nf.format(Math.round(v/10)*10)+" ₪";
const usd=v=>"$"+nf.format(Math.round(v));
const gmap=q=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q);
const gimg=q=>"https://www.google.com/search?tbm=isch&q="+encodeURIComponent(q);
const stageOf=id=>ST.find(x=>x.id===id);
function toast(t){const e=$("#toast");e.textContent=t;e.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>e.hidden=true,3500)}
/* ---------- рисованные картинки ---------- */
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rnd(seed){let a=hash(seed);return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^a>>>15,1|a);t=(t+Math.imul(t^t>>>7,61|t))^t;return((t^t>>>14)>>>0)/4294967296}}
const SK={mountain:["#16294d","#f4a261","#ffe8b8"],volcano:["#2a1b3d","#ff8a5b","#ffd29a"],salar:["#6fb0e6","#f4f1e8","#fff7d6"],coast:["#2b6ea6","#f9c784","#fff0c4"],road:["#4a76a8","#f7c59f","#fff1c9"],forest:["#1d4e3a","#a8d5a2","#e9f5c9"],canyon:["#b8512e","#f6c28b","#fff0cf"],lake:["#2b4c7e","#bfe3ee","#fff3d3"],falls:["#2f6b4f","#b7e2c6","#ffffff"],city:["#243b6b","#f08a5d","#ffd8a8"],spa:["#0e1d3a","#3a4f8a","#d9e4ff"],night:["#140d2b","#4a1d5c","#ff4d8d"],ruins:["#4c6a9a","#f1b977","#fff0c8"],island:["#1b6ca8","#9be0e8","#fff6c9"],vineyard:["#3b6aa5","#f4c57e","#fff0c2"]};
function ridge(r,base,amp,n,fill,snow){let pts=[];for(let i=0;i<=n;i++)pts.push([i*400/n,base-r()*amp]);let d="M0 240 L"+pts.map(p=>p[0].toFixed(0)+" "+p[1].toFixed(0)).join(" L")+" L400 240Z";let o=`<path d="${d}" fill="${fill}"/>`;if(snow){pts.slice().sort((a,b)=>a[1]-b[1]).slice(0,3).forEach(p=>{o+=`<path d="M${p[0]-13} ${p[1]+15} L${p[0]} ${p[1]} L${p[0]+13} ${p[1]+15}Z" fill="#fff" opacity=".85"/>`})}return o}
const BODY={
mountain:(r)=>ridge(r,150,80,9,"#4d6a9c",1)+ridge(r,180,60,8,"#34507f")+ridge(r,212,45,7,"#1f3556"),
volcano:(r)=>`<path d="M200 62 L330 214 L70 214Z" fill="#4a3358"/><path d="M200 62 L228 130 L172 130Z" fill="#6b4a7a"/><ellipse cx="204" cy="48" rx="26" ry="12" fill="#fff" opacity=".35"/><ellipse cx="218" cy="30" rx="30" ry="12" fill="#fff" opacity=".22"/>`+ridge(r,205,30,10,"#22152c"),
salar:(r)=>ridge(r,130,24,16,"#8a7aa0")+`<rect y="130" width="400" height="110" fill="#f7f5ee"/><rect y="130" width="400" height="60" fill="#8cc3ee" opacity=".35"/>`+[...Array(9)].map((_,i)=>`<path d="M200 130 L${-120+i*80} 240" stroke="#c9c6bb" stroke-width="1.4" fill="none"/>`).join("")+[...Array(5)].map((_,i)=>`<path d="M0 ${150+i*i*6+i*8} H400" stroke="#d6d3c8" stroke-width="1" fill="none"/>`).join(""),
coast:(r)=>`<rect y="140" width="400" height="100" fill="#1d6fa8"/>`+[...Array(7)].map((_,i)=>`<path d="M0 ${150+i*13} q25 -7 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke="#d8f0fa" stroke-width="2" fill="none" opacity=".55"/>`).join("")+`<path d="M0 240 L0 120 Q40 112 90 150 L120 240Z" fill="#6b4b36"/><path d="M0 240 L0 160 Q40 150 70 190 L90 240Z" fill="#4e3626"/>`,
road:(r)=>ridge(r,125,50,9,"#5f7fa8")+`<rect y="140" width="170" height="100" fill="#2f74aa" opacity=".8"/><path d="M185 130 L215 130 L360 240 L40 240Z" fill="#3b3f48"/><path d="M200 132 V240" stroke="#f5e27a" stroke-width="3" stroke-dasharray="10 12"/><path d="M0 240 L0 150 Q60 140 120 190 L150 240Z" fill="#5f7a3e"/>`,
forest:(r)=>{let o=ridge(r,150,40,8,"#3c7c5a");for(let l=0;l<3;l++){for(let i=0;i<14;i++){const x=r()*420-10,h=60+r()*60+l*14,y=235-l*18;o+=`<path d="M${x} ${y} L${x-17-l*3} ${y} L${x} ${y-h} L${x+17+l*3} ${y}Z" fill="${["#2e6d4a","#235a3d","#17402c"][l]}"/>`}}return o},
canyon:(r)=>{const cols=["#d0764a","#b8512e","#9c3d24","#7c2c1a"];let o="";cols.forEach((c,i)=>{let d="M0 240 L0 "+(110+i*35),x=0;while(x<400){x+=20+r()*40;d+=` L${x.toFixed(0)} ${(110+i*35-r()*28).toFixed(0)} L${(x+10).toFixed(0)} ${(110+i*35-r()*28).toFixed(0)}`}o+=`<path d="${d} L400 240Z" fill="${c}"/>`});return o},
lake:(r)=>{const g=ridge(r,115,70,9,"#3f5f93",1);return g+`<rect y="130" width="400" height="110" fill="#2a5f86"/><g transform="translate(0 260) scale(1 -1)" opacity=".45">${ridge(r,115,70,9,"#3f5f93")}</g><rect y="130" width="400" height="110" fill="#3b79a3" opacity=".35"/>`+ridge(r,235,20,12,"#2c4a3a")},
falls:(r)=>`<path d="M0 240 V30 Q70 40 120 100 V240Z" fill="#285a41"/><path d="M400 240 V20 Q330 40 290 100 V240Z" fill="#285a41"/><rect x="150" y="30" width="100" height="160" fill="#eaf6f3" opacity=".95"/>`+[...Array(7)].map((_,i)=>`<rect x="${156+i*14}" y="30" width="5" height="160" fill="#fff" opacity="${.5+r()*.5}"/>`).join("")+`<ellipse cx="200" cy="195" rx="85" ry="22" fill="#fff" opacity=".7"/><path d="M0 240 V210 Q120 190 200 215 Q300 190 400 210 V240Z" fill="#1b4a35"/>`,
city:(r)=>{let o="";for(let l=0;l<2;l++){let x=-5;while(x<400){const w=22+r()*30,h=50+r()*(l?70:100);o+=`<rect x="${x}" y="${240-h}" width="${w}" height="${h}" fill="${l?"#2b3a63":"#1a2542"}"/>`;if(l==1){for(let k=0;k<6;k++)o+=`<rect x="${x+4+(k%3)*8}" y="${240-h+8+Math.floor(k/3)*14}" width="4" height="6" fill="#ffd877" opacity=".85"/>`}x+=w+2}}return o},
spa:(r)=>[...Array(40)].map(()=>`<circle cx="${r()*400}" cy="${r()*110}" r="${.5+r()*1.2}" fill="#fff" opacity=".8"/>`).join("")+ridge(r,150,50,8,"#111f3d")+`<ellipse cx="200" cy="205" rx="150" ry="28" fill="#3fb6c9"/><ellipse cx="200" cy="200" rx="150" ry="24" fill="#74d6e2" opacity=".6"/>`+[...Array(6)].map((_,i)=>`<circle cx="${110+i*36+r()*10}" cy="${160-r()*20}" r="${18+r()*14}" fill="#fff" opacity=".16"/>`).join(""),
night:(r)=>[...Array(22)].map(()=>`<circle cx="${r()*400}" cy="${30+r()*150}" r="${8+r()*26}" fill="${["#ff4d8d","#59d1ff","#ffbd3d","#9b6bff"][Math.floor(r()*4)]}" opacity="${.18+r()*.3}"/>`).join("")+`<rect y="188" width="400" height="52" fill="#0b0719"/><rect y="186" width="400" height="5" fill="#ff4d8d" opacity=".8"/>`+[...Array(5)].map((_,i)=>`<path d="M${60+i*74} 186 l9 -26 h14 l9 26Z" fill="#ffffff" opacity=".35"/>`).join(""),
ruins:(r)=>ridge(r,95,60,7,"#587a54")+ridge(r,140,30,8,"#6f9462")+[...Array(6)].map((_,i)=>`<path d="M${30+i*18} ${215-i*12} H${370-i*18} V${203-i*12} H${30+i*18}Z" fill="${i%2?"#7ea36d":"#8bb078"}"/>`).join("")+`<rect x="150" y="150" width="30" height="16" fill="#b9ad98"/><rect x="215" y="140" width="24" height="14" fill="#b9ad98"/>`,
island:(r)=>`<rect y="150" width="400" height="90" fill="#1a8cb5"/><path d="M80 170 Q120 100 170 150 Q205 90 260 155 Q300 130 330 170Z" fill="#355a3a"/><path d="M40 240 V210 Q200 190 360 210 V240Z" fill="#e8d9a8"/>`+[...Array(3)].map(()=>`<path d="M${60+r()*280} ${40+r()*40} q6 -7 12 0 q6 -7 12 0" stroke="#fff" stroke-width="2" fill="none"/>`).join(""),
vineyard:(r)=>ridge(r,120,50,8,"#6c8fbf")+`<path d="M0 135 H400 V240 H0Z" fill="#8fae52"/>`+[...Array(12)].map((_,i)=>`<path d="M200 135 L${-300+i*90} 240" stroke="#4d6b2c" stroke-width="3" fill="none"/>`).join("")
};
function art(kind,seed){const r=rnd(kind+seed),c=SK[kind]||SK.mountain,id="g"+hash(seed+kind);const dark=kind==="spa"||kind==="night";
 let s=`<svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(seed)}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs><rect width="400" height="240" fill="url(#${id})"/>`;
 if(!dark)s+=`<circle cx="${(60+r()*280).toFixed(0)}" cy="${(36+r()*40).toFixed(0)}" r="${(15+r()*10).toFixed(0)}" fill="${c[2]}" opacity=".92"/>`;
 return s+(BODY[kind]||BODY.mountain)(r)+"</svg>"}
const unsp=p=>p.w?"https://commons.wikimedia.org/wiki/"+encodeURI(p.i.replace(/ /g,"_")):"https://unsplash.com/@"+p.u+"?utm_source=puteshestvie_2027&utm_medium=referral";
const pcr=p=>p.w?p.n+", "+p.l+" / Wikimedia Commons":p.n+" / Unsplash";
function pic(key,kind,seed,bare){const p=typeof PIC!=="undefined"&&PIC[key];if(!p)return art(kind,seed);return `<img src="${p.s}" alt="${esc(seed)}" loading="lazy">`+(bare?"":`<a class="cr" href="${unsp(p)}" target="_blank" rel="noopener">${esc(pcr(p))}</a>`)}
function credit(key){const p=typeof PIC!=="undefined"&&PIC[key];return p?`<a class="mute cr2" href="${unsp(p)}" target="_blank" rel="noopener">Фото: ${esc(pcr(p))}</a>`:""}
/* ---------- состояние: общее через db, запасное в браузере ---------- */
const S={checks:{},actuals:{},opts:{sc:"e",pe:true,rate:RATE0},db:null};
const LS={get(k){try{return JSON.parse(localStorage.getItem("tr27_"+k)||"null")}catch(e){return null}},set(k,v){try{localStorage.setItem("tr27_"+k,JSON.stringify(v))}catch(e){}}};
Object.assign(S.checks,LS.get("checks")||{});Object.assign(S.actuals,LS.get("actuals")||{});Object.assign(S.opts,LS.get("opts")||{});
const chain={};
function save(name,key,val){LS.set(name,S[name]);if(!S.db)return;
 chain[name]=(chain[name]||Promise.resolve()).then(async()=>{const ref=S.db.doc("trip/"+name);try{await ref.update({m:{[key]:val}})}catch(e){try{await ref.set({m:{[key]:val}})}catch(e2){toast("Общее сохранение недоступно, записано на этом устройстве")}}})}
async function initDb(){try{const db=await window.claude?.use?.("db");if(!db)return;S.db=db;
 for(const name of ["checks","actuals","opts"]){db.doc("trip/"+name).onSnapshot(s=>{if(!s.exists)return;const m=s.data().m||{};Object.assign(S[name],m);LS.set(name,S[name]);if(name==="checks"){updateHikes();updatePack()}else if(!document.activeElement||!document.activeElement.closest("#t-budget input"))renderBudget()},()=>{})}
 subPhotos(db)}catch(e){}}
/* ---------- шапка ---------- */
function header(){
 const days=Math.ceil((new Date("2027-05-20T00:00:00")-new Date())/864e5);$("#count").textContent=days>0?"до вылета "+days+" дн.":"в пути";
 const tot=ST.reduce((a,x)=>a+x.n,0);
 $("#strip").innerHTML=ST.map(x=>`<button class="seg${x.free?" free":""}" type="button" style="flex:${x.n} 1 0;background:${x.free?"":CC[x.c][1]}" data-go="${x.id}" title="${esc(x.name)}, ${range(x.from,x.n)}"><b>${x.short}</b><span>${x.n} н</span></button>`).join("");
 $("#strip").onclick=e=>{const b=e.target.closest("[data-go]");if(!b)return;go("route");const el=$("#st-"+b.dataset.go);if(el)el.scrollIntoView({behavior:"smooth",block:"center"})};
 $("#legend").innerHTML=Object.entries(CC).filter(([k])=>k!=="am").map(([k,v])=>`<span><i class="dot" style="background:${v[1]}"></i>${v[0]}</span>`).join("")+`<span class="mono">${tot} дн. до 22 августа</span>`;
}
const TABS=[["route","Маршрут"],["places","Места"],["hikes","Походы"],["budget","Бюджет"],["hotels","Отели"],["flights","Перелёты"],["pack","Вещи"],["near","Рядом"],["photos","Альбом"]];
function go(id){TABS.forEach(([k])=>{$("#t-"+k).hidden=k!==id});document.querySelectorAll("#tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.t===id));try{history.replaceState(null,"","#"+id)}catch(e){}scrollTo(0,0);LS.set("tab",id)}
function tabs(){$("#tabs").innerHTML=TABS.map(([k,v])=>`<button role="tab" type="button" data-t="${k}" aria-selected="false">${v}</button>`).join("");$("#tabs").onclick=e=>{const b=e.target.closest("button");if(b)go(b.dataset.t)}}
/* ---------- маршрут ---------- */
function stagePlan(x){
 const DM={"января":0,"февраля":1,"марта":2,"апреля":3,"мая":4,"июня":5,"июля":6,"августа":7};
 const a=addDays(x.from,0),b=addDays(x.from,x.n);
 const legs=FL.filter(f=>{const m=String(f[0]).match(/^(\d+)(?:–\d+)? ([а-я]+)/);if(!m)return x.id==="gl"?f[0]==="в течение пребывания":x.id==="back"&&f[0]==="после 22 августа";const d=new Date(Date.UTC(2027,DM[m[2]],+m[1],12));return d>=a&&d<=b&&!(d.getTime()===b.getTime()&&x.id==="la")});
 const ps=P.filter(p=>["la","road","sv"].includes(x.id)?p[1]===x.id:p[0]===x.c&&x.id!=="back");
 if(!legs.length&&!ps.length)return "";
 const cities=groupCity(ps);
 return `<details class="plan"><summary>План по шагам</summary>${legs.length?`<h4>Как добраться</h4><ol class="legs">${legs.map(f=>`<li><b>${esc(f[0])}</b> <span>${esc(f[1])}</span><div class="mute">${esc(f[2])}${f[3]?" · "+esc(f[3]):""}</div>${f[6]?`<div class="note">${esc(f[6])}</div>`:""}</li>`).join("")}</ol>`:""}${cities.length?`<h4>Что делать</h4>${cities.map(([c,l],i)=>`<h5 class="stp"><span>Шаг ${i+1}.</span> <span>${esc(c)}</span></h5><ol class="pl">${l.map(p=>`<li><b>${esc(p[4])}</b><div>${esc(p[5])}</div><div class="mute">${esc(p[6])}</div></li>`).join("")}</ol>`).join("")}`:""}</details>`}
function renderRoute(){
 const deadlines=[["как только откроются продажи, обычно в начале года","Билеты на Мачу-Пикчу и поезд до Агуас-Кальентес"],["февраль — март","Перелёты Тель-Авив — Лос-Анджелес, Сан-Франциско — Буэнос-Айрес, Кито — Ереван; отели в Биг-Суре на 29–31 мая; прививки"],["апрель","Universal Studios, Алькатрас, Йосемити, парковка Muir Woods"],["апрель — май","Тур Туписа — Уюни, ночь в соляном отеле, Galápagos: билеты Кито — острова"],["за 3–4 недели","Столик в Don Julio, милонга, концерты в Сальте, термы Папальтачта"],["за месяц","Страховка, проверка границы в Вильясоне, сборы и форма Галапагосов (48–72 часа до рейса)"]];
 $("#t-route").innerHTML=`<div><h2>Маршрут</h2><p class="lead">94 дня: 20 мая — 22 августа. Лос-Анджелес три дня (два дня Universal и один на прогулки), потом неделя по побережью до Сан-Франциско и две недели у тёти. Три перелёта через океан и один через континент, остальное по земле. Перу вставлено в свободные 12 дней между Боливией и Эквадором, его можно отключить на вкладке «Бюджет».</p></div>`+
 ST.map(x=>{const cnt=P.filter(p=>p[0]===x.c&&(x.id==="back"?false:true)&&(x.c!=="ar"&&x.c!=="us"?true:(x.c==="us"?p[1]===x.id:true))).length;
 const cn=x.id==="back"?0:cnt;
 return `<div class="stage" id="st-${x.id}" style="--c:${CC[x.c][1]}"><div class="row"><h3>${esc(x.name)}</h3><span class="pill">${range(x.from,x.n)} · ${x.n} ${x.free?"дн.":"ноч."}</span></div><p>${esc(x.sum)}</p>${stagePlan(x)}${cn?`<div><button class="btn" type="button" data-pl="${x.id}">Места этапа (${cn})</button></div>`:""}</div>`}).join("")+
 `<div><h2>Когда что бронировать</h2></div><div class="tw"><table><thead><tr><th>Срок</th><th>Что</th></tr></thead><tbody>${deadlines.map(d=>`<tr><td>${d[0]}</td><td>${d[1]}</td></tr>`).join("")}</tbody></table></div>`;
 $("#t-route").onclick=e=>{const b=e.target.closest("[data-pl]");if(!b)return;const x=stageOf(b.dataset.pl);PF.c=x.c;PF.st=(x.c==="us"?x.id:"");PF.t="";renderPlaces();go("places")}
}
const OFF={"Universal Studios Hollywood":"https://www.universalstudioshollywood.com","Getty Center Los Angeles":"https://www.getty.edu/visit/center/","Alcatraz Island":"https://www.alcatrazcruises.com","Monterey Bay Aquarium":"https://www.montereybayaquarium.org","Muir Woods National Monument":"https://www.nps.gov/muwo","Yosemite National Park":"https://www.nps.gov/yose","Point Lobos State Natural Reserve":"https://pointlobos.org","Machu Picchu":"https://www.machupicchu.gob.pe","Garganta del Diablo Iguazu":"https://www.iguazuargentina.com","Gran Aventura Iguazu":"https://www.iguazuargentina.com","Mi Teleférico La Paz":"https://www.miteleferico.bo","TelefériQo Quito":"https://www.teleferico.com.ec","Parrilla Don Julio":"https://www.parrilladonjulio.com"};
const tktUrl=q=>OFF[q]||"https://www.google.com/search?q="+encodeURIComponent(q+" tickets prices official site");
const tkt=p=>/[₪$]/.test(p[6])?`<a class="btn" href="${tktUrl(p[8])}" target="_blank" rel="noopener">Билеты</a>`:"";
function cardHtml(p){const [c,st,city,ty,name,desc,cost,kind,q]=p;return `<article class="card"><div class="art">${pic(name,kind,name)}</div><div class="body"><div class="meta"><span class="cc" style="background:${CC[c][1]}">${CC[c][0]}</span>${ty.split("").map(t=>`<span class="pill">${TYPES[t]}</span>`).join("")}</div><h3>${esc(name)}</h3><div class="mute" style="font-size:13px">${esc(city)}</div><p class="d">${esc(desc)}</p><div class="cost">${esc(cost)}</div><div class="links"><a class="btn" href="${gimg(q)}" target="_blank" rel="noopener">Фото</a><a class="btn" href="${gmap(q)}" target="_blank" rel="noopener">Карта</a>${tkt(p)}</div></div></article>`}
function groupCity(list){const m=new Map();list.forEach(p=>{if(!m.has(p[2]))m.set(p[2],[]);m.get(p[2]).push(p)});return [...m]}
/* ---------- места ---------- */
const PF={c:"",t:"",st:""};
function renderPlaces(){
 const list=P.filter(p=>(!PF.c||p[0]===PF.c)&&(!PF.t||p[3].includes(PF.t))&&(!PF.st||p[1]===PF.st));
 $("#t-places").innerHTML=`<div><h2>Места</h2><p class="lead">${P.length} мест: виды, природа, бани и термы, бары, еда и развлечения. Фото с Unsplash и Wikimedia Commons; где их нет, стоит стилизованный рисунок; больше снимков открывает кнопка «Фото». Цены ориентировочные в шекелях, проверяйте за месяц до поездки.</p></div>
 <p class="note">Цены ориентировочные: это оценки по открытым данным, а не прайс-лист. Актуальную цену смотрите по кнопке «Билеты» (официальный сайт, где мы его знаем, иначе поиск).</p>
 <div class="chips" id="fc">${[["","Все страны"],...Object.entries(CC).filter(([k])=>k!=="am").map(([k,v])=>[k,v[0]])].map(([k,v])=>`<button type="button" class="chip" aria-pressed="${PF.c===k}" data-c="${k}">${v}</button>`).join("")}</div>
 <div class="chips" id="ft">${[["","Любые"],...Object.entries(TYPES)].map(([k,v])=>`<button type="button" class="chip" aria-pressed="${PF.t===k}" data-t="${k}">${v}</button>`).join("")}</div>
 ${PF.st?`<div class="note">Показан этап: ${esc(stageOf(PF.st).name)}. <button class="chip" type="button" data-clr="1">Показать все</button></div>`:""}
 ${list.length?groupCity(list).map(([city,ps])=>`<h3 class="cityh"><span>${esc(city)}</span> <span class="pill">${ps.length}</span></h3><div class="grid">${ps.map(cardHtml).join("")}</div>`).join(""):'<p class="mute">Нет мест с таким сочетанием. Сбросьте один из фильтров.</p>'}`;
 $("#t-places").onclick=e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.c!==undefined&&b.closest("#fc")){PF.c=b.dataset.c;PF.st=""}else if(b.dataset.t!==undefined&&b.closest("#ft"))PF.t=b.dataset.t;else if(b.dataset.clr){PF.st=""}else return;renderPlaces()}
}
/* ---------- походы с трекером ---------- */
function renderHikes(){
 $("#t-hikes").innerHTML=`<div><h2>Походы и маршруты на день</h2><p class="lead">Десять маршрутов на целый день. Отмечайте пройденные точки: прогресс сохраняется для вас обоих, если страница открыта с правом редактирования, иначе только на этом устройстве.</p></div><div class="panel"><div class="kv" id="ov"></div><div class="bar"><i id="ovb"></i></div></div>`+
 H.map(h=>`<details class="hike" id="h-${h.id}"><summary><div class="art">${pic("h:"+h.id,h.kind,h.title,1)}</div><div class="hd"><div class="meta" style="display:flex;gap:6px;flex-wrap:wrap"><span class="cc" style="background:${CC[h.c][1]};width:max-content">${CC[h.c][0]}</span></div><h3>${esc(h.title)}</h3><div class="kv"><span>${esc(h.dist)}</span><span>${esc(h.time)}</span><span>набор ${esc(h.gain)}</span><span>${esc(h.lvl)}</span></div><div class="bar"><i data-b="${h.id}"></i></div></div></summary><div class="in"><p class="note">${esc(h.where)}. ${esc(h.note)}</p><ul class="steps">${h.steps.map((s,i)=>{const k=h.id+"_"+i;return `<li data-k="${k}"><input type="checkbox" id="c_${k}" ${S.checks[k]?"checked":""} aria-label="${esc(s[0])}"><label for="c_${k}" class="t"><b>${esc(s[0])}</b><br><span class="mute">${esc(s[1])}</span></label><span class="km">${esc(s[2])}</span></li>`}).join("")}</ul><div class="links"><a class="btn" href="${gmap(h.where+" "+h.title)}" target="_blank" rel="noopener">Карта</a><a class="btn" href="${gimg(h.title)}" target="_blank" rel="noopener">Фото</a>${credit("h:"+h.id)}</div></div></details>`).join("");
 $("#t-hikes").onchange=e=>{const i=e.target.closest("input[type=checkbox]");if(!i)return;const k=i.closest("li").dataset.k;S.checks[k]=i.checked;save("checks",k,i.checked);updateHikes()};
 updateHikes();
}
function updateHikes(){let all=0,done=0;H.forEach(h=>{let d=0;h.steps.forEach((s,i)=>{const k=h.id+"_"+i,v=!!S.checks[k];const li=document.querySelector(`li[data-k="${k}"]`);if(li){li.classList.toggle("done",v);const cb=li.querySelector("input");if(cb&&cb.checked!==v)cb.checked=v}if(v)d++});all+=h.steps.length;done+=d;const b=document.querySelector(`[data-b="${h.id}"]`);if(b)b.style.width=(100*d/h.steps.length)+"%"});const o=$("#ov");if(o){o.innerHTML=`<span>пройдено ${done} из ${all} точек</span><span>маршрутов закончено: ${H.filter(h=>h.steps.every((s,i)=>S.checks[h.id+"_"+i])).length} из ${H.length}</span>`;$("#ovb").style.width=(100*done/all)+"%"}}
/* ---------- бюджет ---------- */
function calc(){const o=S.opts,m=MULT[o.sc];const rows=B.filter(x=>!(x.flag==="pe"&&!o.pe)&&!(x.flag==="nope"&&o.pe)).map(x=>({...x,v:x.b*m[x.cat]}));
 const tot=rows.reduce((a,x)=>a+x.v,0);return {rows,tot}}
function renderBudget(){
 const o=S.opts,{rows,tot}=calc(),rate=+o.rate||RATE0,tI=tot*rate,lo=50000,hi=60000;
 const bycat={};rows.forEach(r=>bycat[r.cat]=(bycat[r.cat]||0)+r.v);
 const act=Object.values(S.actuals).reduce((a,v)=>a+(+v||0),0);
 const status=tI<=lo?"ниже вилки, остаётся запас":tI<=hi?"в вилке "+nf.format(lo)+"–"+nf.format(hi)+" ₪":"выше вилки на "+ils(tI-hi);
 const max=Math.max(hi*1.15,tI*1.05);
 let body="";const stages=Object.keys(BS);
 stages.forEach(s=>{const rs=rows.filter(r=>r.s===s);if(!rs.length)return;const sub=rs.reduce((a,r)=>a+r.v,0);
  body+=`<tr class="sub"><td>${BS[s]}</td><td class="ty"></td><td class="n">${usd(sub)}</td><td class="n">${ils(sub*rate)}</td><td class="n"></td></tr>`;
  rs.forEach(r=>body+=`<tr><td>${esc(r.l)}<div class="note">${esc(r.note||"")}</div></td><td class="ty"><span class="pill">${BC[r.cat]}</span></td><td class="n">${usd(r.v)}</td><td class="n">${ils(r.v*rate)}</td><td class="n"><input type="number" min="0" step="10" data-a="${r.id}" aria-label="Факт, ₪, ${esc(r.l)}" value="${S.actuals[r.id]??""}" placeholder="—"></td></tr>`)});
const stageSum=Object.keys(BS).map(s=>({s,n:BS[s],v:rows.filter(r=>r.s===s).reduce((a,r)=>a+r.v,0)})).filter(x=>x.v>0);
 const topv=Math.max(...stageSum.map(x=>x.v));
 const where=`<div class="panel"><h3 style="margin:0">Куда уходят деньги</h3><div class="mute" style="font-size:13px">По этапам и по статьям. Перелёты выделены отдельно, внутри этапов только то, что тратится на месте.</div>${stageSum.map(x=>`<div class="wrow"><span>${esc(x.n)}</span><div class="bar"><i style="width:${x.v/topv*100}%;background:${x.s==="fl"?BCC.fl:"var(--ok)"}"></i></div><b>${ils(x.v*rate)}</b><span class="mute">${Math.round(x.v/tot*100)}%</span></div>`).join("")}</div>`;
 const hint=tI>hi?`<div class="tip">Базовый сценарий выходит выше вилки на ${ils(tI-hi)} из-за свежих цен на перелёты. Чтобы уложиться в 60 000 ₪: выберите «Экономно» (жильё и еда на ступень дешевле), отключите Перу или возьмите билеты на межконтинентальные рейсы за 4–6 месяцев по акциям.</div>`:"";
 const peNote=o.pe?"":`<div class="tip">Перу выключено: свободны 12 дней. Добавьте их к времени у тёти или в Аргентине, например Патагонию, и следите за прилётом в Кито 20 июля.</div>`;
 $("#t-budget").innerHTML=`<div><h2>Бюджет на двоих</h2><p class="lead">Ваш ориентир — 50–60 тысяч ₪ на всё. Курс ${rate.toString().replace(".",",")} ₪ за доллар (на 18 октября 2026), его можно поменять. Все суммы — за двоих, оценки из открытых источников и моего опыта, не предложение авиакомпаний.</p></div>
 <div class="panel"><div class="controls"><label>Сценарий <select id="sc"><option value="e"${o.sc==="e"?" selected":""}>Экономно</option><option value="b"${o.sc==="b"?" selected":""}>Базовый</option><option value="c"${o.sc==="c"?" selected":""}>Комфортно</option></select></label><label><input type="checkbox" id="pe"${o.pe?" checked":""}> Перу</label><label>Курс <input type="number" id="rate" step="0.01" min="2" max="6" value="${rate}" style="width:90px"></label></div>
 <div><div class="big">${ils(tI)}</div><div class="mute" style="margin-top:6px">${status}. В среднем ${ils(tI/94)} в день, около ${usd(tot/94)}.</div></div>
 <div><div class="band"><div class="ok" style="left:${lo/max*100}%;width:${(hi-lo)/max*100}%"></div><div class="val" style="width:${Math.min(100,tI/max*100)}%"></div></div><div class="bandlbl"><span>0</span><span>${nf.format(lo)}</span><span>${nf.format(hi)} ₪</span></div></div>
 <div><div class="stack">${Object.entries(bycat).map(([k,v])=>`<i style="width:${v/tot*100}%;background:${BCC[k]}" title="${BC[k]}"></i>`).join("")}</div><div class="sw" style="margin-top:8px">${Object.entries(bycat).map(([k,v])=>`<span><i class="dot" style="background:${BCC[k]}"></i>${BC[k]} ${ils(v*rate)} (${Math.round(v/tot*100)}%)</span>`).join("")}</div></div></div>${hint}${peNote}${where}
 <div class="tw"><table><thead><tr><th>Статья</th><th class="ty">Тип</th><th class="n">$</th><th class="n">₪</th><th class="n">Факт, ₪</th></tr></thead><tbody>${body}<tr class="sub"><td>Итого</td><td class="ty"></td><td class="n">${usd(tot)}</td><td class="n">${ils(tI)}</td><td class="n">${act?ils(act):"—"}</td></tr></tbody></table></div>
 <div class="two"><div class="tip"><b>Где сэкономить.</b> Вылетайте в будни и покупайте билеты за 4–6 месяцев. Берите обед дня за $3–5 в Боливии, Перу и Эквадоре. Туры на Галапагосах бронируйте на месте у местных гидов, семья подскажет. Если Universal хватит одного дня, это экономит около 350 ₪.</div><div class="tip"><b>Где не экономить.</b> Страховка с покрытием высоты и эвакуации, жильё в Биг-Суре на выходные Memorial Day и запас по времени на 22 августа. Сбой пересадки в Эквадоре — дороже любой скидки.</div></div>
 <p class="note">В колонке «Факт» записывайте реальные траты по статьям, итоги сохраняются у вас. Цены на авиабилеты, отели и входные билеты меняются, особенно на Мачу-Пикчу и в Биг-Суре.</p>`;
 $("#sc").onchange=e=>{S.opts.sc=e.target.value;save("opts","sc",S.opts.sc);renderBudget()};
 $("#pe").onchange=e=>{S.opts.pe=e.target.checked;save("opts","pe",S.opts.pe);renderBudget()};
 $("#rate").onchange=e=>{S.opts.rate=+e.target.value||RATE0;save("opts","rate",S.opts.rate);renderBudget()};
 $("#t-budget").onchange=e=>{const i=e.target.closest("[data-a]");if(!i)return;const v=i.value===""?null:+i.value;S.actuals[i.dataset.a]=v;save("actuals",i.dataset.a,v);renderBudget()};
}
/* ---------- отели ---------- */
function renderHotels(){const rate=+S.opts.rate||RATE0;
 $("#t-hotels").innerHTML=`<div><h2>Отели и жильё</h2><p class="lead">Цены за ночь для двоих. Названия — примеры из знакомых мест, сверяйте наличие и цену на Booking, Airbnb и Google Hotels: отели закрываются, цены сезонные. Дома у тёти и у семьи на Галапагосах бесплатно.</p></div>`+
 HT.map(h=>{const x=stageOf(h.s);return `<div class="stage" style="--c:${CC[x.c][1]}"><div class="row"><h3>${esc(x.name)}</h3><span class="pill">${h.n} ноч.</span></div><p class="mute">${esc(h.w)}</p><div class="tw"><table><thead><tr><th>Вариант</th><th>Тип</th><th class="n">$ за ночь</th><th class="n">₪ за ночь</th></tr></thead><tbody>${h.o.map(o=>`<tr><td>${esc(o[0])}</td><td><span class="pill">${o[1]}</span></td><td class="n">${o[3]?o[2]+"–"+o[3]:"—"}</td><td class="n">${o[3]?nf.format(Math.round(o[2]*rate/10)*10)+"–"+nf.format(Math.round(o[3]*rate/10)*10):"—"}</td></tr>`).join("")}</tbody></table></div></div>`}).join("")+`<div class="tip"><b>Совет.</b> Бесплатная отмена на всё, где можно: из-за блокад в Боливии и погодных закрытий дорог в Биг-Суре и Йосемити планы иногда меняются. Тёплая одежда нужна даже в хостелах высокогорья: отопления там часто нет.</div>`}
/* ---------- перелёты ---------- */
function renderFlights(){const rate=+S.opts.rate||RATE0;let lo=0,hi=0;FL.forEach(f=>{if(f[7]){lo+=f[4]*2;hi+=f[5]*2}});
 const fb=calc().rows.filter(r=>r.cat==="fl").reduce((a,r)=>a+r.v,0);
 $("#t-flights").innerHTML=`<div><h2>Перелёты и переезды</h2><p class="lead">Вылет из Тель-Авива. Цены за одного человека в долларах с одним чемоданом 23 кг и ручной кладью, справа за двоих в шекелях. Это диапазоны по агрегаторам (Expedia, Kayak, Skyscanner, Travelocity): они показывают цены, найденные пользователями в последние дни, в основном на осенние даты. На май–август 2027 живых цен пока мало, а июль–август дороже. Перед покупкой смотрите Google Flights и сайты авиакомпаний.</p></div>
 ${FL.map(f=>{const pr=f[5]?`<div class="fp"><b>$${f[4]}–${f[5]}</b> с человека <span class="mute">·</span> <b>${nf.format(Math.round(f[4]*2*rate/10)*10)}–${nf.format(Math.round(f[5]*2*rate/10)*10)} ₪</b> на двоих</div>`:"";return `<div class="stage" style="--c:${f[7]?"var(--accent)":"var(--line)"}"><div class="row"><h3>${esc(f[1])}</h3><span class="pill">${esc(f[0])}</span></div><div class="kv"><span>${esc(f[2])}</span><span>${esc(f[3])}</span></div>${pr}${f[6]?`<p class="note">${esc(f[6])}</p>`:""}${f[5]?`<div class="links" style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn" href="https://www.google.com/travel/flights?q=${encodeURIComponent("Flights "+f[1]+" "+f[0]+" 2027")}" target="_blank" rel="noopener">Найти билеты</a></div>`:""}</div>`}).join("")}
 <div class="panel"><b>Итого в строках «Перелёты» бюджета, на двоих: ${ils(lo*rate)} – ${ils(hi*rate)}</b><div class="mute" style="font-size:13px">Вместе с автобусами Перу. Серым выделены переезды, которые уже входят в другие статьи.</div></div>
 <div class="tip">В базовом сценарии на перелёты заложено около ${ils(fb*rate)} за двоих, то есть середина диапазона. Билеты через океан ищите за 4–6 месяцев, внутренние в Аргентине и Эквадоре берите, когда уточните даты. Строки без цены включены в другие статьи: автобусы Боливии, поезд до Мачу-Пикчу, аренда машины.</div>
 <div class="tip"><b>Багаж.</b> В расчёте один чемодан 23 кг на каждого. EL AL на тарифе Light его не включает, добавить стоит около $105. У Flybondi и JetSMART багаж всегда отдельно, у Aerolíneas на промо-тарифе только ручная кладь, и чемодан в Аргентине лимитирован 15 кг. На Галапагосы и обратно 23 кг плюс ручная кладь 8 кг. Если возьмёте один чемодан на двоих, перелёты станут заметно дешевле.</div>
 <div><h2>Визы и документы</h2><p class="lead">Вы с израильским паспортом, у Пелега израильский, эквадорский и статус жителя Галапагосов. Ориентиры по открытым источникам, перед поездкой проверьте на сайтах МИД.</p></div>
 ${VISA.map(v=>`<div class="stage" style="--c:var(--accent)"><div class="row"><h3>${esc(v[0])}</h3></div><p><b>Вы:</b> ${esc(v[1])}</p><p><b>Пелег:</b> ${esc(v[2])}</p><p class="note">${esc(v[3])}</p></div>`).join("")}
 <div class="tip">Паспорта должны действовать не меньше 6 месяцев после последнего въезда. Для сухопутной границы Боливия — Перу нужны штампы в паспортах.</div>`}
/* ---------- вещи ---------- */
function renderPack(){
 let n=0;
 $("#t-pack").innerHTML=`<div><h2>Вещи по погоде</h2><p class="lead">Погода по этапам и список, что взять. Температуры — типичные для этих дат ориентиры, не прогноз: смотрите прогноз за неделю. Отмечайте собранное галочками, прогресс сохраняется.</p></div>
 <div class="panel"><div class="kv" id="pov"></div><div class="bar"><i id="povb"></i></div></div>
 ${WX.map(w=>`<div class="stage" style="--c:var(--accent)"><div class="row"><h3>${esc(w[0])}</h3><span class="pill">${esc(w[1])}</span></div><div class="kv"><span>днём ${esc(w[2])}</span><span>ночью ${esc(w[3])}</span></div><p>${esc(w[4])}</p><p class="note"><b>Надеть:</b> ${esc(w[5])}</p></div>`).join("")}
 ${PKTIPS.map(t=>`<div class="tip">${esc(t)}</div>`).join("")}
 ${PK.map(g=>`<details class="hike" open><summary><div class="hd"><h3>${esc(g.t)}</h3><div class="note">${esc(g.d)}</div></div></summary><div class="in"><ul class="steps">${g.i.map(x=>{const k="pk_"+(n++);return `<li data-k="${k}"><input type="checkbox" id="c_${k}" ${S.checks[k]?"checked":""} aria-label="${esc(x)}"><label for="c_${k}" class="t">${esc(x)}</label><span></span></li>`}).join("")}</ul></div></details>`).join("")}`;
 $("#t-pack").onchange=e=>{const i=e.target.closest("input[type=checkbox]");if(!i)return;const k=i.closest("li").dataset.k;S.checks[k]=i.checked;save("checks",k,i.checked);updatePack()};
 updatePack();
}
function updatePack(){let all=0,done=0;document.querySelectorAll("#t-pack li[data-k]").forEach(li=>{const v=!!S.checks[li.dataset.k];li.classList.toggle("done",v);const cb=li.querySelector("input");if(cb&&cb.checked!==v)cb.checked=v;all++;if(v)done++});const o=$("#pov");if(o){o.innerHTML=`<span>собрано ${done} из ${all}</span>`;$("#povb").style.width=(all?100*done/all:0)+"%"}}
/* ---------- рядом ---------- */
function renderNear(){$("#t-near").innerHTML=`<div><h2>Что ещё есть рядом</h2><p class="lead">Идеи, которые можно вставить в дни запаса или заменить ими другие точки. Время считается от города, указанного в строке.</p></div>`+
 NR.map(n=>{const x=stageOf(n.s);return `<div class="stage" style="--c:${CC[x.c][1]}"><div class="row"><h3>${esc(n.t)}</h3></div><div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(230px,1fr))">${n.i.map(i=>`<div class="panel" style="padding:12px;gap:4px"><b>${esc(i[0])}</b><span class="pill" style="width:max-content">${esc(i[1])}</span><p style="font-size:14px">${esc(i[2])}</p><a class="btn" style="width:max-content;margin-top:4px" href="${gmap(i[0])}" target="_blank" rel="noopener">Карта</a></div>`).join("")}</div></div>`}).join("")}
/* ---------- альбом ---------- */
let AS=null;
function renderPhotos(){
 $("#t-photos").innerHTML=`<div><h2>Альбом поездки</h2><p class="lead">Загружайте сюда свои фото во время поездки. Они появятся у всех, кто открыл страницу. Загрузка доступна владельцу и редакторам страницы.</p></div><div class="panel" id="up"><div class="controls"><input type="file" id="pf" accept="image/*" multiple><select id="ps"><option value="">Этап</option>${ST.filter(x=>!x.free).map(x=>`<option>${esc(x.name)}</option>`).join("")}</select><input type="text" id="pc" placeholder="Подпись" style="min-width:160px"><button class="btn p" type="button" id="pu">Загрузить</button></div><div class="note" id="pm"></div></div><div class="photos" id="pg"><p class="mute">Пока нет ни одной фотографии. После первой загрузки здесь появится сетка.</p></div>`;
 const up=$("#up");
 (async()=>{try{AS=await window.claude?.use?.("assets")}catch(e){}if(!AS||!S.db){$("#pm").textContent="Загрузка сейчас недоступна: откройте страницу владельцем или редактором.";$("#pu").disabled=true;$("#pf").disabled=true}})();
 $("#pu").onclick=async()=>{const fs=[...$("#pf").files];if(!fs.length){$("#pm").textContent="Выберите хотя бы один файл.";return}
  $("#pu").disabled=true;let n=0;
  for(const f of fs){try{$("#pm").textContent="Загружаю "+(++n)+" из "+fs.length+"…";const blob=await shrink(f);const r=await AS.upload(blob,{type:"image/jpeg"});await S.db.collection("photos").add({aid:r.id,cap:$("#pc").value.slice(0,140),st:$("#ps").value,ts:Date.now()})}catch(e){$("#pm").textContent="Не получилось: "+(e&&e.code||"ошибка")+". Попробуйте файл поменьше.";$("#pu").disabled=false;return}}
  $("#pm").textContent="Готово.";$("#pf").value="";$("#pc").value="";$("#pu").disabled=false}
 drawPhotos(PH)}
function shrink(file){return new Promise((res,rej)=>{const im=new Image(),u=URL.createObjectURL(file);im.onload=()=>{const k=Math.min(1,1600/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext("2d").drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(b=>b?res(b):rej(new Error("x")),"image/jpeg",.84)};im.onerror=()=>rej(new Error("img"));im.src=u})}
let PH=[];
function drawPhotos(list){const g=$("#pg");if(!g||!list.length)return;g.innerHTML=list.map(p=>`<figure><img loading="lazy" src="/_blob/${esc(p.aid)}" alt="${esc(p.cap||"Фото из поездки")}"><figcaption>${esc(p.cap||"")}${p.st?`<div class="note">${esc(p.st)}</div>`:""}</figcaption></figure>`).join("")}
function subPhotos(db){try{db.collection("photos").orderBy("ts","desc").limit(200).onSnapshot(s=>{PH=s.docs.map(d=>d.data());drawPhotos(PH)},()=>{})}catch(e){}}
/* ---------- тема и запуск ---------- */
function theme(){const b=$("#theme");let t=LS.get("theme")||"auto";const ap=()=>{const r=document.documentElement;if(t==="auto")r.removeAttribute("data-theme");else r.setAttribute("data-theme",t);b.textContent=t==="auto"?"Тема: авто":t==="dark"?"Тема: тёмная":"Тема: светлая"};ap();b.onclick=()=>{t=t==="auto"?"dark":t==="dark"?"light":"auto";LS.set("theme",t);ap()}}
tabs();header();theme();renderRoute();renderPlaces();renderHikes();renderBudget();renderHotels();renderFlights();renderPack();renderNear();renderPhotos();
{const h=(location.hash||"").slice(1);go(TABS.some(t=>t[0]===h)?h:(LS.get("tab")||"route"))}
initDb();
$("#lang").onclick=()=>setLang(LANG==="es"?"ru":"es");if(LANG==="es")setLang("es");else langBtn();
