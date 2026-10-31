// build-docx.js — ساخت فایل Word راست‌چین (docx-js) — دستور جلد R2 + سه بخش شماره‌گذاری + TOC فیلدی
"use strict";
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  PageBreak, Header, Footer, PageNumber, NumberFormat, AlignmentType,
  HeadingLevel, WidthType, BorderStyle, ShadingType, TableOfContents,
  SectionType, TableLayoutType, VerticalAlign,
} = require("docx");
const { SERVICES, DATA_PRIORITY } = require("./data.js");
const { META, DOC_INFO_TABLE, EXEC, CH1, CH2 } = require("./content-v2.js");
const { CH3, CH4, APPX, SVC_DETAIL, SVC_CARD_ROWS } = require("./content-v2b.js");

const OUT = "/home/z/my-project/download/porseshnameh-migration-doc-v2.0.docx";

// ============================ پالت ============================
const P = {
  navy: "122A47", navyM: "2B3F58", gold: "B08D2F", text: "1A2433",
  muted: "5A6B80", stripe: "EFF3F9", border: "D8E0EA",
  cover: { bg: "122A47", titleColor: "F2F6FB", subtitleColor: "C7D3E2", metaColor: "D8E2EE", accent: "B08D2F", footerColor: "93A5BC" },
};
const FONT = { ascii: "Vazirmatn", hAnsi: "Vazirmatn", eastAsia: "Vazirmatn", cs: "Vazirmatn" };

const NB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const allNoBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB };
const noBorders = { top: NB, bottom: NB, left: NB, right: NB };

// ============================ ابزار متن ============================
// تجزیه **بولد** → TextRun با rightToLeft
function runs(text, opts = {}) {
  const base = { size: opts.size || 24, color: opts.color || P.text, font: FONT, rightToLeft: true };
  const b = { ...base, bold: true, boldComplexScript: true };
  if (opts.boldAll) Object.assign(base, { bold: true, boldComplexScript: true });
  return String(text).split("**").map((seg, i) =>
    new TextRun(Object.assign({}, (i % 2 ? b : base), { text: seg }))
  ).filter(r => true);
}

function para(text, opts = {}) {
  return new Paragraph({
    bidirectional: true,
    alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: { line: 312, after: opts.after != null ? opts.after : 120, before: opts.before || 0 },
    ...(opts.indent ? { indent: opts.indent } : {}),
    children: runs(text, opts),
  });
}

function heading(text, level) {
  const size = level === 1 ? 32 : 28;
  return new Paragraph({
    heading: level === 1 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2,
    bidirectional: true,
    spacing: { before: level === 1 ? 400 : 280, after: level === 1 ? 160 : 120, line: Math.ceil((size / 2) * 23), lineRule: "atLeast" },
    children: [new TextRun({ text, bold: true, boldComplexScript: true, size, sizeComplexScript: size, color: level === 1 ? P.navy : P.navyM, font: FONT, rightToLeft: true })],
  });
}

function ulItem(text) {
  return new Paragraph({
    bidirectional: true,
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 312, after: 90 },
    indent: { left: 340 },
    children: [
      new TextRun({ text: "•  ", size: 24, color: P.gold, font: FONT, bold: true, boldComplexScript: true, rightToLeft: true }),
      ...runs(text),
    ],
  });
}

function noteBox(title, text) {
  const edge = { style: BorderStyle.SINGLE, size: 12, color: P.gold, space: 8 };
  return [
    new Paragraph({
      bidirectional: true, spacing: { before: 120, after: 40, line: 312 },
      indent: { left: 200, right: 200 },
      border: { right: edge },
      shading: { type: ShadingType.CLEAR, fill: "FBF7EC" },
      children: [new TextRun({ text: title, bold: true, boldComplexScript: true, size: 22, color: "7A5F1E", font: FONT, rightToLeft: true })],
    }),
    new Paragraph({
      bidirectional: true, spacing: { after: 140, line: 312 },
      indent: { left: 200, right: 200 },
      border: { right: edge },
      shading: { type: ShadingType.CLEAR, fill: "FBF7EC" },
      children: runs(text, { size: 21 }),
    }),
  ];
}

// ============================ جدول‌ها ============================
function cellPara(text, opts = {}) {
  return new Paragraph({
    bidirectional: true,
    alignment: opts.center ? AlignmentType.CENTER : undefined,
    spacing: { line: 276 },
    children: runs(text, { size: opts.size || 20, color: opts.color || P.text, boldAll: opts.bold }),
  });
}

