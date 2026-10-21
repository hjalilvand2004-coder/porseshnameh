#!/usr/bin/env python3
"""Extract clean text content from help.html sections for PDF authoring."""
import re, html as ihtml

src = open('/home/z/my-project/public/help.html', encoding='utf-8').read()
# body only
body = src.split('<body', 1)[1]
body = body.split('>', 1)[1]

# remove svg, scripts, styles
body = re.sub(r'<svg.*?</svg>', '[icon]', body, flags=re.S)
body = re.sub(r'<script.*?</script>', '', body, flags=re.S)
body = re.sub(r'<style.*?</style>', '', body, flags=re.S)
body = re.sub(r'<!--.*?-->', '', body, flags=re.S)

# mark headings
body = re.sub(r'<h([1-6])[^>]*>', lambda m: f'\n@@H{m.group(1)}@@ ', body)
body = re.sub(r'</h[1-6]>', '\n', body)
# mark paragraphs / list items / table cells
body = re.sub(r'<(p|li|div|section|header|footer|tr|th|td|span|dt|dd|summary|button|label|a|b|strong|em|td)[^>]*class="[^"]*"[^>]*>', ' | ', body)
body = re.sub(r'<[^>]+>', ' ', body)
body = ihtml.unescape(body)
body = re.sub(r'[ \t]+', ' ', body)
lines = [l.strip(' |') for l in body.split('\n')]
out = []
for l in lines:
    l = l.strip()
    if not l or l == '|':
        continue
    out.append(l)
text = '\n'.join(out)
text = re.sub(r'\n{3,}', '\n\n', text)
open('/home/z/my-project/scripts/help-content.txt', 'w', encoding='utf-8').write(text)
print(text[:3000])
print('...TOTAL CHARS:', len(text))
