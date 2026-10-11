/* Styles for the Trading module. Injected inside shadow roots by trading.js, so they never touch the rest of KODA. */
window.KT_CSS = `
:host{display:block;--bg:#131722;--card:#1E222D;--card2:#2A2E39;--line:rgba(255,255,255,.08);--txt:#F2F5F7;--mut:#8A98A5;--cy:#66A5AD;--gold:#C1A35F;--fab-b:24px;--fab-r:24px;font-family:'Maven Pro',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:var(--txt);-webkit-tap-highlight-color:transparent}
*{box-sizing:border-box}
button,input,select,textarea{font-family:inherit;color:inherit;color-scheme:dark}button{border:0;background:none;cursor:pointer;padding:0}
.root{max-width:980px;margin:0 auto}.root.det{max-width:640px}
h1{font-size:20px;font-weight:800;margin:8px 2px 12px}h2{font-size:14.5px;font-weight:700;margin:22px 2px 10px}
.lbl{color:var(--mut);font-size:12.5px;font-weight:500}
.hero{background:radial-gradient(70% 90% at 20% 100%,rgba(102,165,173,.5),rgba(102,165,173,0) 70%),linear-gradient(160deg,#1A242C,#0C1217);border:1px solid var(--line);border-radius:22px;padding:18px}
.big{font-size:36px;font-weight:800;margin-top:3px;letter-spacing:-.02em}
.row{display:flex;gap:10px;margin-top:14px}.chip{flex:1;background:rgba(0,0,0,.28);border-radius:13px;padding:9px 11px}.chip b{display:block;font-size:15px;margin-top:2px}
.st{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px}.st div{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:10px 4px;text-align:center}.st b{display:block;font-size:20px;font-weight:800}.st span{font-size:11px;color:var(--mut)}.st .g b{color:var(--gold)}
.card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:15px;margin-bottom:10px}
.card.tap{cursor:pointer}.card.tap:active{background:var(--card2)}
.t2{display:flex;justify-content:space-between;align-items:center;gap:8px}.nm{font-size:15px;font-weight:700;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vl{font-size:15px;font-weight:700;white-space:nowrap}
.tag{font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:99px;background:var(--card2);color:var(--mut);white-space:nowrap}
.tag.funded{background:rgba(193,163,95,.18);color:var(--gold)}.tag.eval{background:rgba(102,165,173,.18);color:var(--cy)}.tag.passed{background:rgba(242,245,247,.12);color:var(--txt)}
.bar{height:6px;background:var(--card2);border-radius:9px;margin-top:11px;overflow:hidden}.bar>div{height:100%;background:var(--cy);border-radius:9px;transition:width .3s}.bar.gold>div{background:var(--gold)}
.sb{color:var(--mut);font-size:12.5px;margin-top:8px;display:flex;justify-content:space-between;gap:8px}
.dim{opacity:.5}
.danger{animation:blink 1.3s ease-in-out infinite}.danger .bar>div{background:#8A98A5}.danger .nm,.danger .vl{color:#B9C2CA}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
.btn{display:block;width:100%;background:var(--cy);color:#0F151B;font-weight:800;font-size:15px;border-radius:15px;padding:14px;text-align:center;margin-top:16px}
.btn:disabled{opacity:.55}
.btn2{display:block;background:var(--card);border:1px solid var(--line);font-weight:700;font-size:13.5px;border-radius:13px;padding:12px;text-align:center;flex:1}
.btn2:active{background:var(--card2)}
.fab{position:fixed;right:var(--fab-r);bottom:var(--fab-b);background:var(--cy);color:#0F151B;font-weight:800;border-radius:16px;padding:14px 20px;box-shadow:0 8px 24px rgba(102,165,173,.35);z-index:20}
.f{display:block;margin-top:14px}.f>span{display:block;font-size:12px;color:var(--mut);font-weight:600;margin:0 2px 6px}
.inp{width:100%;background:var(--card);border:1px solid var(--line);border-radius:13px;padding:12px 13px;font-size:16px;font-weight:600;outline:none}.inp:focus{border-color:var(--cy)}
input[type=number]::-webkit-outer-spin-button,input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}
.seg{display:flex;background:var(--card);border-radius:13px;padding:3px;gap:3px}.seg button{flex:1;padding:10px 4px;border-radius:10px;font-weight:700;font-size:13px;color:var(--mut)}.seg button.on{background:var(--cy);color:#0F151B}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pop{position:relative}.pbtn{width:100%;text-align:left;background:var(--card);border:1px solid var(--line);border-radius:13px;padding:12px 13px;font-size:16px;font-weight:600;display:flex;justify-content:space-between;align-items:center}
.plist{position:absolute;left:0;right:0;top:calc(100% + 6px);background:#1A1F2B;border:1px solid var(--line);border-radius:16px;box-shadow:0 16px 40px rgba(0,0,0,.5);z-index:30;padding:8px;max-height:360px;overflow:auto;display:none;scrollbar-width:none}.plist::-webkit-scrollbar{display:none}.plist.on{display:block}
.opt{display:flex;justify-content:space-between;align-items:center;width:100%;padding:11px 10px;border-radius:11px;font-size:14.5px;font-weight:600;text-align:left}.opt:active{background:var(--card2)}.opt.on{color:var(--cy)}
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;text-align:center}.cal span{font-size:11px;color:var(--mut);padding:4px 0}.cal button{padding:9px 0;border-radius:10px;font-size:14px;font-weight:600}.cal button.on{background:var(--cy);color:#0F151B}.cal button:disabled{opacity:.25}
.calh{display:flex;justify-content:space-between;align-items:center;padding:4px 6px 8px;font-weight:700;font-size:14px}.calh button{color:var(--cy);font-size:18px;padding:2px 10px}.calh button:disabled{opacity:.25}
.bg{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:2147483000;display:none}.bg.on{display:block}
.sheet{position:fixed;left:0;right:0;bottom:0;z-index:2147483001;background:#1A1F2B;border-radius:26px 26px 0 0;border-top:1px solid var(--line);padding:12px 18px 26px;max-width:520px;margin:0 auto;display:none;max-height:92vh;overflow:auto;scrollbar-width:none;color:var(--txt)}.sheet::-webkit-scrollbar{display:none}.sheet.on{display:block}
@media(min-width:760px){.sheet{top:50%;bottom:auto;transform:translateY(-50%);border-radius:26px;border:1px solid var(--line);max-height:88vh}}
.grab{width:40px;height:4px;border-radius:9px;background:rgba(255,255,255,.18);margin:0 auto 14px}
.info{background:rgba(102,165,173,.08);border:1px solid rgba(102,165,173,.25);border-radius:13px;padding:12px 13px;font-size:13px;line-height:1.5;color:#C9D3D6;margin-top:10px;display:none}.info.on{display:block}
.link{color:var(--cy);font-weight:700;font-size:12.5px}
.ok{color:var(--cy);font-weight:800}.no{color:var(--mut);font-weight:800}
.tr{display:flex;justify-content:space-between;gap:10px;padding:12px 0;border-top:1px solid var(--line)}.tr:first-child{border-top:0}
.back{color:var(--cy);font-weight:700;font-size:14px;padding:6px 0;display:inline-block;cursor:pointer}
.err{color:var(--gold);font-size:13px;margin-top:10px}
.toast{position:fixed;left:50%;bottom:90px;transform:translate(-50%,20px);background:#2A2E39;border:1px solid var(--line);padding:11px 16px;border-radius:14px;font-size:14px;font-weight:600;opacity:0;pointer-events:none;transition:.25s;z-index:2147483002;max-width:90%;text-align:center;color:var(--txt)}.toast.on{opacity:1;transform:translate(-50%,0)}
.pos{color:var(--cy)}
.file{display:block;cursor:pointer}.file input{display:none}
.fl{display:flex;justify-content:space-between;gap:8px;padding:8px 2px;font-size:13px;color:var(--mut)}
.pv{font-size:13px;color:var(--mut);margin:10px 2px 0}.pv b{color:var(--txt)}
.cards{display:block}
@media(min-width:900px){.cards{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}}
.empty{color:var(--mut);font-size:14px;text-align:center;padding:10px 6px}
`;

/* KODA Trading: shared by trading.html (web) and movil.html (phone).
   Everything lives inside shadow roots, so its styles never touch the rest of KODA.
   Data is saved to Google Sheets (tabs trading_cuentas, trading_log, trading_retiros, trading_plantillas). */
