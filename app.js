const WORKOUTS_PADRAO={
A:{day:"Terça",ex:[
{id:"legpress",name:"Leg press 45°",target:"10-12",rest:120,kind:"strength",range:[10,12],tip:"Rampa inclinada, pés na largura dos ombros. <b>Desça só até antes de sentir a bacia começar a girar para trás.</b> Não é preciso trazer os joelhos perto do peito. Sempre bilateral nesta fase."},
{id:"flexora",name:"Cadeira flexora",target:"12-15",rest:90,kind:"strength",range:[12,15],tip:"Sentado, rolo atrás das panturrilhas, costas totalmente apoiadas. Sem deslocar o quadril para buscar mais amplitude."},
{id:"chest",name:"Supino na máquina",target:"10-12",rest:120,kind:"strength",range:[10,12],tip:"Manoplas na altura do meio do peito. Costas no encosto; <b>não arqueie a lombar para completar a repetição</b>. Volta controlada."},
{id:"remada",name:"Remada com apoio no peito",target:"10-12",rest:120,kind:"strength",range:[10,12],tip:"Peito apoiado. Não retire o peito do apoio nem balance o tronco para puxar mais peso."},
{id:"lateral",name:"Elevação lateral sentado",target:"12-15",rest:60,kind:"strength",range:[12,15],tip:"Banco com encosto e halteres leves. Suba até a linha dos ombros sem inclinar o tronco."},
{id:"panturrilha",name:"Panturrilha sentado",target:"15-20",rest:60,kind:"strength",range:[15,20],tip:"Movimento controlado. Nesta fase, prefira a versão sentada; a versão em pé não é proibida para sempre."},
{id:"birddog",name:"Bird dog",target:"6-8/lado · 6-8s",rest:45,kind:"bird",range:[6,8],tip:"Quatro apoios, coluna neutra. Braço e perna opostos <b>até a linha do corpo, não acima</b>. Mantenha a pelve estável."}
]},
B:{day:"Quinta",ex:[
{id:"flexora",name:"Cadeira flexora",target:"12-15",rest:90,kind:"strength",range:[12,15],tip:"Costas apoiadas. Não use o tronco para ajudar."},
{id:"extensora",name:"Cadeira extensora",target:"12-15",rest:90,kind:"strength",range:[12,15],tip:"Costas no encosto e quadril estável durante toda a série."},
{id:"pulldown",name:"Puxada frontal",target:"10-12",rest:120,kind:"strength",range:[10,12],tip:"Puxe até a clavícula <b>sem inclinar nem balançar o tronco</b>. Nunca atrás da nuca."},
{id:"desenv",name:"Desenvolvimento na máquina",target:"10-12",rest:90,kind:"strength",range:[10,12],tip:"Encosto alto e carga leve. Se precisar arquear a lombar para empurrar, reduza a carga."},
{id:"rosca",name:"Rosca direta sentado",target:"10-12",rest:60,kind:"strength",range:[10,12],tip:"Banco com encosto, cotovelos junto ao tronco e sem impulso das costas."},
{id:"abdutora",name:"Cadeira abdutora",target:"12-15",rest:60,kind:"strength",range:[12,15],tip:"Empurre os apoios para fora. Não force amplitude final se a pelve começar a se mover."},
{id:"prancha",name:"Prancha lateral",target:"20-30s/lado",rest:45,kind:"plank",range:[20,30],tip:"Comece com joelhos flexionados a 90° se necessário. Progrida quando mantiver alinhamento limpo."}
]},
C:{day:"Sábado",ex:[
{id:"hipthrust",name:"Elevação pélvica (hip thrust)",target:"10-12",rest:120,kind:"strength",range:[10,12],tip:"<b>Subiu → alinhou → contraiu os glúteos → parou.</b> Não ganhe altura arqueando a lombar."},
{id:"legpress",name:"Leg press 45°",target:"10-12",rest:120,kind:"strength",range:[10,12],tip:"Mesma técnica da terça. Pare antes de a pelve começar a girar para trás."},
{id:"peck",name:"Peck deck",target:"10-12",rest:90,kind:"strength",range:[10,12],tip:"Costas apoiadas, cotovelos levemente flexionados e sem impulso do tronco."},
{id:"pulldownN",name:"Puxada pegada neutra",target:"10-12",rest:120,kind:"strength",range:[10,12],tip:"Tronco quase vertical e estável. Não transforme a puxada em extensão do tronco."},
{id:"triceps",name:"Tríceps na polia com corda",target:"10-12",rest:60,kind:"strength",range:[10,12],tip:"Fique ereto. Se precisar inclinar o tronco para terminar, a série acabou."},
{id:"martelo",name:"Rosca martelo",target:"10-12",rest:60,kind:"strength",range:[10,12],tip:"Banco com encosto, palmas uma para a outra e cotovelos próximos ao corpo."},
{id:"pallof",name:"Pallof hold",target:"15-20s/lado",rest:45,kind:"pallof",range:[15,20],tip:"Carga muito leve. <b>Apenas impeça o corpo de girar.</b> Quando 20s estiverem confortáveis, o próximo passo é Pallof press."},
{id:"curlup",name:"McGill curl-up",target:"6-8 · 8s",rest:45,kind:"curl",range:[6,8],tip:"Preserve a curvatura da lombar. Suba apenas cabeça e ombros como um bloco; a lombar não deve achatar no chão."}
]}}
let WORKOUTS = JSON.parse(JSON.stringify(WORKOUTS_PADRAO));
const PHASES=[
{name:"Semanas 1-2",sets:2,reserve:"4-5 reps em reserva",note:"A na terça e C no sábado. Aprender aparelhos e amplitude.",weekly:2},
{name:"A partir da semana 3",sets:2,reserve:"3-4 reps em reserva",note:"B entra apenas se não houver piora dos sintomas e a recuperação estiver boa.",weekly:3},
{name:"Fase seguinte",sets:3,reserve:"2-3 reps em reserva",note:"Progressão de carga pelo critério de execução.",weekly:3}
]
const APP_VERSAO="2.9.1";
const STORAGE="iogui-v2";const OLD_STORAGE="treino-dados";
const MAX_BACKUP_BYTES=5*1024*1024;
const MAX_PROGRAM_BYTES=512*1024;
const MAX_HISTORY_ENTRIES=1000;
const MAX_HISTORY_ITEMS=100;
const MAX_SETS_PER_ITEM=8;
const $=q=>document.querySelector(q), $$=q=>[...document.querySelectorAll(q)];
const defaultData=()=>({version:2,profile:{name:"Roque",start:new Date().toISOString().slice(0,10)},phase:0,autoAdvance:true,history:[],videos:{},inProgress:null,programa:{url:"",json:null,versao:"",atualizado:"",modo:"padrao"},som:{ativo:true}});
let data=defaultData(), installPrompt=null, timerId=null, autoAdvanceTimer=null;
let editorProgram=null, editorCtx=null, pendingDelete=null;
function novoId(prefix='h'){try{return prefix+'-'+crypto.randomUUID()}catch(e){return prefix+'-'+Date.now()+'-'+Math.random().toString(36).slice(2,9)}}
function garantirIdsHistorico(){let mudou=false;(data.history||[]).forEach(h=>{if(!h.id){h.id=novoId('treino');mudou=true}});return mudou}


function normalizarProgramaState(p){const raw=p||{},tinhaModo=!!raw.modo;const out=Object.assign(defaultData().programa,raw);if(!tinhaModo)out.modo=out.url?'remoto':(out.json?'local':'padrao');return out}
function load(){try{const raw=localStorage.getItem(STORAGE);if(raw){data=sanitizarEstado(JSON.parse(raw));data.programa=normalizarProgramaState(data.programa);garantirIdsHistorico();save();return}const old=localStorage.getItem(OLD_STORAGE);if(old){const o=JSON.parse(old),m=defaultData();m.phase=Math.max(0,Math.min(2,o.fase||0));m.history=(o.historico||[]).map(s=>({id:novoId('treino'),workout:s.treino,iso:s.iso,phase:m.phase,weeklyGoal:(PHASES[m.phase]||PHASES[0]).weekly,items:(s.itens||[]).map(it=>({id:it.id,name:it.nome,summary:it.resumo,signal:it.sinal,sets:[]}))}));m.videos=o.videos||{};data=sanitizarEstado(m);save()}}catch(e){console.warn('Iogui: dados locais inválidos; iniciando estado seguro.',e);data=defaultData()}}
function save(){localStorage.setItem(STORAGE,JSON.stringify(data))}
function aplicarProgramaSalvo(){
  if(!data.programa || !data.programa.json) return;
  const v = validarPrograma(data.programa.json);
  if(v.ok) aplicarPrograma(v); else data.programa.json = null;
}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),2200)}
function phase(){return PHASES[data.phase]||PHASES[0]}

/* ---------- Ficha substituivel ----------
   A ficha vive num arquivo .json separado. O app le esse arquivo de uma URL
   (GitHub cru ou GitHub Pages), guarda uma copia local e so troca a ficha se o
   arquivo passar na validacao. Arquivo invalido nunca derruba o app. */
