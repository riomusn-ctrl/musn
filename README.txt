إصلاح ظهور صورة Hero على GitHub Pages

الملفات الجاهزة:
- index.html
- styles.css
- script.js

هيكل المجلد المطلوب على GitHub:
/
├── index.html
├── styles.css
├── script.js
└── assets/
    └── images/
        └── innovation.PNG

مهم جدًا:
1) GitHub Pages يفرّق بين الحروف الكبيرة والصغيرة.
   innovation.png مختلف عن Innovation.png ومختلف عن innovation.PNG.
2) ارفع مجلد assets كاملًا إلى المستودع، وليس ملفات HTML/CSS/JS فقط.
3) النسخة المعدلة تستخدم مسارات نسبية تبدأ بـ ./ وتجرّب تلقائيًا أشهر اختلافات اسم صورة Hero.
4) إذا لم توجد الصورة أصلًا داخل assets/images فستظهر خلفية احتياطية بدل مساحة فارغة.
5) بعد رفع الملفات نفّذ Hard Refresh في المتصفح: Ctrl + F5.

المسار الأساسي المستخدم:
./assets/images/innovation.png