(function(){
'use strict';
const KT=window.KT={};
let R=null,O=null,CALL=null,OPTS={};
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
let HOY=iso(new Date());
const $=id=>(R&&R.getElementById(id))||(O&&O.getElementById(id))||null;
const usd=n=>(n<0?'-':'')+'$'+Math.round(Math.abs(n)).toLocaleString('en-US');
const usdS=n=>(n>0?'+':'')+usd(n);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const fmtF=f=>{const [y,m,d]=f.split('-').map(Number);return d+' '+MONTHS[m-1].slice(0,3)+' '+y};
const fmtFecha=f=>f===HOY?'Today':fmtF(f);
const fmtTs=ts=>ts?fmtF(String(ts).slice(0,10))+(String(ts).length>10?' · '+String(ts).slice(11,16):''):'';
const nowTs=()=>{const d=new Date();return iso(d)+' '+pad(d.getHours())+':'+pad(d.getMinutes())};
/* Numbers: accepts 21,450 / 21450.25 / 31.045,2 (TradingView in Spanish).
   A separator followed by exactly 3 digits at the end is thousands; 1-2 digits is decimal; if both . and , appear, the last one is the decimal. */
function parseP(s){
  s=String(s==null?'':s).trim().replace(/\s/g,'');if(!s)return NaN;
  const neg=s[0]==='-';s=s.replace(/-/g,'');
  const ult=Math.max(s.lastIndexOf('.'),s.lastIndexOf(','));
  if(ult<0)return (neg?-1:1)*parseFloat(s);
  const tras=s.slice(ult+1),antes=s.slice(0,ult).replace(/[.,]/g,'');
  const otros=s.slice(0,ult).search(/[.,]/)>=0,mezcla=s.includes('.')&&s.includes(',');
  let v;
  if(mezcla)v=antes+'.'+tras;
  else if(otros)v=antes+tras;
  else if(/^\d{3}$/.test(tras))v=antes+tras;
  else v=antes+'.'+tras;
  return (neg?-1:1)*parseFloat(v);
}

/* ============ Data ============ */
const TIPOS=['Intraday trail','EOD trail','Standard','No activation','Other'];
const MLLS=['Intraday trailing','EOD trailing','Static'];
const ACTIVS=['With activation','No activation'];
const ESTADO={funded:'Funded',eval:'Evaluation',passed:'Passed',burned:'Blown'};
const PLAN_NUM={25000:{maxLoss:1000,target:1250,maxPayout:1000},50000:{maxLoss:2000,target:3000,maxPayout:2000},100000:{maxLoss:3000,target:6000,maxPayout:3000},150000:{maxLoss:4500,target:9000,maxPayout:4000}};
const nombreDe=c=>[c.firma,c.plan].filter(Boolean).join(' ')+(c.id4?' ••'+c.id4:'');
const DEFAULTS=()=>({firma:'',plan:'',id4:'',tipoCuenta:'EOD trail',mll:'EOD trailing',dll:0,dllEval:0,lock:100,activ:'With activation',feeAct:0,consist:0,consEval:0,minPayout:0,minDays:0,minDayProfit:0,payoutsLive:0,maxNQ:0,maxMNQ:0,split:90,maxLoss:0,target:0,maxPayout:0,size:0,start:0,fee:0,pagadoDesde:'Vanguard',retUsd:0,hoy:0,hoyBase:0,pasoEval:false,compraTs:'',dia:HOY,estado:'eval',dias:[],fechas:[],cicloDias:[],fechasC:[]});
const NUMS=['dll','dllEval','lock','feeAct','consist','consEval','minPayout','minDays','minDayProfit','payoutsLive','maxNQ','maxMNQ','split','maxLoss','target','maxPayout','size','start','fee','retUsd','hoy','hoyBase'];
function norm(a){
  const o=Object.assign(DEFAULTS(),a);
  NUMS.forEach(k=>{o[k]=Number(o[k])||0});
  if(a.lock==null||a.lock==='')o.lock=100;if(a.split==null||a.split==='')o.split=90;
  o.id=Number(o.id);o.id4=String(o.id4==null?'':o.id4);o.pasoEval=o.pasoEval===true||o.pasoEval==='true'||o.pasoEval==='TRUE';
  ['dias','fechas','cicloDias','fechasC'].forEach(k=>{if(!Array.isArray(o[k]))o[k]=[]});
  o.dias=o.dias.map(Number);o.cicloDias=o.cicloDias.map(Number);
  if(!o.start)o.start=o.size;
  o.nombre=nombreDe(o);recalcular(o);return o;
}
function recalcular(a){
  let bal=a.start,pico=a.start;
  a.dias.forEach(d=>{bal+=d;pico=Math.max(pico,bal)});
  a.cierre=bal;a.pico=pico;
  const base=a.start-a.maxLoss;
  if((a.mll||'').startsWith('Sta'))a.piso=base;
  else{const peak=(a.mll||'').startsWith('Intra')?Math.max(pico,bal+a.hoy):pico;a.piso=Math.min(Math.max(base,peak-a.maxLoss),a.start+(a.lock||0))}
  a.balance=bal-a.retUsd+a.hoy;
}
function nuevaCuenta(id,size,estado,fee,extra){
  const p=PLAN_NUM[size]||{maxLoss:0,target:0,maxPayout:0};
  return norm(Object.assign({id,size,start:size,estado,fee,compraTs:nowTs(),dia:HOY,pasoEval:estado==='funded'},p,extra||{}));
}
let S={cuentas:[],plantillas:[],retiros:[],log:[],vista:'resumen',sel:null,verTodas:false};
const acc=id=>S.cuentas.find(c=>c.id===id);
const activa=c=>c.estado!=='burned';
const margen=c=>c.balance-c.piso;
const peligro=c=>activa(c)&&margen(c)<c.maxLoss*0.25;
const dllEf=c=>c.estado==='eval'?c.dllEval:c.dll;
const dllAlcanzado=c=>activa(c)&&dllEf(c)>0&&dllEf(c)+c.hoy<=0;
const costo=c=>c.fee+(c.feeAct||0);
const cicloTotal=c=>c.cicloDias.reduce((a,b)=>a+b,0)+(c.hoy-c.hoyBase);
const pctMeta=c=>c.start>0?(c.balance-c.start)/c.start*100:0;
const diasGanancia=c=>c.cicloDias.concat([c.hoy-c.hoyBase]).filter(v=>v>0&&v>=(c.minDayProfit||0)).length;
const mejorDiaPct=(vals,total)=>{const m=Math.max(0,...vals);return total>0?m/total*100:0};
const pct=(a,b)=>b>0?Math.max(0,Math.min(100,a/b*100)):0;
const pTxt=n=>(Math.round(n*10)/10).toFixed(1)+'%';
const consEvalDe=c=>({p:mejorDiaPct(c.dias.concat([c.hoy]),c.balance-c.start)});
function addDay(c,fecha,v){
  if(fecha===HOY){c.hoy+=v}
  else{
    let i=c.fechas.indexOf(fecha);if(i>=0)c.dias[i]+=v;else{c.dias.push(v);c.fechas.push(fecha)}
    let j=c.fechasC.indexOf(fecha);if(j>=0)c.cicloDias[j]+=v;else{c.cicloDias.push(v);c.fechasC.push(fecha)}
  }
  recalcular(c);
}
function chequear(c,lista){if(activa(c)&&c.balance<=c.piso){c.estado='burned';lista.push(c.nombre)}}
/* A new day starts: yesterday's result is closed into the history */
function rollover(){
  let ch=false;
  S.cuentas.forEach(c=>{
    if(!c.dia){c.dia=HOY;ch=true;return}
    if(c.dia!==HOY){
      if(activa(c)){
        if(c.hoy!==0){c.dias.push(c.hoy);c.fechas.push(c.dia)}
        if(c.hoy-c.hoyBase!==0){c.cicloDias.push(c.hoy-c.hoyBase);c.fechasC.push(c.dia)}
        c.hoy=0;c.hoyBase=0;
      }
      c.dia=HOY;recalcular(c);ch=true;
    }
  });
  return ch;
}
/* How close an account is to its next goal */
function meta(c){
  if(c.estado==='eval')return {lbl:'Profit target',p:pct(c.balance-c.start,c.target)};
  if(c.estado!=='funded')return {lbl:'',p:-1};
  const t=Math.max(0,cicloTotal(c));
  if(c.maxPayout>0)return {lbl:'Max payout',txt:usd(t)+' of '+usd(c.maxPayout),p:pct(t,c.maxPayout)};
  if(c.minDays>0){const d=diasGanancia(c);return {lbl:'Winning days',txt:d+' of '+c.minDays,p:pct(d,c.minDays)}}
  if(c.minPayout>0)return {lbl:'Minimum to withdraw',txt:usd(t)+' of '+usd(c.minPayout),p:pct(t,c.minPayout)};
  return {lbl:'Cycle profit',txt:usd(t),p:0};
}

/* ============ Saving (Google Sheets) ============ */
const CACHE_KEY='koda_trading_cache',PEND_KEY='koda_trading_pending',SEED_KEY='koda_trading_seeded';
const DERIVED=['balance','piso','cierre','pico'];
let SNAP={},READY=false,flushing=false,timer=null,retry=null,failToast=false,loadedOnce=false;
function ser(st){
  st=st||S;
  return {
    trading_cuentas:st.cuentas.map(c=>{const o=Object.assign({},c);DERIVED.forEach(k=>delete o[k]);return o}),
    trading_log:st.log.map(t=>({id:t.id,acc:t.acc,fecha:t.fecha,monto:t.monto,nota:t.nota||'',ts:t.ts||''})),
    trading_retiros:st.retiros.map(r=>({id:r.id,acc:r.acc,usd:r.usd,rd:r.rd,dest:r.dest,fecha:r.fecha,ts:r.ts||''})),
    trading_plantillas:st.plantillas.map(t=>({id:t.id,nombre:t.nombre,c:t.c}))
  };
}
function fromTables(t){
  t=t||{};
  const st={cuentas:(t.trading_cuentas||[]).map(norm),plantillas:(t.trading_plantillas||[]).map(x=>({id:String(x.id),nombre:String(x.nombre||''),c:x.c||{}})),
    retiros:(t.trading_retiros||[]).map(r=>({id:r.id,acc:Number(r.acc),usd:Number(r.usd)||0,rd:Number(r.rd)||0,dest:String(r.dest||''),fecha:String(r.fecha||''),ts:String(r.ts||'')})),
    log:(t.trading_log||[]).map(x=>({id:x.id,acc:Number(x.acc),fecha:String(x.fecha||''),monto:Number(x.monto)||0,nota:String(x.nota==null?'':x.nota),ts:String(x.ts||'')})),
    vista:'resumen',sel:null,verTodas:false};
  return st;
}
function cacheLocal(){try{localStorage.setItem(CACHE_KEY,JSON.stringify(ser()))}catch(e){}}
function cargarCache(){try{const j=localStorage.getItem(CACHE_KEY);if(!j)return false;S=fromTables(JSON.parse(j));return true}catch(e){return false}}
function setPend(v){try{if(v)localStorage.setItem(PEND_KEY,'1');else localStorage.removeItem(PEND_KEY)}catch(e){}}
const hayPend=()=>{try{return localStorage.getItem(PEND_KEY)==='1'}catch(e){return false}};
function guardar(){
  cacheLocal();
  if(READY){const cur=ser();if(!Object.keys(cur).some(t=>JSON.stringify(cur[t])!==SNAP[t])){return}}
  setPend(true);
  clearTimeout(timer);timer=setTimeout(flush,500);
}
async function flush(){
  if(!READY||flushing||!CALL)return;
  flushing=true;
  try{
    const cur=ser();
    for(const t of Object.keys(cur)){
      const js=JSON.stringify(cur[t]);
      if(js!==SNAP[t]){await CALL('guardarTabla',{tabla:t,filas:cur[t]});SNAP[t]=js}
    }
    failToast=false;
    const otra=ser();
    if(Object.keys(otra).some(t=>JSON.stringify(otra[t])!==SNAP[t])){clearTimeout(timer);timer=setTimeout(flush,200)}
    else setPend(false);
  }catch(e){
    if(!failToast){failToast=true;toast('Not saved yet. Will retry.')}
    clearTimeout(retry);retry=setTimeout(flush,8000);
  }finally{flushing=false}
}
async function loadRemote(manual){
  if(!CALL)return;
  const sh=$('sheet');if(sh&&sh.classList.contains('on')&&!manual)return;   // do not swap data while a form is open
  try{
    const r=await CALL('cargarTrading');
    const rs=fromTables(r.tablas);
    SNAP={};const sr=ser(rs);Object.keys(sr).forEach(t=>{SNAP[t]=JSON.stringify(sr[t])});
    const vista=S.vista,sel=S.sel,ver=S.verTodas;
    if(!hayPend()){S=rs;S.vista=vista;S.sel=sel;S.verTodas=ver}
    READY=true;loadedOnce=true;
    let ch=rollover();
    // First time: leave the Lucid Flex 25K template ready
    try{
      if(!S.cuentas.length&&!S.plantillas.length&&!localStorage.getItem(SEED_KEY)){
        S.plantillas.push({id:'t1',nombre:'Lucid Flex 25K',c:{firma:'Lucid',plan:'Flex',tipoCuenta:'EOD trail',mll:'EOD trailing',size:25000,maxLoss:1000,maxNQ:2,maxMNQ:20,target:1250,consEval:50,dllEval:0,dll:600,consist:0,minDays:5,minDayProfit:100,minPayout:0,maxPayout:0,payoutsLive:5,split:90,lock:100,activ:'No activation',feeAct:0,pagadoDesde:'Vanguard'}});
        localStorage.setItem(SEED_KEY,'1');ch=true;
      }
    }catch(e){}
    if(ch||hayPend())guardar();else cacheLocal();
    render();
    if(manual)toast('Up to date');
  }catch(e){
    if(!loadedOnce){S.error=e.message||'Could not load Trading';render()}
    else if(manual)toast(e.message||'Could not refresh');
  }
}

/* ============ UI helpers ============ */
function toast(t){const e=$('toast');if(!e)return;e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),3000)}
function hoja(html){const s=$('sheet');s.innerHTML='<div class="grab"></div>'+html;s.classList.add('on');$('bg').classList.add('on');s.scrollTop=0}
function cerrarHoja(){const s=$('sheet');if(s)s.classList.remove('on');const b=$('bg');if(b)b.classList.remove('on')}
function psel(id,opts,val,cb){
  return `<div class="pop"><input type="hidden" id="${id}" value="${esc(val)}"><button class="pbtn" type="button" onclick="KT.gpT(this)"><span>${esc(val)}</span><span style="color:var(--mut)">▾</span></button>
  <div class="plist gp">${opts.map(o=>`<button type="button" class="opt ${o===val?'on':''}" data-v="${esc(o)}" onclick="KT.gpPick(this,'${id}','${cb||''}')"><span>${esc(o)}</span></button>`).join('')}</div></div>`;
}
KT.gpT=function(b){const l=b.nextElementSibling,on=l.classList.contains('on');cerrarListas();if(!on){l.classList.add('on');setTimeout(()=>l.scrollIntoView({block:'nearest',behavior:'smooth'}),30)}};
KT.gpPick=function(btn,id,cb){const v=btn.dataset.v;setV(id,v);btn.closest('.plist').classList.remove('on');if(cb&&KT[cb])KT[cb](v)};
function cerrarListas(){[R,O].forEach(r=>r&&r.querySelectorAll('.plist.gp.on').forEach(x=>x.classList.remove('on')))}
function setV(id,v){
  const e=$(id);if(!e)return;e.value=v;const pop=e.closest('.pop');
  if(pop&&e.type==='hidden'){pop.querySelector('.pbtn span').textContent=v;pop.querySelectorAll('.opt').forEach(o=>o.classList.toggle('on',o.dataset.v===String(v)))}
}
const tf=(id,label,val='')=>`<label class="f"><span>${label}</span><input class="inp" id="${id}" type="text" inputmode="decimal" autocomplete="off" value="${esc(val)}"></label>`;
const tx=(id,label,val='',oninp='')=>`<label class="f"><span>${label}</span><input class="inp" id="${id}" type="text" autocomplete="off" maxlength="40" value="${esc(val)}" ${oninp?`oninput="${oninp}"`:''}></label>`;