function escHtml(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}
function tipSeguro(v){
  let s=escHtml(String(v??''));
  s=s.replace(/&lt;(\/?)(b|strong)&gt;/gi,'<$1$2>');
  s=s.replace(/&lt;br\s*\/?&gt;/gi,'<br>');
  return s;
}
function textoSemMarkup(v,campo){const s=String(v??'').trim();if(/[<>]/.test(s))throw new Error(`${campo} não pode conter HTML.`);return s}
function validarPrograma(obj){
  try{
    if(!obj || typeof obj !== 'object' || Array.isArray(obj)) return {ok:false, erro:'Arquivo não é um objeto JSON.'};
    const treinos = obj.treinos || obj.workouts;
    if(!treinos || typeof treinos !== 'object' || Array.isArray(treinos)) return {ok:false, erro:'Faltando a chave "treinos".'};
    const chaves = Object.keys(treinos);
    if(!chaves.length) return {ok:false, erro:'Nenhum treino no arquivo.'};
    const limpo = {}; const dias = new Set();
    for(const k0 of chaves){
      const k=String(k0);
      if(!/^[A-Za-z0-9_-]{1,20}$/.test(k)) return {ok:false, erro:`Identificador de treino inválido: "${k}".`};
      const t = treinos[k0];
      if(!t || !Array.isArray(t.ex) || !t.ex.length) return {ok:false, erro:`Treino "${k}" sem lista de exercícios.`};
      let weekday=null;
      if(t.weekday!==undefined && t.weekday!==null){
        if(!Number.isInteger(t.weekday) || t.weekday<0 || t.weekday>6) return {ok:false, erro:`weekday do treino "${k}" deve estar entre 0 e 6.`};
        weekday=t.weekday;
        if(dias.has(weekday)) return {ok:false, erro:`Há mais de um treino configurado para o mesmo weekday (${weekday}).`};
        dias.add(weekday);
      }
      const ids = new Set(), ex=[];
      for(const e of t.ex){
        if(!e || e.id===undefined || e.name===undefined) return {ok:false, erro:`Exercício sem "id" ou "name" no treino "${k}".`};
        const id=String(e.id).trim();
        if(!/^[A-Za-z0-9_-]{1,64}$/.test(id)) return {ok:false, erro:`ID de exercício inválido no treino "${k}": "${id}".`};
        if(ids.has(id)) return {ok:false, erro:`Exercício "${id}" repetido dentro do treino "${k}".`};
        ids.add(id);
        const kind=String(e.kind||'strength');
        if(!['strength','bird','plank','pallof','curl'].includes(kind)) return {ok:false, erro:`kind inválido em "${id}": ${kind}.`};
        const rest=Number(e.rest);
        if(!Number.isFinite(rest) || rest<15 || rest>300) return {ok:false, erro:`Descanso de "${id}" deve ser um número entre 15 e 300 segundos.`};
        if(!Array.isArray(e.range) || e.range.length!==2) return {ok:false, erro:`range de "${id}" deve ter dois números.`};
        const r0=Number(e.range[0]), r1=Number(e.range[1]);
        if(!Number.isFinite(r0)||!Number.isFinite(r1)||r0<=0||r1<r0) return {ok:false, erro:`range inválido em "${id}".`};
        const name=textoSemMarkup(e.name,`name de ${id}`);
        const target=textoSemMarkup(e.target||`${r0}-${r1}`,`target de ${id}`);
        ex.push({id,name,target,rest,kind,range:[r0,r1],tip:tipSeguro(e.tip||'Sem observação cadastrada para este exercício.')});
      }
      const day=textoSemMarkup(t.day||t.dia||k,`day do treino ${k}`);
      limpo[k]={day,weekday,bloqueadoFase0:!!t.bloqueadoFase0,ex};
    }
    return {ok:true, treinos:limpo, versao:textoSemMarkup(obj.versao||obj.version||'','versao'), nome:textoSemMarkup(obj.nome||'','nome')};
  }catch(err){return {ok:false, erro:err?.message||'Ficha inválida.'}}
}
/* ---------- Camada de segurança v2.9 ---------- */
function textoPlanoSeguro(v,max=240){
  return String(v??'')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,' ')
    .replace(/[<>]/g,'')
    .slice(0,max);
}
function idSeguro(v,max=64){
  const s=String(v??'').trim();
  return new RegExp(`^[A-Za-z0-9_-]{1,${max}}$`).test(s)?s:'';
}
function isoSeguro(v,fallback=''){
  const s=String(v??'').trim(),t=Date.parse(s);
  return Number.isFinite(t)?new Date(t).toISOString():fallback;
}
function diaSeguro(v,fallback=''){
  const s=String(v??'').trim();
  if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return fallback;
  const d=new Date(s+'T12:00:00Z');
  return Number.isFinite(d.getTime())?s:fallback;
}
function valorSerieSeguro(v){
  if(v===null||v===undefined||v==='')return '';
  const s=String(v).trim().replace(',','.');
  if(!/^\d{1,5}(?:\.\d{1,3})?$/.test(s))return '';
  const n=Number(s);
  return Number.isFinite(n)&&n>=0&&n<=99999?s:'';
}
function setSeguro(raw){
  const s=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{},out={};
  ['load','reps','hold'].forEach(k=>{if(k in s)out[k]=valorSerieSeguro(s[k])});
  return out;
}
function itemHistoricoSeguro(raw){
  if(!raw||typeof raw!=='object'||Array.isArray(raw))return null;
  const id=idSeguro(raw.id);
  if(!id)return null;
  const sets=Array.isArray(raw.sets)?raw.sets.slice(0,MAX_SETS_PER_ITEM).map(setSeguro):[];
  const sig=['v','a','r'].includes(raw.signal)?raw.signal:'';
  return {id,name:textoPlanoSeguro(raw.name||id,100),summary:textoPlanoSeguro(raw.summary||'',600),signal:sig,sets};
}
function entradaHistoricoSegura(raw){
  if(!raw||typeof raw!=='object'||Array.isArray(raw))return null;
  const workout=idSeguro(raw.workout,20),iso=isoSeguro(raw.iso);
  if(!workout||!iso)return null;
  const phaseN=Number(raw.phase),phaseSafe=Number.isInteger(phaseN)?Math.max(0,Math.min(2,phaseN)):0;
  const g=Number(raw.weeklyGoal);
  const items=Array.isArray(raw.items)?raw.items.slice(0,MAX_HISTORY_ITEMS).map(itemHistoricoSeguro).filter(Boolean):[];
  return {id:idSeguro(raw.id,100)||novoId('treino'),workout,iso,started:isoSeguro(raw.started,''),phase:phaseSafe,weeklyGoal:Number.isFinite(g)&&g>=1&&g<=7?Math.round(g):(PHASES[phaseSafe]||PHASES[0]).weekly,items};
}
function urlVideoSegura(raw){
  const s=String(raw??'').trim();
  if(!s)return '';
  if(s.length>2048)throw new Error('Endereço de vídeo muito longo.');
  let u;try{u=new URL(s)}catch(e){throw new Error('Endereço de vídeo inválido.')}
  if(u.protocol!=='https:')throw new Error('O vídeo precisa usar https://.');
  u.username='';u.password='';return u.href;
}
function youtubeIdSeguro(raw){
  let u;try{u=new URL(urlVideoSegura(raw))}catch(e){return ''}
  const host=u.hostname.toLowerCase().replace(/^www\./,''),p=u.pathname;let id='';
  if(host==='youtu.be')id=p.split('/').filter(Boolean)[0]||'';
  else if(host==='youtube.com'||host==='m.youtube.com'||host==='youtube-nocookie.com'){
    if(p==='/watch')id=u.searchParams.get('v')||'';
    else{const m=p.match(/^\/(?:shorts|embed)\/([A-Za-z0-9_-]+)/);if(m)id=m[1]}
  }
  return /^[A-Za-z0-9_-]{6,20}$/.test(id)?id:'';
}
function urlFichaPermitida(raw){
  const s=String(raw??'').trim();
  if(!s)return '';
  if(s.length>2048)throw new Error('Endereço da ficha muito longo.');
  let u;try{u=new URL(s,location.href)}catch(e){throw new Error('Endereço da ficha inválido.')}
  if(u.protocol!=='https:')throw new Error('A ficha remota precisa usar https://.');
  const mesmoSite=(location.protocol==='https:'&&u.origin===location.origin);
  const githubRaw=u.hostname.toLowerCase()==='raw.githubusercontent.com';
  if(!mesmoSite&&!githubRaw)throw new Error('Por segurança, use raw.githubusercontent.com ou este próprio site.');
  u.username='';u.password='';return u.href;
}
function programaCanonico(v){return {nome:v.nome||'',versao:v.versao||'',treinos:JSON.parse(JSON.stringify(v.treinos))}}
function sessaoSegura(raw){
  if(!raw||typeof raw!=='object'||Array.isArray(raw))return null;
  const workout=idSeguro(raw.workout,20);if(!workout||!Array.isArray(raw.items))return null;
  const items=raw.items.slice(0,MAX_HISTORY_ITEMS).map(it=>{
    if(!it||typeof it!=='object'||Array.isArray(it))return null;
    const id=idSeguro(it.id),kind=['strength','bird','plank','pallof','curl'].includes(it.kind)?it.kind:'strength';
    if(!id)return null;
    return {id,kind,sets:Array.isArray(it.sets)?it.sets.slice(0,MAX_SETS_PER_ITEM).map(setSeguro):[],signal:['v','a','r'].includes(it.signal)?it.signal:''};
  }).filter(Boolean);
  if(!items.length)return null;
  const ph=Number(raw.phase);
  return {workout,index:Number.isInteger(Number(raw.index))?Math.max(0,Math.min(items.length-1,Number(raw.index))):0,started:isoSeguro(raw.started,new Date().toISOString()),phase:Number.isInteger(ph)?Math.max(0,Math.min(2,ph)):0,items};
}
function sanitizarEstado(raw){
  if(!raw||typeof raw!=='object'||Array.isArray(raw))throw new Error('Backup não é um objeto válido.');
  if(!Array.isArray(raw.history))throw new Error('Backup sem histórico válido.');
  const out=defaultData();out.version=2;
  const profile=raw.profile&&typeof raw.profile==='object'&&!Array.isArray(raw.profile)?raw.profile:{};
  out.profile={name:textoPlanoSeguro(profile.name||'Roque',30)||'Roque',start:diaSeguro(profile.start,new Date().toISOString().slice(0,10))};
  const phaseN=Number(raw.phase);out.phase=Number.isInteger(phaseN)?Math.max(0,Math.min(2,phaseN)):0;out.autoAdvance=raw.autoAdvance!==false;
  out.history=raw.history.slice(0,MAX_HISTORY_ENTRIES).map(entradaHistoricoSegura).filter(Boolean);
  out.videos={};
  if(raw.videos&&typeof raw.videos==='object'&&!Array.isArray(raw.videos))Object.entries(raw.videos).slice(0,500).forEach(([k,v])=>{const id=idSeguro(k);if(!id)return;try{const safe=urlVideoSegura(v);if(safe)out.videos[id]=safe}catch(e){}});
  out.inProgress=sessaoSegura(raw.inProgress);
  const p=raw.programa&&typeof raw.programa==='object'&&!Array.isArray(raw.programa)?raw.programa:{},programa=defaultData().programa;
  if(p.json){const v=validarPrograma(p.json);if(v.ok){programa.json=programaCanonico(v);programa.versao=textoPlanoSeguro(p.versao||v.versao||'',60);programa.atualizado=isoSeguro(p.atualizado,'');programa.modo=['local','remoto'].includes(p.modo)?p.modo:'local'}}
  if(p.url){try{programa.url=urlFichaPermitida(p.url);if(programa.url&&programa.modo!=='local')programa.modo='remoto'}catch(e){programa.url='';if(programa.modo==='remoto')programa.modo=programa.json?'local':'padrao'}}
  if(!programa.json&&!programa.url)programa.modo='padrao';out.programa=programa;
  out.som={ativo:!(raw.som&&raw.som.ativo===false)};return out;
}

function aplicarPrograma(v){
  WORKOUTS = v.treinos;
  conferirSessao();
}
// Uma sessao aberta pode apontar para um treino que a ficha nova nao tem mais.
// Sem isto, finalizar o treino quebrava e os dados ficavam presos.
function sessaoCompativel(s,w){
  if(!s||!w||!Array.isArray(s.items)||s.items.length!==w.ex.length)return false;
  return s.items.every((it,i)=>{
    const ex=w.ex[i];if(!it||it.id!==ex.id)return false;
    if(it.kind && it.kind!==ex.kind)return false;
    const esperado=new Set(fieldsFor(ex).map(f=>f.k));
    const sets=Array.isArray(it.sets)?it.sets:[];
    return sets.every(set=>Object.keys(set||{}).every(k=>esperado.has(k)));
  });
}
function conferirSessao(){
  const s=data.inProgress;if(!s)return true;
  const w=WORKOUTS[s.workout];
  if(!sessaoCompativel(s,w)){
    clearTimeout(autoAdvanceTimer);autoAdvanceTimer=null;
    data.inProgress=null;
    try{save()}catch(e){}
    try{toast('A ficha mudou. O treino em andamento foi encerrado para evitar misturar exercícios.')}catch(e){}
    return false;
  }
  if(s.index>=w.ex.length){s.index=Math.max(0,w.ex.length-1);try{save()}catch(e){}}
  return true;
}

