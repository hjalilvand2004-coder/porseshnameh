#!/usr/bin/env bash
# انتشار نسخه v0.4.1 — main + تگ + gh-pages + Release با ZIP
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v041.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
ZIP="download/porseshnameh-static-v0.4.1.zip"
[ -f "$ZIP" ] || { echo "✗ ZIP موجود نیست: $ZIP"; exit 1; }

# ۱) تنظیم موقت remote با توکن (بدون نوشتن در دیسک)
git remote set-url origin "https://hjalilvand2004-coder:${GH_TOKEN}@github.com/${REPO}.git"
trap 'git remote set-url origin "https://github.com/${REPO}.git"' EXIT

echo "▶ ۱/۳ push main + تگ v0.4.1 ..."
git push origin main
git push origin v0.4.1

echo "▶ ۲/۳ استقرار gh-pages ..."
bash scripts/deploy-ghpages.sh

echo "▶ ۳/۳ ساخت Release v0.4.1 ..."
TAG="v0.4.1"
ZIP_NAME="porseshnameh-static-v0.4.1.zip"

NOTES=$(cat <<'ZEOF'
## تغییرات نسخه 0.4.1 — ملاحظات مهاجرت در راهنمای تصویری

### بخش جدید «ملاحظات مهاجرت» در help.html (دکمه در ناوبری و قهرمان)
- **راهنمای خواندن ماتریس‌ها**: قابل استفاده با تکمیل / زمینه‌ای / خدماتی / خارج از غربالگری / پیش‌تکمیل
- **تب ۱ — ماتریس پرسشنامه خانوار (۴۰ فیلد)**:
  - ۱−۱ وضعیت حمایتی و مسکن (۲۵ فیلد): تفکیک «وضعیت سکونت» به سه فیلد مستقل، گسترش انشعابات به دسترسی پایدار و ایمن، لامکان و آلونک به‌عنوان سرنخ بررسی
  - ۱−۲ حقوقی، فرهنگی، درخواست و منابع درآمد (۱۵ فیلد): جداسازی درخواست خدماتی از نیاز شناسایی‌شده، ساختاری‌کردن منابع مالی (مبلغ/دوره/قابلیت اتکا)
- **تب ۲ — ماتریس پرسشنامه فردی (۶۹ ردیف)**:
  - ۲−۱ وضعیت اجتماعی و مهارت‌ها (۷) • ۲−۲ تمام گزینه‌های «ویژگی‌های فردی» (۳۴) با تفکیک به ۷ بخش • ۲−۳ زندان و جرم (۵) • ۲−۴ اشتغال (۱۱) • ۲−۵ بیمه، سلامت و تحصیل (۱۲)
- **تب ۳ — ماتریس پوشش ۳۰ شاخص**: پشتوانه موجود در اکسل قبلی + بسته پرسش‌های لازم برای هر شاخص A1 تا E4
- **تب ۴ — فیلدهای کنترلی جدید**: ۷ گروه (هویت ارزیابی، منشأ داده، کیفیت داده، نتیجه شاخص، اصلاح و بازنگری، فوریت، ارجاع) + قاعده «ضریب شدت فیلد آزاد نیست»
- **تب ۵ — تکلیف داده قبلی**: ۶ قاعده مهاجرت هر فیلد + سه مثال تعیین‌کننده (بیمه، مسکن، بیکاری)
- **تب ۶ — نیازمند تصویب**: ۱۱ موضوع (A6، D1، شاخص‌های عضومحور، C4، C8، C8/D3، D3، B1، اعتبار منابع، پرچم قرمز) + جمع‌بندی اجرایی ۵ تغییر اصلی + توصیه نهایی

### دکمه‌های دسترسی
- راهنما: لینک ناوبری «ملاحظات مهاجرت» + دکمه «ملاحظات مهاجرت از پرسشنامه قدیمی» در قهرمان + لینک متقابل از بخش نگاشت نسخه‌ها
- سامانه: دکمه «ملاحظات مهاجرت در راهنما» در صفحه نقشه مهاجرت (help.html#migration در تب جدید)

### فنی
- جداول ریسپانسیو با اسکرول افقی روی موبایل، برچسب‌های رنگی قابلیت استفاده، چاپ همه تب‌ها (media print)
- راستی‌آزمایی مرورگر: دسکتاپ، iPhone 14 و file:// بدون خطای کنسول

*(سایر ویژگی‌ها مطابق v0.4.0: شروع با واکشی هویتی، استعلام مراجع با کد ملی، بانک ۸ پرونده نمونه، START.bat)*
ZEOF
)

# جای‌گذاری امن یادداشت‌ها (بدون مشکل escaping)
printf '%s' "$NOTES" > /tmp/relnotes-v041.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v041.json
import json,sys
print(json.dumps({"tag_name": sys.argv[1],
 "name": "نسخه 0.4.1 — ملاحظات مهاجرت در راهنمای تصویری",
 "body": open('/tmp/relnotes-v041.md',encoding='utf-8').read(),
 "draft": False, "prerelease": False}))
PYEOF

RESP=$(curl -s -X POST \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$REPO/releases" \
  --data-binary @/tmp/relbody-v041.json)

RELEASE_ID=$(printf '%s' "$RESP" | python3 -c "import sys,json;print(json.load(sys.stdin).get('id',''))")
[ -n "$RELEASE_ID" ] || { echo "✗ ساخت Release ناموفق:"; printf '%s\n' "$RESP" | head -5; exit 1; }

echo "  Release ID: $RELEASE_ID — بارگذاری ZIP ..."
UP=$(curl -s -X POST \
  -H "Authorization: Bearer $GH_TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary @"$ZIP" \
  "https://uploads.github.com/repos/$REPO/releases/$RELEASE_ID/assets?name=$ZIP_NAME")
printf '%s' "$UP" | python3 -c "import sys,json;d=json.load(sys.stdin);print('✓ فایل منتشر شد:',d.get('browser_download_url',d.get('message','?')))"

rm -f /tmp/relnotes-v041.md /tmp/relbody-v041.json
echo "✓ انتشار کامل شد — https://github.com/$REPO/releases/tag/v0.4.1"