/* ============ Summary ============ */
const LIM=6;
function listaOrdenada(){const g={funded:0,eval:1,passed:2,burned:3};return S.cuentas.slice().sort((a,b)=>g[a.estado]-g[b.estado]||meta(b).p-meta(a).p)}
function vResumen(){
  const invertido=S.cuentas.reduce((a,c)=>a+costo(c),0),retirado=S.retiros.reduce((a,r)=>a+r.rd,0),neto=retirado-invertido;
  const n=e=>S.cuentas.filter(c=>c.estado===e).length;
  const todas=listaOrdenada();
  const vis=S.verTodas?todas.slice(0,LIM):todas.filter(c=>c.estado==='funded'||c.estado==='eval').slice(0,3);
  const ult=S.log.slice().sort((a,b)=>b.id-a.id).slice(0,5);
  return `<div class="hero"><div class="lbl">Net result (withdrawn minus invested)</div><div class="big">${usd(neto)}</div>
   <div class="row"><div class="chip"><span class="lbl">Invested in prop firms</span><b>${usd(invertido)}</b></div><div class="chip"><span class="lbl">Withdrawn</span><b>${usd(retirado)}</b></div></div></div>
  <div class="st"><div><b>${n('eval')}</b><span>Evaluation</span></div><div><b>${n('passed')}</b><span>Passed</span></div><div class="g"><b>${n('funded')}</b><span>Funded</span></div><div><b>${n('burned')}</b><span>Blown</span></div></div>
  <h2>Accounts</h2>
  <div class="cards">${vis.length?vis.map(tarjeta).join(''):`<div class="card"><div class="lbl">${S.verTodas?'No accounts yet.':(todas.length?'No active accounts.':'No accounts yet. Add your first one.')}</div></div>`}</div>
  ${todas.length>3?`<div style="display:flex;gap:9px;margin-bottom:10px"><button class="btn2" onclick="KT.toggleTodas()">${S.verTodas?'Show less':'Show all accounts'}</button><button class="btn2" onclick="KT.hojaHistorial()">Account history</button></div>`:''}
  <div style="display:flex;gap:9px"><button class="btn2" onclick="KT.hojaCuenta()">+ Buy a new account</button><button class="btn2" style="flex:0 0 auto;padding:12px 18px" onclick="KT.hojaPlantillas()">Templates</button></div>
  ${ult.length?`<h2>Latest results</h2><div class="card">${ult.map(t=>filaDia(t,true)).join('')}</div>`:''}
  <button class="fab" onclick="KT.hojaDia(null)">+ Result</button>`;
}
KT.toggleTodas=function(){S.verTodas=!S.verTodas;render()};
function tarjeta(c){
  const m=meta(c);let cuerpo;
  const tags=`<span style="display:flex;gap:6px">${c.id4?'':'<span class="tag">Missing ID</span>'}<span class="tag ${c.estado}">${ESTADO[c.estado]}</span></span>`;
  if(c.estado==='burned')cuerpo=`<div class="sb"><span>Paid ${usd(costo(c))} from ${esc(c.pagadoDesde)}</span></div>`;
  else if(c.estado==='passed')cuerpo=`<div class="t2" style="margin-top:8px"><span class="lbl">Balance</span><div class="vl">${usd(c.balance)}</div></div><div class="sb"><span>Evaluation passed</span><span>Today ${usdS(c.hoy)}</span></div>`;
  else if(c.estado==='eval'){
    const g=c.balance-c.start,ev=consEvalDe(c),metaPct=c.start>0?c.target/c.start*100:0;
    cuerpo=`<div class="t2" style="margin-top:8px"><span class="lbl">Profit target</span><div class="vl" style="font-size:20px">${pTxt(pctMeta(c))} of ${pTxt(metaPct)}</div></div><div class="bar ${g>=c.target&&c.target>0?'gold':''}"><div style="width:${pct(g,c.target)}%"></div></div>
    <div class="sb"><span>${c.consEval>0?'Consistency '+ev.p.toFixed(0)+'% of '+c.consEval+'%':usd(Math.max(0,g))+' of '+usd(c.target)}</span><span>Today ${usdS(c.hoy)}</span></div>`;
  }else{
    const d=diasGanancia(c),pnl=cicloTotal(c),lleno=c.maxPayout>0&&pnl>=c.maxPayout,p=c.maxPayout>0?pct(pnl,c.maxPayout):pct(d,c.minDays);
    cuerpo=`<div class="sb" style="margin-top:6px"><span>Balance ${usd(c.balance)}</span></div>
    <div class="t2" style="margin-top:6px"><span class="lbl">PnL</span><div class="vl" style="font-size:20px">${usdS(pnl)}</div></div>
    <div class="bar ${lleno?'gold':''}"><div style="width:${p}%"></div></div>
    <div class="sb"><span>${c.minDays>0?'Winning days '+d+' of '+c.minDays:''}</span><span>Today ${usdS(c.hoy)}</span></div>`;
  }
  return `<div class="card tap ${c.estado==='burned'?'dim':''} ${peligro(c)?'danger':''}" onclick="KT.ir('cuenta',${c.id})"><div class="t2"><div class="nm">${esc(c.nombre)}</div>${tags}</div>${cuerpo}</div>`;
}
function filaDia(t,conCuenta){
  const a=acc(t.acc);
  return `<div class="tr"><div style="min-width:0"><div class="nm" style="font-size:14px">${conCuenta?esc(a?a.nombre:''):fmtFecha(t.fecha)}</div><div class="lbl" style="margin-top:3px">${conCuenta?fmtFecha(t.fecha)+(t.nota?' · '+esc(t.nota):''):esc(t.nota||'No note')}</div></div><div style="text-align:right"><div class="vl ${t.monto>=0?'pos':''}">${usdS(t.monto)}</div>${conCuenta?'':`<button class="link" onclick="KT.quitarDia(${t.id})">Remove</button>`}</div></div>`;
}
KT.ir=function(v,id){S.vista=v;if(id!==undefined)S.sel=id;render();(OPTS.onNavigate||(()=>scrollTo(0,0)))()};