function usarProgramaPadrao(){
  WORKOUTS=JSON.parse(JSON.stringify(WORKOUTS_PADRAO));
  data.programa={url:"",json:null,versao:"",atualizado:"",modo:"padrao"};
  if(data.inProgress){data.inProgress=null;clearTimeout(autoAdvanceTimer);autoAdvanceTimer=null}
  save();renderSettings();renderHome();toast('Ficha padrão restaurada. Atualizações externas foram desativadas.');
}
function programaRemotoAtivo(){const p=data.programa||{};return !!String(p.url||'').trim() && p.modo!=='padrao' && p.modo!=='local'}

async function buscarPrograma(manual, timeoutMs=manual?8000:2200){
  let url='';
  try{url=urlFichaPermitida(data.programa?.url||'')}catch(e){if(manual)toast(e.message);return false}
  if(!url){if(manual)toast('Informe o endereço do arquivo da ficha.');return false}
  const ctl=new AbortController(), tm=setTimeout(()=>ctl.abort(),timeoutMs);
  try{
    const sep=url.includes('?')?'&':'?';
    const r=await fetch(url+sep+'t='+Date.now(),{cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:ctl.signal});
    if(!r.ok)throw new Error('HTTP '+r.status);
    const len=Number(r.headers.get('content-length')||0);
    if(Number.isFinite(len)&&len>MAX_PROGRAM_BYTES)throw new Error('Ficha grande demais.');
    const txt=await r.text();
    if(new Blob([txt]).size>MAX_PROGRAM_BYTES)throw new Error('Ficha grande demais.');
    const obj=JSON.parse(txt),v=validarPrograma(obj);
    if(!v.ok){if(manual)toast('Ficha recusada: '+v.erro);return false}
    data.programa=Object.assign(defaultData().programa,data.programa||{});
    data.programa.url=url;data.programa.json=programaCanonico(v);data.programa.versao=v.versao||new Date().toISOString().slice(0,10);
    data.programa.atualizado=new Date().toISOString();data.programa.modo='remoto';
    aplicarPrograma(v);save();
    if($('#view-settings')?.classList.contains('active'))renderSettings();
    renderHome();if(manual)toast('Ficha atualizada'+(v.versao?` para ${v.versao}`:'')+'.');
    return true;
  }catch(e){
    if(manual)toast(e?.name==='AbortError'?'A busca demorou demais. Tente novamente.':(e?.message==='Ficha grande demais.'?e.message:'Não consegui buscar a ficha. Verifique o endereço e a conexão.'));
    return false;
  }finally{clearTimeout(tm)}
}
function fieldsFor(ex){if(ex.kind==="bird")return[{k:"reps",u:"reps/lado",mode:"numeric"},{k:"hold",u:"s",mode:"numeric"}];if(ex.kind==="plank")return[{k:"hold",u:"s/lado",mode:"numeric"}];if(ex.kind==="pallof")return[{k:"load",u:"kg",mode:"decimal"},{k:"hold",u:"s/lado",mode:"numeric"}];if(ex.kind==="curl")return[{k:"reps",u:"reps",mode:"numeric"},{k:"hold",u:"s",mode:"numeric"}];return[{k:"load",u:"kg",mode:"decimal"},{k:"reps",u:"reps",mode:"numeric"}]}
function blankSet(ex){const s={};fieldsFor(ex).forEach(f=>s[f.k]="");return s}
function setSummary(ex,s){return fieldsFor(ex).filter(f=>s[f.k]!==""&&s[f.k]!=null).map(f=>`${s[f.k]} ${f.u}`).join(" × ")}
function itemSummary(ex,item){if(item.summary)return item.summary;return(item.sets||[]).map(s=>setSummary(ex,s)).filter(Boolean).join(" · ")||"sem carga anotada"}
function allExercisesUnique(){const m=new Map();Object.values(WORKOUTS).forEach(w=>w.ex.forEach(ex=>{if(!m.has(ex.id))m.set(ex.id,ex)}));return[...m.values()]}
function findEx(id){return allExercisesUnique().find(e=>e.id===id)}
function weekStart(d){const x=new Date(d);x.setHours(0,0,0,0);const n=(x.getDay()+6)%7;x.setDate(x.getDate()-n);return x.getTime()}
function countThisWeek(){const ws=weekStart(new Date());return data.history.filter(h=>weekStart(new Date(h.iso))===ws).length}
function goalHistorico(h){const g=Number(h?.weeklyGoal);if(Number.isFinite(g)&&g>0)return g;return (PHASES[h?.phase]||PHASES[0]).weekly}
function goalDaSemana(entries,fallback=phase().weekly){return entries.length?Math.max(...entries.map(goalHistorico)):fallback}
function streakWeeks(){
  const one=7*864e5,current=weekStart(new Date());
  const atual=data.history.filter(h=>weekStart(new Date(h.iso))===current),goalAtual=phase().weekly;
  let streak=0,i=atual.length>=goalAtual?0:1;
  for(;i<60;i++){
    const start=current-i*one,entries=data.history.filter(h=>weekStart(new Date(h.iso))===start);
    if(!entries.length)break;
    if(entries.length>=goalDaSemana(entries))streak++;else break;
  }
  return streak;
}
// Regra do braço: 2 treinos por semana mantêm o braço levantado. Uma semana
// encerrada com menos de 2 derruba o braço, e ele leva 2 treinos para subir de novo.
const MANUTENCAO = 2;
function armState(){
  const one = 7*864e5, current = weekStart(new Date());
  const hist = [...data.history].sort((a,b)=> new Date(a.iso) - new Date(b.iso));
  const doneNow = data.history.filter(h=>weekStart(new Date(h.iso))===current).length;
  if(!hist.length) return {raise:0, weeks:0, done:0, faltamSemana:MANUTENCAO, faltamSubir:MANUTENCAO, virgem:true};
  let semana = weekStart(new Date(hist[0].iso)), idx = 0, raise = 0, weeks = 0;
  while(semana <= current){
    let conta = 0;
    while(idx < hist.length && weekStart(new Date(hist[idx].iso)) === semana){ conta++; idx++; }
    if(semana < current){
      if(conta >= MANUTENCAO){ raise = MANUTENCAO; weeks++; }
      else { raise = 0; weeks = 0; }
    } else {
      raise = Math.min(MANUTENCAO, raise + conta);
      if(conta >= MANUTENCAO) weeks++;
    }
    semana += one;
  }
  return {raise, weeks, done:doneNow,
          faltamSemana: Math.max(0, MANUTENCAO - doneNow),
          faltamSubir: Math.max(0, MANUTENCAO - raise), virgem:false};
}
function armLevel(raise){ return raise >= 2 ? 3 : raise === 1 ? 1 : 0; }

function lastHistory(){return data.history[0]||null}
function worstSignal(session){const sig=(session?.items||[]).map(i=>i.signal);return sig.includes("r")?"r":sig.includes("a")?"a":sig.includes("v")?"v":""}
function chavesTreino(){return Object.keys(WORKOUTS)}
function scheduledWorkoutToday(){
  const d=new Date().getDay();
  const porWeekday=chavesTreino().find(k=>WORKOUTS[k].weekday===d);
  if(porWeekday) return porWeekday;
  const padrao={2:'A',4:'B',6:'C'}[d];
  return padrao && WORKOUTS[padrao] ? padrao : null;
}
function bloqueado(k){return data.phase===0 && (WORKOUTS[k]?.bloqueadoFase0 ?? k==='B')}
function todayWorkout(){const k=scheduledWorkoutToday();if(k&&bloqueado(k))return null;return k}
function localDayKey(d=new Date()){const x=new Date(d);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`}
function treinoConcluidoHoje(k){const hoje=localDayKey();return data.history.some(h=>h.workout===k&&localDayKey(h.iso)===hoje)}
function plannedToday(){const d=new Date().getDay(),sched=scheduledWorkoutToday();if(sched&&bloqueado(sched))return`${WORKOUTS[sched].day} · fase inicial: Treino ${sched} ainda bloqueado`;if(sched)return treinoConcluidoHoje(sched)?`Treino ${sched} · concluído hoje ✓`:`Treino ${sched} · ${WORKOUTS[sched].day}`;if(d===1||d===3||d===5)return"Pilates · sem musculação";if(d===0)return"Descanso";return"Dia livre da musculação"}
function yogiPx(x,y,w=1,h=1,f='#2f1a12'){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`}
function yogiSprite(level=0, cls='yogi-svg'){
  const O='#2f1a12', S='#d8a067', R='#f4ecd9', G='#2f7a53', B='#6b4228', H='#ead7b5';
  const base =
    yogiPx(7,1,4,1,S)+yogiPx(6,2,6,4,S)+
    yogiPx(7,3,1,1,O)+yogiPx(10,3,1,1,O)+
    yogiPx(6,5,1,1,B)+yogiPx(7,5,4,1,B)+yogiPx(11,5,1,1,B)+
    yogiPx(7,6,4,1,B)+yogiPx(8,7,2,1,B)+
    yogiPx(6,8,6,6,R)+yogiPx(7,11,4,1,G)+
    yogiPx(5,9,1,5,S)+yogiPx(5,14,1,1,B)+
    yogiPx(7,14,1,4,B)+yogiPx(10,14,1,4,B)+
    yogiPx(6,18,6,1,H)+yogiPx(4,19,10,1,'#8b5a2b');
  let arm = '';
  if(level===0){
    arm = yogiPx(12,9,1,4,S)+yogiPx(12,13,1,1,B)+yogiPx(11,13,1,1,S);
  }else if(level===1){
    arm = yogiPx(12,7,1,4,S)+yogiPx(13,5,1,2,S)+yogiPx(14,3,1,2,S)+yogiPx(14,2,1,1,B);
  }else if(level===2){
    arm = yogiPx(12,4,1,7,S)+yogiPx(12,1,1,3,S)+yogiPx(11,-1,2,2,B);
  }else{
    // Braço totalmente erguido: precisa passar da cabeça, por isso o viewBox
    // reserva espaço acima da figura.
    arm = yogiPx(12,-3,1,13,S)+yogiPx(11,-5,2,2,B);
  }
  return `<svg class="${cls}" viewBox="0 -6 18 26" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">${base}${arm}</svg>`;
}
function paintYogi(target, level=0, cls='yogi-svg'){
  const el = typeof target==='string' ? $(target) : target;
  if(!el) return;
  el.innerHTML = yogiSprite(level, cls);
}
function animateSplash(){
  const el = $('#splashYogi');
  if(!el) return;
  const seq = [0,1,2,3,2,3,3];
  let i = 0;
  const draw = () => paintYogi(el, seq[i], 'yogi-svg splash-svg');
  draw();
  const iv = setInterval(()=>{
    i++;
    if(i>=seq.length){
      clearInterval(iv);
      paintYogi(el, 3, 'yogi-svg splash-svg');
      return;
    }
    draw();
  }, 170);
}
function greeting(){const h=new Date().getHours();return h<12?"Bom dia":h<18?"Boa tarde":"Boa noite"}
function dayText(){return new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})}

