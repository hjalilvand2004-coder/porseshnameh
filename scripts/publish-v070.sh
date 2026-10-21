#!/usr/bin/env bash
# انتشار نسخه v0.7.0 — main + تگ + gh-pages + Release با ZIP
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v070.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود؛ در پایان، remote بدون توکن بازمی‌گردد.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
TAG="v0.7.0"
ZIP="download/porseshnameh-static-v0.7.0.zip"
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
ZIP_NAME="porseshnameh-static-v0.7.0.zip"

NOTES=$(cat <<'ZEOF'
## تغییرات نسخه 0.7.0 — صفحه ورود (لاگین جذاب‌شده الگوی امداد) + حساب کاربری

### صفحه ورود به‌عنوان آغاز سامانه
- با باز شدن سامانه (GitHub Pages، سرور، یا file:// از ZIP)، **صفحه ورود** نمایش داده می‌شود — بازطراحی جذاب‌تر از صفحه ورود سامانه امداد:
  پس‌زمینه آورورا با اورب‌های شناور انیمیشنی + شبکه نقش‌مانند + کارت گلس‌مورفیسم با ورود نرم
- پنل برند در دسکتاپ: معرفی سامانه + سه کارت ویژگی (کد ملی کلیدی، سه لایه سنجش، فوریت بدون شرط) + نشان نسخه
- فیلدهای ورود: کد ملی (اعتبارسنجی زنده الگوریتم ثبت احوال) + رمز عبور (نمایش/پنهان) + پیام خطای دقیق
  («حسابی با این کد ملی یافت نشد» / «رمز عبور نادرست است»)
- لینک راهنمای سامانه + دکمه «ورود نمایشی» برای دسترسی سریع به بانک ۸ پرونده نمونه

### ثبت‌نام از صفحه ورود و ادامه مسیر
- دکمه «ثبت‌نام — ساخت حساب و شروع پرسشنامه» همان‌جا مودال ثبت‌نام سه‌فازی (v0.6.0) را باز می‌کند
- با ثبت، حساب کاربری ساخته می‌شود (رمز فقط هش یک‌طرفه)، نشست فعال می‌شود و کاربر مستقیماً به پرسشنامه (یا داشبورد حرفه‌ای برای ارائه‌دهنده خدمت) منتقل می‌شود

### حساب کاربری و نشست
- حساب‌ها بر کلید کد ملی (پذیرش ارقام فارسی/لاتین) + هش رمز — در حافظه محلی مرورگر (نسخه نمایشی)
- ورود مجدد: اگر پرونده‌ای با همان کد ملی باشد، همان پرونده باز و ادامه می‌یابد؛ وگرنه صفحه اصلی
- هدر سامانه: نشان نشست (نام/کد ملی) + دکمه «خروج» — خروج، بازگشت به صفحه ورود
- در استقرار عملیاتی: احراز هویت سمت سرور با هش نمکی + کد تأیید پیامکی و بازیابی رمز

### به‌روزرسانی راهنما (help.html)
- بخش «شروع» بازنویسی: صفحه ورود ← ثبت‌نام مودالی ← واکشی خودکار هفت مرجع ← پرسشنامه
- سؤال جدید FAQ: «ورود چگونه است؟ اگر رمز فراموش شود چه کنم؟» + به‌روزرسانی سؤال‌های ثبت‌نام

### فنی
- src/components/porsesh/auth-page.tsx — صفحه ورود (آورورا + گلس، بدون وابستگی جدید؛ انیمیشن CSS در globals.css)
- store: accounts (کلید کد ملی) + session + login/logout/startDemoSession + registerAccount
- page.tsx: گیت ورود — بدون نشست فعال فقط AuthPage رندر می‌شود
- راستی‌آزمایی مرورگر: dev + file:// روی ZIP واقعی — ورود ناموفق، ثبت‌نام ← ورود خودکار ← گام ۱، خروج، ورود مجدد با ادامه پرونده (حتی با ارقام فارسی)، ورود نمایشی — بدون خطای کنسول

*(سایر ویژگی‌ها مطابق v0.6.0: ثبت‌نام مودالی با کد ملی/موبایل/تاریخ تولد/کدپستی/رمز ۶کاراکتری/نوع درخواست/توافقنامه بانکی، واکشی خودکار ۷ مرجع با کلید کد ملی، شاپرک، راهنمای مهاجرت هر بخش، بانک ۸ پرونده نمونه، START.bat)*
ZEOF
)

printf '%s' "$NOTES" > /tmp/relnotes-v070.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v070.json
import json, sys, pathlib
tag = sys.argv[1]
body = pathlib.Path('/tmp/relnotes-v070.md').read_text(encoding='utf-8')
print(json.dumps({"tag_name": tag,
 "name": "نسخه 0.7.0 — صفحه ورود (لاگین جذاب‌شده الگوی امداد) + حساب کاربری",
 "body": body, "draft": False, "prerelease": False}))
PYEOF

URL="https://api.github.com/repos/${REPO}/releases"
RESP=$(curl -sS -X POST "$URL" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d @/tmp/relbody-v070.json)
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
