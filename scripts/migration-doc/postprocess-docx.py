#!/usr/bin/env python3
"""پس‌پردازش docx: پچ instrText فوتر (PAGE → PAGE \\* arabic) + حذف <w:pgNumType/> خالی بخش جلد"""
import re, shutil, sys, zipfile, pathlib

DOC = pathlib.Path("/home/z/my-project/download/porseshnameh-migration-doc-v1.0.docx")
TMP = DOC.with_suffix(".tmp.docx")

with zipfile.ZipFile(DOC) as zin, zipfile.ZipFile(TMP, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.namelist():
        data = zin.read(item)
        if item.startswith("word/footer") and item.endswith(".xml"):
            xml = data.decode("utf8")
            xml2 = re.sub(
                r"(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)",
                r"\1 PAGE \\* arabic \\* MERGEFORMAT \2",
                xml,
            )
            if xml2 != xml:
                print(f"patched {item}: PAGE → PAGE \\* arabic")
            data = xml2.encode("utf8")
        elif item == "word/document.xml":
            xml = data.decode("utf8")
            n = xml.count("<w:pgNumType/>")
            xml = xml.replace("<w:pgNumType/>", "")
            if n:
                print(f"removed {n} empty <w:pgNumType/> from document.xml")
            data = xml.encode("utf8")
        zout.writestr(item, data)

shutil.move(TMP, DOC)
print("post-process done:", DOC.name)