function showView(name){$$('.view').forEach(v=>v.classList.toggle('active',v.id===`view-${name}`));$$('.navbtn').forEach(b=>b.classList.toggle('active',b.dataset.view===name));if(name==='home')renderHome();if(name==='progress')renderProgress();if(name==='settings')renderSettings();if(name==='session'){if(data.inProgress)renderSession();else openPicker()}
  if(lerDescanso())tickDescanso();}

function renderHome(){const n=data.profile.name||"Roque",t=todayWorkout(),feito=t&&treinoConcluidoHoje(t);$("#hello").textContent=`${greeting()}, ${n}. · ${dayText()}`;$("#homeTitle").textContent=feito?`Treino ${t} concluído hoje.`:(t?`Hoje é Treino ${t}.`:"Hoje, musculação não é obrigação.");$("#todayPlan").textContent=plannedToday();$("#phaseSummary").textContent=`${phase().name} · ${phase().sets} séries · ${phase().reserve}`;const last=lastHistory(),sig=worstSignal(last);$("#lastLumbar").innerHTML=last?`<i class="dot ${sig||'v'}"></i><span>Último treino: lombar ${sig==='r'?'vermelha':sig==='a'?'amarela':'verde'}</span>`:`<span class="muted">Nenhum treino salvo ainda.</span>`;$("#startToday").disabled=!t||feito;$("#startToday").textContent=feito?`Treino ${t} concluído ✓`:(t?`Começar Treino ${t}`:"Sem treino hoje");
 const arm=armState(),done=countThisWeek(),goal=phase().weekly;paintYogi("#miniYogi",armLevel(arm.raise),"yogi-svg");
 $("#armScore").innerHTML = arm.weeks
   ? `<b class="arm-weeks">${arm.weeks}</b> semana${arm.weeks>1?'s':''} com o braço levantado`
   : (arm.raise>=MANUTENCAO ? 'Braço levantado. A contagem começa no fim desta semana.'
      : arm.raise===1 ? '1 de 2 treinos · braço a meia altura.'
      : (arm.virgem ? 'Braço abaixado.' : 'O braço abaixou.'));
 const bars=$("#armBars");bars.innerHTML='';for(let i=0;i<goal;i++){const x=document.createElement('i');if(i<done)x.className='done';else if(i===done&&done>0)x.className='partial';bars.appendChild(x)}
 let txt;
 if(arm.virgem) txt='Dois treinos nesta semana levantam o braço pela primeira vez.';
 else if(arm.raise<MANUTENCAO) txt=arm.raise===1?'Você fez 1 treino: o braço fica a meia altura. Falta 1 para levantá-lo totalmente.':`O braço abaixou. Faltam ${arm.faltamSubir} treinos para levantá-lo de novo.`;
 else if(arm.faltamSemana>0) txt=`${arm.faltamSemana===1?'Falta 1 treino':`Faltam ${arm.faltamSemana} treinos`} esta semana para o braço não abaixar.`;
 else txt=`${done} treino${done>1?'s':''} esta semana. O braço continua firme.`;
 $("#streakTxt").textContent=txt;
 const grid=$("#workoutGrid");grid.innerHTML='';chavesTreino().forEach(k=>{const lock=bloqueado(k);const b=document.createElement('button');b.className='workout-pick'+(lock?' lock':'');b.disabled=lock;b.innerHTML=`<b>${k}</b><span>${WORKOUTS[k].day}${lock?' · bloqueado nesta fase':''}</span>`;b.onclick=()=>startWorkout(k);grid.appendChild(b)})}

