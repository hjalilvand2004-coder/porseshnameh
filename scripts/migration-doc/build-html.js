// build-html.js — ساخت سند HTML راست‌چین (ورودی html2pdf-next.js)
// خروجی: out/migration.html (خودکفا با فونت inline) + کپی در download/
"use strict";
const fs = require("fs");
const path = require("path");
const { SERVICES, DATA_PRIORITY } = require("./data.js");
const { META, DOC_INFO_TABLE, EXEC, CH1, CH2 } = require("./content-v2.js");
const { CH3, CH4, APPX, SVC_DETAIL, SVC_CARD_ROWS } = require("./content-v2b.js");

const OUT_DIR = path.join(__dirname, "out");
const FONT_DIR = path.join(__dirname, "fonts");
const DL = "/home/z/my-project/download";

// ---------- فونت‌ها (inline base64 → HTML خودکفا) ----------
const fontFace = (name, file, weight) => {
  const b64 = fs.readFileSync(path.join(FONT_DIR, file)).toString("base64");
  return `@font-face{font-family:'Vazirmatn';font-style:normal;font-weight:${weight};src:url(data:font/woff2;base64,${b64}) format('woff2');font-display:swap;}`;
};
const FACES = [
  fontFace("vr", "Vazirmatn-Regular.woff2", 400),
  fontFace("vm", "Vazirmatn-Medium.woff2", 500),
  fontFace("vs", "Vazirmatn-SemiBold.woff2", 600),
  fontFace("vb", "Vazirmatn-Bold.woff2", 700),
].join("\n");

// ---------- ابزار متن ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const bold = (s) => esc(s).split("**").map((seg, i) => (i % 2 ? `<b>${seg}</b>` : seg)).join("");

// ---------- TOC و نشانگر صفحات ----------
const tocEntries = []; // {level,text,id}
let hIdx = 0;
const mark = (level, text) => {
  hIdx += 1;
  const id = `s${hIdx}`;
  tocEntries.push({ level, text: text.replace(/\*\*/g, ""), id });
  return id;
};
let tocPages = {};
const tpPath = path.join(OUT_DIR, "toc-pages.json");
if (fs.existsSync(tpPath)) tocPages = JSON.parse(fs.readFileSync(tpPath, "utf8"));
const pgNum = (id) => tocPages[id] != null ? `<span class="pg">${tocPages[id]}</span>` : `<span class="pg pg-draft">—</span>`;

