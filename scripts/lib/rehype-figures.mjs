// Markdown images: wrap a paragraph that holds only an image in <figure class="photo|diagram">,
// add loading/decoding hints and intrinsic width/height (read from public/) so frames do not shift.
// Photos (.webp/.jpg) get the cropped photo frame; legacy .png diagrams are shown whole.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const publicDir = fileURLToPath(new URL('../../public/', import.meta.url));
const isPhoto = (src) => /\.(webp|jpe?g|avif)$/i.test(src);

export function rehypeFigures() {
  return async (tree) => {
    const imgs = [];
    const visit = (node, parent, index) => {
      if (node.type === 'element' && node.tagName === 'p' && parent) {
        const kids = (node.children ?? []).filter((c) => !(c.type === 'text' && !c.value.trim()));
        if (kids.length === 1 && kids[0].type === 'element' && kids[0].tagName === 'img') {
          const img = kids[0];
          const src = String(img.properties?.src ?? '');
          const cap = img.properties?.title ? String(img.properties.title) : '';
          if (cap) delete img.properties.title;
          parent.children[index] = { type: 'element', tagName: 'figure', properties: { className: [isPhoto(src) ? 'photo' : 'diagram'] }, children: cap ? [img, { type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: cap }] }] : [img] };
          imgs.push(img);
          return;
        }
      }
      if (node.type === 'element' && node.tagName === 'table' && parent) {
        parent.children[index] = { type: 'element', tagName: 'div', properties: { className: ['table-scroll'] }, children: [node] };
      }
      (node.children ?? []).forEach((c, i) => visit(c, node, i));
    };
    visit(tree, null, 0);
    let first = true;
    for (const img of imgs) {
      img.properties.loading = first ? 'eager' : 'lazy';
      img.properties.decoding = 'async';
      first = false;
      const src = String(img.properties.src ?? '');
      if (!src.startsWith('/')) continue;
      const file = join(publicDir, decodeURIComponent(src));
      if (!existsSync(file)) continue;
      try {
        const m = await sharp(file).metadata();
        if (m.width && m.height) { img.properties.width = m.width; img.properties.height = m.height; }
      } catch { /* unreadable image: leave without dimensions */ }
    }
  };
}
