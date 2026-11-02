/* Auto-generated values: __BUILD__, __CORE__, __DATA__ */
const V='__BUILD__',CORE=__CORE__,DATA=__DATA__,CC='core-'+V,DC='data';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CC).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys())if(k.startsWith('core-')&&k!==CC)await caches.delete(k);
  const dc=await caches.open(DC),keep=new Set(DATA.map(u=>new URL(u,self.registration.scope).href));
  for(const r of await dc.keys())if(!keep.has(r.url))await dc.delete(r);
  await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith((async()=>{const c=await caches.open(CC),hit=await c.match('index.html');
    const up=fetch(r).then(res=>{if(res.ok)c.put('index.html',res.clone());return res}).catch(()=>null);
    if(hit){e.waitUntil(up);return hit}const res=await up;return res||new Response('অফলাইন — একবার অনলাইনে খুলুন।',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})})());return}
  const cacheName=u.pathname.includes('/d/')?DC:CC;
  e.respondWith((async()=>{const c=await caches.open(cacheName),hit=await c.match(r);if(hit)return hit;
    const res=await fetch(r);if(res.ok&&(u.pathname.includes('/d/')||u.pathname.includes('/fonts/')||u.pathname.includes('/icons/')))c.put(r,res.clone());return res})())});
self.addEventListener('message',e=>{if(e.data!=='warm')return;e.waitUntil((async()=>{
  const c=await caches.open(DC);let done=0;const q=DATA.slice();
  const post=m=>self.clients.matchAll().then(l=>l.forEach(x=>x.postMessage(m)));
  await Promise.all(Array.from({length:3},async()=>{while(q.length){const u=q.shift();try{if(!(await c.match(u))){const res=await fetch(u);if(res.ok)await c.put(u,res)}}catch(_){}done++;if(done%40===0)post({warm:done,total:DATA.length})}}));
  post({warm:DATA.length,total:DATA.length})})())});