function openPicker(){const c=$("#pickList");c.innerHTML='';chavesTreino().forEach(k=>{const lock=bloqueado(k);const b=document.createElement('button');b.className='btn sec';b.style.cssText='width:100%;margin:6px 0;text-align:left';b.disabled=lock;b.textContent=`Treino ${k} · ${WORKOUTS[k].day}${lock?' · bloqueado':''}`;b.onclick=()=>{$('#dlgPick').close();startWorkout(k)};c.appendChild(b)});$("#dlgPick").showModal()}
function startWorkout(k,opt={}){
  if(!WORKOUTS[k]){toast('Treino não existe nesta ficha.');return false}
  if(bloqueado(k)){toast(`Treino ${k} bloqueado na fase inicial.`);return false}
  if(data.inProgress){
    if(data.inProgress.workout===k){showView('session');return true}
    if(opt.auto){showView('session');return false}
    if(!confirm(`Há um Treino ${data.inProgress.workout} em andamento. Descartá-lo e iniciar o Treino ${k}?`))return false;
    data.inProgress=null;clearTimeout(autoAdvanceTimer);autoAdvanceTimer=null;
  }
  if(treinoConcluidoHoje(k)&&!opt.auto){if(!confirm(`O Treino ${k} já foi concluído hoje. Iniciar novamente?`))return false}
  if(treinoConcluidoHoje(k)&&opt.auto)return false;
  const w=WORKOUTS[k];
  data.inProgress={workout:k,index:0,started:new Date().toISOString(),phase:data.phase,items:w.ex.map(ex=>({id:ex.id,kind:ex.kind,sets:Array.from({length:phase().sets},()=>blankSet(ex)),signal:''}))};
  save();showView('session');return true;
}
function currentSession(){return data.inProgress}
function currentEx(){const s=currentSession();return s?WORKOUTS[s.workout].ex[s.index]:null}
function currentItem(){const s=currentSession();return s?s.items[s.index]:null}
function lastItemFor(exid){for(const h of data.history){const it=(h.items||[]).find(x=>x.id===exid);if(it)return{h,it}}return null}
function recentItemsFor(exid,n=2){const out=[];for(const h of data.history){const it=(h.items||[]).find(x=>x.id===exid);if(it){out.push({h,it});if(out.length>=n)break}}return out}
function numeric(v){const n=parseFloat(String(v).replace(',','.'));return Number.isFinite(n)?n:null}
function topReached(ex,rec){const it=rec?.it;if(!it||!it.sets?.length||ex.kind!=='strength')return false;const top=ex.range[1],required=(PHASES[rec.h?.phase??data.phase]||phase()).sets;const vals=it.sets.map(s=>numeric(s.reps)).filter(n=>n!=null);return vals.length>=required&&vals.every(n=>n>=top)&&it.signal==='v'}
function progressionSuggestion(ex){const rec=recentItemsFor(ex.id,2);if(rec[0]?.it.signal==='r')return{kind:'redbox',text:'Última resposta foi vermelha: não progrida carga e discuta a resposta com o profissional que acompanha você.'};if(rec[0]?.it.signal==='a')return{kind:'warnbox',text:'Última resposta foi amarela: a prioridade é repetir com controle ou reduzir carga/amplitude/volume, conforme a resposta.'};if(data.phase<2)return{kind:'',text:data.phase===0?'Fase de aprendizagem: mantenha a carga fácil e concentre-se em banco, amplitude e técnica.':'Fase de adaptação: mantenha 3-4 repetições em reserva. Não aumente carga apenas porque mudou a semana.'};if(ex.kind!=='strength')return{kind:'',text:'Progrida primeiro pelo controle e pelo topo da faixa de tempo/repetições; carga não é a prioridade neste exercício.'};if(rec.length>=2&&rec.every(x=>topReached(ex,x)))return{kind:'',text:'Você atingiu o topo da faixa em duas sessões verdes. Se hoje a técnica e a amplitude permanecerem iguais, considere apenas o próximo incremento pequeno da máquina.'};if(rec.length&&topReached(ex,rec[0]))return{kind:'',text:'Você atingiu o topo da faixa na última sessão. Repita com a mesma técnica antes de pensar no próximo incremento.'};return{kind:'',text:'Mantenha a carga até alcançar o topo da faixa em todas as séries com técnica estável e reserva adequada.'}}
function pr(x,y,w=1,h=1,f='#4b2e20'){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`}
function psvg(parts){return `<svg class="pixel-svg" viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">${parts}</svg>`}
function miniArt(id){
  const C={o:'#4b2e20',m:'#8b5a2b',a:'#d19a5a',c:'#f2e7ce',g:'#2f7a53',r:'#c84e3a',b:'#3586e4'};
  const floor = pr(2,16,20,1,C.m);
  const shell=(title,sub,parts)=>`<div class="mini-card"><div class="mini-pixel">${psvg(parts+floor)}</div><div class="mini-meta"><b>${title}</b><span>${sub}</span></div></div>`;
  switch(id){
    case 'legpress': return shell('Pixel-guia','plataforma inclinada e empurrar bilateral', pr(16,3,6,1,C.o)+pr(15,4,1,2,C.o)+pr(14,6,1,2,C.o)+pr(9,10,5,1,C.o)+pr(7,11,2,1,C.o)+pr(6,12,1,1,C.a)+pr(7,9,1,2,C.a)+pr(8,8,2,1,C.c)+pr(10,8,2,1,C.c)+pr(12,8,1,1,C.a)+pr(12,9,3,1,C.a)+pr(13,10,3,1,C.a));
    case 'flexora': return shell('Pixel-guia','costas apoiadas e flexão do joelho', pr(5,5,1,8,C.o)+pr(5,12,6,1,C.o)+pr(10,8,1,4,C.o)+pr(6,7,5,1,C.a)+pr(8,5,1,2,C.c)+pr(9,6,3,1,C.c)+pr(12,7,2,1,C.a)+pr(13,8,4,1,C.a)+pr(16,8,1,3,C.o)+pr(16,11,3,1,C.a));
    case 'extensora': return shell('Pixel-guia','costas apoiadas e extensão do joelho', pr(5,5,1,8,C.o)+pr(5,12,6,1,C.o)+pr(10,8,1,4,C.o)+pr(6,7,5,1,C.a)+pr(8,5,1,2,C.c)+pr(9,6,3,1,C.c)+pr(12,7,2,1,C.a)+pr(14,6,1,4,C.a)+pr(15,5,3,1,C.a)+pr(18,5,1,3,C.o));
    case 'chest': return shell('Pixel-guia','empurrar sem arquear a lombar', pr(5,5,1,8,C.o)+pr(5,12,6,1,C.o)+pr(10,7,1,5,C.o)+pr(6,7,5,1,C.a)+pr(8,5,1,2,C.c)+pr(9,6,2,1,C.c)+pr(11,7,3,1,C.a)+pr(14,7,4,1,C.a)+pr(18,6,1,4,C.o)+pr(18,6,3,1,C.o));
    case 'remada': return shell('Pixel-guia','peito apoiado para poupar a lombar', pr(16,5,1,8,C.o)+pr(13,5,4,1,C.o)+pr(9,8,4,1,C.o)+pr(10,9,1,2,C.a)+pr(11,7,2,1,C.c)+pr(12,8,2,1,C.c)+pr(8,9,2,1,C.a)+pr(7,10,3,1,C.a)+pr(5,8,3,1,C.o)+pr(3,8,2,1,C.g));
    case 'lateral': return shell('Pixel-guia','halteres leves e tronco quieto', pr(11,4,2,3,C.c)+pr(10,7,4,1,C.a)+pr(11,8,2,4,C.a)+pr(8,8,3,1,C.a)+pr(13,8,3,1,C.a)+pr(7,8,1,3,C.b)+pr(16,8,1,3,C.b)+pr(10,12,1,3,C.o)+pr(13,12,1,3,C.o));
    case 'panturrilha': return shell('Pixel-guia','sentado e movimento controlado', pr(5,6,1,7,C.o)+pr(5,12,6,1,C.o)+pr(10,8,1,4,C.o)+pr(6,7,5,1,C.a)+pr(8,5,1,2,C.c)+pr(9,6,2,1,C.c)+pr(12,8,5,1,C.m)+pr(13,9,1,3,C.a)+pr(15,9,1,3,C.a)+pr(12,12,5,1,C.o));
    case 'birddog': return shell('Pixel-guia','quatro apoios e antirrotação', pr(8,9,6,1,C.a)+pr(7,8,2,1,C.c)+pr(9,8,2,1,C.c)+pr(13,8,1,1,C.a)+pr(14,7,3,1,C.a)+pr(7,10,1,3,C.a)+pr(10,10,1,3,C.a)+pr(13,10,1,3,C.a)+pr(5,11,2,1,C.a)+pr(4,12,2,1,C.a));
    case 'pulldown': return shell('Pixel-guia','puxar sem jogar o tronco', pr(4,3,16,1,C.o)+pr(7,4,1,8,C.o)+pr(17,4,1,8,C.o)+pr(10,10,4,1,C.a)+pr(11,8,2,2,C.c)+pr(8,5,1,4,C.a)+pr(15,5,1,4,C.a)+pr(8,5,3,1,C.o)+pr(13,5,3,1,C.o)+pr(11,11,1,3,C.o)+pr(12,11,1,3,C.o));
    case 'pulldownN': return shell('Pixel-guia','pegada neutra e tronco estável', pr(4,3,16,1,C.o)+pr(7,4,1,8,C.o)+pr(17,4,1,8,C.o)+pr(10,10,4,1,C.a)+pr(11,8,2,2,C.c)+pr(9,6,1,3,C.a)+pr(14,6,1,3,C.a)+pr(9,6,2,1,C.g)+pr(13,6,2,1,C.g)+pr(11,11,1,3,C.o)+pr(12,11,1,3,C.o));
    case 'desenv': return shell('Pixel-guia','sentado e empurrar para cima', pr(6,6,1,7,C.o)+pr(6,12,6,1,C.o)+pr(11,8,1,4,C.o)+pr(7,7,5,1,C.a)+pr(9,5,1,2,C.c)+pr(10,6,2,1,C.c)+pr(8,4,1,3,C.a)+pr(14,4,1,3,C.a)+pr(7,3,3,1,C.o)+pr(14,3,3,1,C.o));
    case 'rosca': return shell('Pixel-guia','cotovelos junto ao tronco', pr(10,4,2,3,C.c)+pr(9,7,4,1,C.a)+pr(10,8,2,4,C.a)+pr(8,8,2,1,C.a)+pr(13,8,2,1,C.a)+pr(7,7,1,2,C.b)+pr(15,7,1,2,C.b)+pr(10,12,1,3,C.o)+pr(13,12,1,3,C.o));
    case 'martelo': return shell('Pixel-guia','pegada neutra com halteres', pr(10,4,2,3,C.c)+pr(9,7,4,1,C.a)+pr(10,8,2,4,C.a)+pr(8,8,2,1,C.a)+pr(13,8,2,1,C.a)+pr(7,7,1,2,C.g)+pr(15,7,1,2,C.g)+pr(10,12,1,3,C.o)+pr(13,12,1,3,C.o));
    case 'abdutora': return shell('Pixel-guia','abrir as pernas contra o apoio', pr(6,6,1,7,C.o)+pr(6,12,7,1,C.o)+pr(12,8,1,4,C.o)+pr(7,7,5,1,C.a)+pr(9,5,1,2,C.c)+pr(10,6,2,1,C.c)+pr(12,9,2,1,C.a)+pr(14,10,2,1,C.a)+pr(10,9,2,1,C.a)+pr(7,10,2,1,C.a)+pr(5,9,1,3,C.r)+pr(18,9,1,3,C.r));
    case 'prancha': return shell('Pixel-guia','linha reta e tempo sob controle', pr(5,11,10,1,C.a)+pr(4,10,2,1,C.c)+pr(6,10,2,1,C.a)+pr(8,9,2,1,C.a)+pr(10,8,2,1,C.a)+pr(12,7,2,1,C.a)+pr(14,6,1,1,C.a)+pr(14,7,1,5,C.o)+pr(16,11,3,1,C.m));
    case 'hipthrust': return shell('Pixel-guia','subiu, alinhou, contraiu e parou', pr(4,11,6,1,C.o)+pr(10,10,1,2,C.c)+pr(11,9,2,1,C.c)+pr(13,9,4,1,C.a)+pr(16,8,3,1,C.a)+pr(18,7,3,1,C.a)+pr(13,10,2,1,C.a)+pr(12,11,1,3,C.a)+pr(18,9,1,4,C.o));
    case 'peck': return shell('Pixel-guia','fechar os braços sem impulso', pr(10,4,2,3,C.c)+pr(9,7,4,1,C.a)+pr(10,8,2,4,C.a)+pr(7,7,2,1,C.a)+pr(14,7,2,1,C.a)+pr(6,8,2,1,C.o)+pr(15,8,2,1,C.o)+pr(10,12,1,3,C.o)+pr(13,12,1,3,C.o));
    case 'triceps': return shell('Pixel-guia','em pé e sem inclinar o tronco', pr(11,4,2,3,C.c)+pr(10,7,4,1,C.a)+pr(11,8,2,4,C.a)+pr(10,12,1,3,C.o)+pr(13,12,1,3,C.o)+pr(10,8,1,4,C.a)+pr(13,8,1,4,C.a)+pr(10,12,2,1,C.b)+pr(13,12,2,1,C.b)+pr(15,4,1,8,C.o));
    case 'pallof': return shell('Pixel-guia','segurar e resistir à rotação', pr(17,4,1,9,C.o)+pr(6,7,2,2,C.c)+pr(6,9,4,1,C.a)+pr(7,10,2,4,C.a)+pr(10,9,4,1,C.a)+pr(14,9,3,1,C.g)+pr(8,14,1,2,C.o)+pr(10,14,1,2,C.o));
    case 'curlup': return shell('Pixel-guia','subir pouco e manter a lombar neutra', pr(4,13,12,1,C.a)+pr(7,10,2,2,C.c)+pr(9,11,3,1,C.c)+pr(12,12,3,1,C.a)+pr(15,11,3,1,C.a)+pr(17,10,3,1,C.a)+pr(18,10,1,3,C.o)+pr(6,13,1,2,C.o));
    default: return shell('Pixel-guia','ilustração simplificada do exercício', pr(10,4,2,3,C.c)+pr(9,7,4,1,C.a)+pr(10,8,2,4,C.a)+pr(10,12,1,3,C.o)+pr(13,12,1,3,C.o));
  }
}
function renderSession(){const s=currentSession();if(!s){showView('home');return}const w=WORKOUTS[s.workout];
 if(!w||!w.ex[s.index]||!s.items[s.index]){data.inProgress=null;save();toast('A ficha mudou. O treino em andamento foi encerrado.');showView('home');return}
 const ex=w.ex[s.index],it=s.items[s.index];$("#sessionName").textContent=`Treino ${s.workout} · ${w.day}`;$("#sessionPhase").textContent=`${phase().name} · exercício ${s.index+1} de ${w.ex.length}`;$("#sessionProgress").style.width=`${((s.index+1)/w.ex.length)*100}%`;const last=lastItemFor(ex.id),sug=progressionSuggestion(ex);let lastHtml='<div class="last-box muted">Primeira vez registrada neste exercício.</div>';if(last)lastHtml=`<div class="last-box"><b>Última vez:</b> ${escHtml(itemSummary(ex,last.it))} ${last.it.signal?`· lombar ${last.it.signal==='v'?'verde':last.it.signal==='a'?'amarela':'vermelha'}`:''}</div>`;
 let setRows='';it.sets.forEach((set,idx)=>{setRows+=`<div class="set-row"><span class="set-num">${idx+1}</span>`;fieldsFor(ex).forEach(f=>{setRows+=`<label class="field"><input data-set="${idx}" data-key="${f.k}" inputmode="${f.mode}" value="${escHtml(set[f.k]??'')}" placeholder="—"><span class="unit">${f.u}</span></label>`});if(it.sets.length>1)setRows+=`<button class="del-set" data-del="${idx}" aria-label="Apagar série ${idx+1}">&times;</button>`;setRows+='</div>'});
 const canAdd=it.sets.length<4;const video=data.videos[ex.id]?`<button class="btn blue" id="videoBtn">Ver execução</button>`:'';
 const detailHtml=`<div class="exercise-details" id="exerciseDetails" hidden>${miniArt(ex.id)}<div class="tip">${ex.tip}</div>${lastHtml}<div class="suggest-box ${sug.kind}"><b>Sugestão do Iogui:</b> ${sug.text}</div></div>`;
 $("#exerciseCard").innerHTML=`<div class="exercise-head"><div class="kicker">Exercício ${s.index+1} de ${w.ex.length}</div><button class="exercise-name-btn" id="exerciseInfoToggle" aria-expanded="false"><span>${escHtml(ex.name)}</span><span class="info-arrow">▸</span></button><span class="target">ALVO ${escHtml(ex.target)}</span><div class="exercise-tap-hint">Toque no nome para ver execução, última vez e orientação</div></div>${detailHtml}<div class="sets">${setRows}${canAdd?'<button class="add-set" id="addSet">+ adicionar série</button>':''}</div><div class="exercise-tools"><button class="btn sec" id="restBtn">Descanso ${ex.rest}s</button>${video}</div><div class="lumbar-box"><div class="label">Resposta da lombar após o exercício</div><div class="signals"><button class="signal v ${it.signal==='v'?'on':''}" data-s="v">Verde</button><button class="signal a ${it.signal==='a'?'on':''}" data-s="a">Amarelo</button><button class="signal r ${it.signal==='r'?'on':''}" data-s="r">Vermelho</button></div></div>`;
 const infoToggle=$('#exerciseInfoToggle'),details=$('#exerciseDetails');infoToggle.onclick=()=>{const open=details.hasAttribute('hidden');if(open)details.removeAttribute('hidden');else details.setAttribute('hidden','');infoToggle.setAttribute('aria-expanded',open?'true':'false')};
 $$('#exerciseCard input').forEach(inp=>inp.oninput=e=>{const idx=+e.target.dataset.set;it.sets[idx][e.target.dataset.key]=e.target.value;save()});const add=$('#addSet');if(add)add.onclick=()=>{it.sets.push(blankSet(ex));save();renderSession()};$$('#exerciseCard .del-set').forEach(b=>b.onclick=()=>{if(it.sets.length<=1)return;it.sets.splice(+b.dataset.del,1);save();renderSession()});$('#restBtn').onclick=()=>startTimer(ex.rest,ex.name);const vb=$('#videoBtn');if(vb)vb.onclick=()=>openVideo(ex);$$('.signal').forEach(b=>b.onclick=()=>setSignal(b.dataset.s));$('#prevExercise').disabled=s.index===0;$('#prevExercise').onclick=()=>{s.index=Math.max(0,s.index-1);save();renderSession();scrollTo(0,0)};const lastIndex=s.index===w.ex.length-1;$('#nextExercise').textContent=lastIndex?'Revisar e finalizar →':'Próximo →';$('#nextExercise').onclick=()=>lastIndex?reviewWorkout():nextExercise();}
function setSignal(sig){
  clearTimeout(autoAdvanceTimer);autoAdvanceTimer=null;
  const s=currentSession(),it=currentItem();if(!s||!it)return;
  it.signal=it.signal===sig?'':sig;save();renderSession();
  if(it.signal==='r'){$('#dlgAlert').showModal();return}
  if(it.signal&&data.autoAdvance)autoAdvanceTimer=setTimeout(()=>{autoAdvanceTimer=null;nextExercise()},350);
}
function nextExercise(){const s=currentSession();if(!s)return;const max=WORKOUTS[s.workout].ex.length-1;if(s.index<max){s.index++;save();renderSession();scrollTo(0,0)}else reviewWorkout()}

// Nada e gravado sem esta revisao: marcar a lombar no ultimo exercicio nao pode,
// sozinho, encerrar o treino.
function collectItems(){const s=currentSession();if(!s)return[];const w=WORKOUTS[s.workout];if(!w)return[];return s.items.map((it,i)=>{const ex=w.ex[i];if(!ex)return null;const hasValues=(it.sets||[]).some(set=>fieldsFor(ex).some(f=>(set[f.k]??'')!==''));if(!hasValues&&!it.signal)return null;return{id:it.id,name:ex.name,sets:it.sets,signal:it.signal,summary:itemSummary(ex,it)}}).filter(Boolean)}

function reviewWorkout(){const s=currentSession();if(!s)return;const w=WORKOUTS[s.workout];
 if(!w){data.inProgress=null;save();toast('A ficha mudou. O treino em andamento foi encerrado.');showView('home');return}
 const items=collectItems();if(!items.length){toast('Nada anotado ainda.');return}const falta=w.ex.length-items.length;$('#finishSub').innerHTML=`<b>${items.length} de ${w.ex.length}</b> exercícios registrados${falta?` · ${falta} sem anotação`:''}. Depois de finalizar, o treino vai para o histórico.`;$('#finishList').innerHTML=items.map(it=>{const ex=findEx(it.id)||{kind:'strength'};return`<div class="hist-line"><span>${escHtml(it.name)}</span><span>${escHtml(itemSummary(ex,it))} ${it.signal?`<i class="dot ${it.signal}"></i>`:''}</span></div>`}).join('');$('#finishOk').textContent=falta?'Finalizar assim mesmo':'Finalizar treino';$('#dlgFinish').showModal()}
function finishWorkout(){const s=currentSession();if(!s)return;
 if(!WORKOUTS[s.workout]){data.inProgress=null;save();try{$('#dlgFinish').close()}catch(e){}toast('A ficha mudou. O treino em andamento foi encerrado.');showView('home');return}
 const items=collectItems();if(!items.length){toast('Nada anotado ainda.');return}data.history.unshift({id:novoId('treino'),workout:s.workout,iso:new Date().toISOString(),started:s.started,phase:s.phase,weeklyGoal:(PHASES[s.phase]||PHASES[0]).weekly,items});data.history=data.history.slice(0,180);data.inProgress=null;save();try{$('#dlgFinish').close()}catch(e){}toast('Treino salvo. Braço firme.');showView('progress')}
function abortSession(){if(!data.inProgress)return showView('home');if(confirm('Sair do treino? O que você já digitou ficará salvo para continuar depois.'))showView('home')}

/* O descanso e guardado como HORA DE TERMINO, nao como contagem regressiva.
   O iOS congela o JavaScript quando o app sai da tela; recalculando pelo relogio,
   o tempo continua correndo mesmo com o celular bloqueado ou em outro app.
   O que nao e possivel numa pagina web e ALERTAR em segundo plano. */
const REST_KEY='iogui-descanso';
function lerDescanso(){try{const r=localStorage.getItem(REST_KEY);return r?JSON.parse(r):null}catch(e){return null}}
function gravarDescanso(d){try{d?localStorage.setItem(REST_KEY,JSON.stringify(d)):localStorage.removeItem(REST_KEY)}catch(e){}}
function restanteDescanso(){const d=lerDescanso();if(!d)return null;return Math.round((d.fim-Date.now())/1000)}

/* Aviso sonoro. O iOS exige um gesto do usuario para liberar o audio, entao o
   contexto e destravado no toque que inicia o descanso. O som so sai com o app
   em primeiro plano: em segundo plano o iOS congela o JavaScript da pagina. */

let somTocado = false, bowlPrimed = false;
const BOWL_START = 0.37; // depois do silêncio inicial

function bowl(){
  return document.getElementById('bowlAudio');
}

// Chamado diretamente pelo toque em "Descanso".
// O mesmo <audio> toca apenas o trecho silencioso e é pausado antes da tigela.
// Isso libera este elemento para tocar depois no iPhone sem emitir som agora.
function prepararTigela(){
  const a=bowl(); if(!a || bowlPrimed) return;
  try{
    a.pause();
    a.currentTime=0;
    const p=a.play();
    if(p && typeof p.then==='function'){
      p.then(()=>{
        setTimeout(()=>{
          try{
            a.pause();
            a.currentTime=BOWL_START;
            bowlPrimed=true;
          }catch(e){}
        },80);
      }).catch(()=>{});
    }else{
      setTimeout(()=>{
        try{a.pause();a.currentTime=BOWL_START;bowlPrimed=true}catch(e){}
      },80);
    }
  }catch(e){}
}

async function tocarTigela(mostrarErro=false){
  if(data.som && data.som.ativo === false) return false;
  const a=bowl();
  if(!a){
    if(mostrarErro) alert('Não encontrei o arquivo de áudio da tigela.');
    return false;
  }
  try{
    a.pause();
    a.currentTime=BOWL_START;
    const p=a.play();
    if(p && typeof p.then==='function') await p;
    if(navigator.vibrate)try{navigator.vibrate([90])}catch(e){}
    return true;
  }catch(e){
    console.warn('Iogui: áudio bloqueado pelo iPhone',e);
    if(mostrarErro){
      alert('O iPhone bloqueou o áudio. Aumente o volume de mídia e toque em “Testar som” novamente.');
    }
    return false;
  }
}

function tocarBipe(){
  return tocarTigela(false);
}

function startTimer(sec,name){
  prepararTigela();
  gravarDescanso({fim:Date.now()+sec*1000,nome:name,total:sec,iniciado:Date.now(),origem:'botao-descanso'});
  somTocado = false;
  $('#timerLab').textContent=`Descanso · ${name}`;
  $('#timer').classList.add('on');
  tickDescanso(); clearInterval(timerId); timerId=setInterval(tickDescanso,250);
}

function tickDescanso(){
  const d=lerDescanso();
  if(!d){pararTimer();return}
  const falta=Math.round((d.fim-Date.now())/1000);
  if(falta<=0 && !somTocado && !document.hidden && d.origem==='botao-descanso'){
    somTocado = true;
    tocarBipe();
  }
  const chip=$('#restChip'), naSessao=$('#view-session')?.classList.contains('active');
  const txt = falta>0 ? String(falta) : '0';
  $('#timerT').textContent=txt;
  $('#chipT').textContent = falta>0 ? txt : 'Fim';
  $('#chipL').textContent = d.nome||'';
  chip.classList.toggle('done', falta<=0);
  $('#timer').classList.toggle('on', naSessao);
  chip.classList.toggle('on', !naSessao);
  if(falta<=-15){ gravarDescanso(null); pararTimer(); }
}

function pararTimer(){clearInterval(timerId);gravarDescanso(null);
  const t=$('#timer');if(t)t.classList.remove('on');
  const c=$('#restChip');if(c){c.classList.remove('on');c.classList.remove('done')}}

// ao voltar para o app, reconcilia com o relogio
function retomarDescanso(){
  const d=lerDescanso(); if(!d) return;
  const falta=Math.round((d.fim-Date.now())/1000);

  // Compatibilidade: timer antigo/inválido nunca pode tocar sozinho.
  if(!d.fim || !Number.isFinite(Number(d.fim)) || d.origem!=='botao-descanso'){
    gravarDescanso(null);pararTimer();return;
  }

  // Se terminou enquanto o app estava fora de foco, apenas avisa visualmente.
  // O som da tigela toca somente quando um descanso iniciado pelo botão chega
  // a zero com o Iogui em primeiro plano.
  if(falta<=0){
    somTocado=true;
    gravarDescanso(null);pararTimer();
    toast(`Descanso de ${d.nome||'exercício'} terminou.`);
    return;
  }

  somTocado=false;
  clearInterval(timerId); tickDescanso(); timerId=setInterval(tickDescanso,250);
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)retomarDescanso()});
window.addEventListener('focus',retomarDescanso);
function openVideo(ex){
  let url='';
  try{url=urlVideoSegura(data.videos[ex.id]||'')}catch(e){toast('Link de vídeo inválido. Corrija em Ajustes.');return}
  if(!url)return;
  $('#videoTitle').textContent=ex.name;
  const body=$('#videoBody');body.replaceChildren();
  const yt=youtubeIdSeguro(url);
  if(yt){
    const wrap=document.createElement('div');wrap.style.cssText='aspect-ratio:9/16;background:#000';
    const frame=document.createElement('iframe');
    frame.style.cssText='width:100%;height:100%;border:0';
    frame.src=`https://www.youtube-nocookie.com/embed/${yt}?rel=0`;
    frame.title=`Execução: ${ex.name}`;
    frame.loading='lazy';frame.referrerPolicy='strict-origin-when-cross-origin';
    frame.setAttribute('sandbox','allow-scripts allow-same-origin allow-presentation');
    frame.setAttribute('allow','accelerometer; encrypted-media; gyroscope; picture-in-picture');
    frame.setAttribute('allowfullscreen','');
    wrap.appendChild(frame);body.appendChild(wrap);
  }else{
    const p=document.createElement('p');p.textContent='Abra o vídeo no aplicativo ou navegador de origem:';
    const btn=document.createElement('button');btn.className='btn blue';btn.textContent='Abrir vídeo';
    const small=document.createElement('p');small.className='tiny muted';small.style.wordBreak='break-all';small.textContent=url;
    btn.onclick=()=>window.open(url,'_blank','noopener,noreferrer');
    body.append(p,btn,small);
  }
  $('#dlgVideo').showModal();
}
// Enquanto o iframe existe, ele mantem a sessao de audio do sistema tomada e o
// Spotify nao volta sozinho. Destruir no fechamento libera o audio.
$('#dlgVideo').addEventListener('close',()=>{const b=$('#videoBody');b.querySelectorAll('iframe').forEach(f=>{f.src='about:blank';f.remove()});b.innerHTML=''});