/* ---- All accounts ---- */
KT.hojaHistorial=function(){
  hoja(`<h1 style="margin-top:0">All accounts</h1>
  ${tx('h-q','Search account','','KT.pintaHist()')}
  <div class="f"><span>Status</span>${psel('h-est',['All','Funded','Evaluation','Passed','Blown'],'All','pintaHist')}</div>
  <div id="h-lista" style="margin-top:12px"></div>`);
  KT.pintaHist();
};
KT.pintaHist=function(){
  const q=($('h-q').value||'').toLowerCase(),e=$('h-est').value,mp={Funded:'funded',Evaluation:'eval',Passed:'passed',Blown:'burned'}[e];
  const l=listaOrdenada().filter(c=>(!mp||c.estado===mp)&&c.nombre.toLowerCase().includes(q));
  $('h-lista').innerHTML=l.length?l.map(c=>{const ret=S.retiros.filter(r=>r.acc===c.id).reduce((a,r)=>a+r.rd,0);
    return `<button class="opt" onclick="KT.cerrarHoja();KT.ir('cuenta',${c.id})"><span><span class="nm" style="font-size:14px">${esc(c.nombre)}</span><br><span class="lbl">Net ${usd(ret-costo(c))}</span></span><span class="tag ${c.estado}">${ESTADO[c.estado]}</span></button>`}).join(''):'<div class="lbl" style="padding:10px">No accounts.</div>';
};
KT.cerrarHoja=cerrarHoja;

