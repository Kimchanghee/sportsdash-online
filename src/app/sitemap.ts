import type { MetadataRoute } from 'next';

const SITE = 'https://sportsdash.online';
const LOCALES = ['ko', 'en', 'es'];
const LEAGUES = ['epl', 'laliga', 'kbo', 'mlb', 'nba', 'kleague', 'ufc'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    entries.push({ url: `${SITE}/${locale}`, lastModified, changeFrequency: 'always', priority: 1.0 });
    for (const l of LEAGUES) {
      entries.push({ url: `${SITE}/${locale}/league/${l}`, lastModified, changeFrequency: 'hourly', priority: 0.9 });
    }
  }
  return entries;
}
