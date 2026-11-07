/* Quran Learning Phase 3: conservative educational Tajweed cues.
   Source Unicode is never normalized, rewritten or decorated with inserted code points.
   This is NOT exhaustive verified Qur'an-wide tajweed annotation. */
(function (global) {
  'use strict';
  const RULES = Object.freeze([
    {id:'ghunnah',label:'গুন্নাহ',en:'Ghunnah',group:'nasal',color:'#8857c4',duration:'২ হরকত',pattern:'نّ / مّ',explain:'নুন বা মীমে তাশদীদ থাকলে নাসিক্য ধ্বনি ধরে পড়তে হয়।',how:'নুন/মীমের ধ্বনি নাক দিয়ে মৃদুভাবে দুই হরকত ধরে পড়ুন।',caution:'গুন্নাহ নাকে হয়; অক্ষরের স্বাভাবিক উচ্চারণ বিকৃত করবেন না।',example:'إِنَّ / ثُمَّ',ref:'113:4'},
    {id:'ikhfa',label:'ইখফা',en:'Ikhfa',group:'nasal',color:'#bd7a21',duration:'২ হরকত',pattern:'نْ / তানবীন + ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك',explain:'নুন সাকিন/তানবীনের পরে নির্দিষ্ট ১৫টি অক্ষর এলে নুনের ধ্বনি স্পষ্ট না করে গুন্নাহসহ পড়া হয়।',how:'জিহ্বা পরবর্তী অক্ষরের জন্য প্রস্তুত রাখুন; নুনের ধ্বনি আড়াল করে দুই হরকত গুন্নাহ দিন।',caution:'শুধু চিহ্ন দেখে মাখরাজ নিশ্চিত হয় না; শিক্ষকের তিলাওয়াত অনুসরণ করুন।',example:'مِن شَرِّ',ref:'113:4'},
    {id:'idgham-ghunnah',label:'ইদগাম + গুন্নাহ',en:'Idgham with Ghunnah',group:'nasal',color:'#128078',duration:'২ হরকত',pattern:'نْ / তানবীন + ي ن م و',explain:'দুটি পৃথক শব্দের সংযোগে নুন সাকিন/তানবীনের পরে ي ن م و এলে নুন পরের অক্ষরের সঙ্গে মিলে যায়।',how:'পরের অক্ষরে মিলিয়ে নাকের ধ্বনি দুই হরকত রাখুন।',caution:'একই শব্দের الدنيا, بنيان, صنوان, قنوان-এ এই সাধারণ ইদগাম প্রযোজ্য নয়।',example:'مَن يَعْمَلْ',ref:'99:8'},
    {id:'idgham-clear',label:'ইদগাম (গুন্নাহ ছাড়া)',en:'Idgham without Ghunnah',group:'noon',color:'#477fa4',duration:'নাসিক্য টান নয়',pattern:'نْ / তানবীন + ل ر',explain:'নুন সাকিন বা তানবীনের পরে ভিন্ন শব্দে ل বা ر এলে মিলিয়ে পড়তে হয়; দুই-হরকতের গুন্নাহ হয় না।',how:'ল বা র-এর সঙ্গে সম্পূর্ণ মিলিয়ে পড়ুন।',caution:'শুধু পরবর্তী শব্দের ক্ষেত্রে; উচ্চারণে অতিরিক্ত নুন যোগ নয়।',example:'هُدًى لِّلْمُتَّقِينَ',ref:'2:2'},
    {id:'iqlab',label:'ইকলাব',en:'Iqlab',group:'nasal',color:'#be5574',duration:'২ হরকত',pattern:'نْ / তানবীন + ب',explain:'নুন সাকিন/তানবীনের পরে ب এলে নুনের ধ্বনি আড়ালকৃত মীমে রূপান্তরিত হয়।',how:'ঠোঁটের সংযম রেখে আড়ালকৃত মীমের গুন্নাহ দুই হরকত ধরে পড়ুন।',caution:'কিছু মুসহাফে ছোট م (ۢ) থাকে; সব Unicode-এ চিহ্নের রূপ এক নয়।',example:'مِنۢ بَعْدِ',ref:'98:4'},
    {id:'izhar',label:'ইযহার হালকি',en:'Izhar Halqi',group:'noon',color:'#5e8a53',duration:'স্বাভাবিক স্পষ্ট উচ্চারণ',pattern:'نْ / তানবীন + ء ه ع ح غ خ',explain:'নুন সাকিন/তানবীনের পরে ছয়টি হরফে হালকি এলে নুন স্পষ্ট উচ্চারিত হয়।',how:'নুন স্পষ্ট পড়ুন, অতিরিক্ত দীর্ঘ গুন্নাহ নয়।',caution:'পাশের হামজা/ওয়াসল এবং সংযোগের নিয়ম আলাদা করে যাচাই করুন।',example:'وَٱنْحَرْ',ref:'108:2'},
    {id:'mim-ikhfa',label:'ইখফা শাফাওয়ি',en:'Ikhfa Shafawi',group:'meem',color:'#9c6e46',duration:'২ হরকত',pattern:'مْ + ب',explain:'মীম সাকিনের পরে ب এলে ঠোঁটের ইখফা হয়।',how:'ঠোঁট স্বাভাবিক রেখে দুই হরকতের গুন্নাহসহ পড়ুন।',caution:'এটি নুনের ইখফা থেকে আলাদা নিয়ম।',example:'تَرْمِيهِم بِحِجَارَةٍ',ref:'105:4'},
    {id:'mim-idgham',label:'ইদগাম শাফাওয়ি',en:'Idgham Shafawi',group:'meem',color:'#3e8e8a',duration:'২ হরকত',pattern:'مْ + م',explain:'মীম সাকিনের পরে মীম এলে দুটি মীম মিলিয়ে গুন্নাহসহ পড়া হয়।',how:'দ্বিতীয় মীমে মিলিয়ে দুই হরকত গুন্নাহ দিন।',caution:'শব্দসংযোগে লিখিত তাশদীদ থাকতেও পারে, নাও পারে।',example:'لَهُم مَّا',ref:'2:29'},
    {id:'qalqala',label:'কলকলার ইঙ্গিত',en:'Qalqalah cue',group:'other',color:'#bd593e',duration:'ক্ষুদ্র প্রতিধ্বনি',pattern:'ق ط ب ج د + ْ',explain:'পাঁচটি কলকলার অক্ষর (قطب جد) সুকুনের অবস্থায় এলে ক্ষুদ্র প্রতিধ্বনির উচ্চারণ হয়।',how:'হরফের মাখরাজ থেকে স্বল্প ঝাঁকুনি/প্রতিধ্বনি দিন; আলাদা স্বর যোগ নয়।',caution:'ওয়াকফে শেষ অক্ষরের সাময়িক সুকুন এই স্বয়ংক্রিয় চিহ্নায়নে ধরা হয় না।',example:'يَجْعَلْ',ref:'105:2'},
    {id:'madd',label:'মাদ্দের দৃশ্যমান চিহ্ন',en:'Madd sign cue',group:'other',color:'#4b69bc',duration:'দৈর্ঘ্য প্রসঙ্গনির্ভর',pattern:'ٓ / ٰ / ۤ',explain:'লিখিত মাদ্দ/খাড়া-যবর জাতীয় চিহ্ন দীর্ঘ স্বর সম্পর্কে সতর্ক করে; মাদ্দের ধরনভেদে সময় আলাদা।',how:'মাদ্দ তাবিঈ সাধারণত ২, মুত্তাসিল/মুনফাসিল ৪–৫, লাযিম ৬ হরকত (হাফস/শাতিবিয়্যাহ)।',caution:'এটি চিহ্ন শনাক্ত করে, স্বয়ংক্রিয়ভাবে মাদ্দের ধরন বা দৈর্ঘ্য নির্ণয় করে না।',example:'ٱلضَّآلِّينَ',ref:'1:7'},
    {id:'waqf',label:'ওয়াকফ চিহ্ন',en:'Waqf sign',group:'other',color:'#68768b',duration:'বিরতির নির্দেশ',pattern:'ۖ ۗ ۘ ۙ ۚ ۛ ۜ ؕ',explain:'কিছু মুদ্রিত মুসহাফে চলা, থামা বা বিশেষভাবে বিরতির জায়গা বোঝাতে এই ছোট চিহ্নগুলো থাকে।',how:'চিহ্নের ধরন অনুযায়ী থামা বা মিলিয়ে পড়ুন; অর্থ ভেঙে যায় এমন স্থানে থামবেন না।',caution:'এগুলো প্রকাশক ও Unicode সংস্করণভেদে আলাদা; সব ওয়াকফ এই রঙে দেখানো হয় না।',example:'هُدًى لِّلْمُتَّقِينَ',ref:'2:2'}
  ]);
  const RULE_BY_ID=Object.fromEntries(RULES.map(r=>[r.id,r]));
  const SUKUN=/[\u0652\u06e1]/u, SHADDA=/\u0651/u;
  const TANWEEN=/[\u064b\u064c\u064d\u065e\u08f0\u08f1\u08f2]/u;
  const WAQF=/[\u0615\u06d6-\u06dc]/gu;
  const MADD=/[\u0653\u0670\u06e4]/u;
  const LETTER=/[\u0621-\u063a\u0641-\u064a\u0671\u06a9\u06c1\u06c3\u06cc]/u;
  const THROAT=new Set([...('ءهعحغخ')]);
  const IKHFA=new Set([...('تثجدذزسشصضطظفقك')]);
  const IDGHAM_GHUNNAH=new Set([...('ينمو')]);
  const IDGHAM_CLEAR=new Set([...('لر')]);
  const QALQALA=new Set([...('قطبجد')]);
  const HAMZA=new Set([...('ءأإؤئ')]);
  const canonical=c=>({'ک':'ك','ہ':'ه','ۃ':'ة','ی':'ي','ى':'ي','ٱ':'ٱ'}[c]||c);
  // Split only for analysis; source DOM remains a *single original Unicode text node*.
  function graphemes(text){
    const result=[];let pos=0,word=0,space=true;
    for(const cp of text){const len=cp.length;
      if(/\p{Mark}/u.test(cp)&&result.length){result[result.length-1].marks+=cp;result[result.length-1].end=pos+len;}
      else {if(/\s/u.test(cp)){space=true}else if(LETTER.test(cp)){if(space){word++;space=false}}
        result.push({base:cp,marks:'',start:pos,end:pos+len,word:word,letter:LETTER.test(cp)});
      }
      pos+=len;
    }
    return result;
  }
  function nextLetter(parts,index){for(let k=index+1;k<parts.length;k++){const p=parts[k];if(p.letter)return {part:p,index:k,sameWord:p.word===parts[index].word};}return null}
  function analyze(text){
    text=String(text||'');const parts=graphemes(text),hits=[];const dedupe=new Set();
    function add(rule,p,reason){let start=p.start,end=p.end;if(start===end)return;const key=rule+':'+start+':'+end;if(dedupe.has(key))return;dedupe.add(key);hits.push({rule,start,end,reason:reason||'',match:text.slice(start,end)});}
    for(let i=0;i<parts.length;i++){
      const p=parts[i];if(!p.letter)continue;
      const c=canonical(p.base),n=nextLetter(parts,i);
      if((c==='ن'||c==='م')&&SHADDA.test(p.marks))add('ghunnah',p,'তাশদীদ যুক্ত নুন বা মীম');
      if((c==='ن'&&(SUKUN.test(p.marks)||/[\u06e2]/u.test(p.marks)||(!p.marks&&n&&!n.sameWord)))||(TANWEEN.test(p.marks)&&p.letter)){
        const t=!!TANWEEN.test(p.marks);
        let q=n;
        // Tanween may precede a silent padding alif in the *same* word;
        // skip that alif only. Other intra-word letter transitions are not guessed.
        if(t&&q&&q.sameWord&&['ا','ى'].includes(q.part.base)&&!q.part.marks)q=nextLetter(parts,q.index);
        if(q&&(!t||!q.sameWord)){
          const letter=canonical(q.part.base),joined=!q.sameWord;
          if(letter==='ٱ'){/* Connection through hamzat al-wasl is context dependent; skip. */}
          else if(letter==='ب')add('iqlab',p,'নুন/তানবীনের পরে বা');
          else if(joined&&IDGHAM_GHUNNAH.has(letter))add('idgham-ghunnah',p,'দুই শব্দের সংযোগে গুন্নাহসহ ইদগাম');
          else if(joined&&IDGHAM_CLEAR.has(letter))add('idgham-clear',p,'দুই শব্দের সংযোগে গুন্নাহ ছাড়া ইদগাম');
          else if(IKHFA.has(letter))add('ikhfa',p,'নুন/তানবীন + ইখফার অক্ষর');
          else if(THROAT.has(letter)||HAMZA.has(letter))add('izhar',p,'নুন/তানবীন + হরফে হালকি');
        }
      }
      if(c==='م'&&(SUKUN.test(p.marks)||(!p.marks&&n&&!n.sameWord))&&n){const next=canonical(n.part.base);if(next==='ب')add('mim-ikhfa',p,'মীম সাকিনের পরে বা');else if(next==='م')add('mim-idgham',p,'মীম সাকিনের পরে মীম');}
      if(QALQALA.has(c)&&SUKUN.test(p.marks))add('qalqala',p,'দৃশ্যমান সুকুনযুক্ত কলকলার অক্ষর');
      if(MADD.test(p.marks))add('madd',p,'লিখিত মাদ্দ/দীর্ঘ স্বরের চিহ্ন');
    }
    // Waqf marks sometimes appear as standalone combining Unicode characters.
    for(const m of text.matchAll(WAQF)){
      const start=m.index,end=start+m[0].length,key='waqf:'+start+':'+end;
      if(!dedupe.has(key)){dedupe.add(key);hits.push({rule:'waqf',start,end,reason:'ওয়াকফ নির্দেশক চিহ্ন',match:m[0]});}
    }
    hits.sort((a,b)=>a.start-b.start||a.end-b.end);return hits;
  }
  const names=RULES.map(r=>'qg-'+r.id);const cache=new WeakMap();
  let on=false,only='all';
  function clear(){if(global.CSS?.highlights)for(const name of names)global.CSS.highlights.delete(name)}
  function setMode(value){on=!!value;refresh()}
  function setFilter(value){only=(value==='all'||RULE_BY_ID[value])?value:'all';refresh()}
  function fallbackWords(node,hits){
    const raw=node.dataset.rawTajweed||node.textContent;node.replaceChildren();
    // Word-wide fallback avoids breaking Arabic shaping across individual glyph spans.
    const rx=/\s+|[^\s]+/gu;for(const m of raw.matchAll(rx)){
      const start=m.index,end=start+m[0].length;
      const hit=hits.find(h=>h.start<end&&h.end>start&&/^\S/u.test(m[0]));
      if(hit){const span=document.createElement('span');span.className='qg-word-highlight';span.dataset.rule=hit.rule;span.textContent=m[0];node.append(span)}
      else node.append(document.createTextNode(m[0]));
    }
  }
  function refresh(){
    if(typeof document==='undefined')return;
    clear();const registry=global.CSS?.highlights;const supported=!!(registry&&global.Highlight&&document.createRange);
    const byRule=Object.fromEntries(RULES.map(r=>[r.id,[]]));
    for(const p of document.querySelectorAll('#qVerses .q-verse-ar')){
      const raw=p.dataset.rawTajweed||p.textContent;
      let hits=cache.get(p);if(!hits||hits.source!==raw){hits={source:raw,items:analyze(raw)};cache.set(p,hits)}
      const visible=on?hits.items.filter(h=>only==='all'||only===h.rule):[];
      // Restore a single text node before constructing CSS Highlights.
      if(p.textContent!==raw||p.childNodes.length!==1||p.firstChild?.nodeType!==3)p.textContent=raw;
      if(supported){for(const h of visible){try{const range=document.createRange();range.setStart(p.firstChild,h.start);range.setEnd(p.firstChild,h.end);byRule[h.rule].push(range)}catch(_){}}}
      else if(visible.length)fallbackWords(p,visible);
      const foot=p.closest('.q-verse')?.querySelector('.q-taj-summary');
      if(foot){foot.replaceChildren();foot.hidden=!on;if(on){const found=[...new Set(hits.items.map(x=>x.rule))];
        if(!found.length){const span=document.createElement('span');span.className='q-taj-none';span.textContent='এই আয়াতে নিশ্চিতভাবে শনাক্তযোগ্য চিহ্ন পাওয়া যায়নি';foot.append(span)}
        for(const id of found){const rule=RULE_BY_ID[id],total=hits.items.filter(x=>x.rule===id).length;const b=document.createElement('button');b.type='button';b.className='q-taj-chip';b.dataset.rule=id;b.style.setProperty('--chip-color',rule.color);b.setAttribute('aria-label',rule.label+' · '+total+'টি সম্ভাব্য চিহ্ন · নিয়ম দেখুন');b.textContent=rule.label+' · '+total;foot.append(b)}
      }}
    }
    if(supported&&on)for(const [id,ranges] of Object.entries(byRule))if(ranges.length){try{registry.set('qg-'+id,new global.Highlight(...ranges))}catch(_){}}
    document.documentElement.dataset.tajweedEnabled=String(on);
    document.documentElement.dataset.tajweedFilter=only;
  }
  function getState(){return {enabled:on,filter:only,supportsCssHighlights:!!(global.CSS?.highlights&&global.Highlight)}}
  global.QGTajweed={RULES,RULE_BY_ID,analyze,setMode,setFilter,refresh,getState,clear};
})(typeof window!=='undefined'?window:globalThis);
