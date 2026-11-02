আল কুরআন – PWA (Vercel)
========================

সর্বশেষ UI আপডেট
- ডেস্কটপে সূরার তালিকা দুই কলামে; মোবাইলে এক কলামে।
- সূরা নির্বাচনে ১–১১৪ নম্বর দেখায়। বাংলা ও English নম্বর দিয়ে খোঁজা যায়।
- নতুন সংস্করণ শনাক্ত করার জন্য Service Worker-এর build নম্বর আপডেট হয়েছে।

এই প্যাকেজে যা আছে
- public/        : ডিপ্লয় করার তৈরি সাইট (index.html, ডাটা d/, ফন্ট fonts/)
- tpl/           : sw.js, manifest, আইকন (build_pwa.py এগুলো ব্যবহার করে)
- build_pwa.py   : আপনার নতুন HTML থেকে আবার public/ বানায়
- vercel.json    : outputDirectory = public, বিল্ড নেই, হেডার/ক্যাশ নিয়ম
- .vercelignore  : tpl, build_pwa.py, README আপলোড থেকে বাদ

প্রথমবার ডিপ্লয় (Vercel-এ ড্র্যাগ-ড্রপ নেই; CLI বা Git লাগবে)
CLI:
1) Node.js ইনস্টল করুন → এই ফোল্ডারে (যেখানে vercel.json আছে) টার্মিনাল খুলুন।
2) npx vercel login
3) npx vercel          (প্রথমবার প্রশ্ন করবে: Framework = Other, বিল্ড কমান্ড ফাঁকা রাখুন – vercel.json এ ঠিক করা আছে)
4) পরীক্ষা ঠিক থাকলে:  npx vercel --prod
Git:
- ফোল্ডারটা GitHub-এ পুশ করুন → vercel.com → Add New → Project → রিপো Import করুন। Framework Preset: Other; Output Directory: public (vercel.json থেকেই আসে)।
দ্রষ্টব্য: Vercel-এর ফ্রি (Hobby) প্ল্যান সাধারণত অ-বাণিজ্যিক ব্যবহারের জন্য; শর্ত vercel.com/pricing এ দেখে নিন।

ফোনে ইনস্টল
- Android Chrome: লিংক খুলুন → নিচে "📲 অ্যাপ ইনস্টল করুন" বোতাম আসবে (বা মেনু ⋮ → Install app / Add to Home screen)।
- iPhone Safari: Share → Add to Home Screen।
- ইনস্টলের পর অ্যাপ নিজে থেকে সব ডাটা (~২৮ MB) ব্যাকগ্রাউন্ডে নামিয়ে রাখে, তখন ইন্টারনেট ছাড়াই চলে। (অডিও অনলাইনেই চলে।)

আপডেট দেওয়া (Vercel)
  python3 build_pwa.py আপনার_নতুন_ফাইল.html   →  তারপর  npx vercel --prod  (Git হলে কমিট/পুশ)।
ব্যবহারকারীর ফোনে পরের বার খোলার সময় নতুন সংস্করণ আসবে; শুধু বদলানো ডাটা-ফাইলই আবার নামবে।

কম্পিউটারে লোকাল টেস্ট (file:// এ চলবে না, সার্ভার লাগবে)
  cd public && python3 -m http.server 8000   → http://localhost:8000

ডিফল্টে সাইটটি "noindex" (গুগলে আসবে না): vercel.json এর X-Robots-Tag, public/robots.txt ও index.html এর robots meta।
প্রকাশ্যে আনতে চাইলে এই তিনটা সরান (tpl/ এর robots.txt-ও) — কিন্তু তার আগে নিচের অনুমতির বিষয়টা মিটিয়ে নিন।

প্রকাশের আগে অবশ্যই দেখুন (কপিরাইট/লাইসেন্স)
- তাফহীমুল কুরআনের বাংলা অনুবাদ ও টীকা, অন্যান্য অনুবাদ/তাফসির (মুহিউদ্দীন খান, ইবনে কাসীর, Sahih International ইত্যাদি) — প্রকাশক/স্বত্বাধিকারীর অনুমতি।
- Green Tech (GTAF) অ্যাপ থেকে নেওয়া ফন্ট, শব্দ-বিশ্লেষণ/বিষয়সূচি/সূরা-তথ্যের ডাটা — তাদের লিখিত অনুমতি।
- লেমা/রুট ডাটার মূল উৎস Quranic Arabic Corpus (GNU GPL) — উৎসের উল্লেখ ও লাইসেন্স শর্ত।
- আরবি লেখা (Tanzil) ও প্রতিটা ফন্টের (Noorehuda, Ruqyah ফন্ট ইত্যাদি) লাইসেন্স।
- হোস্টিং প্ল্যানের ডাটা/ব্যান্ডউইথ সীমা সময়ে সময়ে বদলায়; অনেক ব্যবহারকারী হলে প্ল্যানের প্রাইসিং পেজ দেখে নিন।
