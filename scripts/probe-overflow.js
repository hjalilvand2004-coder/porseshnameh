// Diagnostic probe: measure horizontal overflow candidates in print emulation
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await page.emulateMedia({ media: 'print' });
  await page.goto('file:///home/z/my-project/download/rahnama-emmpi-guide.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const report = await page.evaluate(() => {
    const out = { docScrollW: document.documentElement.scrollWidth, bodyScrollW: document.body.scrollWidth, wide: [] };
    const sel = ['.card', '.flag', '.qa', '.example', 'table', '.chips', '.example .flow', '.main-content', '.cover', '.ending', '.grid2', '.leg'];
    for (const s of sel) {
      document.querySelectorAll(s).forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.width > out.bodyScrollW || el.scrollWidth > Math.ceil(el.clientWidth) + 2 || r.left < 0 || r.right > out.bodyScrollW + 1) {
          out.wide.push({ sel: s, i, clientW: el.clientWidth, scrollW: el.scrollWidth, rectW: Math.round(r.width), left: Math.round(r.left), right: Math.round(r.right) });
        }
      });
    }
    // also top-level children widths
    out.mainPad = getComputedStyle(document.querySelector('.main-content')).padding;
    const c = document.querySelector('.card');
    out.cardW = c ? c.getBoundingClientRect().width : null;
    out.mcW = document.querySelector('.main-content').getBoundingClientRect().width;
    return out;
  });
  console.log(JSON.stringify(report, null, 1));
  await browser.close();
})();
