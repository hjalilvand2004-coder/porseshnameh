#!/usr/bin/env python3
"""ساخت Release v0.5.0 و بارگذاری ZIP — توکن فقط از متغیر محیطی GH_TOKEN."""
import json, os, sys, urllib.request

REPO = "hjalilvand2004-coder/porseshnameh"
TAG = "v0.5.0"
ZIP = "/home/z/my-project/download/porseshnameh-static-v0.5.0.zip"

NOTES = """## تغییرات نسخه 0.5.0 — راهنمای مهاجرت هر بخش + کد ملی کلیدی و اجباری

### دکمه «راهنمای بخش» در هر ۱۰ گام پرسشنامه (مودال مهاجرت)
- کلیک روی دکمه، فرم مودالی باز می‌کند و سه پرسش را پاسخ می‌دهد:
  **۱) فلسفه این بخش چیست؟** (چرا وجود دارد + نقاط کلیدی)
  **۲) ارتباطش با پرسشنامه قبلی چیست؟** (کدام فیلدهای قدیم به اینجا آمده‌اند)
  **۳) سیاست جابجایی و تحول به پرسشنامه جدید چیست؟** (مکانیزم گام‌به‌گام انتقال داده)
- گام‌های امتیازی (A–E): جدول نگاشت شاخص‌های همان بخش (شاخص/عنوان/وزن/اقدام/منبع قبلی/تغییر)
- گام‌های غیرامتیازی (هویت، فوریت، اطلاعات پایه، کیفیت، خلاصه): شرح اختصاصی سیاست مهاجرت همان گام

### دکمه «راهنما» کنار برچسب ماهیت هر شاخص
- کنار برچسب ماهیت (همان قبلی/بازتعریف/تجزیه/کنترل/جدید) روی کارت هر شاخص، دکمه راهنما اضافه شد
- مودال شاخص: ماهیت + وزن + راستی‌آزمایی ثبتی + فلسفه سنجش + فیلدهای منبع قبلی + سیاست مهاجرت بر اساس همان اقدام نگاشت

### کد ملی — کلیدی و اجباری
- کد ملی سرپرست با الگوریتم رقم کنترل ثبت احوال اعتبارسنجی می‌شود (تبدیل ارقام فارسی/عربی، رد کدهای تکراری بی‌معنا)
- بدون کد ملی معتبر: دکمه «بعدی» قفل، پرش بین گام‌ها مسدود، واکشی و استعلام مراجع غیرفعال — با پیام روشن
- «کد ملی (کلید پرونده)» در شناسنامه ارزیابی (گام ۱۰) ثبت و نمایش داده می‌شود
- هشدار پرونده تکراری: در صورت وجود پرونده دیگری با همان کد ملی، پیش از واکشی هشدار آگاهانه نمایش داده می‌شود
- مسیر «فاقد مدرک» صرفاً از مسیر پرچم R8 با همراهی مددکار پیگیری می‌شود

### فنی
- src/lib/mpi/national-id.ts — اعتبارسنجی کد ملی/کد پستی
- src/lib/mpi/section-guide.ts — محتوای فلسفه/ارتباط/سیاست مهاجرت هر ۱۰ گام + سیاست ۵ اقدام نگاشت
- src/components/porsesh/section-guide.tsx — SectionGuideDialog + IndicatorGuideButton
- راستی‌آزمایی مرورگر: اعتبارسنجی کد ملی (نامعتبر/معتبر)، قفل گیت، مودال بخش و شاخص، file:// مستقیم — بدون خطای کنسول

*(سایر ویژگی‌ها مطابق v0.4.1: ملاحظات مهاجرت کامل در help.html، شروع با واکشی هویتی، بانک ۸ پرونده نمونه، START.bat)*"""

def api(url: str, data: dict | None = None, method: str = "POST", ctype: str = "application/json"):
    req = urllib.request.Request(url, method=method,
        headers={"Authorization": f"Bearer {os.environ['GH_TOKEN']}", "Accept": "application/vnd.github+json", "Content-Type": ctype},
        data=json.dumps(data).encode() if data is not None else None)
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

def upload(url: str, path: str, name: str):
    boundary = "----pzboundary7d9"
    payload = open(path, "rb").read()
    body = (f"--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"{name}\"\r\n"
            f"Content-Type: application/zip\r\n\r\n").encode() + payload + f"\r\n--{boundary}--\r\n".encode()
    req = urllib.request.Request(url, method="POST", headers={
        "Authorization": f"Bearer {os.environ['GH_TOKEN']}",
        "Content-Type": f"multipart/form-data; boundary={boundary}"}, data=body)
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read())

tok = os.environ.get("GH_TOKEN")
if not tok:
    sys.exit("✗ GH_TOKEN تنظیم نشده")

try:
    rel = api(f"https://api.github.com/repos/{REPO}/releases", {
        "tag_name": TAG, "name": "نسخه 0.5.0 — راهنمای مهاجرت هر بخش + کد ملی کلیدی",
        "body": NOTES, "draft": False, "prerelease": False})
    print(f"✓ Release ساخته شد — id {rel['id']}")
except urllib.error.HTTPError as e:
    if e.code == 422:  # already exists
        rel = json.loads(urllib.request.urlopen(urllib.request.Request(
            f"https://api.github.com/repos/{REPO}/releases/tags/{TAG}",
            headers={"Authorization": f"Bearer {tok}", "Accept": "application/vnd.github+json"})).read())
        print(f"↷ Release از قبل موجود بود — id {rel['id']}")
    else:
        raise

name = "porseshnameh-static-v0.5.0.zip"
asset = upload(f"https://uploads.github.com/repos/{REPO}/releases/{rel['id']}/assets?name={name}", ZIP, name)
print(f"✓ {asset.get('name')} → {asset.get('browser_download_url')}")
