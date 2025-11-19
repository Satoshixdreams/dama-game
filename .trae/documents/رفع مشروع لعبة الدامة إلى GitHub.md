## الهدف
- رفع المشروع الحالي (Turkish Draughts – Offline) إلى GitHub بشكل مرتب وجاهز للتشغيل.

## افتراضات
- سنستخدم اسم مستودع افتراضي: "dama-game-offline".
- سيكون المستودع عامًا ما لم تطلب أن يكون خاصًا.
- سنرفع الملفات الحالية دون إضافة وثائق جديدة.

## الخطوات المقترحة
1. إنشاء مستودع على حسابك في GitHub
- إذا رغبت أن أنشئه لك آليًا، زوّدني باسم المستخدم/المنظمة واذن الوصول.
- أو أنشئه يدويًا في GitHub باسم "dama-game-offline".

2. تهيئة Git محليًا داخل المشروع
- تنفيذ الأوامر:
- `git init`
- `git add .`
- `git commit -m "Initial commit: Turkish Draughts offline game"`
- `git branch -M main`

3. ربط المستودع والدفع
- `git remote add origin https://github.com/<اسم_حسابك>/dama-game-offline.git`
- `git push -u origin main`

## ملفات سيتم رفعها
- `index.html`, `index.js`, `package.json`, `render.yaml`, `.gitignore`, `.gitattributes`, `SECURITY.md`.
- لا توجد أسرار ضمن الملفات (`.env` مستثنى عبر `.gitignore`).

## بديل رفع آلي عبر GitHub API
- يمكنني إنشاء المستودع والدفع آليًا إذا وفرت صلاحيات GitHub اللازمة (PAT/إذن MCP)، واسم الحساب المراد.

## التحقق بعد الرفع
- فتح المستودع على GitHub والتأكد من ظهور الملفات.
- تشغيل الخادم محليًا عبر `npm start` للتأكد من سلامة الملفات.

هل تريد المتابعة بالخيار اليدوي بالأوامر أعلاه، أم أتابع بالرفع الآلي إذا وفرت بيانات الدخول؟