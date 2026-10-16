# PROGRESS — sportsdash.online (v2-cloudflare-static)

Resume from here after host restart.

- [x] 0. Branch v2-cloudflare-static created from main; PROGRESS.md pushed
- [x] 1. Old Next.js tree removed, Astro 5 scaffold (site.config.ts, wrangler.jsonc, .gitignore)
- [x] 2. Content collections (posts + guides) with zod schema, layouts, distinct design
- [x] 3. scripts/gate.mjs (CONTRACT + commerce gate), _examples pass/fail; `npm test` 4/4 pass (fixture image via scripts/make-fixture-image.mjs)
- [~] 4. scripts/publish.ps1 (-DryRun; parse OK, missing-slug path exits 1; full dry run not yet exercised — needs a real post in src/content/posts/), scripts/post-info.mjs, ops/publish.config.json, ops/POSTING-RULES.md done. TODO: refresh-build.ps1 (if needed), add ops/publish-log.dryrun.jsonl to .gitignore
- [ ] 5. >=8 evergreen guides, hubs, legal pages, SEO files (llms.txt, robots, sitemap, RSS, IndexNow)
- [ ] 6. QA: build, gate, astro check, curl crawl, screenshots, seo/scorecard.md

Build order: sportsdash first, then reuse pipeline for whereonott, mangadrop.

## Notes (latest)
- Full-tree gate: 14/15 — guide home-dumbbell-buying-checklist links to /guides/yoga-mat-thickness-material/ (not yet written; step 5).
- Next: step 5 (write remaining >=7 guides incl. yoga-mat-thickness-material), then port pipeline to whereonott/mangadrop.

## Resume evidence 2026-10-16
- Step 4: added default-deny -AllowDeploy, traversal rejection, persistent ambiguous-publish intent, actual receipt timestamp, refresh-build chain. 7/7 tests pass including pass/fail fixtures, duplicates and dry-run negative guards. Full positive publish dry-run remains blocked: no real verified post, isolated staging not completed.
- Step 5: existing 10 evergreen guides and supporting SEO/legal pages preserved; full source/built gate passes 33/33. Added DESIGN_REFERENCES and SEO scorecard/measurement plan.
- Step 6 [blocked]: fresh pnpm/direct Astro build and check stalled under shared Node26 runtime. Existing dist preview works at port 4437, not a fresh-build proof. Shared _pw-browsers directory missing; fallback installed Edge configured.
- No deployment, account action, live publication or IndexNow ping performed.

## Follow-up recovery 2026-10-16
- Abandoned empty Git lock quarantined after no git.exe processes and successful exclusive-open check. Previous changes preserved.
- Fresh direct-node Astro build passed: 24 pages; fresh gate 33/33; tests 9/9. Logs: qa/build.log, qa/gate.log, qa/tests.log (local ignored logs).
- Edge preview and browser QA owned by one process: six mobile/desktop views passed, no overflow or CLS, focus outline visible and checklist persisted. qa/browser-results.json and local qa/screens/.
- Ads default false; only PUBLIC_ADS_ENABLED=true enables script. Verification meta and ads.txt preserved. Privacy no longer claims a functioning CMP; current analytics activation and local storage behavior described.
- Existing provider type error fixed by indexing typed provider keys. Final direct-node Astro check passed: 39 files, 0 errors, 0 warnings, 2 hints.
- Positive isolated fixture dry-run remains BLOCKED: source gate passed but runtime restart interrupted build before receipt. Stage cleaned; no fixture entered production source/dist. No deploy, ping or account actions.
