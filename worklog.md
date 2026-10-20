# Worklog

---
Task ID: 1
Agent: main (Z.ai)
Task: پیاده‌سازی سامانه پرسشنامه مدرن EM-MPI و انتشار در گیت (github.com/hjalilvand2004-coder/porseshnameh)

Work Log:
- بررسی محیط: مخزن گیت خالی و توکن معتبر؛ فایل پرسشنامه.xlsx در محیط موجود نبود — بر اساس نقشه بازنگری و پرامپت جامع کاربر عمل شد.
- init-fullstack اجرا شد (Next.js 16 + TS + Tailwind 4 + shadcn/ui).
- هسته EM-MPI در src/lib/mpi/: rules.ts (وزن‌ها/سقف‌ها/سطوح/پرچم‌ها/مسیرهای ارجاع/نیازمند تصویب)، engine.ts (موتور قطعی حل ۳۰ شاخص + تناقض‌یاب + پیشنهاد پرچم)، questions.ts (فرهنگ داده ۱۰ گام)، selftest.ts (۱۵ آزمون پذیرش)، samples.ts (۳ سناریو)، types.ts، format.ts.
- Store: Zustand + persist با ممیزی، اصلاح مستند داده، ارجاع با پذیرش مسئولیت، پرچم فوریت.
- UI: پوسته RTL با Vazirmatn (سلف‌هاست)، سرمه‌ای/فیروزه‌ای، دو نمای خانوار/حرفه‌ای، جریان ۱۰ گامی، دیالوگ فوریت همیشه‌در‌دسترس، داشبورد حرفه‌ای با تب‌ها، صفحه قواعد+خودآزمایی، صفحه نقشه مهاجرت.
- ناسازگاری سند مرجع (جمع وزن B=۲۱۰ در برابر سقف ۲۰۰) طبق دستور کار بدون جعل، در فهرست «نیازمند تصویب» ثبت شد؛ خودآزمایی ۱۵/۱۵ موفق.
- راستی‌آزمایی با agent-browser: صفحه اصلی، سناریوی نمونه (۳۰/۳۰، نتیجه نهایی، امتیاز ۲۱۵، سطح ۲)، جدول شاخص‌ها، تب‌های داشبورد، موبایل iPhone 14 — همه بدون خطای کنسول.
- انتشار: push سورس به main (۲ کامیت)، بیلد استاتیک با basePath /porseshnameh (STATIC_EXPORT=1)، push به gh-pages + .nojekyll (رفع 404 زیرخط Jekyll)، فعال‌سازی Pages از طریق API، Release v0.1.0 با zip قابل حمل.

Stage Summary:
- مخزن: https://github.com/hjalilvand2004-coder/porseshnameh (main = سورس، gh-pages = بیلد استاتیک)
- سایت زنده: https://hjalilvand2004-coder.github.io/porseshnameh/
- Release قابل حمل: https://github.com/hjalilvand2004-coder/porseshnameh/releases/tag/v0.1.0 (porseshnameh-static-v0.1.0.zip)
- قواعد نسخه EM-MPI-RF-1.0.0-demo؛ موارد آستانه‌ای بدون تصویب مرجع در UI برچسب «نیازمند تصویب» دارند.

---
Task ID: 2
Agent: main (Z.ai)
Task: رفع نقص «نسخه ناقص بدون دکمه شروع» — قابل‌حمل کردن بیلد ZIP

Work Log:
- علت شناسایی شد: بیلد v0.1.0 با basePath مطلق /porseshnameh/ ساخته می‌شد؛ در GitHub Pages کار می‌کرد ولی پس از استخراج ZIP و باز کردن index.html (حالت file:// یا هر مسیر دیگر) دارایی‌ها 404 می‌شدند و صفحه روی «در حال بارگذاری» گیر می‌کرد — بدون هیچ دکمه شروع.
- next.config.ts: حذف basePath و استفاده از assetPrefix نسبی ("./") → یک بیلد واحد برای همه استقرارها.
- page.tsx: ضامن ۱۲۰۰ms برای markHydrated تا اگر localStorage در دسترس نبود، صفحه در حالت بارگذاری گیر نکند.
- scripts/build-static.sh بازنویسی + postprocess-static.py (مسیر فونت نسبت به عمق CSS) + audit-portable.sh (ممیزی نبود مسیر مطلق) + PORTABLE-README.txt داخل خروجی.
- رستی‌آزمایی با agent-browser: file:// مستقیم، سرور زیرمسیر /out/، و جریان واقعی کاربر (دانلود ZIP از Release → استخراج → باز کردن index.html → دکمه شروع → گام ۱ جادو). بدون خطای کنسول.
- استقرار gh-pages با بیلد جدید؛ سایت زنده دوباره تأیید شد.
- Release v0.1.1 منتشر شد (porseshnameh-static-v0.1.1.zip) + کپی در /home/z/my-project/download/.
- README با جدول «اجرای فوری — سه راه» به‌روزرسانی و همه تغییرات به main (کامیت 20b1a14) و تگ v0.1.1 push شد.

Stage Summary:
- نسخه ZIP حالا کاملاً آفلاین اجرا می‌شود: استخراج → دوبار کلیک روی index.html → دکمه «شروع پرسشنامه جدید».
- لینک‌ها: سایت زنده hjalilvand2004-coder.github.io/porseshnameh/ • Release v0.1.1 • کپی محلی zip در download/.
