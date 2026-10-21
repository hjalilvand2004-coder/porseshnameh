#!/usr/bin/env bash
# انتشار نسخه v0.5.0 — main + تگ + gh-pages + Release با ZIP
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v050.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود؛ در پایان، remote بدون توکن بازمی‌گردد.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
TAG="v0.5.0"
ZIP="download/porseshnameh-static-v0.5.0.zip"
[ -f "$ZIP" ] || { echo "✗ ZIP موجود نیست: $ZIP"; exit 1; }

# ۱) تنظیم موقت remote با توکن
git remote set-url origin "https://hjalilvand2004-coder:${GH_TOKEN}@github.com/${REPO}.git"
trap 'git remote set-url origin "https://github.com/${REPO}.git"' EXIT

echo "▶ ۱/۳ push main + تگ ${TAG} ..."
git push origin main
git push origin "${TAG}"

echo "▶ ۲/۳ استقرار gh-pages ..."
bash scripts/deploy-ghpages.sh

echo "▶ ۳/۳ ساخت Release ${TAG} ..."
ZIP_NAME="porseshnameh-static-v0.5.0.zip"

NOTES=$(cat <<'ZEOF'
## تغییرات نسخه 0.5.0 — راهنمای مهاجرت هر بخش + کد ملی کلیدی و اجباری

### دکمه «راهنمای بخش» در هر ۱۰ گام پرسشنامه (مودال مهاجرت)
- کلیک روی دکمه، فرم مودالی باز می‌کند و سه پرسش را پاسخ می‌دهد:
  **۱) فلسفه این بخش چیست؟** (چرا وجود دارد + نقاط کلیدی)
  **۲) ارتباطش با پرسشنامه قبلی چیست؟** (کدام فیلدهای قدیم به اینجا آمده‌اند)
  **۳) سیاست جابجایی و تحول به پرسشنامه جدید چیست؟** (مکانیزم گام‌به‌گام انتقال داده)
- گام‌های امتیازی (A–E): جدول نگاشت شاخص‌های همان بخش (شاخص/عنوان/وزن/اقدام/منبع قبلی/تغییر)
- گام‌های غیرامتیازی (هویت، فوریت، اطلاعات پایه، کیفیت، خلاصه): شرح اختصاصی سیاست مهاجرت همان گام

### دکمه «راهنما» کنار برچسب ماهیت هر شاخص
- کنار برچسب ماهیت (همان قبلی/بازتعریف/تجزیه/کنترل/جدید) روی کارت هر شاخص، دکمه راهنما اضافه شد
- مودال شاخص: ماهیت + وزن + راستی‌آزمایی ثبتی + فلسفه سنجش + فیلدهای منبع قبلی + سیاست مهاجرت بر اساس همان اقدام نگاشت

### کد ملی — کلیدی و اجباری
- کد ملی سرپرست با الگوریتم رقم کنترل ثبت احوال اعتبارسنجی می‌شود (تبدیل ارقام فارسی/عربی، رد کدهای تکراری بی‌معنا)
- بدون کد ملی معتبر: دکمه «بعدی» قفل، پرش بین گام‌ها مسدود، واکشی و استعلام مراجع غیرفعال — با پیام روشن
- «کد ملی (کلید پرونده)» در شناسنامه ارزیابی (گام ۱۰) ثبت و نمایش داده می‌شود
- هشدار پرونده تکراری: در صورت وجود پرونده دیگری با همان کد ملی، پیش از واکشی هشدار آگاهانه نمایش داده می‌شود
- مسیر «فاقد مدرک» صرفاً از مسیر پرچم R8 با همراهی مددکار پیگیری می‌شود

### فنی
- src/lib/mpi/national-id.ts — اعتبارسنجی کد ملی/کد پستی
- src/lib/mpi/section-guide.ts — محتوای فلسفه/ارتباط/سیاست مهاجرت هر ۱۰ گام + سیاست ۵ اقدام نگاشت
- src/components/porsesh/section-guide.tsx — SectionGuideDialog + IndicatorGuideButton
- راستی‌آزمایی مرورگر: اعتبارسنجی کد ملی (نامعتبر/معتبر)، قفل گیت، مودال بخش و شاخص، file:// مستقیم — بدون خطای کنسول

*(سایر ویژگی‌ها مطابق v0.4.1: ملاحظات مهاجرت کامل در help.html، شروع با واکشی هویتی، بانک ۸ پرونده نمونه، START.bat)*
ZEOF
)

printf '%s' "$NOTES" > /tmp/relnotes-v050.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v050.json
import json, sys, pathlib
tag = sys.argv[1]
body = pathlib.Path('/tmp/relnotes-v050.md').read_text(encoding='utf-8')
print(json.dumps({"tag_name": tag,
 "name": "نسخه 0.5.0 — راهنمای مهاجرت هر بخش + کد ملی کلیدی",
 "body": body, "draft": False, "prerelease": False}))
PYEOF

URL="https://api.github.com/repos/${REPO}/releases"
RESP=$(curl -sS -X POST "$URL" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d @/tmp/relbody-v050.json)
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
