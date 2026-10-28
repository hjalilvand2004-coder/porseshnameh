#!/usr/bin/env bash
# انتشار نسخه v0.9.6 — main + تگ + gh-pages + Release با ZIP
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v096.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود؛ در پایان، remote بدون توکن بازمی‌گردد.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
TAG="v0.9.6"
ZIP_NAME="porseshnameh-static-v0.9.6.zip"
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
## تغییرات نسخه 0.9.6 — «عضو خانواده — ثبت احوال» + واکشی‌محور شدن زمینه پرونده از بانک سامانه

### گام ۳ (اطلاعات پایه) — اصلاح برچسب نوع عضو
- نشان «عضو خانوار — ثبت احوال» به **«عضو خانواده — ثبت احوال»** تغییر کرد — دیتای واکشی‌شده از ثبت احوال «اعضای خانواده» است.
- همه متن‌های ثبتی مرتبط همگام شد: tooltip نشان‌ها، پانویس جدول («نوع عضو: «عضو خانواده» = ...»)، سلکت ویرایشگر عضو و شمارش سربرگ («۲ عضو خانواده (ثبت احوال) • ۱ همسفره»).
- عنوان کلی جدول «اعضای خانوار» و «افزودن عضو» بدون تغییر ماند (واحد خانوار، نه سابقه ثبتی).

### گام ۳ — «زمینه پرونده و سابقه خدمات» فقط از واکشی بانک سامانه
- **ورود دستی این فیلدها کلاً حذف شد**: «شروع دوره حمایت» و «خدمات/برنامه‌های حمایتی قبلی» صرفاً از استعلام **بانک سامانه** (هشتمین مرجع متولی) ثبت می‌شوند.
- پیش از واکشی: فیلدها غیرفعال با راهنمای «صرفاً از واکشی بانک سامانه تکمیل می‌شود» + نشان «ورود دستی غیرمجاز» + دکمه «استعلام از بانک سامانه».
- پس از واکشی موفق: نمایش فقط‌خواندنی با نشان قفل «بانک سامانه — ملاک، غیرقابل ویرایش»، نشان سبز «دریافت شد — ملاک» و زمان استعلام؛ استعلام ناموفق با پیام دقیق؛ «بدون سابقه حمایتی» → فیلدها خالی می‌مانند.
- «بازگرداندن به حالت دستی» در مودال استعلام، فیلدها را دوباره غیرفعال می‌کند (حالت دستی برای این داده وجود ندارد).
- جمله انتقال هزینه‌های ماهانه مسکن (اجاره، ودیعه، شارژ، قبوض، معوقه) به گام «مسکن» (C8) در توضیح کارت حفظ شد.

### وب‌سرویس‌ها — هشتمین مرجع متولی
- سرویس جدید «بانک سامانه — سابقه پرونده و خدمات حمایتی» به مودال «آخرین وضعیت واکشی سرویس‌ها» اضافه شد (۸ نقطه وضعیت روی نوار فشرده؛ خلاصه «X از ۸ مرجع»).
- اعمال خودکار پیش‌تکمیل ملاک در کارت‌های مودال همگام با واکشی گام ۱ شد (householdPatch/answerPrefills/memberPrefills).

### متفرقه
- راهنمای صفحه گام ۳، نقشه مهاجرت (سطر «دوره حمایت از خانواده») و صفحه ورود («۸ مرجع متولی») همگام شد — نسخه: 0.9.6 | قواعد EM-MPI-RF 1.0.0-demo (بدون تغییر در موتور سنجش — خودآزمایی ۱۵/۱۵)

*(سایر ویژگی‌ها مطابق v0.9.5: جدول اعضا با «نوع عضو» و هزینه‌های مسکن زمینه‌ای در C8 — v0.9.4: مودال «آخرین وضعیت واکشی سرویس‌ها» — v0.9.3: تقویم شمسی و راهنمای صفحه‌محور)*
ZEOF
)

printf '%s' "$NOTES" > /tmp/relnotes-v096.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v096.json
import json, sys, pathlib
tag = sys.argv[1]
body = pathlib.Path('/tmp/relnotes-v096.md').read_text(encoding='utf-8')
print(json.dumps({"tag_name": tag,
 "name": "نسخه 0.9.6 — عضو خانواده (ثبت احوال) + زمینه پرونده فقط از واکشی بانک سامانه",
 "body": body, "draft": False, "prerelease": False}))
PYEOF

URL="https://api.github.com/repos/${REPO}/releases"
RESP=$(curl -sS -X POST "$URL" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d @/tmp/relbody-v096.json)
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
