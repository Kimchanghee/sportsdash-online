import type { APIRoute } from 'astro';
import { site } from '../site.config';

// Explicitly allow search engines (Google, Bing, Naver Yeti, Daum) and AI answer/search crawlers.
const agents = ['Googlebot', 'Bingbot', 'Yeti', 'Daumoa', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended'];
const body = [
  ...agents.flatMap((a) => [`User-agent: ${a}`, 'Allow: /', '']),
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${site.url}/sitemap-index.xml`,
  '',
].join('\n');

export const GET: APIRoute = () => new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
