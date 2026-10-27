#!/usr/bin/env bash
# انتشار نسخه v0.8.0 — main + تگ + gh-pages + Release با ZIP
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v080.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود؛ در پایان، remote بدون توکن بازمی‌گردد.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
TAG="v0.8.0"
ZIP="download/porseshnameh-static-v0.8.0.zip"
[ -f "$ZIP" ] || { echo "✗ ZIP موجود نیست: $ZIP"; exit 1; }

git remote set-url origin "https://hjalilvand2004-coder:${GH_TOKEN}@github.com/${REPO}.git"
trap 'git remote set-url origin "https://github.com/${REPO}.git"' EXIT

echo "▶ ۱/۳ push main + تگ ${TAG} ..."
git push origin main
git push origin "${TAG}"

echo "▶ ۲/۳ استقرار gh-pages ..."
bash scripts/deploy-ghpages.sh

echo "▶ ۳/۳ ساخت Release ${TAG} ..."
ZIP_NAME="porseshnameh-static-v0.8.0.zip"

NOTES=$(cat <<'ZEOF'
## تغییرات نسخه 0.8.0 — شناسنامه عملیاتی سنجش ۳۰ شاخص (شاهد‌محور)

### مودال «شناسنامه سنجش» روی هر شاخص
- کنار کارت هر ۳۰ شاخص در فرم پرسشنامه و در جدول شاخص‌های داشبورد حرفه‌ای، دکمه **«شناسنامه سنجش»** اضافه شد که مودالی با **نُه جزء استاندارد سنجش** باز می‌کند:
  ۱) مفهوم اصلی شاخص + صراحتاً «خارج از دامنه» — ۲) واحد سنجش و تجمیع — ۳) دوره زمانی — ۴) پرسش‌های واقعه‌محور (رخداد/تداوم/فراوانی/پیامد) با شناسه پرسش‌های همان فرم — ۵) داده‌های کمی — ۶) شواهد زمینه‌ای و عملکردی — ۷) قواعد تعیین سطح با «و»/«یا» و تقدم قواعد — ۸) وضعیت شواهد (منبع/کفایت/تعارض/تأیید) — ۹) استثناها و مرز شاخص‌ها
- **لنگر مصداقی هر ضریب**: برای هر ضریب (۰ تا ۱) یک «مصداق/شاهد مثال» عینی و ملموس — جواب درخواست کاربر برای مصداق‌محور/شاهد‌محور کردن شاخص‌های کیفی و یکسان‌سازی تفسیر ارزیابان
- **سهم وب‌سرویس‌های متولی**: برای هر شاخص مشخص است کدام استعلام ثبتی چه بخشی را پر یا راستی‌آزمایی می‌کند؛ با وضعیت زنده استعلام همان پرونده («واکشی شد — ملاک» / «استعلام نشده») — جواب درخواست کاربر برای استفاده از وب‌سرویس‌های سازمان‌ها در پر کردن شاخص‌ها
- سربرگ مودال: بُعد، وزن، مقیاس (سه‌حالته/پنج‌حالته)، واحد سنجش، ضریب و امتیاز فعلی پرونده + برچسب «نیازمند تصویب» برای آستانه‌های در انتظار مرجع
- قواعد هر شناسنامه با موتور محاسبه قطعی هم‌راستاست؛ مصداق‌ها لنگر تفسیری‌اند نه قاعده امتیاز جدید

### راهنما و متفرقه
- help.html: بخش جدید «شناسنامه شاخص‌ها» + پرسش متداول — README: یادداشت v0.8.0
- نسخه: 0.8.0 | قواعد نسخه EM-MPI-RF 1.0.0-demo (بدون تغییر در موتور سنجش)

*(سایر ویژگی‌ها مطابق v0.7.x: صفحه ورود + حساب کاربری، ثبت‌نام مودالی با واکشی خودکار ۷ مرجع، شاپرک، راهنمای PDF برداری، راهنمای مهاجرت هر بخش، بانک ۸ پرونده نمونه، START.bat)*
ZEOF
)

printf '%s' "$NOTES" > /tmp/relnotes-v080.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v080.json
import json, sys, pathlib
tag = sys.argv[1]
body = pathlib.Path('/tmp/relnotes-v080.md').read_text(encoding='utf-8')
print(json.dumps({"tag_name": tag,
 "name": "نسخه 0.8.0 — شناسنامه عملیاتی سنجش ۳۰ شاخص (شاهد‌محور)",
 "body": body, "draft": False, "prerelease": False}))
PYEOF

URL="https://api.github.com/repos/${REPO}/releases"
RESP=$(curl -sS -X POST "$URL" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d @/tmp/relbody-v080.json)
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