/* ============ Account detail ============ */
function vCuenta(){
  const c=acc(S.sel);if(!c){S.vista='resumen';return vResumen()}
  const pel=peligro(c),cicloPnl=cicloTotal(c),vals=c.cicloDias.concat([c.hoy-c.hoyBase]);
  const consist=mejorDiaPct(vals,cicloPnl),wd=diasGanancia(c);
  const okMin=!(c.minPayout>0)||cicloPnl>=c.minPayout,okCon=!(c.consist>0)||(cicloPnl>0&&consist<=c.consist),okDias=!(c.minDays>0)||wd>=c.minDays;
  const cumple=cicloPnl>0&&okMin&&okCon&&okDias;
  const disp=cumple?(c.maxPayout>0?Math.min(cicloPnl,c.maxPayout):cicloPnl):0;
  const mis=S.retiros.filter(r=>r.acc===c.id),ret=mis.reduce((a,r)=>a+r.rd,0),neto=ret-costo(c);
  const tr=S.log.filter(t=>t.acc===c.id).sort((a,b)=>b.id-a.id).slice(0,10);
  const g=c.balance-c.start,metaPct=c.start>0?c.target/c.start*100:0;
  const sg=ok=>`<b class="${ok?'ok':'no'}">${ok?'Met':'Not yet'}</b>`;
  const evCons=consEvalDe(c);
  const retiro=c.estado==='funded'?`<h2>To withdraw</h2><div class="card">
      <div class="t2"><span class="nm" style="font-size:14px">Profit since last withdrawal</span><span class="vl">${usd(cicloPnl)}</span></div>
      ${c.maxPayout>0?`<div class="sb"><span>Max payout: ${usd(c.maxPayout)}</span></div>`:''}
      ${c.minPayout>0?`<div class="tr" style="margin-top:8px"><span>Minimum to withdraw<br><span class="lbl">${usd(c.minPayout)}</span></span>${sg(okMin)}</div>`:''}
      ${c.consist>0?`<div class="tr"><span>Consistency: best day ${consist.toFixed(0)}%<br><span class="lbl">Max ${c.consist}%</span></span>${sg(okCon)}</div>`:''}
      ${c.minDays>0?`<div class="tr"><span>Winning days: ${wd} of ${c.minDays}<br><span class="lbl">Each day at least ${usd(c.minDayProfit)}</span></span>${sg(okDias)}</div>`:''}
      <div class="tr"><span>You would receive (${c.split}%)<br><span class="lbl">Of ${usd(disp)}</span></span><b>${usd(disp*c.split/100)}</b></div>
      ${c.payoutsLive>0?`<div class="tr"><span>Withdrawals to go Live</span><b>${mis.length} of ${c.payoutsLive}</b></div>`:''}
      <div style="margin-top:6px"><button class="link" onclick="KT.tg('i2')">How does this work?</button></div>
      <div class="info" id="i2">Every requirement on the list must be met. "Available to withdraw" is what you could request today.</div></div>`
    :c.estado==='eval'?`<h2>To pass the evaluation</h2><div class="card"><div class="t2"><span class="nm" style="font-size:14px">Profit target</span><b>${pTxt(pctMeta(c))}</b></div><div class="bar ${g>=c.target&&c.target>0?'gold':''}"><div style="width:${pct(g,c.target)}%"></div></div><div class="sb"><span>${usd(Math.max(0,g))} of ${usd(c.target)}</span><span>${usd(Math.max(0,c.target-g))} to go</span></div>
      <div class="sb"><span>You need to earn ${pTxt(metaPct)} of the account</span></div>
      ${c.consEval>0?`<div class="tr" style="margin-top:8px"><span>Consistency: best day ${evCons.p.toFixed(0)}%<br><span class="lbl">Max ${c.consEval}%</span></span>${sg(g<=0||evCons.p<=c.consEval)}</div>`:''}</div>`:'';
  const chip2=c.estado==='funded'?`<div class="chip"><span class="lbl">Available to withdraw</span><b>${cumple?usd(disp):'Not yet'}</b></div>`:`<div class="chip"><span class="lbl">Total profit</span><b>${usdS(g)}</b></div>`;
  const dllLinea=dllEf(c)>0&&activa(c)?`<div class="tr" style="margin-top:8px"><span>Daily loss limit (DLL)<br><span class="lbl">${dllAlcanzado(c)?'Reached today':usd(dllEf(c)+c.hoy)+' left of '+usd(dllEf(c))}</span></span><b class="${dllAlcanzado(c)?'no':'ok'}">${dllAlcanzado(c)?'Reached':'Free'}</b></div>`:'';
  const mllTxt=(c.mll||'').startsWith('EOD')?`The floor rises with your best daily close and stops at ${usd(c.start+c.lock)}.`:(c.mll||'').startsWith('Intra')?`The floor rises as soon as your balance rises and stops at ${usd(c.start+c.lock)}.`:'The floor does not move.';
  const lim=[c.maxNQ>0?c.maxNQ+' NQ':'',c.maxMNQ>0?c.maxMNQ+' MNQ':''].filter(Boolean).join(' or ');
  return `<div class="back" onclick="KT.ir('resumen')">← Accounts</div>
  <div class="t2" style="margin:4px 2px 12px"><h1 style="margin:0">${esc(c.nombre)}</h1><span class="tag ${c.estado}">${ESTADO[c.estado]}</span></div>
  ${c.id4?'':`<div class="card" style="margin-bottom:12px"><div class="lbl">The account ID is missing. Add it in "Edit account".</div></div>`}
  <div class="hero ${pel?'danger':''}"><div class="lbl">Balance</div><div class="big">${usd(c.balance)}</div>
   <div class="row"><div class="chip"><span class="lbl">Today</span><b>${usdS(c.hoy)}</b></div>${chip2}</div></div>
  ${activa(c)?`<h2>Account safety</h2>
  <div class="card ${pel?'danger':''}"><div class="t2"><span class="nm" style="font-size:14px">Room before it blows</span><span class="vl">${usd(margen(c))}</span></div>
   <div class="bar"><div style="width:${pct(margen(c),c.maxLoss)}%"></div></div>
   <div class="sb"><span>Blown if the balance drops below <b style="color:var(--txt)">${usd(c.piso)}</b></span></div>
   ${dllLinea}
   <div style="margin-top:10px"><button class="link" onclick="KT.tg('i1')">How does this work?</button></div>
   <div class="info" id="i1">MLL: a floor below your balance. If you touch it, the account is blown. ${mllTxt}<br>DLL: loss limit for a single day.</div></div>`:''}
  ${retiro}
  <button class="btn2" style="width:100%;margin-top:16px" onclick="KT.tg('rd3','block')">Rules and money</button>
  <div id="rd3" style="display:none"><h2>Money in this account</h2>
  <div class="card"><div class="t2"><span class="lbl">Paid${c.feeAct?' (account + activation)':''}</span><span class="vl">${usd(costo(c))}</span></div>
   <div class="t2" style="margin-top:9px"><span class="lbl">Withdrawn</span><span class="vl">${usd(ret)}</span></div>
   <div class="t2" style="margin-top:9px"><span class="lbl">Net</span><span class="vl">${usd(neto)}</span></div>
   <div class="sb" style="margin-top:10px"><span>Paid from ${esc(c.pagadoDesde)}</span><span>${fmtTs(c.compraTs)}</span></div>
   ${mis.length?`<div class="sb"><span>Last withdrawal to ${esc(mis[mis.length-1].dest)}</span><span>${fmtTs(mis[mis.length-1].ts||mis[mis.length-1].fecha)}</span></div>`:''}</div>
  <h2>Account rules</h2>
  <div class="card">
   ${[['Account',esc(c.firma)+' '+esc(c.plan)+' · '+esc(c.tipoCuenta)],['Activation',esc(c.activ)],['Max loss (MLL)',usd(c.maxLoss)+' · '+esc(c.mll)],['Evaluation DLL',c.dllEval>0?usd(c.dllEval):'Off'],['Funded DLL',c.dll>0?usd(c.dll):'None'],['Evaluation target',usd(c.target)+' ('+pTxt(metaPct)+')'],['Consistency eval / funded',(c.consEval>0?c.consEval+'%':'—')+' / '+(c.consist>0?c.consist+'%':'—')],['Max contracts',lim||'No limit'],['Winning days',c.minDays>0?c.minDays+' of '+usd(c.minDayProfit):'—'],['Minimum / Max payout',(c.minPayout>0?usd(c.minPayout):'—')+' / '+(c.maxPayout>0?usd(c.maxPayout):'—')],['Your split',c.split+'%']].map(([a,b],i)=>`<div class="t2" style="${i?'margin-top:8px':''}"><span class="lbl">${a}</span><span class="vl" style="white-space:normal;text-align:right">${b}</span></div>`).join('')}
   <button class="btn2" style="width:100%;margin-top:12px" onclick="KT.hojaEditar(${c.id})">Edit account</button></div></div>
  <div style="display:flex;gap:14px;margin-top:14px"><button class="btn2" onclick="KT.hojaRetiro(${c.id})">Log a withdrawal</button><button class="btn2" onclick="KT.hojaEstado(${c.id})">Change status</button></div>
  ${activa(c)?`<button class="btn2" style="width:100%;margin-top:14px" onclick="KT.hojaDia(${c.id})">Log a day result</button>`:''}
  ${tr.length?`<h2>Logged days</h2><div class="card">${tr.map(t=>filaDia(t,false)).join('')}</div>`:''}`;
}
KT.tg=function(id,disp){const e=$(id);if(!e)return;if(disp)e.style.display=e.style.display==='none'?disp:'none';else e.classList.toggle('on')};
KT.hojaEstado=function(id){hoja(`<h1 style="margin-top:0">Change status</h1>`+Object.keys(ESTADO).map(k=>`<button class="opt" onclick="KT.cambiarEstado(${id},'${k}')"><span>${ESTADO[k]}</span><span class="tag ${k}">${ESTADO[k]}</span></button>`).join(''))};
KT.cambiarEstado=function(id,e){const c=acc(id);c.estado=e;if(e==='funded'||e==='passed')c.pasoEval=true;cerrarHoja();render();guardar();toast('Status: '+ESTADO[e])};
function destinos(){let l=[];try{l=(OPTS.accounts&&OPTS.accounts())||[]}catch(e){}l=l.filter(Boolean);return l.length?l:['Hub']}
KT.hojaRetiro=function(id){
  const c=acc(id),d=destinos();
  hoja(`<h1 style="margin-top:0">Log a withdrawal</h1><div class="lbl">${esc(c.nombre)}</div>
  ${tf('r-usd','Withdrawn from the account (USD)')}${tf('r-rd','Received in the bank (DOP)')}
  <div class="f"><span>Received in</span>${psel('r-dest',d,d.includes('Hub')?'Hub':d[0])}</div>
  <div class="err" id="r-err"></div><button class="btn" onclick="KT.guardarRetiro(${id})">Save withdrawal</button>`);
};
KT.guardarRetiro=function(id){
  const u=parseP($('r-usd').value),r=parseP($('r-rd').value);
  if(!(u>0)||!(r>0)){$('r-err').textContent='Enter both amounts.';return}
  const c=acc(id);S.retiros.push({id:Date.now(),acc:id,usd:u,rd:r,dest:$('r-dest').value,fecha:HOY,ts:nowTs()});
  c.cicloDias=[];c.fechasC=[];c.hoyBase=c.hoy;c.retUsd+=u;recalcular(c);cerrarHoja();render();guardar();toast('Withdrawal saved');
};

