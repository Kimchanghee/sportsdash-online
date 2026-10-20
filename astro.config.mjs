import { defineConfig } from 'astro/config';
import { rehypeAffiliate } from './scripts/lib/rehype-affiliate.mjs';
import { rehypeFigures } from './scripts/lib/rehype-figures.mjs';

export default defineConfig({
  site: 'https://sportsdash.online',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: { rehypePlugins: [rehypeAffiliate, rehypeFigures] },
  devToolbar: { enabled: false },
});