function renderProgress(){
  const total=data.history.length,week=countThisWeek(),st=streakWeeks();
  $('#stats').innerHTML=`<div class="stat card"><b>${total}</b><span>treinos</span></div><div class="stat card"><b>${week}/${phase().weekly}</b><span>esta semana</span></div><div class="stat card"><b>${st}</b><span>semanas seguidas</span></div>`;
  renderLoadProgress();
  const h=$('#history');h.innerHTML='';
  if(!data.history.length){h.innerHTML='<div class="card" style="padding:20px;text-align:center">Nenhum treino salvo ainda.</div>';return}
  data.history.slice(0,30).forEach(s=>{
    if(!s.id)s.id=novoId('treino');
    const card=document.createElement('div');card.className='hist-card card';
    const date=new Date(s.iso).toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'2-digit'});
    card.innerHTML=`<div class="hd"><b>Treino ${escHtml(s.workout)}</b><span>${date}</span></div>`+
      (s.items||[]).map(it=>{const ex=findEx(it.id)||{kind:'strength'};return`<div class="hist-line"><span>${escHtml(it.name)}</span><span>${escHtml(itemSummary(ex,it))} ${it.signal?`<i class="dot ${it.signal}"></i>`:''}</span></div>`}).join('')+
      `<div class="hist-actions"><button class="hist-delete" data-history-id="${escHtml(s.id)}">🗑 Apagar este treino</button></div>`;
    h.appendChild(card)
  });
  save();
  $$('#history .hist-delete').forEach(b=>b.onclick=()=>askDelete(b.dataset.historyId));
}

