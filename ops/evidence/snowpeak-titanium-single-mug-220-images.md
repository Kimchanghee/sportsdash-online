# Images: snowpeak-titanium-single-mug-220

- Route: GENEXIS gpt-image (ChatGPT-subscription Codex bridge) via Mac launchd bridge, batch manifests concurrency 2 (a, b) + single regeneration (c), generated 2026-10-29 13:10-13:20 KST. No Aside imagegen / ChatGPT web / Gemini / Pollo / Images API.
- Official references (Snow Peak Korea product page https://www.snowpeak.co.kr/products/detail?godCd=MG-141), downloaded as files and attached with references: sp-ref-1 (handle open, plain side), sp-ref-2 (handle folded, hinge plate), sp-ref-3 (handle side, printed side). URLs in channel-ops/ops/state/sportsdash-queue-20261029-snowpeak-mg141/refs/SOURCES.json.
- Manifests/results: channel-ops/ops/state/sportsdash-queue-20261029-snowpeak-mg141/manifest-{a,b,c}.json; bridge results rebuild-202610/_mac/bridge/results/20261029-1300-sd-mg141-gen-{a,b,c}.json (4/4, 4/4, 1/1 succeeded). PNG outputs (1536x1024): channel-ops/ops/content/sportsdash-queue-20261029-snowpeak-mg141/. WebP build record: .../webp-build.json.
- WebP: 1280x853 (3:2, cover crop), quality 80, ops/queue/images/snowpeak-titanium-single-mug-220/
- Note: gpt-image-output-preflight was not run before generation (bridge path check only); outputs are project-relative channel-ops/ops/content paths as required.

## Per-cut QA (against refs: matte warm-grey bare titanium straight cylinder, rolled rim, one folding D-shaped wire handle on a small riveted plate, no lid; logos/print turned away)
| cut | role | verdict | notes |
| --- | --- | --- | --- |
| mg141-hero-ridge | cover | PASS | open handle with hinge plate, rolled rim, no text |
| mg141-handle-folded | detail | PASS | handle folded flush on riveted plate, matches sp-ref-2 |
| mg141-hand-hold | use | PASS | small relative to adult hand, single handle, natural fingers |
| mg141-on-stove | use | PASS | handle folded, plain unbranded stove, small flame under flat bottom |
| mg141-nest-stack | comparison | FAIL (excluded) | two handles shown outside the outer cup (inner cup handle cannot be outside); second loose cup |
| mg141-nest-stack2 | comparison | PASS | inner cup rim inside larger cup, exactly one (outer) handle visible |
| mg141-backpack-pocket | context | PASS | handle folded, small mug in mesh side pocket, hands natural |
| mg141-rim-closeup | detail | PASS | rolled rim and brushed texture, open handle |
| mg141-hand-wash | use | PASS | hand wash with sponge (matches Snow Peak UK hand-wash note) |

Result: 8 used / 9 generated, 1 excluded. No AI/production caption in alt or captions.
