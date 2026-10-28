#!/usr/bin/env bash
# انتشار نسخه v0.9.1 — main + تگ + gh-pages + Release با ZIP
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v091.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود؛ در پایان، remote بدون توکن بازمی‌گردد.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
TAG="v0.9.1"
ZIP="download/porseshnameh-static-v0.9.1.zip"
[ -f "$ZIP" ] || { echo "✗ ZIP موجود نیست: $ZIP"; exit 1; }

git remote set-url origin "https://hjalilvand2004-coder:${GH_TOKEN}@github.com/${REPO}.git"
trap 'git remote set-url origin "https://github.com/${REPO}.git"' EXIT

echo "▶ ۱/۳ push main + تگ ${TAG} ..."
git push origin main
git push origin "${TAG}"

echo "▶ ۲/۳ استقرار gh-pages ..."
bash scripts/deploy-ghpages.sh

echo "▶ ۳/۳ ساخت Release ${TAG} ..."
ZIP_NAME="porseshnameh-static-v0.9.1.zip"

NOTES=$(cat <<'ZEOF'
## تغییرات نسخه 0.9.1 — پرسشنامه بدون سوال تکراری: ماتریس انتساب اعضا

### رفع کامل سوالات تکراری (مشکل اصلی گزارش‌شده: A1 دوبار و بقیه)
- شاخص‌های عضومحور (A1، A2، A3، A5، وضعیت تغذیه‌ای ویژه، B1، B2، B6) که به‌ازای هر عضو خانوار یک کارت جداگانه داشتند (خانوار دوعضوی ⇒ سوال A1 دوبار؛ سه‌عضوی ⇒ سه‌بار)، اکنون **فقط یک‌بار** پرسیده می‌شوند: یک کارت واحد برای هر شاخص
- پرسش گیت سطح خانوار («آیا یکی از اعضای خانوار بیماری مزمن یا جدی دارد؟») و با پاسخ «بله»، بلافاصله **ماتریس انتساب اعضا** باز می‌شود: کدام اعضا دارای این وضعیت‌اند (تیک عضو) + فیلدهای همان عضو در همان ردیف (وضعیت/شدت/اثر + توضیح تکمیلی عضومحور)
- با پاسخ «خیر»، پاسخ «ندارد» به‌صورت خودکار برای همه اعضا ثبت می‌شود؛ «نمی‌دانم/مایل به پاسخ نیستم» نیز پاسخ خاص همه اعضا را ثبت می‌کند
- اعضای افزوده‌شده پس از پاسخ‌دهی، با دکمه «اعمال برای اعضای جدید» به پاسخ شاخص یکدست می‌شوند
- مدل داده و موتور امتیازدهی بدون تغییر (پاسخ‌ها همچنان با کلید `qid#memberId`) — بانک ۸ پرونده نمونه و پرونده‌های قبلی کاملاً سازگارند (گیت از داده موجود بازخوانی می‌شود)

### ملاک استعلام در ماتریس — جای و مقدار، بدون نیاز به ثبت کاربر
- ردیف پوشش بیمه هر عضو (A5) پس از استعلام بیمه و ردیف وضعیت تحصیل (B1) پس از استعلام آموزش‌وپرورش، در ماتریس قفل با برچسب «ملاک استعلام — غیرقابل ویرایش» + منبع و زمان نمایش داده می‌شود
- ردیف‌های بدون استعلام (ناموفق یا اجرا نشده) به‌صورت دستی قابل ثبت‌اند
- ثبت مدرک مثبت در سطح شاخص (نوع/عنوان/شماره مرجع + فایل تا ۴۰۰KB) — متصل به شاخص مبدا و فهرست‌شده در گام ۹

### متفرقه
- رفع باگ نمایشی: حلقه قرمز معکوس فیلدهای معتبر فرم ثبت‌نام (aria-invalid)
- help.html: بخش «پرسش‌های هوشمند» برای الگوی جدید بازنویسی شد — README: یادداشت v0.9.1
- نسخه: 0.9.1 | قواعد نسخه EM-MPI-RF 1.0.0-demo (بدون تغییر در موتور سنجش)

*(سایر ویژگی‌ها مطابق v0.9.0: فالوآپ مستندسازی پرسش‌های خانوار، حذف تکرارهای C1/C3 و C4، همگام‌سازی ثبت‌نام — و مطابق v0.8.x: شناسنامه عملیاتی سنجش ۳۰ شاخص، صفحه ورود، ثبت‌نام مودالی با واکشی خودکار ۷ مرجع، راهنمای PDF برداری، نقشه مهاجرت، START.bat)*
ZEOF
)

printf '%s' "$NOTES" > /tmp/relnotes-v091.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v091.json
import json, sys, pathlib
tag = sys.argv[1]
body = pathlib.Path('/tmp/relnotes-v091.md').read_text(encoding='utf-8')
print(json.dumps({"tag_name": tag,
 "name": "نسخه 0.9.1 — پرسشنامه بدون سوال تکراری: ماتریس انتساب اعضا",
 "body": body, "draft": False, "prerelease": False}))
PYEOF

URL="https://api.github.com/repos/${REPO}/releases"
RESP=$(curl -sS -X POST "$URL" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d @/tmp/relbody-v091.json)
REL_ID=$(printf '%s' "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))")
if [ -z "$REL_ID" ]; then
  echo "✗ ساخت Release ناموفق بود:"; printf '%s\n' "$RESP" | head -5; exit 1
fi
echo "  Release id: $REL_ID — بارگذاری ZIP ..."
curl -sS -X POST "https://uploads.github.com/repos/${REPO}/releases/${REL_ID}/assets?name=${ZIP_NAME}" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Content-Type: application/zip" \
  --data-binary "@${ZIP}" | python3 -c "import sys,json; d=json.load(sys.stdin); print('  ✓', d.get('name'), d.get('browser_download_url',''))"

echo "✓ انتشار کامل شد."
