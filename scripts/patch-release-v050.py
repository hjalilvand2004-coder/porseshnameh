#!/usr/bin/env python3
"""به‌روزرسانی متن Release v0.5.0 با یادداشت کامل — توکن فقط از GH_TOKEN."""
import json, os, sys, urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from importlib import util as _u
spec = _u.spec_from_file_location("mk", os.path.join(os.path.dirname(__file__), "make-release-v050.py"))

REPO = "hjalilvand2004-coder/porseshnameh"
REL_ID = "419248882"

# NOTES را از اسکریپت سازنده برمی‌داریم بدون اجرای main
import ast, pathlib
src = pathlib.Path(os.path.join(os.path.dirname(__file__), "make-release-v050.py")).read_text(encoding="utf-8")
tree = ast.parse(src)
notes = None
for node in tree.body:
    if isinstance(node, ast.Assign) and getattr(node.targets[0], "id", "") == "NOTES":
        notes = ast.literal_eval(node.value)
if not notes:
    sys.exit("✗ NOTES یافت نشد")

req = urllib.request.Request(
    f"https://api.github.com/repos/{REPO}/releases/{REL_ID}", method="PATCH",
    headers={"Authorization": f"Bearer {os.environ['GH_TOKEN']}", "Accept": "application/vnd.github+json",
             "Content-Type": "application/json"},
    data=json.dumps({"body": notes}).encode())
with urllib.request.urlopen(req) as r:
    d = json.loads(r.read())
print("✓ متن Release به‌روزرسانی شد — طول:", len(d.get("body", "")))