/* ============ Account form (buy, edit, template) ============ */
const z=v=>v?v:'';
function valoresDe(c){return {firma:c.firma,plan:c.plan,id4:c.id4,tipo:c.tipoCuenta,size:c.size,fee:c.fee,from:c.pagadoDesde,activ:c.activ,feeAct:z(c.feeAct),mll:c.mll,ml:c.maxLoss,mq:z(c.maxNQ),mm:z(c.maxMNQ),tg:c.target,cse:z(c.consEval),dlle:z(c.dllEval),dll:z(c.dll),cs:z(c.consist),md:z(c.minDays),mdp:z(c.minDayProfit),mp:z(c.minPayout),xp:z(c.maxPayout),ptl:z(c.payoutsLive),sp:c.split,lock:c.lock}}
const VACIO={firma:'',plan:'',id4:'',tipo:'EOD trail',size:'',fee:'',from:'Vanguard',activ:'With activation',feeAct:'',mll:'EOD trailing',ml:'',mq:'',mm:'',tg:'',cse:'',dlle:'',dll:'',cs:'',md:'',mdp:'',mp:'',xp:'',ptl:'',sp:'90',lock:'100'};
function formCuenta(p,v){
  const tipoEn=TIPOS.includes(v.tipo)?v.tipo:'Other';
  return `${tx(p+'-firma','Prop firm',v.firma,"KT.prevNombre('"+p+"')")}
  <div class="g2">${tx(p+'-plan','Plan (e.g. Flex, Pro)',v.plan,"KT.prevNombre('"+p+"')")}${tx(p+'-id4','Last 4 of the ID (optional)',v.id4,"KT.prevNombre('"+p+"')")}</div>
  <div class="pv" id="${p}-prev"></div>
  <div class="f"><span>Account type</span>${psel(p+'-tipo',TIPOS,tipoEn,'tipoCb_'+p)}</div>
  <div id="${p}-otroW" style="display:${tipoEn==='Other'?'block':'none'}">${tx(p+'-tipoOtro','Type the account type',tipoEn==='Other'&&v.tipo!=='Other'?v.tipo:'')}</div>
  <div class="f"><span>How the MLL moves</span>${psel(p+'-mll',MLLS,v.mll)}</div>
  <div class="g2">${tf(p+'-size','Size (USD)',v.size)}${tf(p+'-ml','Max loss MLL (USD)',v.ml)}</div>
  <div class="g2">${tf(p+'-mq','Max NQ (0 = no limit)',v.mq)}${tf(p+'-mm','Max MNQ (0 = no limit)',v.mm)}</div>
  <h2 style="margin-top:20px">Evaluation</h2>
  <div class="g2">${tf(p+'-tg','Target (USD)',v.tg)}${tf(p+'-cse','Consistency (%)',v.cse)}</div>
  ${tf(p+'-dlle','Evaluation DLL (USD, empty = off)',v.dlle)}
  <h2 style="margin-top:20px">Funded account</h2>
  <div class="g2">${tf(p+'-dll','DLL (USD, empty = none)',v.dll)}${tf(p+'-cs','Consistency (%, empty = none)',v.cs)}</div>
  <div class="g2">${tf(p+'-md','Winning days',v.md)}${tf(p+'-mdp','Of at least (USD)',v.mdp)}</div>
  <div class="g2">${tf(p+'-mp','Minimum to withdraw (USD)',v.mp)}${tf(p+'-xp','Max payout (USD)',v.xp)}</div>
  <div class="g2">${tf(p+'-ptl','Withdrawals to go Live',v.ptl)}${tf(p+'-sp','Your split (%)',v.sp)}</div>
  ${tf(p+'-lock','The floor stops at start + (USD)',v.lock)}
  <h2 style="margin-top:20px">Costs</h2>
  <div class="g2">${tf(p+'-fee','Cost (DOP)',v.fee)}<div class="f"><span>Paid from</span>${psel(p+'-from',['Vanguard','Hub'],v.from)}</div></div>
  <div class="f"><span>Activation</span>${psel(p+'-activ',ACTIVS,v.activ,'activCb_'+p)}</div>
  <div id="${p}-actW" style="display:${v.activ==='No activation'?'none':'block'}">${tf(p+'-feeAct','Activation cost (DOP)',v.feeAct)}</div>`;
}
function tipoCbG(p,v){$(p+'-otroW').style.display=v==='Other'?'block':'none';if(v==='Intraday trail')setV(p+'-mll','Intraday trailing');else if(v==='EOD trail')setV(p+'-mll','EOD trailing')}
function activCbG(p,v){$(p+'-actW').style.display=v==='No activation'?'none':'block'}
['n','e','t'].forEach(p=>{KT['tipoCb_'+p]=v=>tipoCbG(p,v);KT['activCb_'+p]=v=>activCbG(p,v)});
KT.prevNombre=function(p){
  const e=$(p+'-prev');if(!e)return;
  const n=nombreDe({firma:$(p+'-firma').value.trim(),plan:$(p+'-plan').value.trim(),id4:$(p+'-id4').value.trim().slice(-4)});
  e.innerHTML=n?'It will be named <b>'+esc(n)+'</b>':'Name: firm + plan + last 4 of the ID';
};
function leerCampos(p){
  const g=k=>$(p+'-'+k).value,n=k=>parseP(g(k)),o=k=>n(k)||0;
  let tipo=g('tipo');if(tipo==='Other')tipo=g('tipoOtro').trim()||'Other';
  const sin=g('activ')==='No activation';
  return {firma:g('firma').trim(),plan:g('plan').trim(),id4:g('id4').trim().slice(-4),tipoCuenta:tipo,size:n('size'),fee:n('fee'),pagadoDesde:g('from'),activ:g('activ'),feeAct:sin?0:o('feeAct'),mll:g('mll'),maxLoss:n('ml'),maxNQ:o('mq'),maxMNQ:o('mm'),
    target:o('tg'),consEval:o('cse'),dllEval:o('dlle'),dll:o('dll'),consist:o('cs'),minDays:o('md'),minDayProfit:o('mdp'),minPayout:o('mp'),maxPayout:o('xp'),payoutsLive:o('ptl'),split:o('sp')||90,lock:isNaN(n('lock'))?100:n('lock')};
}
function validar(d,exigeMeta){
  if(!d.firma)return 'Enter the prop firm.';
  if(!(d.size>0)||!(d.maxLoss>0))return 'Enter the size and the MLL.';
  if(isNaN(d.fee)||d.fee<0)return 'Enter the cost.';
  if(exigeMeta&&!(d.target>0))return 'Enter the evaluation target.';
  return '';
}
const CAMPOS=['firma','plan','id4','size','ml','mq','mm','tg','cse','dlle','dll','cs','md','mdp','mp','xp','ptl','sp','lock','fee'];
const EXTRA=d=>({firma:d.firma,plan:d.plan,id4:d.id4,tipoCuenta:d.tipoCuenta,mll:d.mll,maxLoss:d.maxLoss,maxNQ:d.maxNQ,maxMNQ:d.maxMNQ,target:d.target,consEval:d.consEval,dllEval:d.dllEval,dll:d.dll,consist:d.consist,minDays:d.minDays,minDayProfit:d.minDayProfit,minPayout:d.minPayout,maxPayout:d.maxPayout,payoutsLive:d.payoutsLive,split:d.split,lock:d.lock,pagadoDesde:d.pagadoDesde,activ:d.activ,feeAct:d.feeAct});

