#!/usr/bin/env python3
"""
پس‌پردازش خروجی استاتیک برای قابلیت حمل کامل:
۱) مسیر فونت‌های url(/fonts/...) داخل CSS باید نسبت به عمق پوشه خود CSS
   نسبی شود (url(../../../fonts/...)) تا در file:// و هر زیرمسیری کار کند.
   (مسیر نسبی داخل CSS نسبت به محل فایل CSS حل می‌شود، نه سند HTML)
۲) هر ارجاع مطلق باقی‌مانده به /_next/ یا /porseshnameh/ در HTML گزارش می‌شود.
"""
import re
import sys
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "out"

if not OUT.exists():
    print(f"✗ پوشه {OUT} یافت نشد — ابتدا بیلد استاتیک را اجرا کنید.")
    sys.exit(1)

changed_css = 0
for css in OUT.rglob("*.css"):
    text = css.read_text(encoding="utf-8")
    rel = Path("../../../")  # chunks → static → _next → ریشه خروجی
    depth = len(css.parent.relative_to(OUT).parts)
    up = "../" * depth
    new_text = re.sub(r"url\(\s*/fonts/", f"url({up}fonts/", text)
    if new_text != text:
        css.write_text(new_text, encoding="utf-8")
        changed_css += 1
        print(f"  • فونت‌ها نسبی شد: {css.relative_to(OUT)} (عمق {depth} → {up}fonts/)")

# ممیزی HTML: نباید ارجاع مطلق به /_next/ بماند
problems = []
for html in OUT.rglob("*.html"):
    text = html.read_text(encoding="utf-8")
    for m in re.finditer(r'(?:src|href)="(/[^"]*)"', text):
        url = m.group(1)
        if url.startswith("/_next/") or url.startswith("/fonts/"):
            problems.append(f"{html.relative_to(OUT)}: {url}")

if problems:
    print("✗ ارجاع‌های مطلق باقی‌مانده:")
    for p in problems:
        print("   " + p)
    sys.exit(1)

print(f"✓ پس‌پردازش کامل شد — {changed_css} فایل CSS اصلاح شد، هیچ ارجاع مطلق ممنوعی در HTML نیست.")
