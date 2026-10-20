#!/usr/bin/env bash
# انتشار Release v0.4.0 از طریق REST API گیت‌هاب — توکن از remote URL خوانده می‌شود و هرگز چاپ نمی‌شود
set -euo pipefail
cd /home/z/my-project

REMOTE_URL=$(git remote get-url origin)
TOKEN="${REMOTE_URL#https://}"
TOKEN="${TOKEN%%@*}"
TOKEN="${TOKEN##*:}"
REPO="hjalilvand2004-coder/porseshnameh"
ZIP="download/porseshnameh-static-v0.4.0.zip"

NOTES=$(cat <<'ZEOF'
## تغییرات نسخه 0.4.0 — شروع با واکشی هویتی

### ۱) شروع پرسشنامه فقط با سه شناسه + واکشی از مراجع متولی
- ورودی شروع: **کد ملی سرپرست + کد پستی + تاریخ تولد**
- **واکشی از ثبت احوال**: نام سرپرست، وضعیت تأهل، اعضای سابقه ثبتی — داده «ملاک» و قفل می‌شود
- **واکشی از پست (از کد پستی)**: نشانی استاندارد، استان/شهرستان و موقعیت جغرافیایی — ملاک
- اعضای واکشی‌شده با برچسب «واکشی از ثبت احوال» ثبت می‌شوند و ترکیب جاری خانوار جداگانه تأیید می‌شود
- نبود کدملی/کدپستی موجب رد درخواست نمی‌شود؛ مسیر دستی و بررسی میدانی فعال می‌شود

### ۲) استعلام سایر مراجع متولی با کد ملی (تا حد امکان)
- **بیمه/تأمین اجتماعی**: پوشش پایه هر عضو (پیش‌تکمیل A5)
- **اموال و املاک**: سابقه سند و نوع تصرف (پیش‌تکمیل C3)
- **آموزش‌وپرورش**: ثبت‌نام اعضای در سن آموزش (پیش‌تکمیل B1/B2)
- **علوم/دانشگاه آزاد**: مدارک دانشگاهی (B3/B7)
- نتیجه به‌صورت «پیش‌تکمیل» با حفظ منبع و تاریخ اعمال می‌شود — پیش‌تکمیل تأیید خودکار شرایط جاری نیست

### ۳) «درخواست خانوار» از ابتدا حذف شد
- درخواست در گام آخر (خدماتی — خارج از امتیاز) ثبت می‌شود تا از «نیاز شناسایی‌شده در سنجش» مخلوط نشود
- **شناسنامه ارزیابی** (فیلدهای کنترلی: شناسه، نسخه قواعد، منشأ داده، کیفیت، اصلاحات) به گام آخر اضافه شد

### ۴) تکمیل مطابق ماتریس‌های بازطراحی
- نقشه مهاجرت: جدول «قاعده مهاجرت هر فیلد قدیمی» + سه مثال تعیین‌کننده (بیمه/مسکن/بیکاری — پیش‌تکمیل ≠ تأیید خودکار)
- «نیازمند تصویب»: دوره D1، تجمیع اعضا، صفر اتاق C4، فرمول C8/D3، اعتبار منابع، گردش کار پرچم قرمز و ...
- راهنمای تصویری (help.html): بخش «شروع با واکشی» + قواعد مهاجرت + پرسش‌های جدید FAQ

### اجرا (بدون هیچ نصب)
- ویندوز: دوبار کلیک روی **START.bat** — بدون پایتون/Node/اینترنت
- لینوکس/مک: `sh START.sh`
- سایت زنده: https://hjalilvand2004-coder.github.io/porseshnameh/
ZEOF
)

CREATE_JSON=$(python3 - "$NOTES" <<'PY'
import json, sys
notes = sys.argv[1]
print(json.dumps({
  "tag_name": "v0.4.0",
  "target_commitish": "main",
  "name": "v0.4.0 — شروع با واکشی هویتی (کدملی/کدپستی/تاریخ تولد) و استعلام سایر مراجع با کدملی",
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

ZIP_NAME="porseshnameh-static-v0.4.0.zip"
UPLOAD_URL=$(curl -s -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary @"$ZIP" \
  "https://uploads.github.com/repos/$REPO/releases/$RELEASE_ID/assets?name=$ZIP_NAME" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('browser_download_url') or ''); import sys as s; s.stderr.write(str(d.get('message',''))+'\n')")

echo "DOWNLOAD_URL=$UPLOAD_URL"