function askDelete(id){
  const s=data.history.find(x=>x.id===id);if(!s)return;
  pendingDelete=id;
  const d=new Date(s.iso).toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit',year:'2-digit'});
  $('#deleteTxt').innerHTML=`Treino <b>${escHtml(s.workout)}</b> de ${d}, com ${(s.items||[]).length} exercício${(s.items||[]).length!==1?'s':''}. Depois de apagar, <b>o braço da constância e as semanas seguidas serão recalculados na hora</b>.`;
  try{$('#dlgDelete').showModal()}catch(e){if(confirm($('#deleteTxt').textContent))apagarTreinoHistorico(id)}
}
function apagarTreinoHistorico(id){
  const antes=data.history.length;
  data.history=data.history.filter(x=>x.id!==id);
  pendingDelete=null;save();
  try{$('#dlgDelete').close()}catch(e){}
  renderProgress();renderHome();
  toast(data.history.length<antes?'Treino apagado. Constância recalculada.':'Nada foi apagado.');
}

function bestLoad(it){if(!it?.sets)return null;const vals=it.sets.map(s=>numeric(s.load)).filter(n=>n!=null);return vals.length?Math.max(...vals):null}
function renderLoadProgress(){const box=$('#loadProgress');let rows='<div class="progress-row h"><span>Exercício</span><span>Última</span><span>Tendência</span></div>';allExercisesUnique().filter(e=>e.kind==='strength'||e.kind==='pallof').forEach(ex=>{const rec=recentItemsFor(ex.id,2),a=bestLoad(rec[0]?.it),b=bestLoad(rec[1]?.it);if(a==null)return;const arrow=b==null?'—':a>b?'↑':a<b?'↓':'→';const cls=a>b?'up':'same';rows+=`<div class="progress-row"><span>${escHtml(ex.name)}</span><span>${escHtml(a)} kg</span><span class="arrow ${cls}">${arrow}</span></div>`});box.innerHTML=rows}


