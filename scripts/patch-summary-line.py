# -*- coding: utf-8 -*-
"""Patch broken template literal in web-services.tsx (lines 222-224)."""
from pathlib import Path

p = Path("/home/z/my-project/src/components/porsesh/web-services.tsx")
lines = p.read_text(encoding="utf-8").splitlines()

# sanity check on the two target lines
assert "const summary = hasAny" in lines[221], lines[221]
assert "مرجع داده ملاک ارسال کرد" in lines[222], lines[222]
assert "هنوز استعلامی انجام نشده" in lines[223], lines[223]

lines[222] = (
    "    ? `${faNum(okCount + partialCount)} از ${faNum(total)} مرجع "
    "داده ملاک ارسال کرد${errCount > 0 ? ` • ${faNum(errCount)} استعلام ناموفق` : \"\"}`"
)
lines[223] = "    : \"هنوز استعلامی انجام نشده — برای واکشی داده ملاک، مودال را باز کنید\";"

p.write_text("\n".join(lines) + "\n", encoding="utf-8")
print("patched:")
print(lines[222])
print(lines[223])