function tbl(spec) {
  const widths = spec.widths || spec.headers.map(() => Math.floor(100 / spec.headers.length));
  const size = spec.small ? 18 : 20;
  const headerRow = new TableRow({
    tableHeader: true, cantSplit: true,
    children: spec.headers.map((h, i) => new TableCell({
      shading: { type: ShadingType.CLEAR, fill: P.navyM },
      margins: { top: 70, bottom: 70, left: 100, right: 100 },
      width: { size: widths[i], type: WidthType.PERCENTAGE },
      children: [cellPara(h, { size, color: "FFFFFF", bold: true, center: true })],
    })),
  });
  const rows = spec.rows.map((r, ri) => new TableRow({
    cantSplit: true,
    children: r.map((cell, ci) => new TableCell({
      shading: { type: ShadingType.CLEAR, fill: ri % 2 === 0 ? P.stripe : "FFFFFF" },
      margins: { top: 55, bottom: 55, left: 100, right: 100 },
      width: { size: widths[ci], type: WidthType.PERCENTAGE },
      children: [cellPara(cell, { size, center: String(cell).length <= 6 && ci === 0 })],
    })),
  }));
  return [
    new Paragraph({
      bidirectional: true, keepNext: true, spacing: { before: 160, after: 60 },
      children: [new TextRun({ text: spec.caption, bold: true, boldComplexScript: true, size: 21, color: P.muted, font: FONT, rightToLeft: true })],
    }),
    new Table({
      visuallyRightToLeft: true,
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: P.navyM },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: P.navyM },
        left: NB, right: NB,
        insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: P.border },
        insideVertical: { style: BorderStyle.SINGLE, size: 2, color: P.border },
      },
      rows: [headerRow, ...rows],
    }),
    new Paragraph({ bidirectional: true, spacing: { after: 100 }, children: [] }),
  ];
}

// ============================ جلد — دستور R2 ============================
function calcTitleLayout(title, maxWidthTwips, preferredPt = 38, minPt = 24) {
  const charWidth = (pt) => pt * 12;             // میانگین پهنای حرف فارسی
  const charsPerLine = (pt) => Math.floor(maxWidthTwips / charWidth(pt));
  const split = (s, cpl) => {
    if (s.length <= cpl) return [s];
    const words = s.split(" ");
    const lines = []; let cur = "";
    for (const w of words) {
      if ((cur + " " + w).trim().length > cpl && cur) { lines.push(cur.trim()); cur = w; }
      else cur = (cur + " " + w).trim();
    }
    if (cur) lines.push(cur);
    if (lines.length > 1 && lines[lines.length - 1].length <= 2) {
      const last = lines.pop(); lines[lines.length - 1] += " " + last;
    }
    return lines;
  };
  let titlePt = preferredPt, lines;
  while (titlePt >= minPt) {
    lines = split(title, charsPerLine(titlePt));
    if (lines.length <= 3) break;
    titlePt -= 2;
  }
  return { titlePt, titleLines: lines };
}

