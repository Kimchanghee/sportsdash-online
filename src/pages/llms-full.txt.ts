import type { APIRoute } from 'astro';
import { allGuides, allPosts, guidePath, postPath, disclosureFor } from '../lib/content';
import { site } from '../site.config';

// Full-text companion to /llms.txt: every checklist and product pick as plain markdown, with source URLs and dates.
const clean = (md = '') => md.replace(/!\[[^\]]*\]\([^)]*\)\s*/g, '').replace(/\r\n/g, '\n').trim();

export const GET: APIRoute = async () => {
  const guides = await allGuides();
  const posts = await allPosts();
  const out: string[] = [
    `# ${site.name} (${site.nameEn}) - full text`,
    '',
    `> ${site.description}`,
    '',
    `Site: ${site.url}/ · Language: Korean · Summary index: ${site.url}/llms.txt`,
    'Specs come only from manufacturer pages or official bodies. No first-hand testing, reviews or ratings are claimed. Product picks carry affiliate links and state that in their first block.',
    '',
  ];
  for (const g of guides) {
    const d = g.data;
    out.push(`## ${d.title}`, '', `URL: ${site.url}${guidePath(d.slug)}`, `Question: ${d.question}`, `Answer: ${d.answer}`, `Updated: ${d.updated.slice(0, 10)} · Data as of: ${d.data_asof}`, '', 'Checklist:', ...d.checklist.map((c) => `- ${c}`), '', clean(g.body), '', 'Sources:', ...d.sources.map((s) => `- ${s.title}: ${s.url}`), '');
  }
  for (const p of posts) {
    const d = p.data;
    out.push(`## ${d.title}`, '', `URL: ${site.url}${postPath(d.slug)}`, `Disclosure: ${disclosureFor(p)}`, `Product: ${d.product.name} (${d.product.optionDetail})`, `Question: ${d.question}`, `Answer: ${d.answer}`, `Published: ${d.published.slice(0, 10)} · Updated: ${d.updated.slice(0, 10)}`, '', clean(p.body), '', 'Sources:', ...d.sources.map((s) => `- ${s.title}: ${s.url}`), '');
  }
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
