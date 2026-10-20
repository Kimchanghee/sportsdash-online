// Build-time OG image generator: designed SVG -> 1200x630 PNG via sharp. Writes public/og/**.
// Design: training-log sheet (ruled paper, code tab, stamped date). Skips files that are already up to date.
import { readFileSync, readdirSync, mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { parse } from 'yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(readFileSync(join(root, 'src/data/site.json'), 'utf8'));
const out = join(root, 'public/og');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function wrap(text, max) {
  const words = String(text).split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}
function frontmatter(file) {
  const m = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? parse(m[1]) : null;
}

const KO = (iso) => { const [y, m, d] = String(iso).slice(0, 10).split('-').map(Number); return `${y}년 ${m}월 ${d}일`; };
const contours = [
  'M20 200c60-40 120-60 190-50s110 40 170 30 90-70 160-80 120 20 170 10',
  'M40 180c50-30 110-50 170-42s100 34 160 24 90-60 150-68 110 16 170 6',
  'M70 160c40-22 90-38 140-32s90 26 140 18 80-48 130-54 100 12 160 2',
  'M110 140c30-16 70-28 110-24s70 18 110 12 70-36 110-40 80 8 140-2',
  'M160 120c24-10 52-18 80-16s50 12 80 8 56-24 86-28 64 4 110-4',
  'M0 230c80-20 160-24 240-14s150 20 230 8 160-30 250-26',
];
// Trail-guide card: forest-green map band with faint contours, orange trail blaze, Korean title.
// With a photo (post cover .webp/.jpg) the right side shows the photo.
function svg({ kicker, title, date, photo }) {
  const textW = photo ? 15 : 19;
  const lines = wrap(title, textW);
  const c = contours.map((d) => `<path d="${d}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1f3a2d"/>
  <g transform="translate(${photo ? 20 : 420} 330) scale(1.1)" fill="none" stroke="#f1efe6" stroke-width="1.6" opacity="0.16">${c}</g>
  <rect x="56" y="48" width="44" height="44" rx="6" fill="#d9622b"/><path d="M62 82l10-14 7 8 5-6 12 12z" fill="#1f3a2d"/><circle cx="87" cy="61" r="4" fill="#fbfaf6"/>
  <text x="116" y="80" font-family="Pretendard, Malgun Gothic, sans-serif" font-size="30" font-weight="700" fill="#f1efe6">${esc(site.name)}</text>
  <rect x="56" y="168" width="10" height="34" rx="2" fill="#d9622b"/>
  <text x="80" y="196" font-family="Pretendard, Malgun Gothic, sans-serif" font-size="28" font-weight="700" fill="#ffd9c2">${esc(kicker)}</text>
  ${lines.map((l, i) => `<text x="56" y="${(photo ? 290 : 300) + i * 74}" font-family="Pretendard, Malgun Gothic, sans-serif" font-size="${photo ? 54 : 60}" font-weight="700" fill="#ffffff">${esc(l)}</text>`).join('')}
  <text x="56" y="574" font-family="Pretendard, Malgun Gothic, sans-serif" font-size="24" fill="#cfd6cf">${esc(date)} · ${esc(site.domain)}</text>
</svg>`;
}

async function render(rel, spec) {
  const file = join(out, rel);
  mkdirSync(dirname(file), { recursive: true });
  const s = svg(spec);
  const stampText = s + (spec.photo ?? '');
  const stamp = join(root, 'node_modules/.cache/og', rel + '.src');
  mkdirSync(dirname(stamp), { recursive: true });
  if (existsSync(file) && existsSync(stamp) && readFileSync(stamp, 'utf8') === stampText) return false;
  let img = sharp(Buffer.from(s));
  if (spec.photo) {
    const ph = await sharp(spec.photo).resize(520, 630, { fit: 'cover' }).toBuffer();
    img = sharp(await img.png().toBuffer()).composite([{ input: ph, left: 680, top: 0 }]);
  }
  await img.png({ compressionLevel: 9 }).toFile(file);
  writeFileSync(stamp, stampText);
  return true;
}
const today = '운동·캠핑 장비 구매 가이드';
const jobs = [
  ['home.png', { kicker: '사기 전에 확인할 것부터', title: '운동·캠핑 장비 구매 가이드', date: today }],
  ['guides.png', { kicker: '전체 목록', title: '운동 장비 구매 체크리스트', date: today }],
  ...site.categories.map((c) => [`category/${c.slug}.png`, { kicker: c.navLabel ?? c.name, title: `${c.name} 장비 고르는 법`, date: today }]),
];
for (const [dir, base] of [['src/content/guides', 'guides'], ['src/content/posts', 'picks']]) {
  const p = join(root, dir);
  if (!existsSync(p)) continue;
  for (const f of readdirSync(p).filter((n) => n.endsWith('.md') && !n.startsWith('_'))) {
    const fm = frontmatter(join(p, f));
    if (!fm) continue;
    const cat = site.categories.find((c) => c.slug === fm.category);
    const cover = base === 'picks' ? ((fm.images ?? []).find((i) => i.role === 'cover') ?? (fm.images ?? [])[0]) : null;
    const coverFile = cover && /\.(webp|jpe?g)$/i.test(cover.src) ? join(root, 'public', cover.src) : null;
    jobs.push([`${base}/${fm.slug}.png`, { kicker: base === 'guides' ? `${cat?.navLabel ?? cat?.name ?? ''} 구매 체크리스트` : `${cat?.navLabel ?? cat?.name ?? ''} 장비 추천`, title: fm.title, date: KO(fm.updated), photo: coverFile && existsSync(coverFile) ? coverFile : undefined }]);
  }
}
let made = 0;
for (const [rel, spec] of jobs) if (await render(rel, spec)) made++;
console.log(`og: ${jobs.length} images (${made} regenerated)`);
