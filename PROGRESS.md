# PROGRESS — sportsdash.online (v2-cloudflare-static)

Resume from here after host restart.

- [x] 0. Branch v2-cloudflare-static created from main; PROGRESS.md pushed
- [x] 1. Old Next.js tree removed, Astro 5 scaffold (site.config.ts, wrangler.jsonc, .gitignore)
- [x] 2. Content collections (posts + guides) with zod schema, layouts, distinct design
- [x] 3. scripts/gate.mjs (CONTRACT + commerce gate), _examples pass/fail; `npm test` 4/4 pass (fixture image via scripts/make-fixture-image.mjs)
- [ ] 4. scripts/publish.ps1 (-DryRun), refresh-build.ps1, ops/POSTING-RULES.md
- [ ] 5. >=8 evergreen guides, hubs, legal pages, SEO files (llms.txt, robots, sitemap, RSS, IndexNow)
- [ ] 6. QA: build, gate, astro check, curl crawl, screenshots, seo/scorecard.md

Build order: sportsdash first, then reuse pipeline for whereonott, mangadrop.

## Notes (latest)
- Full-tree gate: 14/15 — guide home-dumbbell-buying-checklist links to /guides/yoga-mat-thickness-material/ (not yet written; step 5).
- Next: step 4 publish.ps1 -DryRun + ops/POSTING-RULES.md.