/* ---- Buy ---- */
let FILES=[];
KT.hojaCuenta=function(){
  FILES=[];
  hoja(`<h1 style="margin-top:0">Buy an account</h1>
  <div class="f" style="margin-top:0"><span>Template (optional)</span>${psel('n-pl',['No template'].concat(S.plantillas.map(t=>t.nombre)),'No template','aplicarPlantilla')}</div>
  <div class="f"><span>Account terms or rules (PDF or screenshot)</span>
   <label class="btn2 file" style="width:100%">Upload files<input type="file" id="n-pdf" accept="application/pdf,image/*" multiple onchange="KT.cargarArchivos(this)"></label></div>
  <div id="n-files"></div>
  <button class="btn2" id="n-ai" style="width:100%;margin-top:9px" onclick="KT.leerContrato()">Read with AI</button>
  <div class="info" id="n-leido"></div>
  <h2 style="margin-top:20px">Review and confirm</h2>
  ${formCuenta('n',VACIO)}
  <div class="f"><span>Starts as</span>${psel('n-inicio',['Evaluation','Funded'],'Evaluation')}</div>
  <div class="err" id="n-err"></div>
  <button class="btn" onclick="KT.guardarCuenta()">Save account</button>
  <button class="btn2" style="width:100%;margin-top:9px" onclick="KT.guardarPlantilla()">Save as template</button>`);
  KT.prevNombre('n');
};
KT.aplicarPlantilla=function(nom){
  const t=S.plantillas.find(x=>x.nombre===nom);if(!t)return;const c=t.c,v=valoresDe(norm(Object.assign({id:0,size:c.size},c,{fee:c.fee||0})));
  setV('n-firma',v.firma);setV('n-plan',v.plan);setV('n-id4','');
  setV('n-tipo',TIPOS.includes(c.tipoCuenta)?c.tipoCuenta:'Other');if(!TIPOS.includes(c.tipoCuenta)){setV('n-tipoOtro',c.tipoCuenta);$('n-otroW').style.display='block'}else $('n-otroW').style.display='none';
  setV('n-mll',c.mll);CAMPOS.forEach(k=>{if(!['firma','plan','id4','fee'].includes(k))setV('n-'+k,v[k]==null?'':v[k])});
  setV('n-fee','');setV('n-from',c.pagadoDesde||'Vanguard');setV('n-activ',c.activ);activCbG('n',c.activ);setV('n-feeAct',z(c.feeAct));
  KT.prevNombre('n');const m=$('n-leido');m.classList.add('on');m.textContent='Template loaded. The cost is missing and, if you have it, the ID.';
};
KT.guardarPlantilla=function(){
  const d=leerCampos('n');d.fee=isNaN(d.fee)?0:d.fee;const e=validar(d,false);if(e){$('n-err').textContent=e;return}
  const nom=[d.firma,d.plan,d.size>=1000?d.size/1000+'K':d.size].filter(Boolean).join(' ');
  const c=Object.assign({},d);delete c.id4;const i=S.plantillas.findIndex(t=>t.nombre===nom);
  if(i>=0)S.plantillas[i].c=c;else S.plantillas.push({id:'t'+Date.now(),nombre:nom,c});
  guardar();toast('Template saved: '+nom);
};
/* ---- Read terms with AI (Gemini, from the Apps Script) ---- */
const MAX_FILE=7*1024*1024;
function pintaArchivos(){$('n-files').innerHTML=FILES.map((f,i)=>`<div class="fl"><span>${esc(f.name)} · ${f.estado}</span><button class="link" onclick="KT.quitaArchivo(${i})">Remove</button></div>`).join('')}
KT.quitaArchivo=function(i){FILES.splice(i,1);pintaArchivos()};
function aBase64(file){return new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>res(String(fr.result).split(',')[1]||'');fr.onerror=()=>rej(new Error('read'));fr.readAsDataURL(file)})}
KT.cargarArchivos=async function(inp){
  const files=[...inp.files];inp.value='';
  for(const f of files){
    if(FILES.length>=4){toast('Up to 4 files');break}
    if(f.size>MAX_FILE){toast(f.name+' is too big (max 7 MB)');continue}
    const o={name:f.name,type:f.type||'application/pdf',b64:'',estado:'loading...'};FILES.push(o);pintaArchivos();
    try{o.b64=await aBase64(f);o.estado=Math.max(1,Math.round(f.size/1024))+' KB · ready'}catch(e){o.estado='could not read it'}
    pintaArchivos();
  }
};
const NOM={firma:'prop firm',plan:'plan',id4:'account ID',size:'size',tg:'target',ml:'MLL',dlle:'evaluation DLL',dll:'funded DLL',cse:'evaluation consistency',cs:'funded consistency',md:'winning days',mdp:'winning day amount',ptl:'withdrawals to Live',mq:'max NQ',mm:'max MNQ',sp:'split',mp:'minimum withdrawal',xp:'max payout',lock:'floor stop',tipo:'account type',mll:'how the MLL moves',activ:'activation'};
const OPCIONALES=['tipo','mll','activ','lock','ptl','md','mdp','mp','sp','cse','dlle','id4'];
KT.leerContrato=async function(){
  const m=$('n-leido'),btn=$('n-ai');m.classList.add('on');
  const listos=FILES.filter(f=>f.b64);
  if(!listos.length){m.textContent=FILES.length?'Wait for the files to finish loading.':'Upload a file first.';return}
  btn.disabled=true;m.textContent='Reading...';
  try{
    const r=await CALL('leerContrato',{archivos:listos.map(f=>({nombre:f.name,tipo:f.type,datos:f.b64}))});
    const c=r.campos||{},hall=[],falta=[];
    Object.keys(NOM).forEach(k=>{
      let v=c[k];const vacio=v==null||v===''||(typeof v==='number'&&isNaN(v));
      if(!vacio){
        if(k==='tipo'&&!TIPOS.includes(v))v=null;
        if(k==='mll'&&!MLLS.includes(v))v=null;
        if(k==='activ'&&!ACTIVS.includes(v))v=null;
      }
      if(!vacio&&v!=null){hall.push(NOM[k]);
        if(k==='tipo'){setV('n-tipo',v);$('n-otroW').style.display='none'}
        else if(k==='activ'){setV('n-activ',v);activCbG('n',v)}
        else setV('n-'+k,v);
      }else if(!OPCIONALES.includes(k))falta.push(NOM[k]);
    });
    KT.prevNombre('n');
    const rev=Array.isArray(r.notas)?r.notas.filter(Boolean):[];
    m.innerHTML=`<b>Found:</b> ${hall.join(', ')||'nothing'}.${falta.length?`<br><b>Not found:</b> ${falta.join(', ')}. Fill them in by hand.`:''}${rev.length?`<br><b>Check:</b> ${rev.map(esc).join(', ')}.`:''}`;
  }catch(e){m.textContent=e.message||'Could not read the files.'}
  finally{btn.disabled=false}
};
KT.guardarCuenta=function(){
  const d=leerCampos('n'),inicio=$('n-inicio').value==='Funded'?'funded':'eval',e=validar(d,inicio==='eval');
  if(e){$('n-err').textContent=e;return}
  const nom=nombreDe(d);if(d.id4&&S.cuentas.some(c=>c.nombre===nom)){$('n-err').textContent=nom+' already exists.';return}
  const id=S.cuentas.reduce((a,c)=>Math.max(a,c.id),0)+1;
  S.cuentas.push(nuevaCuenta(id,d.size,inicio,d.fee,EXTRA(d)));
  cerrarHoja();render();guardar();toast(nom+' added');
};

/* ---- Edit account ---- */
let ELIM=false;
KT.hojaEditar=function(id){
  const c=acc(id);ELIM=false;
  hoja(`<h1 style="margin-top:0">Edit account</h1><div class="lbl">${esc(c.nombre)}</div>
  ${formCuenta('e',valoresDe(c))}
  <div class="err" id="e-err"></div><button class="btn" onclick="KT.guardarEditar(${id})">Save changes</button>
  <button class="btn2" id="e-del" style="width:100%;margin-top:9px;color:var(--gold)" onclick="KT.eliminarCuenta(${id})">Delete account</button>`);
  KT.prevNombre('e');
};
KT.guardarEditar=function(id){
  const c=acc(id),d=leerCampos('e'),e=validar(d,false);if(e){$('e-err').textContent=e;return}
  const nom=nombreDe(d);if(d.id4&&S.cuentas.some(x=>x.id!==id&&x.nombre===nom)){$('e-err').textContent=nom+' already exists.';return}
  Object.assign(c,EXTRA(d),{start:d.size,size:d.size,fee:d.fee,feeAct:d.feeAct});
  c.nombre=nombreDe(c);recalcular(c);const b=[];chequear(c,b);cerrarHoja();render();guardar();toast(b.length?c.nombre+' is now Blown':'Changes saved');
};
KT.eliminarCuenta=function(id){
  if(!ELIM){ELIM=true;$('e-del').textContent='Tap again to delete (removes its results and withdrawals)';return}
  S.cuentas=S.cuentas.filter(c=>c.id!==id);S.log=S.log.filter(t=>t.acc!==id);S.retiros=S.retiros.filter(r=>r.acc!==id);
  S.vista='resumen';cerrarHoja();render();guardar();toast('Account deleted');
};

