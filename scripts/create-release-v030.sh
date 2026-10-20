#!/usr/bin/env bash
# انتشار Release v0.3.0 از طریق REST API گیت‌هاب — توکن از remote URL خوانده می‌شود و هرگز چاپ نمی‌شود
set -euo pipefail
cd /home/z/my-project

REMOTE_URL=$(git remote get-url origin)
# توکن در قالب https://user:TOKEN@github.com — بخش پس از آخرین «:» تا «@»
TOKEN="${REMOTE_URL#https://}"
TOKEN="${TOKEN%%@*}"
TOKEN="${TOKEN##*:}"
REPO="hjalilvand2004-coder/porseshnameh"
ZIP="download/porseshnameh-static-v0.3.0.zip"

NOTES=$(cat <<'EOF'
## تغییرات نسخه 0.3.0

### ۱) نسخه جدید بر اساس شاخص‌های EM-MPI + شفافیت میراث پرسشنامه قبلی
- **برچسب میراث روی هر شاخص در فرم**: هر شاخص نشان می‌دهد از کدام فیلد پرسشنامه قبلی (اکسل) آمده — «همان قبلی / بازتعریف / تجزیه / داده کنترلی / جدید» + توضیح تغییر
- **نقشه مهاجرت ارتقا یافت**: جدول شاخص‌محور همه ۳۰ شاخص جدید با فیلتر اقدام + خلاصه آماری (۱۷ بازتعریف، ۵ تجزیه، ۱ کنترل، ۷ جدید) + دو جدول فیلدمحور قبلی

### ۲) وب‌سرویس‌های سازمان‌های متولی (ملاک غیرقابل تغییر)
- پنل استعلام در گام «اطلاعات پایه»: **ثبت احوال** (هویت و ترکیب خانوار)، **پست** (نشانی و موقعیت از کدپستی)، **بیمه‌ها** (پوشش پایه)، **اموال و املاک** (مالکیت)، **آموزش‌وپرورش** (وضعیت تحصیل)، **علوم/دانشگاه آزاد** (مدارک دانشگاهی)
- پس از استعلام موفق، فیلد ملاک **قفل و فقط‌خواندنی** می‌شود؛ اصلاح فقط از مسیر مرجع ثبتی
- نمایش قاعده **تقدم منابع داده** (۵ سطح؛ مرجع ثبتی بالاترین تقدم)
- در نسخه نمایشی آفلاین، پاسخ استعلام شبیه‌سازی می‌شود

### ۳) فرم جمع‌وجورتر + نوار پیشرفت
- نوار پیشرفت چسبان بالای فرم: درصد تکمیل پاسخ‌های سنجش + پیشرفت هر بُعد (A–E) به‌صورت زنده
- چیدمان فشرده‌تر کارت‌های شاخص با نشان وزن رسمی هر شاخص

### ۴) راهنمای تصویری مستقل (help.html)
- فایل HTML ریسپانسیو با گرافیک رؤیایی، انیمیشن و افکت (شمارنده، reveal، آکاردئون، نوار مطالعه)
- دکمه «راهنما» در هدر و صفحه اصلی — در تب جدید باز می‌شود
- محتوا: معماری، ۱۰ گام، پنج بُعد، سطوح محرومیت، پرچم‌های قرمز R1–R9، وب‌سرویس‌ها، نگاشت نسخه‌ها، پرسش‌های متداول

### اجرا (بدون هیچ نصب)
- ویندوز: دوبار کلیک روی **START.bat** — بدون پایتون/Node/اینترنت
- لینوکس/مک: `sh START.sh`
- سایت زنده: https://hjalilvand2004-coder.github.io/porseshnameh/
EOF
)

# ۱) ساخت Release
CREATE_JSON=$(python3 - "$NOTES" <<'PY'
import json, sys
notes = sys.argv[1]
print(json.dumps({
  "tag_name": "v0.3.0",
  "target_commitish": "main",
  "name": "v0.3.0 — نسخه جدید EM-MPI: نگاشت نسخه قبلی، وب‌سرویس‌ها، نوار پیشرفت و راهنمای تصویری",
  "body": notes,
  "draft": False,
  "prerelease": False,
}))
PY
)

RELEASE_ID=$(curl -s -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$REPO/releases" \
  -d "$CREATE_JSON" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('id') or ''); import sys as s; s.stderr.write(str(d.get('message',''))+'\n')")

if [ -z "$RELEASE_ID" ]; then echo "FAILED_TO_CREATE_RELEASE"; exit 1; fi
echo "RELEASE_ID=$RELEASE_ID"

# ۲) آپلود ZIP
ZIP_NAME="porseshnameh-static-v0.3.0.zip"
UPLOAD_URL=$(curl -s -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary @"$ZIP" \
  "https://uploads.github.com/repos/$REPO/releases/$RELEASE_ID/assets?name=$ZIP_NAME" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('browser_download_url') or ''); import sys as s; s.stderr.write(str(d.get('message',''))+'\n')")

echo "DOWNLOAD_URL=$UPLOAD_URL"
