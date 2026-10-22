# Images: ganesha-cork-yoga-block-2pack (2026-10-22)

Tool: GENEXIS gpt-image (ChatGPT-subscription Codex bridge), `batch --concurrency 2`, two 4-job manifests. Output-path preflight PASS for both manifests before generation. CLI reported write failure for all jobs (read-only policy); returned PNGs recovered with `channel-ops/ops/dispatch/gpt-image-host-copy.ps1` (binding exact_utf8, 8/8 copied). CLI success is NOT claimed.

- manifests/logs/receipts: `D:\웹 수익 자동화\channel-ops\ops\state\sportsdash-queue-20261022-ganesha-cork-yoga-block-2pack\` (manifest-a/b.json, batch-a/b.log.txt, collect-a/b-receipt.json, preflight-a/b.txt)
- PNG originals (1536x1024): `D:\웹 수익 자동화\channel-ops\ops\content\sportsdash-queue-20261022-ganesha-cork-yoga-block-2pack\`
- Queue WebP (1280x853, 3:2): `ops/queue/images/ganesha-cork-yoga-block-2pack/`

## References (manufacturer, downloaded as real files and attached with --reference)
Source page: https://ganeshayogaprops.com/153?idx=149 (더 가네샤 코르크 요가블럭 3.5인치)
- g05 https://cdn-optimized.imweb.me/upload/S201807265b59480e643b1/215f2a5a5276f.png (single block, 3.5 inch)
- g06 …/ca4139212d00b.png (3.5 vs 4 inch with cm marks)
- g07 …/1943e682a325d.png (block with sleeve), g08 …/d0c40783af748.png (face + texture inset), g09 …/1056e63891c0b.png, g10 …/846225b207175.png (corner close-up)
- full list: channel-ops state folder `refs/refs-sources.json`

## Per-cut QA (compared with manufacturer photos: natural speckled cork, brick 22.8 × 14 × 8.5cm, rounded edges, one small engraved elephant emblem; option = 2 blocks)
| cut | verdict | notes |
| --- | --- | --- |
| block-hero-mat (cover) | PASS | exactly 2 blocks, cork grain, emblem small with no letters, proportions ≈ 22.8:14 |
| block-texture-close | PASS | grain + rounded edge match g10; no emblem |
| block-three-heights | PASS | 3 orientations; flat ≈ 2.7:1 and side ≈ 1.65:1 ratios match 22.8/8.5 and 22.8/14; upright slightly slim but acceptable; caption explains it shows one block's three heights |
| block-hand-support | PASS | 2 blocks standing on long side under hands in low lunge; anatomy plausible |
| block-seated-hips | PASS | 1 block flat under hips, 2nd block beside mat (2-pack consistent) |
| block-bridge-sacrum | PASS | block under lower back, 2nd block nearby; no pain/efficacy wording in caption |
| block-compare-foam | PASS | 1 cork + 1 plain grey foam block, no marks on foam |
| block-carry-stack | PASS | 2 stacked blocks, rolled mat with plain strap, bottle without logo |

No AI/production captions in the article; credit "스포츠대시 제작 (가네샤요가프랍스 공식 제품 사진 참고)", rights: generated.
