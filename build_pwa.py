#!/usr/bin/env python3
"""Usage: python3 build_pwa.py YOUR_APP.html   ->  creates/overwrites ./public (deploy to Vercel)"""
import sys,re,os,shutil,hashlib,base64,json
src=sys.argv[1] if len(sys.argv)>1 else 'app.html'
here=os.path.dirname(os.path.abspath(__file__)); out=os.path.join(here,'public'); tpl=os.path.join(here,'tpl')
html=open(src,encoding='utf-8').read()
shutil.rmtree(out,ignore_errors=True); os.makedirs(out+'/d'); os.makedirs(out+'/fonts')
# 1) data blocks -> d/<id>.<hash>.bin (raw gzip)
dmap={}
def blk(m):
    i,data=m.group(1),m.group(2).strip(); raw=base64.b64decode(data); h=hashlib.sha1(raw).hexdigest()[:8]
    fn=f'{i}.{h}.bin'; open(f'{out}/d/{fn}','wb').write(raw); dmap[i]=fn; return ''
html=re.sub(r'<script type="text/plain" id="([A-Za-z0-9_]+)">([^<]*)</script>',blk,html)
# 2) fonts -> fonts/*
seen={}
def font(m):
    mime,data=m.group(1),m.group(2); raw=base64.b64decode(data); h=hashlib.sha1(raw).hexdigest()[:10]
    ext={'font/ttf':'ttf','font/woff2':'woff2','font/woff':'woff','font/otf':'otf'}.get(mime,mime.split('/')[-1].replace('x-font-',''))
    fn=f'{h}.{ext}'; open(f'{out}/fonts/{fn}','wb').write(raw); return f'url(fonts/{fn})'
html=re.sub(r'url\(data:([a-z0-9/+.-]+);base64,([A-Za-z0-9+/=]+)\)',font,html)
build=hashlib.sha1((html+json.dumps(dmap,sort_keys=True)).encode()).hexdigest()[:10]
# 3) loader: fetch instead of inline blocks
a=html.index('function ld(id){'); b=html.index('pending.set(id,promise);return promise}',a)+len('pending.set(id,promise);return promise}')
new_ld="var DMAP="+json.dumps(dmap,separators=(',',':'))+";\nfunction ld(id){if(cache.has(id))return Promise.resolve(cache.get(id));if(pending.has(id))return pending.get(id);if(!DMAP[id])return Promise.reject(Error('Missing data: '+id));\nvar promise=(async function(){var r=await fetch('d/'+DMAP[id]);if(!r.ok)throw Error('ডাটা আনা যায়নি: '+id);var txt=await new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).text();var o=JSON.parse(txt);cache.set(id,o);if(cache.size>12)cache.delete(cache.keys().next().value);return o})().finally(function(){pending.delete(id)});pending.set(id,promise);return promise}"
html=html[:a]+new_ld+html[b:]
# 4) head + install UI + service worker
head='''<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icons/favicon.png"><link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="আল কুরআন"><meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="robots" content="noindex,nofollow">
<style>#pwaI{position:fixed;left:50%;transform:translateX(-50%);bottom:84px;z-index:200;background:#fff;color:#2d6a3a;border:1.5px solid #4f9157;border-radius:30px;padding:10px 18px;font:600 15px system-ui,sans-serif;box-shadow:0 6px 22px #0003}</style>'''
html=html.replace('</head>',head+'</head>',1)
boot='''<script>
(function(){var dip;function bar(){if(!dip||matchMedia('(display-mode: standalone)').matches||document.getElementById('pwaI'))return;var b=document.createElement('button');b.id='pwaI';b.textContent='📲 অ্যাপ ইনস্টল করুন';b.onclick=function(){dip.prompt();dip.userChoice.then(function(){b.remove();dip=null})};document.body.appendChild(b);setTimeout(function(){b.remove()},25000)}
addEventListener('beforeinstallprompt',function(e){e.preventDefault();dip=e;bar()});
addEventListener('appinstalled',function(){var b=document.getElementById('pwaI');if(b)b.remove();warm()});
function warm(){navigator.serviceWorker&&navigator.serviceWorker.ready.then(function(r){r.active&&r.active.postMessage('warm')})}window.warmOffline=warm;
if('serviceWorker' in navigator&&location.protocol!=='file:')addEventListener('load',function(){navigator.serviceWorker.register('sw.js')})})();
</script>'''
html=re.sub(r'\s+</body>',boot+'\n</body>',html.rstrip(),count=1) if '</body>' in html else html+boot
open(out+'/index.html','w',encoding='utf-8').write(html)
# 5) static files
for f in ['manifest.webmanifest','robots.txt']: shutil.copy(f'{tpl}/{f}',out)
shutil.copytree(tpl+'/icons',out+'/icons')
core=['./','index.html','manifest.webmanifest']+['icons/'+f for f in sorted(os.listdir(out+'/icons')) if f!='shot-narrow.png']+['fonts/'+f for f in sorted(os.listdir(out+'/fonts'))]
data=['d/'+f for f in sorted(os.listdir(out+'/d'))]
sw=open(tpl+'/sw.js',encoding='utf-8').read().replace('__BUILD__',build).replace('__CORE__',json.dumps(core)).replace('__DATA__',json.dumps(data))
open(out+'/sw.js','w',encoding='utf-8').write(sw)
tot=sum(os.path.getsize(os.path.join(dp,f)) for dp,_,fs in os.walk(out) for f in fs)
print(f'build {build}: index {os.path.getsize(out+"/index.html")//1024} KB, {len(data)} data files, {len(core)} core files, total {tot/1048576:.1f} MB')
