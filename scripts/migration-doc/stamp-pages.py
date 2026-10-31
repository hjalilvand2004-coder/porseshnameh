#!/usr/bin/env python3
"""مهر شماره صفحه فارسی روی PDF نهایی (جلد بدون شماره؛ صفحه فیزیکی n ← شماره n-1)
+ متن نسخه در گوشه + متادیتا. خروجی: download/porseshnameh-migration-doc-v2.0.pdf"""
import io, pathlib, sys
import fitz
import arabic_reshaper
from bidi.algorithm import get_display
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader, PdfWriter

BASE = pathlib.Path("/home/z/my-project")
SRC = BASE / "scripts/migration-doc/out/migration-final.pdf"
DST = BASE / "download/porseshnameh-migration-doc-v2.0.pdf"
FONT = BASE / "scripts/rahnama/Vazirmatn-Regular.ttf"

pdfmetrics.registerFont(TTFont("Vazir", str(FONT)))
FA = str.maketrans("0123456789", "۰۱۲۳۴۵۶۷۸۹")
def fa(n: int) -> str: return str(n).translate(FA)
def rtl(s: str) -> str: return get_display(arabic_reshaper.reshape(s))

GRAY = HexColor("#5A6B80")
NAVY = HexColor("#2B3F58")

reader = PdfReader(str(SRC))
W = float(reader.pages[0].mediabox.width)
H = float(reader.pages[0].mediabox.height)
print(f"page size: {W:.0f}x{H:.0f}pt, pages: {len(reader.pages)}")

buf = io.BytesIO()
c = canvas.Canvas(buf, pagesize=(W, H))
for i in range(len(reader.pages)):
    if i > 0:  # جلد بدون شماره
        logical = i
        c.setFont("Vazir", 9.5)
        c.setFillColor(NAVY)
        c.drawCentredString(W / 2, 14, fa(logical))
        c.setFont("Vazir", 7.5)
        c.setFillColor(GRAY)
        c.drawRightString(W - 34, 14.5, rtl("نسخه ۲٫۰ — آبان ۱۴۰۵"))
        c.drawString(34, 14.5, "PN-MIG-1405-02")
    c.showPage()
c.save()
buf.seek(0)

overlay = PdfReader(buf)
writer = PdfWriter()
for i, page in enumerate(reader.pages):
    if i > 0:
        page.merge_page(overlay.pages[i])
    writer.add_page(page)

writer.add_metadata({
    "/Title": "چارچوب طراحی و مهاجرت به ابزار یکپارچه گردآوری و ارزیابی اطلاعات خانوار مبتنی بر EM-MPI و CDI",
    "/Author": "تیم سامانه پرسشنامه EM-MPI",
    "/Subject": "سند مهاجرت به پرسشنامه جدید خانوار — نسخه ۲٫۰ (PN-MIG-1405-02)",
    "/Creator": "Z.ai",
    "/Keywords": "EM-MPI, CDI, مهاجرت, پرسشنامه خانوار, غربالگری, PN-MIG-1405-02",
})
with open(DST, "wb") as f:
    writer.write(f)
print("stamped →", DST, f"({DST.stat().st_size/1024:.0f} KB)")