/* ---- Templates ---- */
let PDEL=false;
KT.hojaPlantillas=function(){
  hoja(`<h1 style="margin-top:0">Templates</h1>
  ${S.plantillas.length?S.plantillas.map(t=>`<button class="opt" onclick="KT.hojaPlantilla('${esc(t.id)}')"><span><span class="nm" style="font-size:14px">${esc(t.nombre)}</span><br><span class="lbl">MLL ${usd(t.c.maxLoss||0)} · Target ${usd(t.c.target||0)}</span></span><span style="color:var(--mut)">›</span></button>`).join(''):'<div class="lbl" style="padding:10px">You have no templates. Create one with "Save as template" when buying an account.</div>'}`);
};
KT.hojaPlantilla=function(id){
  const t=S.plantillas.find(x=>x.id===id);if(!t)return;PDEL=false;const c=t.c;
  hoja(`<div class="back" onclick="KT.hojaPlantillas()">← Templates</div><h1 style="margin-top:0">Edit template</h1>
  ${tx('t-nom','Template name',t.nombre)}
  ${formCuenta('t',valoresDe(norm(Object.assign({id:0,size:c.size},c,{fee:c.fee||0}))))}
  <div class="err" id="t-err"></div><button class="btn" onclick="KT.guardarPlantillaEd('${esc(id)}')">Save changes</button>
  <button class="btn2" id="t-del" style="width:100%;margin-top:9px;color:var(--gold)" onclick="KT.eliminarPlantilla('${esc(id)}')">Delete template</button>`);
  ['t-id4','t-prev'].forEach(k=>{const e=$(k);if(e)(e.closest('label')||e).style.display='none'});
};
KT.guardarPlantillaEd=function(id){
  const t=S.plantillas.find(x=>x.id===id),nom=$('t-nom').value.trim(),d=leerCampos('t');d.fee=isNaN(d.fee)?0:d.fee;
  if(!nom){$('t-err').textContent='Enter the name.';return}
  const e=validar(d,false);if(e){$('t-err').textContent=e;return}
  if(S.plantillas.some(x=>x.id!==id&&x.nombre===nom)){$('t-err').textContent='A template with that name already exists.';return}
  const c=Object.assign({},d);delete c.id4;t.nombre=nom;t.c=c;guardar();KT.hojaPlantillas();toast('Template saved');
};
KT.eliminarPlantilla=function(id){
  if(!PDEL){PDEL=true;$('t-del').textContent='Tap again to delete (accounts do not change)';return}
  S.plantillas=S.plantillas.filter(x=>x.id!==id);guardar();KT.hojaPlantillas();toast('Template deleted');
};

/* ============ Day result ============ */
let D=null;
KT.hojaDia=function(id){
  const act=S.cuentas.filter(activa);if(!act.length){toast('You have no active accounts');return}
  D={acc:id||act[0].id,fecha:HOY,signo:'G',monto:'',nota:'',pop:null,mes:HOY.slice(0,7),err:''};
  hoja(`<h1 style="margin-top:0">Day result</h1><div id="d-box"></div>`);pintaDia();
};
const dupN=c=>S.cuentas.filter(x=>x.nombre===c.nombre).length>1;
function pintaDia(){
  if(!$('d-box'))return;
  const act=S.cuentas.filter(activa),c=acc(D.acc),[y,m]=D.mes.split('-').map(Number),off=(new Date(y,m-1,1).getDay()+6)%7,dim=new Date(y,m,0).getDate(),esHoy=HOY.slice(0,7)===D.mes;
  let celdas='';for(let i=0;i<off;i++)celdas+='<span></span>';
  for(let d=1;d<=dim;d++){const f=y+'-'+pad(m)+'-'+pad(d);celdas+=`<button ${f>HOY?'disabled':''} class="${f===D.fecha?'on':''}" onclick="KT.dSet('fecha','${f}',1)">${d}</button>`}
  $('d-box').innerHTML=`<div class="f" style="margin-top:0"><span>Account</span><div class="pop"><button class="pbtn" onclick="KT.dP('cta')"><span>${esc(c.nombre)}${dupN(c)?' ('+c.id+')':''}</span><span style="color:var(--mut)">▾</span></button>
    <div class="plist ${D.pop==='cta'?'on':''}">${act.map(x=>`<button class="opt ${x.id===D.acc?'on':''}" onclick="KT.dSet('acc',${x.id},1)"><span>${esc(x.nombre)}${dupN(x)?' ('+x.id+')':''} <span class="tag ${x.estado}" style="margin-left:6px">${ESTADO[x.estado]}</span></span></button>`).join('')}</div></div></div>
   <div class="f"><span>Date</span><div class="pop"><button class="pbtn" onclick="KT.dP('fecha')"><span>${fmtFecha(D.fecha)}</span><span style="color:var(--mut)">▾</span></button>
    <div class="plist ${D.pop==='fecha'?'on':''}"><div class="calh"><button onclick="KT.dMes(-1)">‹</button><span>${MONTHS[m-1]} ${y}</span><button ${esHoy?'disabled':''} onclick="KT.dMes(1)">›</button></div>
     <div class="cal">${['M','T','W','T','F','S','S'].map(x=>`<span>${x}</span>`).join('')}${celdas}</div><button class="btn2" style="width:100%;margin-top:8px" onclick="KT.dSet('fecha','${HOY}',1)">Today</button></div></div></div>
   <div class="g2"><div class="f"><span>It was a</span><div class="seg"><button class="${D.signo==='G'?'on':''}" onclick="KT.dSet('signo','G',1)">Profit</button><button class="${D.signo==='P'?'on':''}" onclick="KT.dSet('signo','P',1)">Loss</button></div></div>
    <label class="f"><span>Amount (USD)</span><input class="inp" id="d-monto" type="text" inputmode="decimal" autocomplete="off" value="${esc(D.monto)}" oninput="KT.dIn(this)"></label></div>
   <label class="f"><span>Note (optional)</span><input class="inp" id="d-nota" type="text" maxlength="60" autocomplete="off" value="${esc(D.nota)}" oninput="KT.dNota(this)"></label>
   <div class="err">${esc(D.err)}</div><button class="btn" onclick="KT.guardarDia()">Save result</button>`;
}
KT.dIn=function(el){D.monto=el.value.replace(/[^0-9.,]/g,'');if(D.monto!==el.value)el.value=D.monto};
KT.dNota=function(el){D.nota=el.value};
KT.dP=function(k){D.pop=D.pop===k?null:k;pintaDia()};
KT.dSet=function(k,v,cierra){D[k]=v;D.err='';if(cierra)D.pop=null;pintaDia()};
KT.dMes=function(d){const [y,m]=D.mes.split('-').map(Number),x=new Date(y,m-1+d,1);D.mes=x.getFullYear()+'-'+pad(x.getMonth()+1);pintaDia()};
KT.guardarDia=function(){
  const m=parseP(D.monto);if(!(m>0)){D.err='Enter the amount.';pintaDia();return}
  const c=acc(D.acc),v=(D.signo==='P'?-1:1)*m,q=[];
  addDay(c,D.fecha,v);
  let nota=D.nota.trim();if(/^[=+\-@]/.test(nota))nota=' '+nota;
  S.log.push({id:Date.now(),acc:c.id,fecha:D.fecha,monto:v,nota,ts:nowTs()});chequear(c,q);
  const dll=dllAlcanzado(c);D=null;cerrarHoja();render();guardar();
  toast(q.length?c.nombre+' touched the floor: Blown.':dll?c.nombre+' reached the DLL.':'Result saved');
};
KT.quitarDia=function(id){
  const t=S.log.find(x=>x.id===id);if(!t)return;const c=acc(t.acc);
  if(c)addDay(c,t.fecha,-t.monto);S.log=S.log.filter(x=>x.id!==id);render();guardar();toast('Result removed');
};

/* ============ Drawing ============ */
function render(){
  if(!R)return;
  HOY=iso(new Date());
  if(rollover())guardar();
  const app=R.getElementById('app');
  let html;
  if(S.error&&!S.cuentas.length){
    html=`<div class="card"><div class="nm">Could not load Trading</div><div class="lbl" style="margin-top:6px">${esc(S.error)}</div><button class="btn2" style="width:100%;margin-top:12px" onclick="KT.reintentar()">Try again</button></div>`;
  }else html=S.vista==='cuenta'?vCuenta():vResumen();
  app.innerHTML=`<div class="root ${S.vista==='cuenta'&&acc(S.sel)?'det':''}">${html}</div>`;
}
KT.reintentar=function(){S.error='';loadRemote(true)};
/* ============ Mount ============ */
KT.mount=function(hostEl,opts){
  OPTS=opts||{};CALL=OPTS.call;
  R=hostEl.attachShadow({mode:'open'});
  R.innerHTML='<style>'+window.KT_CSS+'</style><div id="app"></div>';
  if(OPTS.fabBottom)hostEl.style.setProperty('--fab-b',OPTS.fabBottom);
  if(OPTS.fabRight)hostEl.style.setProperty('--fab-r',OPTS.fabRight);
  const oh=document.createElement('div');document.body.appendChild(oh);
  if(OPTS.fabBottom)oh.style.setProperty('--fab-b',OPTS.fabBottom);
  O=oh.attachShadow({mode:'open'});
  O.innerHTML='<style>'+window.KT_CSS+'</style><div class="bg" id="bg"></div><div class="sheet" id="sheet" role="dialog" aria-label="Trading"></div><div class="toast" id="toast"></div>';
  O.getElementById('bg').addEventListener('click',cerrarHoja);
  const fuera=e=>{const p=e.composedPath();if(!p.some(n=>n.classList&&n.classList.contains('pop'))){cerrarListas();if(D&&D.pop&&$('d-box')){D.pop=null;pintaDia()}}};
  document.addEventListener('click',fuera);
  if(cargarCache())S.error='';
  render();
  loadRemote(false);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&READY){if(hayPend())flush();else loadRemote(false)}});
};
/* Called when the Trading window becomes visible */
KT.refresh=function(manual){if(!CALL)return;if(READY&&hayPend())flush();else loadRemote(!!manual);render()};
})();
