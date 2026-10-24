# Images: black-diamond-moji-r-plus-lantern-dark-laurel

- Route: GENEXIS gpt-image (ChatGPT-subscription Codex bridge), batch manifests concurrency 2, generated 2026-10-24 11:18-11:22 KST. No Aside imagegen / ChatGPT web / Gemini / Pollo / Images API.
- Official references (Black Diamond Shopify product images, Dark Laurel variant BD6207583054ALL1), downloaded as files and attached with --reference:
  - dl-01 https://cdn.shopify.com/s/files/1/0880/2195/8973/files/620685_3054_MOJI_R_LANTERN_DARK_LAUREL_01.jpg?v=1748463949 (front, dome up)
  - dl-02 ..._DARK_LAUREL_02.jpg (base side with buttons, hooks folded)
  - dl-03 ..._DARK_LAUREL_03.jpg (hook raised)
  - dl-04 ..._DARK_LAUREL_04.jpg (charging port flap open, cable)
  - dl-05 ..._DARK_LAUREL_05.jpg (base: 4 magnets, S-folded hooks, logo disc)
- Manifests/logs/receipts: channel-ops/ops/state/sportsdash-queue-20261024-black-diamond-moji-r-plus-lantern-dark-laurel/ (manifest-a/b.json, preflight-a/b.txt PASS, batch-a/b.log.txt, collect-a/b-receipt.json: 4+4 copied, 0 missing). PNG outputs: channel-ops/ops/content/sportsdash-queue-20261024-black-diamond-moji-r-plus-lantern-dark-laurel/
- WebP: 1280x853 (3:2), quality 80, ops/queue/images/black-diamond-moji-r-plus-lantern-dark-laurel/

## Per-cut QA (against official refs: frosted white dome, muted dark-green ribbed base, pill dotted button + round button on band, 4 silver magnets + 2 black wire hooks + logo disc on base)
| cut | role | verdict | notes |
| --- | --- | --- | --- |
| moji-hero-tent | cover | PASS | hangs inverted from tent loop, base up, dome down; buttons on band correct; no text/logos |
| moji-table-campsite | context | PASS | dome up on aluminium table; plain mug; map without readable text |
| moji-charging-port | detail | PASS | side flap open with cable, battery icons next to port as in dl-04; plug drawn generic (article does not show connector type as evidence; text states micro-USB from manufacturer) |
| moji-button-press | detail | PASS | thumb on dotted pill button, round button beside it; hand natural |
| moji-base-magnets | detail | PASS | 4 magnets, S-folded hooks, centre diamond logo match dl-05 closely |
| moji-hook-branch | use | PASS | one hook raised over branch, dome down; base green slightly lighter than official but same family |
| moji-campfire-mode | use | PASS | warm amber glow; boots without visible logos |
| moji-pack-scale | comparison | PASS | palm-size scale vs backpack lid pocket; hook raised as single loop (one of two hooks) |

Result: 8/8 PASS, 0 excluded. No AI/production caption in alt or captions.
