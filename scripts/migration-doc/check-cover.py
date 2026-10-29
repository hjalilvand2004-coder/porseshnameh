#!/usr/bin/env python3
"""تست صحت جلد: استخراج فقط .cover از سند کامل و اجرای cover_validate روی آن
+ اثبات اینکه هیچ همپوشانی text↔line در ناحیه جلد (y<1020) سند کامل وجود ندارد."""
import re, subprocess, sys, pathlib

BASE = pathlib.Path("/home/z/my-project")
DOC = BASE / "scripts/migration-doc/out/migration.html"
TMP = BASE / "scripts/migration-doc/out/cover-only.html"
CV = BASE / "skills/pdf/scripts/cover_validate.js"

html = DOC.read_text(encoding="utf8")
head_end = html.index("</style>") + len("</style>")
head = html[:head_end]
cover_start = html.index('<div class="cover">')
cover_end = html.index('<div class="main-content">')
cover = html[cover_start:cover_end]
TMP.write_text(head + "\n</head>\n<body>\n" + cover + "\n</body>\n</html>", encoding="utf8")

r = subprocess.run(["node", str(CV), str(TMP)], capture_output=True, text=True)
out = r.stdout + r.stderr
print("=== cover-only test ===")
lines = out.splitlines()
for ln in lines:
    if any(k in ln for k in ("Pass", "ERROR", "✓", "❌", "Overlap")):
        print(ln[:160])
ok = ("❌" not in out) and ("Found 0 text-line overlap" in out or "PASS" in out.upper() or "✓" in out)
print("cover-only verdict:", "PASS" if ok else "CHECK")

# --- بررسی ناحیه جلد در سند کامل ---
r2 = subprocess.run(["node", str(CV), str(DOC)], capture_output=True, text=True)
full = r2.stdout + r2.stderr
pairs = re.findall(r"y=(\d+)-(\d+)", full)
in_cover = [p for p in pairs if int(p[0]) < 1020]
print("\n=== full-doc overlaps inside cover region (y<1020):", len(in_cover), in_cover[:6])
sys.exit(0 if ok and not in_cover else 1)
