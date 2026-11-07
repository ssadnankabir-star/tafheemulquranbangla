(()=>{
'use strict';
// Dedicated install/share page following the Ruqyah Reader's native PWA flow.
const landing=document.body?.dataset?.pwaInstallLanding==='true'||location.pathname.endsWith('/install.html');
const base=new URL('./',location.href),appUrl=new URL('index.html',base).href,installUrl=new URL('install.html',base).href;
const display=window.matchMedia?.('(display-mode: standalone)');
let deferred=null,installedHere=false,busy=false;
const installed=()=>Boolean(display?.matches||navigator.standalone===true||installedHere);
const ua=navigator.userAgent||'';
const ios=/iPhone|iPad|iPod/i.test(ua)||(/Macintosh/i.test(ua)&&navigator.maxTouchPoints>1);
const safari=/Safari/i.test(ua)&&!/Chrome|CriOS|Edg|EdgiOS|OPR|FxiOS|Firefox|SamsungBrowser/i.test(ua);
const mac=/Macintosh|Mac OS X/i.test(ua)&&!ios;
const android=/Android/i.test(ua);
const el=id=>document.getElementById(id);
function status(id,message){const node=el(id);if(node)node.textContent=message;else if(window.toast)window.toast(message)}
function guidance(){
 if(ios)return 'iPhone/iPad: Safari-র Share বাটন → Add to Home Screen → Add নির্বাচন করুন।';
 if(safari&&mac)return 'Safari: File → Add to Dock নির্বাচন করুন (সমর্থিত macOS সংস্করণে)।';
 if(android)return 'Android Chrome: ⋮ মেনু → Install app অথবা Add to Home screen নির্বাচন করুন।';
 return 'Chrome/Edge: অ্যাড্রেস বারের Install আইকন অথবা ব্রাউজারের ⋮ মেনু থেকে Install app নির্বাচন করুন।';
}
function refresh(){
 const button=el('shareLandingInstall');if(!button)return;
 const isReady=installed(),span=button.querySelector('span'),icon=button.querySelector('i');
 if(span)span.textContent=isReady?'অ্যাপ খুলুন':'ইনস্টল করুন';
 if(icon)icon.className=isReady?'hgi hgi-stroke hgi-book-open-01':'hgi hgi-stroke hgi-screen-add-to-home';
 button.setAttribute('aria-label',isReady?'অ্যাপ খুলুন':'অ্যাপ ইনস্টল করুন');
}
function openApp(){location.assign(appUrl)}
async function shareApp(){
 const data={title:'তাফহীমুল কুরআন বাংলা',text:'বাংলা অনুবাদ, তাফসির, শব্দে শব্দে অর্থ ও অডিওসহ অ্যাপটি ইনস্টল করুন।',url:installUrl};
 if(typeof navigator.share==='function'){
  try{await navigator.share(data);return}catch(err){if(err?.name==='AbortError')return}
 }
 try{if(!navigator.clipboard?.writeText)throw Error('no clipboard');await navigator.clipboard.writeText(installUrl);status('shareLinkStatus','অ্যাপ ইনস্টলের লিংক কপি হয়েছে।')}
 catch{const input=el('shareLinkInput');if(input){input.hidden=false;input.value=installUrl;input.focus();input.select();status('shareLinkStatus','এই লিংকটি কপি করে শেয়ার করুন।')}else window.prompt('অ্যাপ ইনস্টলের লিংক কপি করুন:',installUrl)}
}
async function installApp(){
 if(installed()){openApp();return}
 if(busy)return;
 if(!deferred){status('installLandingStatus',guidance());return}
 const event=deferred;deferred=null;busy=true;
 const btn=el('shareLandingInstall');if(btn){btn.disabled=true;btn.setAttribute('aria-busy','true')}
 try{await event.prompt();const result=await event.userChoice;status('installLandingStatus',result?.outcome==='accepted'?'ইনস্টল শুরু হয়েছে। সম্পন্ন হলে অ্যাপটি খুলতে পারবেন।':'ইনস্টল হয়নি। ব্রাউজার মেনু থেকে আবার চেষ্টা করতে পারেন।')}
 catch{status('installLandingStatus',guidance())}
 finally{busy=false;if(btn){btn.disabled=false;btn.removeAttribute('aria-busy')}}
}
function init(){refresh();el('shareLandingInstall')?.addEventListener('click',installApp);el('shareLandingShare')?.addEventListener('click',shareApp);const input=el('shareLinkInput');if(input)input.value=installUrl}
addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferred=event;refresh()});
addEventListener('appinstalled',()=>{installedHere=true;deferred=null;refresh();status('installLandingStatus','অ্যাপটি ইনস্টল হয়েছে। মূল অ্যাপ খুলছে…');if(landing)setTimeout(openApp,2800);if(typeof window.warmOffline==='function')window.warmOffline()});
display?.addEventListener?.('change',refresh);addEventListener('pageshow',refresh);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
if(landing&&'serviceWorker' in navigator&&location.protocol==='https:')addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
window.QuranPWA={shareApp,installApp,openApp,installUrl};
})();