function buildCoverR2(config) {
  const C = P.cover;
  const padL = 1400, padR = 1400;
  // خطوط عنوان: یا صریح (متعادل) یا محاسبه خودکار
  let titlePt, titleLines;
  if (config.titleLines) {
    titlePt = config.titlePt || 24;
    titleLines = config.titleLines;
  } else {
    const r = calcTitleLayout(config.title, 11906 - padL - padR, 38, 24);
    titlePt = r.titlePt; titleLines = r.titleLines;
  }
  const extraLines = Math.max(0, titleLines.length - 2);
  const titleSize = titlePt * 2;
  const thickBorder = { style: BorderStyle.SINGLE, size: 18, color: C.accent, space: 20 };
  const children = [];

  // ۱. خط طلایی بالایی
  children.push(new Paragraph({
    indent: { left: padL - 400, right: padR - 400 }, spacing: { before: 1000, after: 200 },
    border: { top: thickBorder }, children: [],
  }));
  // ۲. فاصله (تطبیقی با طول عنوان)
  children.push(new Paragraph({ spacing: { before: Math.max(600, 1700 - extraLines * 300) } }));
  // ۳. برچسب لاتین
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 500 },
    children: [new TextRun({ text: config.englishLabel.split("").join("  "), size: 18, color: C.accent, font: FONT, characterSpacing: 40 })],
  }));
  // ۴. عنوان اصلی
  for (let i = 0; i < titleLines.length; i++) {
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER, bidirectional: true,
      spacing: { after: i < titleLines.length - 1 ? 80 : 300, line: Math.ceil(titlePt * 23), lineRule: "atLeast" },
      children: [new TextRun({ text: titleLines[i], size: titleSize, sizeComplexScript: titleSize, bold: true, boldComplexScript: true, color: C.titleColor, font: FONT, rightToLeft: true })],
    }));
  }
  // ۵. زیرعنوان
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, bidirectional: true, spacing: { after: 400, line: 380, lineRule: "atLeast" },
    children: [new TextRun({ text: config.subtitle, size: 24, sizeComplexScript: 24, color: C.subtitleColor, font: FONT, rightToLeft: true })],
  }));
  // ۶. فاصله
  children.push(new Paragraph({ spacing: { before: Math.max(500, 1100 - extraLines * 150) } }));
  // ۷. متادیتا — ۱۸pt
  for (const line of config.metaLines) {
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER, bidirectional: true,
      spacing: { after: 100, line: Math.ceil(18 * 23), lineRule: "atLeast" },
      children: [new TextRun({ text: line, size: 36, sizeComplexScript: 36, color: C.metaColor, font: FONT, rightToLeft: true })],
    }));
  }
  // ۸. فاصله
  children.push(new Paragraph({ spacing: { before: Math.max(700, 1900 - extraLines * 450) } }));
  // ۹. پانویس + خط طلایی پایینی
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, bidirectional: true,
    indent: { left: padL - 400, right: padR - 400 }, spacing: { before: 200 },
    border: { bottom: thickBorder },
    children: [new TextRun({ text: config.footerRight, size: 20, sizeComplexScript: 20, color: C.footerColor, font: FONT, rightToLeft: true })],
  }));

  return [new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: allNoBorders,
    rows: [new TableRow({
      height: { value: 16838, rule: "exact" },
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: C.bg }, borders: noBorders,
        verticalAlign: VerticalAlign.TOP,
        children,
      })],
    })],
  })];
}

// ============================ رندر بلاک‌ها ============================
const faNum = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

function chainBox(items) {
  const children = [];
  items.forEach((x, i) => {
    children.push(new TextRun({ text: x, size: 21, sizeComplexScript: 21, bold: true, boldComplexScript: true, color: P.navy, font: FONT, rightToLeft: true }));
    if (i < items.length - 1) children.push(new TextRun({ text: "  ←  ", size: 21, bold: true, color: P.gold, font: FONT }));
  });
  return [new Table({
    visuallyRightToLeft: true,
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: allNoBorders,
    rows: [new TableRow({
      cantSplit: true,
      children: [new TableCell({
        shading: { type: ShadingType.CLEAR, fill: P.stripe },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
          left: NB, right: NB,
        },
        margins: { top: 120, bottom: 120, left: 140, right: 140 },
        children: [new Paragraph({ bidirectional: true, alignment: AlignmentType.CENTER, spacing: { line: 340 }, children })],
      })],
    })],
  }), new Paragraph({ bidirectional: true, spacing: { after: 100 }, children: [] })];
}

function renderBlocks(blocks) {
  const out = [];
  for (const b of blocks) {
    if (b.t === "h1") out.push(heading(b.text, 1));
    else if (b.t === "h2") out.push(heading(b.text, 2));
    else if (b.t === "h3") out.push(heading(b.text, 2));
    else if (b.t === "p") out.push(para(b.text));
    else if (b.t === "ul") b.items.forEach(it => out.push(ulItem(it)));
    else if (b.t === "note") out.push(...noteBox(b.title, b.text));
    else if (b.t === "table") out.push(...tbl(b));
    else if (b.t === "chain") out.push(...chainBox(b.items));
    else if (b.t === "svcCards") {
      SERVICES.forEach((s, i) => {
        const fa = faNum(i + 1);
        out.push(heading(`الف-${fa} — ${s.name}`, 2));
        const d = SVC_DETAIL[s.id];
        out.push(...tbl({
          caption: `جدول ${faNum(15 + i)} — شناسنامه سرویس ${fa} از ۸ — ${s.name}`,
          headers: ["مشخصه", "شرح"], widths: [26, 74], small: true,
          rows: SVC_CARD_ROWS.map(([label, fn]) => [label, fn(s, d)]),
        }));
      });
    } else if (b.t === "prioTable") {
      out.push(...tbl({
        caption: "جدول ۲۳ — تقدم پنج‌سطحی منابع داده",
        headers: ["تقدم", "منبع", "شرح"], widths: [10, 30, 60],
        rows: DATA_PRIORITY.map(p => [p.rank, p.source, p.desc]),
      }));
    }
  }
  return out;
}

