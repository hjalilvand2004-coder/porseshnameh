#!/usr/bin/env bash
# انتشار نسخه v0.9.2 — main + تگ + gh-pages + Release با ZIP
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v092.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود؛ در پایان، remote بدون توکن بازمی‌گردد.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
TAG="v0.9.2"
ZIP="download/porseshnameh-static-v0.9.2.zip"
[ -f "$ZIP" ] || { echo "✗ ZIP موجود نیست: $ZIP"; exit 1; }

git remote set-url origin "https://hjalilvand2004-coder:${GH_TOKEN}@github.com/${REPO}.git"
trap 'git remote set-url origin "https://github.com/${REPO}.git"' EXIT

echo "▶ ۱/۳ push main + تگ ${TAG} ..."
git push origin main
git push origin "${TAG}"

echo "▶ ۲/۳ استقرار gh-pages ..."
bash scripts/deploy-ghpages.sh

echo "▶ ۳/۳ ساخت Release ${TAG} ..."
ZIP_NAME="porseshnameh-static-v0.9.2.zip"

NOTES=$(cat <<'ZEOF'
## تغییرات نسخه 0.9.2 — اعتبارسنجی صادق فرم ثبت‌نام

### رفع خطای گزارش‌شده: «ابتدا موارد قرمز را حل کنید» با وجود کد ملی معتبر
- پیام پایین فرم دیگر کد ملی را سرزنش نمی‌کند؛ اکنون **فهرست دقیق موارد باقی‌مانده** را نام می‌برد (کد ملی، موبایل، تاریخ تولد، کد پستی ۱۰ رقمی، رمز، تکرار رمز، نوع درخواست، پذیرش توافقنامه) — کاربر می‌بیند دقیقاً چه چیزی ناقص است.

### رفع خطای گزارش‌شده: حلقه قرمز کد پستی با کد معتبر ۱۰ رقمی
- وارونگی aria-invalid فیلد کد پستی (مورث فیکس v0.9.1 روی فیلد بولی) رفع شد — کد پستی معتبر دیگر قرمز نمی‌ماند و تیک سبز «کد پستی معتبر است» می‌گیرد؛ فقط کد نادرست قرمز می‌شود.
- بازطراحی تابع showErr با امضای ضدفقطبی (ورودی = خودِ خطا) تا این کلاس باگ در همه فیلدها (کد ملی، موبایل، تاریخ تولد، رمز، تکرار رمز) ساختاراً ناممکن شود.

### متفرقه
- README: یادداشت v0.9.2 — نسخه: 0.9.2 | قواعد نسخه EM-MPI-RF 1.0.0-demo (بدون تغییر در موتور سنجش)

*(سایر ویژگی‌ها مطابق v0.9.1: پرسشنامه بدون سوال تکراری + ماتریس انتساب اعضا — و v0.9.0: فالوآپ مستندسازی، مدرک مثبت، استعلام خودکار ملاک — و v0.8.x: شناسنامه عملیاتی سنجش، صفحه ورود، ثبت‌نام مودالی با واکشی ۷ مرجع، راهنمای PDF، START.bat)*
ZEOF
)

printf '%s' "$NOTES" > /tmp/relnotes-v092.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v092.json
import json, sys, pathlib
tag = sys.argv[1]
body = pathlib.Path('/tmp/relnotes-v092.md').read_text(encoding='utf-8')
print(json.dumps({"tag_name": tag,
 "name": "نسخه 0.9.2 — اعتبارسنجی صادق فرم ثبت‌نام",
 "body": body, "draft": False, "prerelease": False}))
PYEOF

URL="https://api.github.com/repos/${REPO}/releases"
RESP=$(curl -sS -X POST "$URL" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d @/tmp/relbody-v092.json)
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
