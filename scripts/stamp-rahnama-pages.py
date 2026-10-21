#!/usr/bin/env python3
"""Stamp Persian page numbers on the guide PDF + set full metadata.
Scheme (pagination.md five-zone, Persian adaptation):
  p1 cover      -> no number
  p2 TOC        -> no number (single front-matter page; Persian docs don't use roman numerals)
  p3..p(n-1)    -> Persian digits ۱..N (body, starts at 1)
  p_n ending    -> no number (back cover)
Footer: bare number only (no "X of Y"), bottom-center, muted color.
"""
import io
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

SRC = '/home/z/my-project/download/rahnama-emmpi-guide.pdf'
DST = '/home/z/my-project/download/rahnama-emmpi-guide-numbered.pdf'
FONT = '/home/z/my-project/scripts/rahnama/Vazirmatn-Regular.ttf'

pdfmetrics.registerFont(TTFont('Vazir', FONT))

FA = '۰۱۲۳۴۵۶۷۸۹'
def fa(n: int) -> str:
    return ''.join(FA[int(d)] for d in str(n))

reader = PdfReader(SRC)
writer = PdfWriter()
n = len(reader.pages)
for idx, page in enumerate(reader.pages):
    pno = idx + 1
    is_cover = pno == 1
    is_toc = pno == 2
    is_ending = pno == n
    if not (is_cover or is_toc or is_ending):
        w = float(page.mediabox.width)
        h = float(page.mediabox.height)
        buf = io.BytesIO()
        c = canvas.Canvas(buf, pagesize=(w, h))
        c.setFont('Vazir', 9.5)
        c.setFillColorRGB(0x55 / 255, 0x74 / 255, 0x78 / 255)
        c.drawCentredString(w / 2, 20, fa(pno - 2))
        c.save()
        buf.seek(0)
        overlay = PdfReader(buf).pages[0]
        page.merge_page(overlay)
    writer.add_page(page)

writer.add_metadata({
    '/Title': 'راهنمای سامانه پرسش‌نامه EM-MPI خانوار',
    '/Author': 'سامانه پرسش‌نامه EM-MPI',
    '/Subject': 'راهنمای رسمی سامانه غربالگری محرومیت چندبعدی خانوار (EM-MPI) — ۳۰ شاخص، ۵ بُعد، سقف ۱۰۰۰ امتیاز | قواعد نسخه EM-MPI-RF 1.0.0-demo',
    '/Creator': 'Z.ai',
    '/Keywords': 'EM-MPI, غربالگری, محرومیت چندبعدی, پرسش‌نامه خانوار, مددکاری اجتماعی',
})

with open(DST, 'wb') as f:
    writer.write(f)
print(f'OK stamped {n} pages -> {DST}')
