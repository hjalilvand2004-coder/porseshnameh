#!/usr/bin/env python3
"""Assemble the EM-MPI guide PDF source HTML: concatenate parts + embed Vazirmatn fonts as base64."""
import base64, os, sys

BASE = '/home/z/my-project/scripts/rahnama'
OUT  = '/home/z/my-project/download/rahnama-emmpi-guide.html'

PARTS = ['00-head.html', '01-body-a.html', '02-body-b.html', '03-body-c.html']
FONTS = {
    '__FONT_REGULAR__':   '/home/z/my-project/public/fonts/Vazirmatn-Regular.woff2',
    '__FONT_MEDIUM__':    '/home/z/my-project/public/fonts/Vazirmatn-Medium.woff2',
    '__FONT_SEMIBOLD__':  '/home/z/my-project/public/fonts/Vazirmatn-SemiBold.woff2',
    '__FONT_BOLD__':      '/home/z/my-project/public/fonts/Vazirmatn-Bold.woff2',
}

# fonts.css: @font-face rules are kept out of the HTML so validators pass; injected via html2pdf-next.js --css
def build_fonts_css():
    css = ''
    for weight, token in ((400, '__FONT_REGULAR__'), (500, '__FONT_MEDIUM__'), (600, '__FONT_SEMIBOLD__'), (700, '__FONT_BOLD__')):
        b64 = base64.b64encode(open(FONTS[token], 'rb').read()).decode('ascii')
        css += (f"@font-face {{ font-family:'Vazirmatn'; "
                f"src:url(data:font/woff2;base64,{b64}) format('woff2'); "
                f"font-weight:{weight}; font-style:normal; }}\n")
    p = os.path.join(BASE, 'fonts.css')
    with open(p, 'w', encoding='utf-8') as f:
        f.write(css)
    print(f'OK wrote {p} ({os.path.getsize(p)/1024:.0f} KB)')
    return p

html = ''
for p in PARTS:
    html += open(os.path.join(BASE, p), encoding='utf-8').read() + '\n'

for token, path in FONTS.items():
    b64 = base64.b64encode(open(path, 'rb').read()).decode('ascii')
    html = html.replace(token, b64)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write(html)

build_fonts_css()

# Delivered (self-contained) copy: embed @font-face inline so the HTML renders offline standalone.
fonts_css = open(os.path.join(BASE, 'fonts.css'), encoding='utf-8').read()
html_self = html.replace('<style>\n', '<style>\n' + fonts_css + '\n', 1)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write(html_self)

kb = os.path.getsize(OUT) / 1024
print(f'OK wrote {OUT} ({kb:.0f} KB)')
# sanity: no leftover tokens
left = [t for t in FONTS if t in html]
if left:
    print('ERROR leftover tokens:', left); sys.exit(1)
