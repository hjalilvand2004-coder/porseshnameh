#!/usr/bin/env bash
# انتشار نسخه v0.7.1 — main + تگ + gh-pages + Release با ZIP و PDF راهنما
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v071.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود؛ در پایان، remote بدون توکن بازمی‌گردد.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
TAG="v0.7.1"
ZIP="download/porseshnameh-static-v0.7.1.zip"
PDF="download/rahnama-emmpi-guide.pdf"
[ -f "$ZIP" ] || { echo "✗ ZIP موجود نیست: $ZIP"; exit 1; }
[ -f "$PDF" ] || { echo "✗ PDF موجود نیست: $PDF"; exit 1; }

# ۱) تنظیم موقت remote با توکن
git remote set-url origin "https://hjalilvand2004-coder:${GH_TOKEN}@github.com/${REPO}.git"
trap 'git remote set-url origin "https://github.com/${REPO}.git"' EXIT

echo "▶ ۱/۳ push main + تگ ${TAG} ..."
git push origin main
git push origin "${TAG}"

echo "▶ ۲/۳ استقرار gh-pages ..."
bash scripts/deploy-ghpages.sh

echo "▶ ۳/۳ ساخت Release ${TAG} ..."
ZIP_NAME="porseshnameh-static-v0.7.1.zip"
PDF_NAME="rahnama-emmpi-guide-v0.7.1.pdf"

NOTES=$(cat <<'ZEOF'
## تغییرات نسخه 0.7.1 — راهنمای PDF برداری و زیبا

### سند راهنما در قالب PDF
- **`rahnama-emmpi.pdf`** — نسخه PDF سند راهنمای تصویری سامانه: ۱۶ صفحه برداری (متن قابل جست‌وجو و انتخاب)، فونت وزیرمتن، پالت برند فیروزه‌ای/سرمه‌ای
- ساختار: جلد (نمای Crystal برند با نوار آمار) ← فهرست بخش‌ها ← ۱۰ بخش کامل (معماری سنجش، شروع کار، ۱۰ گام، ۵ بُعد و ۳۰ شاخص، امتیازدهی و پنج سطح، پرچم‌های R1–R9، وب‌سرویس‌ها و نردبان تقدم منابع، نگاشت نسخه‌ها، ملاحظات مهاجرت با چکیده شش‌محوری و ۱۱ مورد نیازمند تصویب، پرسش‌های متداول) ← صفحه پایانی
- شماره‌گذاری فارسی صفحات (بدون شماره روی جلد/فهرست/پایان) + متادیتای کامل سند
- دانلود از دکمه جدید **«دانلود نسخه PDF راهنما»** در ابتدای help.html، یا مستقیم از `/rahnama-emmpi.pdf` — فایل داخل ZIP قابل حمل هم هست
- سورس HTML سند (سلف‌کانتینرد با فونت داخلی) در فایل‌های Release پروژه برای ویرایش‌های بعدی

### فنی
- تولید با خط لوله HTML→Chromium (خروجی برداری، نه اسکرین‌شات)؛ اعتبارسنجی pre-render + QA خودکار PDF (فونت‌های embed، بدون سرریز، بدون صفحه خالی)
- نسخه: 0.7.1 | قواعد نسخه EM-MPI-RF 1.0.0-demo (بدون تغییر در موتور سنجش)

*(سایر ویژگی‌ها مطابق v0.7.0: صفحه ورود + حساب کاربری، ثبت‌نام مودالی با واکشی خودکار ۷ مرجع، شاپرک، راهنمای مهاجرت هر بخش، بانک ۸ پرونده نمونه، START.bat)*
ZEOF
)

printf '%s' "$NOTES" > /tmp/relnotes-v071.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v071.json
import json, sys, pathlib
tag = sys.argv[1]
body = pathlib.Path('/tmp/relnotes-v071.md').read_text(encoding='utf-8')
print(json.dumps({"tag_name": tag,
 "name": "نسخه 0.7.1 — راهنمای PDF برداری سامانه",
 "body": body, "draft": False, "prerelease": False}))
PYEOF

URL="https://api.github.com/repos/${REPO}/releases"
RESP=$(curl -sS -X POST "$URL" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d @/tmp/relbody-v071.json)
REL_ID=$(printf '%s' "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))")
if [ -z "$REL_ID" ]; then
  echo "✗ ساخت Release ناموفق بود:"; printf '%s\n' "$RESP" | head -5; exit 1
fi
echo "  Release id: $REL_ID — بارگذاری ZIP و PDF ..."
curl -sS -X POST "https://uploads.github.com/repos/${REPO}/releases/${REL_ID}/assets?name=${ZIP_NAME}" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Content-Type: application/zip" \
  --data-binary "@${ZIP}" | python3 -c "import sys,json; d=json.load(sys.stdin); print('  ✓', d.get('name'), d.get('browser_download_url',''))"
curl -sS -X POST "https://uploads.github.com/repos/${REPO}/releases/${REL_ID}/assets?name=${PDF_NAME}" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Content-Type: application/pdf" \
  --data-binary "@${PDF}" | python3 -c "import sys,json; d=json.load(sys.stdin); print('  ✓', d.get('name'), d.get('browser_download_url',''))"

echo "✓ انتشار کامل شد."
