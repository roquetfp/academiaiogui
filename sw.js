const CACHE='iogui-v2.9.1-shell-v1';
const CORE=['./','./index.html','./app.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;

  if(req.mode==='navigate'){
    event.respondWith(
      fetch(req,{cache:'no-store'}).then(resp=>{
        if(resp.ok)caches.open(CACHE).then(c=>c.put('./index.html',resp.clone()));
        return resp;
      }).catch(()=>caches.match('./index.html'))
    );
    return;
  }

  const coreNames=new Set(CORE.map(x=>new URL(x,self.location.href).pathname));
  if(!coreNames.has(url.pathname))return;

  // O codigo do app e o manifesto mudam a cada publicacao: rede primeiro, cache
  // so como reserva. Sem isto, uma versao nova no GitHub nunca chegaria ao
  // aparelho. Icones sao grandes e quase nunca mudam: cache primeiro.
  const voltatil=/\/(app\.js|manifest\.webmanifest)$/.test(url.pathname);
  if(voltatil){
    event.respondWith(
      fetch(req,{cache:'no-store'}).then(resp=>{
        if(resp.ok)caches.open(CACHE).then(c=>c.put(req,resp.clone()));
        return resp;
      }).catch(()=>caches.match(req))
    );
    return;
  }

  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(resp=>{
    if(resp.ok)caches.open(CACHE).then(c=>c.put(req,resp.clone()));
    return resp;
  })));
});
