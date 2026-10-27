#!/usr/bin/env bash
# انتشار نسخه v0.9.0 — main + تگ + gh-pages + Release با ZIP
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v080.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود؛ در پایان، remote بدون توکن بازمی‌گردد.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
TAG="v0.9.0"
ZIP="download/porseshnameh-static-v0.9.0.zip"
[ -f "$ZIP" ] || { echo "✗ ZIP موجود نیست: $ZIP"; exit 1; }

git remote set-url origin "https://hjalilvand2004-coder:${GH_TOKEN}@github.com/${REPO}.git"
trap 'git remote set-url origin "https://github.com/${REPO}.git"' EXIT

echo "▶ ۱/۳ push main + تگ ${TAG} ..."
git push origin main
git push origin "${TAG}"

echo "▶ ۲/۳ استقرار gh-pages ..."
bash scripts/deploy-ghpages.sh

echo "▶ ۳/۳ ساخت Release ${TAG} ..."
ZIP_NAME="porseshnameh-static-v0.9.0.zip"

NOTES=$(cat <<'ZEOF'
## تغییرات نسخه 0.9.0 — پرسش‌های هوشمند: بدون تکرار، فالوآپ عضومحور و ثبت مدرک مثبت

### حذف پرسش‌های تکراری
- «نوع محل سکونت» و «نوع حق سکونت» فقط در گام مسکن (C1/C3) پرسیده می‌شوند؛ داده ثبتی موجود (اطلاعات پایه/استعلام املاک) به‌صورت فقط‌خواندنی کنار همان شاخص نمایش داده می‌شود
- «تعداد اتاق» و «زیربنا» فقط در شاخص C4 — بخش هزینه‌های مسکن در اطلاعات پایه به C8 محدود شد
- اطلاعات ثبت‌نام (موبایل سرپرست و…) در پرسشنامه قفل‌شده نمایش داده می‌شود و از خانوار تکرار نمی‌شود

### فالوآپ عضومحور + ثبت مدرک مثبت
- با هر پاسخ شرطی («دارد»، «بله»، انتخاب‌های غیر «هیچ‌کدام») بلافاصله فیلد مستندسازی باز می‌شود: انتخابگر «کدام اعضا؟» در پرسش‌های خانوار (برای بار مراقبت، نقش «نیازمند مراقبت» عضو خودکار علامت می‌خورد)، فیلد توضیح تکمیلی (نوع/نام بیماری و…) و کنترل ثبت مدرک مثبت (نوع/عنوان/شماره مرجع + فایل تصویر یا PDF تا ۴۰۰KB)
- مدرک به پرسش مبدا (و در سطح عضو، به عضو مشخص) متصل می‌ماند؛ گام ۹ «کیفیت داده» بخش «مدارک مثبت ثبت‌شده» را با اتصال کامل فهرست می‌کند
- پرسش‌های شامل فالوآپ: A1، A2، A3، A7، A6 (سوءتغذیه/بارداری)، B1، B6، C1، C2، C4، C8، E2، E4

### استعلام خودکار و ملاک
- پاسخ پوشش بیمه هر عضو (A5) از استعلام بیمه و وضعیت ثبت‌نام تحصیلی (B1) از استعلام آموزش‌وپرورش، پس از واکشی به‌صورت **خودکار** پر و «ملاک استعلام — غیرقابل ویرایش» می‌شود (بدون دکمه اعمال دستی)؛ نتایج سایر استعلام‌ها هم خودکار اعمال می‌شوند
- اصلاح باگ الگوریتم رقم کنترل کد ملی (آستانه rem<2 مطابق الگوریتم رسمی ثبت احوال) + اصلاح کدهای ملی پرونده‌های نمونه به مقادیر معتبر — گیت کد ملی دیگر پرونده‌های نمونه را قفل نمی‌کند
  ۱) مفهوم اصلی شاخص + صراحتاً «خارج از دامنه» — ۲) واحد سنجش و تجمیع — ۳) دوره زمانی — ۴) پرسش‌های واقعه‌محور (رخداد/تداوم/فراوانی/پیامد) با شناسه پرسش‌های همان فرم — ۵) داده‌های کمی — ۶) شواهد زمینه‌ای و عملکردی — ۷) قواعد تعیین سطح با «و»/«یا» و تقدم قواعد — ۸) وضعیت شواهد (منبع/کفایت/تعارض/تأیید) — ۹) استثناها و مرز شاخص‌ها
### راهنما و متفرقه
- help.html: بخش جدید «شناسنامه شاخص‌ها» + پرسش متداول — README: یادداشت v0.9.0
- نسخه: 0.8.0 | قواعد نسخه EM-MPI-RF 1.0.0-demo (بدون تغییر در موتور سنجش)

*(سایر ویژگی‌ها مطابق v0.8.x: شناسنامه عملیاتی سنجش ۳۰ شاخص، صفحه ورود + حساب کاربری، ثبت‌نام مودالی با واکشی خودکار ۷ مرجع، شاپرک، راهنمای PDF برداری، راهنمای مهاجرت هر بخش، بانک ۸ پرونده نمونه، START.bat)*
ZEOF
)

printf '%s' "$NOTES" > /tmp/relnotes-v080.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v080.json
import json, sys, pathlib
tag = sys.argv[1]
body = pathlib.Path('/tmp/relnotes-v080.md').read_text(encoding='utf-8')
print(json.dumps({"tag_name": tag,
 "name": "نسخه 0.9.0 — پرسش‌های هوشمند: بدون تکرار، فالوآپ عضومحور و مدرک مثبت",
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
