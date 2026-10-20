#!/usr/bin/env python3
"""افزودن کد ملی/تاریخ تولد/کد پستی به خانوارهای بانک نمونه demo-bank.ts"""
import re

P = "src/lib/mpi/demo-bank.ts"

DATA = {
    "علی محمدی (نمونه)": ("1234567890", "۱۳۵۸/۰۳/۱۴"),
    "زهرا کریمی (نمونه)": ("", "۱۳۷۲/۰۹/۰۲"),
    "حسن رضایی (نمونه)": ("2345678901", "۱۳۴۹/۱۱/۲۵"),
    "نیلوفر صادقی (نمونه)": ("3456789012", "۱۳۶۸/۰۵/۰۸"),
    "جعفر نوروزی (نمونه)": ("4567890123", "۱۳۴۰/۰۱/۱۹"),
    "محمود شریفی (نمونه)": ("", "۱۳۵۲/۰۷/۳۰"),
    "رسول موسوی (نمونه)": ("5678901234", "۱۳۶۳/۱۲/۰۳"),
    "فرهاد هاشمی (نمونه)": ("6789012345", "۱۳۷۵/۰۴/۱۷"),
}

s = open(P, encoding="utf-8").read()
count = 0
for name, (pc, bd) in DATA.items():
    anchor = f'headName: "{name}", headNationalIdStatus:'
    idx = s.find(anchor)
    if idx < 0:
        print("NOT FOUND:", name)
        continue
    ls = s.rfind("\n", 0, idx) + 1
    indent = s[ls:idx]
    eol = s.find("\n", idx)
    nid = f'"{pc}"' if pc else "undefined"
    pcv = f'"{pc}"' if pc else "undefined"
    add = (
        f'{indent}headNationalId: {nid}, headBirthDate: "{bd}", postalCode: {pcv},\n'
    )
    s = s[:eol + 1] + add + s[eol + 1:]
    count += 1

open(P, "w", encoding="utf-8").write(s)
print("patched", count)
