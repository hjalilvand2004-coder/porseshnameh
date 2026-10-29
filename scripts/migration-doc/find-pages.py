#!/usr/bin/env python3
"""یافتن صفحه هر عنوان فهرست با تطبیق متنی مقاوم (تحمل آرتیفکت‌های استخراج RTL)
خروجی: out/toc-pages.json  {id: logical_page}  (logical = physical - 1، جلد شمرده نمی‌شود)"""
import json, re, sys, pathlib, difflib
import fitz

BASE = pathlib.Path("/home/z/my-project/scripts/migration-doc")
PDF = BASE / "out" / ("migration-final.pdf" if "--final" in sys.argv else "migration-p1.pdf")
OUT = BASE / "out" / "toc-pages.json"

DIAC = re.compile(r"[\u064B-\u0652\u0654\u0655\u0670\u0640]")

def _letters_only(s: str) -> str:
    """فقط حروف عربی/فارسی (بدون رقم، لاتین، نقطه‌گذاری، نیم‌فاصله)"""
    out = []
    for ch in s:
        o = ord(ch)
        if ("\u0621" <= ch <= "\u064A") or ("\u066E" <= ch <= "\u06D5"):
            out.append(ch)
    return "".join(out)

def norm(s: str) -> str:
    s = DIAC.sub("", s)
    s = _letters_only(s)
    s = s.replace("لا", "ال")            # آرتیفکت لیگاتور لام-الف
    return s

def needle_from(title: str) -> str:
    """طولانی‌ترین دنباله پیوسته از توکن‌های کاملاً حرفی (فارسی، بدون رقم/لاتین/علامت)"""
    t = DIAC.sub("", title).replace("\u200c", " ")
    toks = [x for x in re.split(r"[^؀-ۿ]+", t) if x]
    bad = re.compile(r"[\u06F0-\u06F9\u0660-\u06690-9A-Za-z()\[\]{}«»\"'—–\-:،؛؟.!.,+٪%]")
    def pure(w):
        return len(w) >= 2 and re.search(r"[؀-ۿ]", w) and not bad.search(w)
    best, cur = [], []
    for w in toks:
        if pure(w):
            cur.append(w)
            if len(cur) > len(best): best = cur
        else:
            cur = []
    if not best:  # fallback: همه توکن‌های حرفی ≥۲ حرف
        best = [w for w in toks if pure(w)][:4]
    if not best:
        best = [w for w in toks if w][:2]
    return norm(" ".join(best))

doc = fitz.open(PDF)
pages_norm = [norm(p.get_text()) for p in doc]
N = len(pages_norm)

# صفحه فهرست (نباید برای تطبیق استفاده شود چون همه عناوین در آن تکرار شده‌اند)
toc_page = next((i + 1 for i, t in enumerate(pages_norm) if "فهرستمطالب" in t), None)

entries = json.loads((BASE / "out" / "toc-entries.json").read_text(encoding="utf8"))
result, pointer, misses = {}, 2, []
for e in entries:
    t = DIAC.sub("", e["text"]).replace("\u200c", " ")
    raw_toks = [x for x in re.split(r"[^؀-ۿ]+", t) if x]
    bad = re.compile(r"[\u06F0-\u06F9\u0660-\u06690-9A-Za-z()\[\]{}«»\"'—–\-:،؛؟.!.,+٪%]")
    toks = [norm(w) for w in raw_toks if len(w) >= 3 and not bad.search(w) and re.search(r"[؀-ۿ]", w)]
    toks = list(dict.fromkeys(toks))
    if len(toks) < 2:
        misses.append((e["id"], e["text"], "tokens کم")); continue
    needle = "".join(toks)                      # ترتیب اصلی کلمات
    total = sum(len(w) for w in toks)
    top2 = sorted(toks, key=len, reverse=True)[:2]
    # مرحله ۱: صفحات نامزد با فیلتر توکنی
    cands = []
    for q in range(pointer, N + 1):
        if q == toc_page: continue
        pt = pages_norm[q - 1]
        present = [w for w in toks if w in pt]
        if all(w in pt for w in top2) and len(present) >= min(3, len(toks)) \
           and sum(len(w) for w in present) >= 0.5 * total:
            cands.append(q)
    if not cands:
        misses.append((e["id"], e["text"], "|".join(toks[:3]))); continue
    # مرحله ۲: انتخاب با بلندترین زیررشته مشترک (مقاوم در برابر جابه‌جایی bidi)
    def lcs(page_letters: str) -> int:
        m = difflib.SequenceMatcher(None, needle, page_letters, autojunk=False)
        return m.find_longest_match(0, len(needle), 0, len(page_letters)).size
    best_q = max(cands, key=lambda q: (lcs(pages_norm[q - 1]), -q))
    l = lcs(pages_norm[best_q - 1])
    if l < 0.5 * len(needle):
        print(f"  ⚠ {e['id']} LCS کم: {l}/{len(needle)} روی p{best_q}")
    result[e["id"]] = best_q - 1          # منطقی = فیزیکی - ۱
    pointer = best_q
    print(f"  {e['id']:>4} p{best_q:>2} (←{best_q-1})  {e['text'][:44]:<46} LCS={l}/{len(needle)}")

print(f"\npages={N} toc_page={toc_page} matched={len(result)}/{len(entries)}")
if misses:
    print("MISSES:")
    for m in misses: print("  ✗", m)
    sys.exit(1)
OUT.write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf8")
print("wrote", OUT)
