import { getCollection, type CollectionEntry } from 'astro:content';
import { site, abs, providerInfo } from '../site.config';

export type Post = CollectionEntry<'posts'>;
export type Guide = CollectionEntry<'guides'>;

export async function allGuides(): Promise<Guide[]> {
  return (await getCollection('guides')).sort((a, b) => b.data.updated.localeCompare(a.data.updated));
}
export async function allPosts(): Promise<Post[]> {
  return (await getCollection('posts')).sort((a, b) => b.data.published.localeCompare(a.data.published));
}

export const guidePath = (slug: string) => `/${site.guideBase}/${slug}/`;
export const postPath = (slug: string) => `/${site.postBase}/${slug}/`;

export function ymd(iso: string) {
  return iso.slice(0, 10);
}

/** "2026-10-20T..." -> "2026년 10월 20일" (date part as written, i.e. KST). */
export function koDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return `${y}년 ${m}월 ${d}일`;
}

/** Generated/photo images (webp/jpg) are cropped to photo frames; legacy PNG diagrams are shown whole. */
export const isPhoto = (src: string) => /\.(webp|jpe?g|avif)$/i.test(src);

export function disclosureFor(post: Post) {
  return post.data.disclosure ?? providerInfo(post.data.product.provider).disclosure;
}

/** Article LD generated only from frontmatter that is also rendered visibly. */
export function articleLd(kind: 'guide' | 'post', e: Guide | Post, path: string, ogImage: string) {
  const d = e.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: d.title,
    description: d.description,
    datePublished: d.published,
    dateModified: d.updated,
    inLanguage: 'ko-KR',
    mainEntityOfPage: abs(path),
    image: abs(ogImage),
    author: { '@type': 'Organization', name: `${site.name} 편집팀`, url: abs('/about/') },
    publisher: { '@id': `${site.url}/#organization` },
    articleSection: kind === 'guide' ? '구매 체크리스트' : '장비 추천',
    citation: d.sources.map((s) => s.url),
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  if (!faq.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
