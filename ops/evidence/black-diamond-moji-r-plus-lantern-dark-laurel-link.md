# Link evidence: black-diamond-moji-r-plus-lantern-dark-laurel

- product.url: https://link.coupang.com/a/h6dQ85sS04
- Issued: 2026-10-24T02:13:42Z (11:13:42 KST) via own Coupang Partners quicklink UI (간편 링크 만들기, 채널 기본값) from the exact source URL below. Not clicked/resolved.
- Partners restriction check: not restricted (no "링크 생성이 제한된 상품" message; 파트너스 URL shown immediately). The partners page was loaded once (acquire.mjs GO 02:13:11Z); link generation for several URLs ran inside that page without further page loads.
- Exact source: https://www.coupang.com/vp/products/7571671847?itemId=22393462909&vendorItemId=89438399165
- Native page observed 2026-10-24T02:14:34Z (11:14:34 KST, logged-in Aside browser, ordinary coupang.com product page, acquire.mjs GO 02:14:28Z). Final host www.coupang.com. Page title: "블랙다이아몬드 모지 R 플러스 랜턴 ONE SIZE, Dark Laure..., 1개 - 랜턴 | 쿠팡". Product main-area excerpt:

    단 2개 남음 빨리 주문하세요!
    블랙다이아몬드 브랜드샵
    블랙다이아몬드 모지 R 플러스 랜턴 ONE SIZE, Dark Laurel, 1개
    10 개 상품평
    새벽도착 / 무료배송 / 무료반품 (로켓)
    색상 × 수량: Azul × 1개 / Dark Laurel × 1개 (selected) / Laurel Green × 1개 / Octane × 1개
    장바구니 담기 / 바로구매
    쿠팡상품번호: 7571671847 - 22393462909
    ---
    필수 표기 정보: 품명 및 모델명 블랙다이아몬드 모지 R 플러스 랜턴 ONE SIZE / 인증 본품:해당없음 전지:B052R208-18001 / 제조국 중국 / 제조자(수입자) BLACKDIAMOND/(주)블랙다이아몬드코리아
    breadcrumb: 쿠팡수입 > 스포츠/레저 > 캠핑전문관 > 랜턴/조명 > 랜턴

- Screenshot: ops/evidence/black-diamond-moji-r-plus-lantern-dark-laurel-native.png ; full text: ops/evidence/black-diamond-moji-r-plus-lantern-dark-laurel-native.txt
- Stock: 장바구니 담기/바로구매 present in main area; SOLD_OUT regex (shop-publisher lib.mjs) no match anywhere on page. Low-stock badge "단 2개 남음" -> re-check before publishing.
- Same product page mixes the rechargeable Moji R+ (Dark Laurel, this item) with battery Moji colour options (Azul / Laurel Green / Octane at a different price) -> option token and itemId must match.
- verifyTokens (all in product main area): "블랙다이아몬드 모지 R 플러스 랜턴 ONE SIZE, Dark Laurel, 1개" / "Dark Laurel × 1개" / "7571671847 - 22393462909"

## Rejected candidates (same session)
- 블랙다이아몬드 아스트로 300 헤드램프, Graphite, 1개 — https://www.coupang.com/vp/products/8017391019?itemId=19315468856&vendorItemId=89438399077 (상품번호 8017391019 - 19315468856): native page fine (rocket, in stock, 2026-10-24T02:09:28Z) but Partners quicklink returned "해당 상품은 법적으로 또는 판매자의 요청에 따라 파트너스 링크 생성이 제한된 상품입니다." at 2026-10-24T02:13Z -> not used (no bypass). Native screenshot/text kept as ops/evidence/black-diamond-astro-300-headlamp-graphite-native.png/.txt.
- 스노우피크 티타늄 트렉 900 (SCS-008T) listings 9772366185 / 6285909603 / 6638286201 / 8209091924: all overseas purchase-agent or Japan direct listings (11/5-11/16 delivery, unknown sellers, option names mixing 008T/009T) -> not chosen; no Partners link made.

## Facts used
Official source read 2026-10-24: https://blackdiamondequipment.com/products/moji-r-rechargeable-lantern (Shopify product JSON + page; Dark Laurel SKU BD6207583054ALL1)
- BD 1500 rechargeable Li-ion battery 1500 mAh, charges via micro-USB (integrated Micro-USB charge port).
- Weight 170 g; IPX4 (rain and sleet from any angle); Max burn time High 5.5 h / Low 16 h; Max distance High 15 m / Low 2 m.
- Two-button interface; solid/strobe white; RGB full rainbow spectrum; campfire mode; 4 magnets; patented digital lockout.
- Materials: body polycarbonate + TPU, hooks stainless steel, lens polycarbonate. Country of origin China (listing agrees: 제조국 중국).
- BD Korea https://blackdiamondequipment.co.kr/goods/view?no=7470: 모지 R+ 랜턴 ITEM #BD620685, colours Azurite/Black/Dark Crimson/Dark Laurel, 수입자 (주)블랙다이아몬드 코리아, 제조국 중국, 동일모델 출시년월 202301.
- Battery Moji (for comparison table only): https://blackdiamondequipment.com/products/moji-lantern — Dual-Fuel (3x AAA or BD 1500), collapsible double-hook hang loop.

## Omitted / not claimed
- Lumens: official spec table and description say 200 lm, the official feature list says "150 lumens of white LED" -> conflicting inside the official page, number not used.
- Burn time from retailer/blog copy (200 lm 5 h / 10 lm 100 h) differs from official 5.5 h / 16 h -> only official values used, labelled as manufacturer values.
- Size: no official dimension; listing gives none -> not claimed.


## 2026-10-24 13:00 KST routine recheck
- Observed: 2026-10-24T13:02:57.403+09:00
- Exact source URL: https://www.coupang.com/vp/products/7571671847?itemId=22393462909&vendorItemId=89438399165
- All verifyTokens matched; selected option purchase controls present. No affiliate link opened.
- Text: ops/queue/evidence/black-diamond-moji-r-plus-lantern-dark-laurel-recheck-20261024-1300.txt
- Screenshot: ops/queue/evidence/black-diamond-moji-r-plus-lantern-dark-laurel-recheck-20261024-1300.webp
