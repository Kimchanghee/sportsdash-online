// Creates the gate-fixture photos (excluded from the site build). Run: node scripts/make-fixture-image.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
const dir = 'src/content/posts/_examples/public/images/posts/example-foam-roller-fixture';
mkdirSync(dir, { recursive: true });
const tones = ['#c9d3c4', '#d9c8b4', '#bfc9cf', '#d6d0bd', '#c4cdb8', '#d2c2c2'];
for (let i = 0; i < 6; i++) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="${tones[i]}"/><rect x="${120 + i * 6}" y="170" width="360" height="60" rx="30" fill="#1f3a2d"/><text x="300" y="330" font-family="Arial" font-size="22" text-anchor="middle" fill="#1c211e">GATE FIXTURE ${i + 1}</text></svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 70 }).toFile(`${dir}/fixture-${i + 1}.webp`);
}
console.log('fixture images written');