const execBlocks = renderBlocks(EXEC);
const bodyBlocks = renderBlocks([...CH1, ...CH2, ...CH3, ...CH4, ...APPX]);

// ============================ سرصفحه/پاصفحه ============================
const pageHeader = () => new Header({
  children: [new Paragraph({
    bidirectional: true, alignment: AlignmentType.CENTER,
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: P.border, space: 4 } },
    children: [new TextRun({ text: META.shortTitle, size: 18, color: "808080", font: FONT, rightToLeft: true })],
  })],
});
const pageFooter = () => new Footer({
  children: [new Paragraph({
    bidirectional: true, alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "808080", font: FONT }),
      new TextRun({ text: "   —   نسخه ۲٫۰", size: 18, color: "808080", font: FONT, rightToLeft: true }),
    ],
  })],
});

// ============================ سند ============================
const pgSize = { width: 11906, height: 16838 };
const pgMargin = { top: 1440, bottom: 1440, left: 1417, right: 1701 }; // RTL: چسبندگی بیشتر سمت شروع

const doc = new Document({
  title: META.title,
  subject: "سند مهاجرت به پرسشنامه جدید خانوار — نسخه ۲٫۰ (PN-MIG-1405-02)",
  creator: "تیم سامانه پرسشنامه EM-MPI",
  description: "PN-MIG-1405-02 — نسخه ۲٫۰ — ۹ آبان ۱۴۰۵",
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 24, color: P.text },
        paragraph: { spacing: { line: 312 } },
      },
      heading1: { run: { font: FONT, size: 32, bold: true, color: P.navy }, paragraph: { spacing: { before: 400, after: 160, line: 380 } } },
      heading2: { run: { font: FONT, size: 28, bold: true, color: P.navyM }, paragraph: { spacing: { before: 280, after: 120, line: 340 } } },
    },
  },
  sections: [
    { // بخش ۱ — جلد (بدون شماره)
      properties: { page: { size: pgSize, margin: { top: 0, bottom: 0, left: 0, right: 0 } } },
      children: buildCoverR2({
        englishLabel: "DESIGN & MIGRATION FRAMEWORK",
        titleLines: [
          "چارچوب طراحی و مهاجرت به ابزار یکپارچه",
          "گردآوری و ارزیابی اطلاعات خانوار",
          "مبتنی بر EM-MPI و CDI",
        ],
        titlePt: 24,
        subtitle: META.shortTitle,
        metaLines: [
          "کد سند: PN-MIG-1405-02",
          "نسخه سند: ۲٫۰",
          "تاریخ انتشار: ۹ آبان ۱۴۰۵",
          "نسخه مرجع نرم‌افزار: v0.9.6",
          "مرجع سنجش: EM-MPI-RF 1.0.0-demo",
          "طبقه‌بندی: رسمی — قابل انتشار",
        ],
        footerRight: "سامانه پرسشنامه EM-MPI  •  تیم سامانه پرسشنامه",
      }),
    },
    { // بخش ۲ — شناسنامه + خلاصه مدیریتی + فهرست (شماره از ۱)
      properties: {
        type: SectionType.NEXT_PAGE,
        page: { size: pgSize, margin: pgMargin, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } },
      },
      headers: { default: pageHeader() },
      footers: { default: pageFooter() },
      children: [
        ...tbl(DOC_INFO_TABLE),
        ...execBlocks,
        new Paragraph({
          alignment: AlignmentType.CENTER, bidirectional: true,
          spacing: { before: 480, after: 360 },
          children: [new TextRun({ text: "فهرست مطالب", bold: true, boldComplexScript: true, size: 32, sizeComplexScript: 32, color: P.navy, font: FONT, rightToLeft: true })],
        }),
        new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-2" }),
        new Paragraph({
          bidirectional: true, spacing: { before: 200 },
          children: [new TextRun({
            text: "یادآوری: این فهرست با کد فیلد ساخته می‌شود؛ پس از باز کردن فایل، برای به‌روزرسانی شماره صفحه‌ها روی فهرست راست‌کلیک کرده و «Update Field» را انتخاب کنید.",
            italics: true, size: 18, color: "888888", font: FONT, rightToLeft: true,
          })],
        }),
      ],
    },
    { // بخش ۳ — بدنه (ادامه شماره‌گذاری)
      properties: { type: SectionType.NEXT_PAGE, page: { size: pgSize, margin: pgMargin } },
      headers: { default: pageHeader() },
      footers: { default: pageFooter() },
      children: bodyBlocks,
    },
  ],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log("DOCX built:", OUT, "|", (buf.length / 1024).toFixed(0), "KB");
});
