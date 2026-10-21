#!/usr/bin/env bash
# انتشار نسخه v0.6.0 — main + تگ + gh-pages + Release با ZIP
# استفاده: GH_TOKEN=ghp_xxxx bash scripts/publish-v060.sh
# توکن هرگز چاپ یا ذخیره نمی‌شود؛ در پایان، remote بدون توکن بازمی‌گردد.
set -euo pipefail
cd /home/z/my-project

: "${GH_TOKEN:?باید متغیر GH_TOKEN تنظیم شود}"
REPO="hjalilvand2004-coder/porseshnameh"
TAG="v0.6.0"
ZIP="download/porseshnameh-static-v0.6.0.zip"
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
ZIP_NAME="porseshnameh-static-v0.6.0.zip"

NOTES=$(cat <<'ZEOF'
## تغییرات نسخه 0.6.0 — فرم ثبت‌نام مودالی (الگوی امداد) + واکشی خودکار شاپرک و مراجع

### فرم ثبت‌نام مودالی — الگوبرداری از فرم ورود سامانه امداد
- دکمه اصلی صفحه «ثبت‌نام و شروع پرسشنامه» فرم مودالی سه‌فازی باز می‌کند:
  **۱) فرم:** کد ملی (اجباری — کلید شناسایی)، شماره موبایل، تاریخ تولد (شمسی با اعتبارسنجی کامل شامل سال کبیسه)، کد پستی، رمز عبور جدید، تکرار رمز عبور، نوع درخواست و توافقنامه دسترسی به اطلاعات بانکی
  **۲) واکشی خودکار:** نمایش زنده استعلام هفت مرجع به‌ترتیب (ثبت احوال ← پست ← شاپرک/بانکی ← تأمین اجتماعی ← اموال و املاک ← علوم/دانشگاه آزاد ← آموزش‌وپرورش) — همه با کلید کد ملی
  **۳) خلاصه هویت:** نام/نشانی ملاک و قفل + وضعیت هر سرویس + دکمه ورود به پرسشنامه

### قواعد رمز عبور (مطابق فرم مرجع)
- دقیقاً ۶ کاراکتر، ترکیبی از اعداد و حروف انگلیسی
- استفاده از کاراکترهای & < > " / ; , * | = % مجاز نیست — با پیام دقیق خطا
- رمز هرگز به‌صورت متن ساده ذخیره نمی‌شود؛ فقط هش یک‌طرفه در پرونده (نسخه نمایشی)

### نوع درخواست در ثبت‌نام
- «اعلام نیازمندی و دریافت خدمات دارم.» ← واکشی + ورود مستقیم به گام ۱ پرسشنامه با داده پیش‌پرشده
- «متقاضی ارائه خدمت به مددجویان و نیازمندان هستم» ← بدون پرونده پرسشنامه، هدایت به داشبورد حرفه‌ای
- مقدار اولیه requestTypes («تشکیل/به‌روزرسانی پرونده حمایت») در گام ۱۰ قابل تکمیل/اصلاح

### توافقنامه دسترسی به اطلاعات بانکی + سرویس شاپرک
- متن کامل چهاربندی توافقنامه (هدف، دامنه، محرمانگی، مدت و لغو) با بازشدن داخل فرم
- وب‌سرویس جدید «shaparak_bank»: اجرای رضایت، وضعیت حساب با کد ملی، گردش تجمیعی ۹۰ روزه (بدون جزئیات خرید)، تسهیلات و چک برگشتی
- بدون پذیرش توافقنامه، استعلام بانکی انجام نمی‌شود و مسیر مدارک مردمی جایگزین است
- کارت «وضعیت ثبت‌نام» در گام ۱ پرسشنامه: نوع درخواست، وضعیت توافقنامه، زمان ثبت‌نام

### واکشی خودکار و پیش‌پرکردن (فارغ از دست‌کاربر)
- اعضای سابقه ثبتی از ثبت احوال به‌طور خودکار ثبت می‌شوند (با برچسب منبع)
- پیش‌تکمیل‌های بیمه/املاک/علوم/آموزش‌وپرورش خودکار اعمال می‌شوند (با حفظ منبع و تاریخ)
- شناسنامه ارزیابی (گام ۱۰): موبایل سرپرست + زمان ثبت‌نام + کد ملی کلید پرونده

### راهنمای تصویری (help.html)
- بخش «شروع با واکشی» بازنویسی برای ثبت‌نام مودالی + کارت امنیت رمز/توافقنامه
- کارت سرویس شاپرک و بانک‌ها (با رضایت) + دو سؤال جدید FAQ (قواعد رمز، جریان ثبت‌نام)

### فنی
- src/lib/mpi/registration.ts — اعتبارسنجی موبایل/تاریخ جلالی/رمز + هش + متن توافقنامه
- src/components/porsesh/registration-modal.tsx — مودال سه‌فازی با گارد بسته‌شدن حین واکشی
- src/lib/mpi/web-services.ts — سرویس shaparak_bank
- راستی‌آزمایی مرورگر: dev + file:// روی ZIP واقعی — ثبت‌نام کامل هر دو مسیر، اعتبارسنجی‌ها (کد ملی نامعتبر، رمز کوتاه، کاراکتر ممنوعه، تکرار ناهمسان) و انتقال به پرسشنامه — بدون خطای کنسول

*(سایر ویژگی‌ها مطابق v0.5.0: راهنمای مهاجرت هر بخش، کد ملی کلیدی و اجباری، ملاحظات مهاجرت در help.html، بانک ۸ پرونده نمونه، START.bat)*
ZEOF
)

printf '%s' "$NOTES" > /tmp/relnotes-v060.md
python3 - "$TAG" <<'PYEOF' > /tmp/relbody-v060.json
import json, sys, pathlib
tag = sys.argv[1]
body = pathlib.Path('/tmp/relnotes-v060.md').read_text(encoding='utf-8')
print(json.dumps({"tag_name": tag,
 "name": "نسخه 0.6.0 — ثبت‌نام مودالی (الگوی امداد) + واکشی خودکار شاپرک و مراجع",
 "body": body, "draft": False, "prerelease": False}))
PYEOF

URL="https://api.github.com/repos/${REPO}/releases"
RESP=$(curl -sS -X POST "$URL" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/json" \
  -d @/tmp/relbody-v060.json)
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