function clone(v){return JSON.parse(JSON.stringify(v))}
function weekdayInferido(k,t){if(Number.isInteger(t?.weekday))return t.weekday;return ({A:2,B:4,C:6})[k]??null}
function programaAtualEditavel(){
  if(data.programa?.json){
    const v=validarPrograma(data.programa.json);
    if(v.ok)return clone({nome:data.programa.json.nome||v.nome||'Minha ficha',versao:data.programa.json.versao||v.versao||localDayKey(),treinos:data.programa.json.treinos||data.programa.json.workouts});
  }
  const treinos={};
  Object.entries(WORKOUTS).forEach(([k,t])=>{treinos[k]={day:t.day||k,weekday:weekdayInferido(k,t),bloqueadoFase0:!!(t.bloqueadoFase0??(k==='B')),ex:clone(t.ex)}});
  return {nome:'Minha ficha do Iogui',versao:localDayKey(),treinos};
}
const DIAS=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
function abrirEditorPrograma(){
  editorProgram=programaAtualEditavel();
  $('#editProgramName').value=editorProgram.nome||'Minha ficha';
  $('#editProgramVersion').value=editorProgram.versao||localDayKey();
  renderEditorPrograma();
  $('#dlgProgramEditor').showModal();
}
function renderEditorPrograma(){
  const box=$('#editorWorkouts');box.innerHTML='';
  Object.entries(editorProgram.treinos||{}).forEach(([k,t])=>{
    const card=document.createElement('div');card.className='editor-workout';
    const opts=DIAS.map((d,i)=>`<option value="${i}" ${weekdayInferido(k,t)===i?'selected':''}>${d}</option>`).join('');
    card.innerHTML=`<div class="editor-workout-head"><b>Treino ${escHtml(k)}</b><span>${escHtml(t.day||'')}</span></div>
      <div class="settings-actions">
        <div class="form-row"><label>Dia da semana</label><select data-wday="${escHtml(k)}">${opts}</select></div>
        <div class="form-row"><label>Nome do dia</label><input data-day="${escHtml(k)}" value="${escHtml(t.day||'')}"></div>
      </div>
      <label class="toggle" style="margin:4px 0 8px"><input type="checkbox" data-lock="${escHtml(k)}" ${t.bloqueadoFase0?'checked':''}> Bloquear na fase inicial</label>
      <div class="editor-ex-list"></div>
      <button class="editor-add" data-add="${escHtml(k)}">+ adicionar exercício</button>`;
    const list=card.querySelector('.editor-ex-list');
    (t.ex||[]).forEach((ex,i)=>{
      const row=document.createElement('div');row.className='editor-ex';
      row.innerHTML=`<div><b>${escHtml(ex.name)}</b><small>${escHtml(ex.target)} · descanso ${Number(ex.rest)||0}s · ${escHtml(ex.kind||'strength')}</small></div>
        <div class="editor-ex-actions">
          <button class="editor-mini" data-edit="${escHtml(k)}" data-i="${i}">Editar</button>
          <button class="editor-mini" data-up="${escHtml(k)}" data-i="${i}" ${i===0?'disabled':''}>↑</button>
          <button class="editor-mini" data-down="${escHtml(k)}" data-i="${i}" ${i===t.ex.length-1?'disabled':''}>↓</button>
          <button class="editor-mini danger" data-del="${escHtml(k)}" data-i="${i}">×</button>
        </div>`;
      list.appendChild(row)
    });
    box.appendChild(card)
  });
  $$('[data-wday]').forEach(s=>s.onchange=()=>{const k=s.dataset.wday;editorProgram.treinos[k].weekday=+s.value});
  $$('[data-day]').forEach(i=>i.oninput=()=>{editorProgram.treinos[i.dataset.day].day=i.value});
  $$('[data-lock]').forEach(i=>i.onchange=()=>{editorProgram.treinos[i.dataset.lock].bloqueadoFase0=i.checked});
  $$('[data-edit]').forEach(b=>b.onclick=()=>abrirEditorExercicio(b.dataset.edit,+b.dataset.i,false));
  $$('[data-add]').forEach(b=>b.onclick=()=>abrirEditorExercicio(b.dataset.add,-1,true));
  $$('[data-up]').forEach(b=>b.onclick=()=>moverEx(b.dataset.up,+b.dataset.i,-1));
  $$('[data-down]').forEach(b=>b.onclick=()=>moverEx(b.dataset.down,+b.dataset.i,1));
  $$('[data-del]').forEach(b=>b.onclick=()=>removerEx(b.dataset.del,+b.dataset.i));
}
function moverEx(k,i,delta){
  const a=editorProgram.treinos[k].ex,j=i+delta;if(j<0||j>=a.length)return;
  [a[i],a[j]]=[a[j],a[i]];renderEditorPrograma()
}
function removerEx(k,i){
  const ex=editorProgram.treinos[k].ex[i];if(!ex)return;
  if((editorProgram.treinos[k].ex||[]).length<=1){toast('Cada treino precisa ter ao menos um exercício.');return}
  if(confirm(`Remover "${ex.name}" do Treino ${k}?`)){editorProgram.treinos[k].ex.splice(i,1);renderEditorPrograma()}
}
function idTemHistorico(id){return !!id && data.history.some(h=>(h.items||[]).some(it=>it.id===id))}
function abrirEditorExercicio(k,i,novo){
  const t=editorProgram.treinos[k];if(!t)return;
  const ex=novo?{id:'novo_'+Date.now(),name:'Novo exercício',target:'10-12',rest:90,kind:'strength',range:[10,12],tip:'Orientação de execução.'}:clone(t.ex[i]);
  editorCtx={k,i,novo,originalId:ex.id};
  $('#exerciseEditorTitle').textContent=novo?`Novo exercício · Treino ${k}`:`Editar exercício · Treino ${k}`;
  $('#eeId').value=ex.id;$('#eeName').value=ex.name;$('#eeTarget').value=ex.target;$('#eeRest').value=ex.rest;$('#eeKind').value=ex.kind||'strength';$('#eeMin').value=ex.range?.[0]||1;$('#eeMax').value=ex.range?.[1]||1;
  $('#eeTip').value=String(ex.tip||'').replace(/<br\s*\/?>/gi,'\n').replace(/<\/?(b|strong)>/gi,'');
  const lock=!novo&&idTemHistorico(ex.id);$('#eeId').disabled=lock;$('#eeIdHint').textContent=lock?'Este ID já existe no histórico e foi bloqueado para preservar suas cargas anteriores.':'Use letras, números, _ ou -. Depois que houver histórico, o ID ficará bloqueado.';
  $('#dlgExerciseEditor').showModal()
}
function salvarEditorExercicio(){
  if(!editorCtx)return;
  const ex={id:$('#eeId').value.trim(),name:$('#eeName').value.trim(),target:$('#eeTarget').value.trim(),rest:+$('#eeRest').value,kind:$('#eeKind').value,range:[+$('#eeMin').value,+$('#eeMax').value],tip:$('#eeTip').value.trim().replace(/\n/g,'<br>')};
  const teste={nome:'teste',versao:'teste',treinos:{X:{day:'Teste',weekday:0,bloqueadoFase0:false,ex:[ex]}}},v=validarPrograma(teste);
  if(!v.ok){alert('Não consegui salvar este exercício: '+v.erro);return}
  const arr=editorProgram.treinos[editorCtx.k].ex;
  if(editorCtx.novo)arr.push(ex);else arr[editorCtx.i]=ex;
  $('#dlgExerciseEditor').close();renderEditorPrograma()
}
function salvarEditorPrograma(){
  editorProgram.nome=$('#editProgramName').value.trim()||'Minha ficha';
  editorProgram.versao=$('#editProgramVersion').value.trim()||localDayKey();
  const v=validarPrograma(editorProgram);
  if(!v.ok){alert('A ficha ainda tem um problema: '+v.erro);return}
  if(data.inProgress&&!sessaoCompativel(data.inProgress,v.treinos[data.inProgress.workout])){
    if(!confirm('Esta mudança não é compatível com o treino que está em andamento. Salvar a ficha vai encerrar esse treino. Continuar?'))return
  }
  data.programa=Object.assign(defaultData().programa,data.programa||{});
  data.programa.json=programaCanonico(v);data.programa.versao=v.versao||localDayKey();data.programa.atualizado=new Date().toISOString();data.programa.modo='local';
  aplicarPrograma(v);save();$('#dlgProgramEditor').close();renderHome();renderSettings();toast('Ficha salva no aparelho. GitHub pausado até você buscar novamente.')
}
function fichaParaDownload(){
  const p=data.programa?.json?clone(data.programa.json):programaAtualEditavel();
  p.nome=p.nome||'Minha ficha do Iogui';p.versao=p.versao||localDayKey();return p
}
function baixarFicha(){
  const p=fichaParaDownload(),blob=new Blob([JSON.stringify(p,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='ficha-iogui.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1200);
  toast('Ficha pronta: envie este ficha-iogui.json ao GitHub.')
}

function statusFicha(){
  const p=data.programa||{};
  if(!p.json)return 'Em uso: ficha padrão embutida no app · atualizações externas desativadas.';
  const d=p.atualizado?new Date(p.atualizado).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'2-digit',hour:'2-digit',minute:'2-digit'}):'—';
  const n=Object.keys(WORKOUTS).length,e=Object.values(WORKOUTS).reduce((a,t)=>a+t.ex.length,0),modo=p.modo==='local'?'arquivo local':'ficha externa';
  return `Em uso: ${modo}${p.versao?` ${p.versao}`:''} · ${n} treinos · ${e} exercícios · atualizada em ${d}.`;
}
function renderSom(){ const c=$('#cfgSom'); if(c) c.checked = !(data.som && data.som.ativo===false); }
function renderPrograma(){
  const u=$('#cfgProgramUrl'); if(u) u.value = data.programa?.url || '';
  const st=$('#programStatus'); if(st) st.textContent = statusFicha();
}
function renderSettings(){renderPrograma();renderSom();$('#cfgName').value=data.profile.name||'Roque';$('#cfgStart').value=data.profile.start||'';$('#cfgAuto').checked=data.autoAdvance!==false;const ps=$('#cfgPhase');ps.innerHTML=PHASES.map((p,i)=>`<option value="${i}" ${i===data.phase?'selected':''}>${p.name}</option>`).join('');const vs=$('#videoSettings');vs.innerHTML='';allExercisesUnique().forEach(ex=>{const r=document.createElement('div'),lab=document.createElement('label'),inp=document.createElement('input');r.className='video-row';lab.textContent=ex.name;inp.type='url';inp.dataset.id=ex.id;inp.value=data.videos[ex.id]||'';inp.placeholder='https://';r.append(lab,inp);vs.appendChild(r)});updateInstallUI()}
function saveSettings(){data.profile.name=$('#cfgName').value.trim()||'Roque';data.profile.start=$('#cfgStart').value||data.profile.start;const newPhase=+$('#cfgPhase').value;data.phase=Math.max(0,Math.min(2,newPhase));data.autoAdvance=$('#cfgAuto').checked;if(data.inProgress&&bloqueado(data.inProgress.workout)){if(confirm(`O Treino ${data.inProgress.workout} fica bloqueado nesta fase. Encerrar a sessão em andamento?`)){data.inProgress=null;clearTimeout(autoAdvanceTimer);autoAdvanceTimer=null}else{data.phase=data.inProgress.phase}}save();toast('Ajustes salvos.');renderHome()}
function saveVideos(){
  const novo={};
  try{$$('#videoSettings input').forEach(i=>{const v=i.value.trim();if(v)novo[i.dataset.id]=urlVideoSegura(v)})}
  catch(e){alert(e.message||'Há um endereço de vídeo inválido.');return}
  data.videos=novo;save();toast('Vídeos salvos com validação de segurança.');
}
function exportData(){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`iogui-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function importData(file){
  if(!file)return;
  if(file.size>MAX_BACKUP_BYTES){alert('Backup recusado: o arquivo ultrapassa 5 MB.');return}
  const r=new FileReader();
  r.onload=()=>{
    try{
      const txt=String(r.result||'');if(new Blob([txt]).size>MAX_BACKUP_BYTES)throw new Error('Arquivo grande demais.');
      const obj=JSON.parse(txt),limpo=sanitizarEstado(obj);
      if(confirm(`Importar backup validado com ${limpo.history.length} treino${limpo.history.length===1?'':'s'} e substituir os dados atuais?`)){
        data=limpo;data.programa=normalizarProgramaState(data.programa);garantirIdsHistorico();aplicarProgramaSalvo();conferirSessao();save();toast('Backup validado e importado.');renderHome();renderSettings();
      }
    }catch(e){console.warn(e);alert('Arquivo de backup recusado: estrutura inválida ou conteúdo não permitido.')}
  };
  r.readAsText(file);
}
function updateInstallUI(){const b=$('#installBtn'),h=$('#installHint');if(installPrompt){b.disabled=false;b.textContent='Instalar Iogui';h.textContent='Instale como aplicativo para abrir em tela cheia e usar offline.'}else{b.disabled=false;b.textContent='Como instalar';h.textContent=/iPhone|iPad|iPod/.test(navigator.userAgent)?'No iPhone/iPad: toque em Compartilhar → Adicionar à Tela de Início.':'Se o botão automático não aparecer, use o menu do navegador → Instalar app / Adicionar à tela inicial.'}}
async function installApp(){if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;updateInstallUI()}else alert($('#installHint').textContent)}

// events
$$('.navbtn').forEach(b=>b.onclick=()=>showView(b.dataset.view));$('#gear').onclick=()=>showView('settings');$('#startToday').onclick=()=>{const t=todayWorkout();if(t)startWorkout(t)};$('#chooseWorkout').onclick=openPicker;$('#sessionBack').onclick=()=>showView('home');$('#abortSession').onclick=abortSession;$('#timer').onclick=e=>{if(e.target.id==='timer')showView('home')};
$('#restChip').onclick=()=>{if(restanteDescanso()<=0){pararTimer();return}if(data.inProgress)showView('session');};
$('#timerSkip').onclick=()=>pararTimer();$('#saveSettings').onclick=saveSettings;$('#saveVideos').onclick=saveVideos;$('#exportBtn').onclick=exportData;$('#importBtn').onclick=()=>$('#importFile').click();$('#importFile').onchange=e=>e.target.files[0]&&importData(e.target.files[0]);$('#installBtn').onclick=installApp;$$('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$('#somSalvar').onclick=()=>{data.som={ativo:$('#cfgSom').checked};save();toast(data.som.ativo?'Aviso sonoro ligado.':'Aviso sonoro desligado.')};
$('#somTeste').onclick=async()=>{
  const antigo=data.som?.ativo;
  data.som=Object.assign({},data.som,{ativo:true});
  const ok=await tocarTigela(true);
  data.som.ativo=(antigo!==false);
  if(ok)toast('Tigela tibetana tocando.');
};
$('#programEdit').onclick=abrirEditorPrograma;$('#programDownload').onclick=baixarFicha;$('#editorSave').onclick=salvarEditorPrograma;$('#exerciseEditorSave').onclick=salvarEditorExercicio;
$('#programFetch').onclick=async()=>{
  data.programa=Object.assign(defaultData().programa,data.programa||{});
  try{data.programa.url=urlFichaPermitida($('#cfgProgramUrl').value.trim())}catch(e){toast(e.message);return}
  data.programa.modo=data.programa.url?'remoto':'padrao';save();await buscarPrograma(true)
};
$('#programReset').onclick=()=>{if(confirm('Voltar para a ficha padrão do app? O histórico é mantido e a atualização externa será desativada.'))usarProgramaPadrao()};
$('#programFile').onclick=()=>$('#programInput').click();
$('#programInput').onchange=e=>{const f=e.target.files[0];if(!f)return;
  if(f.size>MAX_PROGRAM_BYTES){toast('Ficha recusada: arquivo grande demais.');e.target.value='';return}
  const rd=new FileReader();
  rd.onload=()=>{try{const txt=String(rd.result||'');if(new Blob([txt]).size>MAX_PROGRAM_BYTES)throw new Error('grande');const obj=JSON.parse(txt);const v=validarPrograma(obj);
    if(!v.ok){toast('Ficha recusada: '+v.erro);return}
    data.programa=Object.assign(defaultData().programa,data.programa||{});data.programa.json=programaCanonico(v);data.programa.versao=v.versao||'arquivo local';
    data.programa.atualizado=new Date().toISOString();data.programa.modo='local';data.programa.url='';aplicarPrograma(v);save();
    renderPrograma();renderHome();toast('Ficha carregada e validada. Atualizações remotas foram pausadas.')}catch(err){toast('Ficha recusada: arquivo inválido.')}};
  rd.readAsText(f);e.target.value=''};
$('#redUndo').onclick=()=>{clearTimeout(autoAdvanceTimer);autoAdvanceTimer=null;const it=currentItem();if(it&&it.signal==='r'){it.signal='';save();renderSession()}$('#dlgAlert').close();toast('Marcação vermelha limpa.');};
$('#redContinue').onclick=()=>{$('#dlgAlert').close();toast('Vermelho mantido. O avanço fica manual.');};
$('#finishOk').onclick=()=>finishWorkout();
$('#deleteOk').onclick=()=>pendingDelete&&apagarTreinoHistorico(pendingDelete);window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;updateInstallUI()});

function registrarServiceWorker(){
  if(!('serviceWorker' in navigator)||location.protocol!=='https:')return;
  navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(reg=>{try{reg.update()}catch(e){}}).catch(err=>console.warn('Iogui: service worker não registrado.',err));
}

function autoOpenDailyWorkout(){
  if(data.inProgress){showView('session');return}
  const treinoHoje=todayWorkout(),agendado=scheduledWorkoutToday();
  if(treinoHoje){if(treinoConcluidoHoje(treinoHoje)){showView('home');toast(`Treino ${treinoHoje} já concluído hoje.`);return}startWorkout(treinoHoje,{auto:true});return}
  if(agendado&&bloqueado(agendado))toast(`${WORKOUTS[agendado].day}: Treino ${agendado} está bloqueado na fase inicial.`);
}
(()=>{const a=$('#appVersao'),b=$('#splashVersao');if(a)a.textContent='v'+APP_VERSAO;if(b)b.textContent='V'+APP_VERSAO.toUpperCase()})();
const esperar=ms=>new Promise(r=>setTimeout(r,ms));
async function iniciarApp(){
  load();aplicarProgramaSalvo();renderHome();animateSplash();retomarDescanso();
  const minimo=esperar(1500),remoto=programaRemotoAtivo()?buscarPrograma(false,2200):Promise.resolve(false);
  await Promise.allSettled([minimo,remoto]);
  $('#splash')?.classList.add('out');await esperar(480);$('#splash')?.remove();
  autoOpenDailyWorkout();
}
iniciarApp();
registrarServiceWorker();
