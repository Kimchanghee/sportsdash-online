// Own informational diagrams for posts: mobile-first 1080x1350 portrait PNGs.
// Usage: node scripts/diagram.mjs <spec.json> <outDir>
// spec: [{ name, kicker, title, body (trusted HTML/SVG authored by us), foot }]
// Body helpers (CSS classes): .cards/.card(.hl)/.lab/.txt/.big, ol.check li > .lab + .txt, table.t, .vis (svg wrapper).
// Fails (exit 1) if any visible text (HTML or SVG <text>) would render under 12px at a 390px-wide
// display (source font < 34px), if content overflows horizontally, or if body runs into the footer.
import { readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { chromium } = require(join(here, '../../_qa-tools/node_modules/playwright'));

export const W = 1080, H = 1350, DISPLAY = 390, MIN_DISPLAY_PX = 12;
export const MIN_SRC_PX = Math.ceil((MIN_DISPLAY_PX * W) / DISPLAY); // 34
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const css = `*{box-sizing:border-box;margin:0}html,body{width:${W}px;height:${H}px;overflow:hidden}
body{background:#f4f2ec;font-family:'Malgun Gothic','Apple SD Gothic Neo',sans-serif;color:#1d2a24;padding:64px 64px 56px;display:flex;flex-direction:column}
.k{font:700 34px/1.2 'Malgun Gothic',sans-serif;letter-spacing:.06em;color:#4f6b3a}
h1{font-size:68px;line-height:1.22;margin:18px 0 36px;letter-spacing:-.02em;word-break:keep-all}
.main{display:flex;flex-direction:column;gap:24px}
.cards{display:flex;flex-direction:column;gap:22px}
.card{background:#fffdf8;border:3px solid #1d2a24;border-radius:12px;padding:26px 32px;display:grid;grid-template-columns:auto 1fr;gap:4px 28px;align-items:center}
.card.hl{background:#1d2a24;color:#f4f2ec}
.card.dash{border-style:dashed}
.big{grid-row:span 2;font-size:88px;font-weight:800;line-height:1;white-space:nowrap}.big small{font-size:40px;margin-left:4px}
.lab{font-size:44px;font-weight:800;line-height:1.25;word-break:keep-all}
.txt{font-size:36px;line-height:1.4;word-break:keep-all}
.card.nobig{grid-template-columns:1fr}
ol.check{list-style:none;padding:0;display:flex;flex-direction:column}
ol.check li{border-bottom:3px solid #cfc8b8;padding:22px 0;display:grid;grid-template-columns:76px 1fr;gap:4px 18px;align-items:start}
ol.check li::before{content:'';width:52px;height:52px;border:5px solid #1d2a24;border-radius:10px;grid-row:span 2;margin-top:4px}
table.t{width:100%;border-collapse:collapse;background:#fffdf8;font-size:40px}
table.t th,table.t td{padding:24px 22px;border-bottom:3px solid #e2dccd;text-align:left}
table.t th{background:#1d2a24;color:#f4f2ec;font-size:40px}
.vis{display:flex;justify-content:center}
.vis svg text{font-family:'Malgun Gothic',sans-serif}
.foot{margin-top:auto;padding-top:24px;border-top:3px solid #1d2a24;font-size:34px;line-height:1.4;color:#56645c;word-break:keep-all}`;

const html = (d) => `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>${css}</style></head><body><p class="k">${esc(d.kicker)}</p><h1>${esc(d.title)}</h1><div class="main">${d.body}</div><p class="foot">${esc(d.foot)}</p></body></html>`;

const [specPath, outDir] = process.argv.slice(2);
if (!specPath || !outDir) { console.error('usage: node scripts/diagram.mjs <spec.json> <outDir>'); process.exit(2); }
const specs = JSON.parse(readFileSync(specPath, 'utf8'));
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
let failed = false;
try {
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  for (const d of specs) {
    if (!/^[a-z0-9-]+$/.test(d.name)) throw new Error('bad diagram name ' + d.name);
    await page.setContent(html(d));
    await page.waitForTimeout(200);
    const m = await page.evaluate(() => {
      const textEls = [...document.querySelectorAll('body *')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
      const sizes = textEls.map((e) => {
        // SVG text: measure rendered glyph height scale via font-size * CTM scale
        if (e instanceof SVGElement) { const fs = parseFloat(getComputedStyle(e).fontSize); const ctm = e.getScreenCTM(); return fs * (ctm ? Math.abs(ctm.a) : 1); }
        return parseFloat(getComputedStyle(e).fontSize);
      });
      const foot = document.querySelector('.foot').getBoundingClientRect();
      const overflowX = document.documentElement.scrollWidth > innerWidth || textEls.some((e) => e.getBoundingClientRect().right > innerWidth - 8 || e.getBoundingClientRect().left < 8);
      const main = document.querySelector('.main').getBoundingClientRect();
      const svgClip = [...document.querySelectorAll('svg text')].some((t) => { const r = t.getBoundingClientRect(), s = t.ownerSVGElement.getBoundingClientRect(); return r.left < s.left - 1 || r.right > s.right + 1 || r.top < s.top - 1 || r.bottom > s.bottom + 1; });
      return { minFont: Math.min(...sizes), bottom: Math.round(foot.bottom), overlap: main.bottom > foot.top - 8, overflowX, svgClip };
    });
    const minDisplay = +(m.minFont * DISPLAY / W).toFixed(1);
    const ok = m.minFont >= MIN_SRC_PX && m.bottom <= H - 20 && !m.overlap && !m.overflowX && !m.svgClip;
    if (!ok) failed = true;
    await page.screenshot({ path: join(outDir, d.name + '.png') });
    results.push({ name: d.name, width: W, height: H, minSourceFontPx: +m.minFont.toFixed(1), minDisplayPxAt390: minDisplay, contentBottom: m.bottom, overlap: m.overlap, overflowX: m.overflowX, svgTextClipped: m.svgClip, ok });
  }
} finally { await browser.close(); }
console.log(JSON.stringify(results, null, 1));
process.exit(failed ? 1 : 0);
