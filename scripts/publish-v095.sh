#!/usr/bin/env bash
# انتشار نسخه v0.9.5 — main + تگ + gh-pages + Release با ZIP
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v095.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود؛ در پایان، remote بدون توکن بازمی‌گردد.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
TAG="v0.9.5"
ZIP_NAME="porseshnameh-static-v0.9.5.zip"
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
## تغییرات نسخه 0.9.5 — جدول اعضای خانوار با «نوع عضو» + هزینه‌های مسکن در گام مسکن

### گام ۳ (اطلاعات پایه) — جدول جدید اعضای خانوار
- اعضای خانوار از کارت‌های ساده به **جدول شکیل** تبدیل شد: سربرگ با شمارش به تفکیک نوع (مثلاً «۲ عضو ثبت احوال • ۱ همسفره»)، ستون‌های ردیف/نام و نقش‌ها/نسبت/سن/**نوع عضو**/وضعیت مدرک/عملیات، ردیف‌های یک‌درمیان و پانویس توضیح.
- **ستون «نوع عضو (سابقه ثبتی)»**: نشان «عضو خانوار — ثبت احوال» برای اعضای ثبت‌شده در سابقه ثبتی (از واکشی ثبت احوال = ملاک) و نشان «همسفره» برای همراهان ساکن خارج از سابقه ثبتی (مهمان، هم‌سکون موقت، ...).
- در ویرایشگر عضو، «نوع عضو» انتخاب می‌شود (پیش‌فرض همسفره)؛ برای اعضای واکشی‌شده از ثبت احوال، نوع **قفل ملاک** است و از منبع ثبتی می‌آید.

### گام ۶ (مسکن) — هزینه‌های مسکن منتقل و زمینه‌ای شد
- کارت «هزینه‌های مسکن» از گام ۳ حذف و به کارت شاخص **C8 گام «مسکن»** منتقل شد — همان‌جایی که پرسش‌های معوقات و اقساط هست.
- فیلدها **متناسب با «نوع تصرف مسکن»** باز می‌شوند، نه کلی: مستأجر ← اجاره، ودیعه، شارژ، قبوض، معوقه؛ مالک ← شارژ، قبوض، معوقه (+ اشاره به پرسش اقساط)؛ رایگان/خدمتی/وابسته ← شارژ، قبوض، معوقه؛ بی‌خانمان ← بدون فیلد هزینه با توضیح.
- «نوع تصرف» در صورت واکشی از استعلام املاک، **ملاک و غیرقابل ویرایش** نمایش داده می‌شود.
- در گام ۳ فقط «زمینه پرونده و سابقه خدمات» (شروع حمایت، خدمات قبلی) باقی می‌ماند.

### متفرقه
- راهنمای صفحه گام ۳ و راهنمای پرسش C8 همگام شد؛ خانوارهای نمونه با نوع عضو «ثبت احوال» مهر می‌خورند — نسخه: 0.9.5 | قواعد EM-MPI-RF 1.0.0-demo (بدون تغییر در موتور سنجش — خودآزمایی ۱۵/۱۵)

*(سایر ویژگی‌ها مطابق v0.9.4: مودال «آخرین وضعیت واکشی سرویس‌ها» — و v0.9.3: تقویم شمسی و راهنمای صفحه‌محور)*
ZEOF
)

printf '%s' "$NOTES" > /tmp/relnotes-v095.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v095.json
import json, sys, pathlib
tag = sys.argv[1]
body = pathlib.Path('/tmp/relnotes-v095.md').read_text(encoding='utf-8')
print(json.dumps({"tag_name": tag,
 "name": "نسخه 0.9.5 — جدول اعضا با نوع عضو + هزینه‌های مسکن در گام مسکن",
 "body": body, "draft": False, "prerelease": False}))
PYEOF

URL="https://api.github.com/repos/${REPO}/releases"
RESP=$(curl -sS -X POST "$URL" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d @/tmp/relbody-v095.json)
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
