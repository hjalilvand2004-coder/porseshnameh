#!/usr/bin/env bash
# انتشار نسخه v0.9.4 — main + تگ + gh-pages + Release با ZIP
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v094.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود؛ در پایان، remote بدون توکن بازمی‌گردد.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
TAG="v0.9.4"
ZIP_NAME="porseshnameh-static-v0.9.4.zip"
ZIP="download/${ZIP_NAME}"
[ -f "$ZIP" ] || { echo "✗ ZIP موجود نیست: $ZIP"; exit 1; }

git remote set-url origin "https://hjalilvand2004-coder:${GH_TOKEN}@github.com/${REPO}.git"
trap 'git remote set-url origin "https://github.com/${REPO}.git"' EXIT

echo "▶ ۱/۳ push main + تگ ${TAG} ..."
git push origin main
git push origin "${TAG}"

echo "▶ ۲/۳ استقرار gh-pages ..."
bash scripts/deploy-ghpages.sh

echo "▶ ۳/۳ ساخت Release ${TAG} ..."

NOTES=$(cat <<'ZEOF'
## تغییرات نسخه 0.9.4 — مودال «آخرین وضعیت واکشی سرویس‌ها» در گام ۳

### پرسشنامه — گام ۳ (اطلاعات پایه)
- پنل بلند «استعلام از مراجع ثبتی» (مقدمه + کارت هر ۷ مرجع: ثبت احوال، پست، شاپرک و بانک‌ها، بیمه، اموال و املاک، آموزش‌وپرورش، علوم و دانشگاه آزاد) از بدنه فرم حذف و به **مودال «آخرین وضعیت واکشی سرویس‌ها»** منتقل شد.
- روی فرم فقط یک **نوار فشرده وضعیت** می‌ماند: خلاصه پویا (مثلاً «۱ از ۷ مرجع داده ملاک ارسال کرد») + ۷ نقطه رنگی وضعیت هر سرویس (سبز = ملاک، کهربایی = جزئی، قرمز = ناموفق، خاکستری = بدون استعلام) با نام سرویس.
- همه عملیات داخل مودال حفظ شده است: «استعلام از سامانه متولی»، «استعلام مجدد» و «بازگرداندن به حالت دستی»؛ قفل ملاک فیلدها (نام، کد ملی و تاریخ تولد سرپرست از ثبت احوال؛ استان/شهرستان/نشانی از پست) مطابق قبل کار می‌کند.

### اصلاح عرض مودال‌ها
- باگ: کلاس «max-w-*» پاس‌داده‌شده به DialogContent در صفحات sm+ با «sm:max-w-lg» پایه می‌باخت و مودال‌ها باریک می‌شدند — مودال وضعیت اکنون «sm:max-w-4xl» و مودال‌های «راهنمای این صفحه» (v0.9.3) نیز «sm:max-w-2xl» شدند.

### متفرقه
- نسخه: 0.9.4 | قواعد نسخه EM-MPI-RF 1.0.0-demo (بدون تغییر در موتور سنجش)

*(سایر ویژگی‌ها مطابق v0.9.3: تقویم شمسی تولد، راست‌چینی رادیوها و راهنمای صفحه‌محور — و v0.9.2: اعتبارسنجی صادق فرم ثبت‌نام)*
ZEOF
)

printf '%s' "$NOTES" > /tmp/relnotes-v094.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v094.json
import json, sys, pathlib
tag = sys.argv[1]
body = pathlib.Path('/tmp/relnotes-v094.md').read_text(encoding='utf-8')
print(json.dumps({"tag_name": tag,
 "name": "نسخه 0.9.4 — مودال آخرین وضعیت واکشی سرویس‌ها",
 "body": body, "draft": False, "prerelease": False}))
PYEOF

URL="https://api.github.com/repos/${REPO}/releases"
RESP=$(curl -sS -X POST "$URL" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d @/tmp/relbody-v094.json)
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
