# Images: black-diamond-distance-carbon-flz-desert-sky-110 (2026-10-22)

Tool: GENEXIS gpt-image (ChatGPT-subscription Codex bridge), `batch --concurrency 2`, two 4-job manifests. Output-path preflight PASS for both manifests before generation. CLI reported "Codex completed but did not write the requested image" for all 8 jobs (read-only policy); returned PNGs were recovered with `channel-ops/ops/dispatch/gpt-image-host-copy.ps1` (binding exact_utf8, 8/8 copied). CLI success is NOT claimed.

- manifests/logs/receipts: `D:\웹 수익 자동화\channel-ops\ops\state\sportsdash-queue-20261022-black-diamond-distance-carbon-flz-desert-sky-110\` (manifest-a/b.json, batch-a/b.log.txt, collect-a/b-receipt.json, preflight-a/b.txt)
- PNG originals (1536x1024): `D:\웹 수익 자동화\channel-ops\ops\content\sportsdash-queue-20261022-black-diamond-distance-carbon-flz-desert-sky-110\`
- Queue WebP (1280x853, 3:2): `ops/queue/images/black-diamond-distance-carbon-flz-desert-sky-110/`

## References (official, downloaded as real files and attached with --reference)
Source: https://blackdiamondequipment.com/products/distance-carbon-flz-poles (Shopify product images, Desert Sky)
- ds-01 … ds-07: https://cdn.shopify.com/s/files/1/0880/2195/8973/files/112555_4007_Distance_Carbon_FLZ_Poles_Desert_Sky_0{1..7}.jpg (folded pair, extended pair, folded detail, grip+strap, basket+tip, FlickLock, hand on grip)
- life-01/02: https://cdn.shopify.com/s/files/1/0880/2195/8973/files/Christian_Adam_Joe_Grant_Southwest_Classic_2024063{0_164567,…}_pdpcrop_112555_4007.jpg (official lifestyle, used for pose/context only)
- full list with status/bytes: channel-ops state folder `refs/refs-sources.json`

## Per-cut QA (compared with official Desert Sky photos: cyan-blue upper aluminium section with cyan FlickLock lever, dark charcoal carbon lower sections, black EVA grip with long foam extension, black/cyan strap, light cyan basket, carbide tip)
| cut | file | verdict | notes |
| --- | --- | --- | --- |
| poles-hero-ridge | poles-hero-ridge.webp (cover) | PASS | 100% crop checked: cyan upper / dark lower sections, cyan baskets, two poles; hiker from behind, no face; no text |
| poles-folded-deck | poles-folded-deck.webp | PASS | 3-section folded layout matches ds-01/ds-03 (FlickLock position, grip, strap, cyan cord joints, basket); bottle/map have no readable text |
| poles-flicklock-adjust | poles-flicklock-adjust.webp | PASS | FlickLock lever + small diamond mark matches ds-06; strap matches ds-04; hands normal |
| poles-grip-strap | poles-grip-strap.webp | PASS | hand through strap, foam extension below grip, cyan section with lever below; matches ds-07/ds-04 |
| poles-descent-steps | poles-stone-steps.webp | PASS (re-captioned) | prompt asked for descent but the hiker is climbing the steps; pole look correct. Renamed and alt/text changed to "돌계단에서 스틱을 짚으며 걷는" (no descent claim) |
| poles-tip-basket | poles-tip-basket.webp | PASS | ferrule, light cyan basket, carbide tip match ds-05 |
| poles-pack-side | poles-pack-side.webp | PASS | folded poles in side pocket, grips + cyan upper sections visible; backpack unbranded |
| poles-deploy-z | (not used) | FAIL / excluded | joint topology wrong: basket+tip sits at a joint where a section and the cord meet instead of at the free end; not regenerated (7 passing cuts ≥ 6) |

No AI/production captions in the article; credit field "스포츠대시 제작 (Black Diamond 공식 제품 사진 참고)", rights: generated.