// ---------- رندر بلاک‌ها ----------
function renderTable(tbl) {
  const keep = tbl.rows.length <= 6 ? " keep" : "";
  const widths = tbl.widths || tbl.headers.map(() => Math.floor(100 / tbl.headers.length));
  const head = tbl.headers.map((h, i) => `<th style="width:${widths[i]}%">${esc(h)}</th>`).join("");
  const rows = tbl.rows.map((r) => `<tr>${r.map((c) => `<td>${bold(c)}</td>`).join("")}</tr>`).join("\n");
  return `<div class="table-wrap${keep}"><div class="tbl-caption">${esc(tbl.caption)}</div>` +
    `<table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderSvcCards() {
  let out = "";
  SERVICES.forEach((s, i) => {
    const fa = faNum(i + 1);
    const id = mark(2, `الف-${fa} — ${s.name}`);
    out += `<h2 id="anch-${id}">الف-${fa} — ${esc(s.name)}</h2>`;
    const d = SVC_DETAIL[s.id];
    const rows = SVC_CARD_ROWS.map(([label, fn]) => [label, fn(s, d)]);
    out += renderTable({
      caption: `جدول ${faNum(15 + i)} — شناسنامه سرویس ${fa} از ۸ — ${s.name}`,
      headers: ["مشخصه", "شرح"], widths: [26, 74], rows,
    });
  });
  return out;
}

function renderPrioTable() {
  return renderTable({
    caption: "جدول ۲۳ — تقدم پنج‌سطحی منابع داده",
    headers: ["تقدم", "منبع", "شرح"],
    widths: [10, 30, 60],
    rows: DATA_PRIORITY.map((p) => [p.rank, p.source, p.desc]),
  });
}

const faNum = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

function renderBlocks(blocks) {
  let out = "";
  for (const b of blocks) {
    if (b.t === "h1") {
      const id = mark(1, b.text);
      out += `<div class="chapter-header"><div class="chapter-tag">${esc(b.kicker || "")}</div>` +
        `<h1 id="anch-${id}">${esc(b.text)}</h1><div class="divider"></div></div>`;
    } else if (b.t === "h2") {
      const id = mark(2, b.text);
      out += `<h2 id="anch-${id}">${esc(b.text)}</h2>`;
    } else if (b.t === "h3") {
      out += `<h3>${esc(b.text)}</h3>`;
    } else if (b.t === "p") {
      out += `<p>${bold(b.text)}</p>`;
    } else if (b.t === "ul") {
      out += `<ul>${b.items.map((it) => `<li>${bold(it)}</li>`).join("")}</ul>`;
    } else if (b.t === "note") {
      out += `<div class="note"><div class="note-title">${esc(b.title)}</div><p>${bold(b.text)}</p></div>`;
    } else if (b.t === "table") {
      out += renderTable(b);
    } else if (b.t === "chain") {
      out += `<div class="chain">` + b.items.map((x, i) =>
        `<span class="chip">${esc(x)}</span>` + (i < b.items.length - 1 ? `<span class="arr">←</span>` : "")
      ).join("") + `</div>`;
    } else if (b.t === "svcCards") {
      out += renderSvcCards();
    } else if (b.t === "prioTable") {
      out += renderPrioTable();
    }
  }
  return out;
}

// ---------- رندر: ابتدا خلاصه مدیریتی (برای ترتیب صحیح id)، سپس بدنه ----------
const execHTML = renderBlocks(EXEC);
const bodyHTML = renderBlocks([...CH1, ...CH2, ...CH3, ...CH4, ...APPX]);
const docInfoHTML = renderTable(DOC_INFO_TABLE);

const tocHTML = tocEntries.map((e) =>
  e.level === 1
    ? `<div class="toc-l1"><span class="toc-t">${esc(e.text)}</span><span class="toc-dots"></span>${pgNum(e.id)}</div>`
    : `<div class="toc-l2"><span class="toc-t">${esc(e.text)}</span><span class="toc-dots"></span>${pgNum(e.id)}</div>`
).join("\n");

// عنوان جلد: جلوگیری از شکستن EM-MPI در خط تیره
const titleHTML = esc(META.title).replace(/EM-MPI/g, '<span style="white-space:nowrap">EM-MPI</span>');

const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
<meta charset="UTF-8">
<title>${esc(META.title)}</title>
<style>
${FACES}
@page { size: 720px 1020px; margin: 0; }
:root{
  --navy:#122A47; --navy-d:#0C1D33; --navy-m:#2B3F58; --gold:#B08D2F; --gold-l:#E7D9B0;
  --bg:#F7F9FC; --card:#FFFFFF; --stripe:#EFF3F9; --border:#D8E0EA;
  --text:#1A2433; --muted:#5A6B80;
}
html,body{ margin:0; padding:0; width:720px; background:var(--bg); color:var(--text);
  font-family:'Vazirmatn', sans-serif; font-size:15px; line-height:1.95; }
body{ line-break:strict; word-break:normal; overflow-wrap:break-word; }
@media screen{ html{ height:auto; display:flex; justify-content:center; background:#28303b; }
  body{ margin:20px auto; box-shadow:0 8px 40px rgba(0,0,0,.4); } }

/* ---------- نشانگر صفحات (نامرئی، برای شماره‌گذاری دومرحله‌ای) ---------- */

/* ---------- جلد ---------- */
.cover{ width:720px; height:1020px; box-sizing:border-box; break-after:page; overflow:hidden;
  background:linear-gradient(160deg, var(--navy-d) 0%, var(--navy) 55%, #16345A 100%);
  color:#F2F6FB; display:flex; flex-direction:column; justify-content:center; position:relative; padding:64px; }
.cover .corner{ position:absolute; width:74px; height:74px; pointer-events:none; }
.cover .corner.tr{ top:20px; right:20px; border-top:2px solid var(--gold); border-right:2px solid var(--gold); }
.cover .corner.bl{ bottom:20px; left:20px; border-bottom:2px solid var(--gold); border-left:2px solid var(--gold); }
.cover .kicker{ color:var(--gold-l); font-size:14px; font-weight:600; word-spacing:.35em; margin-bottom:26px; }
.cover .kicker b{ display:inline-block; }
.cover .title{ font-size:32px; font-weight:700; line-height:1.55; margin-bottom:14px; }
.cover .subtitle{ font-size:17px; font-weight:500; color:var(--gold-l); line-height:2; margin-bottom:30px; }
.cover .goldbar{ color:var(--gold); font-size:17px; margin-bottom:38px; }
.cover .summary{ font-size:13.5px; color:#AAB9CC; line-height:2.1; max-width:520px; margin-bottom:44px; text-align:justify; }
.cover .meta{ display:flex; flex-wrap:wrap; gap:0 40px; max-width:560px; }
.cover .meta .m{ min-width:180px; max-width:100%; padding:4px 0 2px; }
.cover .meta .k{ font-size:10.5px; color:var(--gold-l); font-weight:600; }
.cover .meta .v{ font-size:14px; color:#EDF2F8; font-weight:500; }
.cover .foot{ position:absolute; bottom:78px; right:64px; left:64px; display:flex; justify-content:space-between; align-items:center;
  color:#93A5BC; font-size:11.5px; }
.cover .foot .b{ color:var(--gold-l); font-weight:600; letter-spacing:.18em; }

/* ---------- بدنه ---------- */
.main-content{ padding:56px 58px 48px; background:var(--bg); }
.chapter-header{ break-after:avoid; break-inside:avoid; margin-top:28px; }
.chapter-header:first-child{ margin-top:0; }
.chapter-tag{ color:var(--gold); font-size:12px; font-weight:600; margin-bottom:4px; }
h1{ font-size:24px; font-weight:700; color:var(--navy); line-height:1.5; margin:0 0 6px; }
.divider{ height:2.5px; width:100%; background:linear-gradient(270deg, var(--gold), rgba(176,141,47,.06)); margin:10px 0 18px; }
h2{ font-size:17px; font-weight:700; color:var(--navy-m); margin:22px 0 8px; break-after:avoid; }
h3{ font-size:15px; font-weight:600; color:var(--navy-m); margin:16px 0 6px; break-after:avoid; }
p{ margin:0 0 11px; text-align:justify; }
b{ font-weight:600; color:var(--navy); }
ul{ margin:2px 0 12px; padding-right:22px; }
li{ margin-bottom:7px; text-align:justify; break-inside:avoid; }
.note{ break-inside:avoid; background:#FBF7EC; border-right:3px solid var(--gold); border-radius:6px;
  padding:12px 16px; margin:12px 0 14px; }
.note .note-title{ font-weight:700; color:#7A5F1E; font-size:13.5px; margin-bottom:3px; }
.note p{ margin:0; font-size:13.5px; }

/* ---------- جدول‌ها ---------- */
.table-wrap{ margin:10px 0 16px; }
.table-wrap.keep{ break-inside:avoid; }
.tbl-caption{ font-size:12.5px; font-weight:600; color:var(--muted); margin-bottom:5px; break-after:avoid; }
table{ width:100%; border-collapse:collapse; background:var(--card); font-size:12.5px; line-height:1.75; }
.table-wrap.small table{ font-size:11.5px; line-height:1.7; }
thead{ display:table-header-group; }
th{ background:var(--navy-m); color:#FFFFFF; font-weight:600; padding:7px 9px; text-align:right; border:1px solid #24364D; }
td{ padding:6px 9px; border:1px solid var(--border); text-align:justify; vertical-align:top; }
tbody tr:nth-child(odd) td{ background:var(--stripe); }
tbody tr:nth-child(even) td{ background:var(--card); }
tr{ break-inside:avoid; }

/* ---------- زنجیره طراحی ---------- */
.chain{ display:flex; flex-wrap:wrap; align-items:center; gap:6px 9px; background:var(--card);
  border:1px solid var(--border); border-radius:8px; padding:12px 14px; margin:10px 0 16px; break-inside:avoid; }
.chain .chip{ background:var(--navy); color:#FFFFFF; font-size:12.5px; font-weight:600; padding:5px 13px; border-radius:20px; }
.chain .arr{ color:var(--gold); font-weight:700; font-size:16px; }

/* ---------- شناسنامه + خلاصه ---------- */
.docinfo{ break-inside:avoid; }
.exec{ }

/* ---------- فهرست مطالب ---------- */
.toc{ break-before:page; break-after:page; }
.toc-title{ font-size:22px; font-weight:700; color:var(--navy); margin:6px 0 4px; }
.toc-rule{ height:2.5px; background:linear-gradient(270deg, var(--gold), rgba(176,141,47,.06)); margin:8px 0 18px; }
.toc-l1,.toc-l2{ display:flex; align-items:baseline; gap:8px; margin-bottom:7px; }
.toc-l1{ font-weight:600; color:var(--navy); font-size:14px; margin-top:10px; }
.toc-l2{ font-weight:400; color:var(--text); font-size:12.8px; padding-right:20px; }
.toc-dots{ flex:1; border-bottom:1.5px dotted #B7C3D2; transform:translateY(-4px); }
.pg{ font-weight:600; color:var(--navy-m); font-size:12.5px; min-width:22px; text-align:left; }

.ending-pad{ height:8px; }
</style>
</head>
<body>

<div class="cover">
  <div class="corner tr"></div>
  <div class="corner bl"></div>
  <div class="kicker">سند رسمی طراحی و مهاجرت</div>
  <div class="title">${titleHTML}</div>
  <div class="subtitle">${esc(META.shortTitle)}</div>
  <div class="goldbar">◆</div>
  <div class="summary">این سند چارچوب رسمی طراحی و مهاجرت به ابزار یکپارچه گردآوری و ارزیابی اطلاعات خانوار را تعیین می‌کند: طراحی از نیازهای سنجش EM-MPI و شاخه تخصصی پویا (CDI) به‌صورت بالا به پایین، بررسی پایین به بالای داده‌های موجود، منطق پویای گردآوری و برنامه اعتبارسنجی و مهاجرت مرحله‌ای. شناسنامه استاندارد هشت وب‌سرویس مرجع در سیزده مشخصه در پیوست ارائه شده است. مخاطب سند ترکیبی است: مدیران و سیاست‌گذاران، کارشناسان مددکاری میدانی و تیم فنی.</div>
  <div class="meta">
    <div class="m"><div class="k">کد سند</div><div class="v">${esc(META.docCode)}</div></div>
    <div class="m"><div class="k">نسخه سند</div><div class="v">${esc(META.version)}</div></div>
    <div class="m"><div class="k">تاریخ انتشار</div><div class="v">${esc(META.date)}</div></div>
    <div class="m"><div class="k">نسخه مرجع نرم‌افزار</div><div class="v">v0.9.6</div></div>
    <div class="m"><div class="k">طبقه‌بندی</div><div class="v">رسمی — قابل انتشار</div></div>
    <div class="m"><div class="k">مرجع سنجش</div><div class="v">EM-MPI-RF 1.0.0-demo</div></div>
  </div>
  <div class="foot"><span>${esc(META.org)}</span><span class="b">EM-MPI · CDI</span><span>${esc(META.preparedBy)}</span></div>
</div>

<div class="main-content">
  <div class="docinfo">${docInfoHTML}</div>
  <div class="exec">${execHTML}</div>

  <div class="toc">
    <div class="toc-title">فهرست مطالب</div>
    <div class="toc-rule"></div>
    ${tocHTML}
  </div>

  ${bodyHTML}
  <div class="ending-pad"></div>
</div>

</body>
</html>`;

fs.mkdirSync(OUT_DIR, { recursive: true });
const outPath = path.join(OUT_DIR, "migration.html");
fs.writeFileSync(outPath, html, "utf8");
fs.mkdirSync(DL, { recursive: true });
fs.writeFileSync(path.join(DL, "porseshnameh-migration-doc-v2.0.html"), html, "utf8");
fs.writeFileSync(path.join(OUT_DIR, "toc-entries.json"), JSON.stringify(tocEntries, null, 1), "utf8");
console.log("HTML built:", outPath, "|", html.length, "bytes | toc entries:", tocEntries.length);
