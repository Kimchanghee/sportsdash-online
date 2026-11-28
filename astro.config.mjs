import { defineConfig } from 'astro/config';
import { rehypeAffiliate } from './scripts/lib/rehype-affiliate.mjs';
import { rehypeFigures } from './scripts/lib/rehype-figures.mjs';
import { thumbs } from './scripts/lib/thumbs.mjs';

export default defineConfig({
  site: 'https://sportsdash.online',
  output: 'static',
  integrations: [thumbs()],
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: { rehypePlugins: [rehypeAffiliate, rehypeFigures] },
  devToolbar: { enabled: false },
});
