// render-pdf.js — رندر HTML به PDF با پیمایش بومی Chromium (معادل --nopaged)
// کاربرد: node render-pdf.js <input.html> <output.pdf>
"use strict";
const { chromium } = require("playwright");

(async () => {
  const [, , input, output] = process.argv;
  if (!input || !output) {
    console.error("usage: node render-pdf.js <input.html> <output.pdf>");
    process.exit(1);
  }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = "file://" + require("path").resolve(input);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: output,
    preferCSSPageSize: true,   // @page { size: 720px 1020px }
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  await browser.close();
  console.log("PDF rendered:", output);
})().catch((e) => { console.error(e); process.exit(1); });
