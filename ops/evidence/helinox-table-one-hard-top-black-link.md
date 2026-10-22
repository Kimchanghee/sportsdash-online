# Link evidence: helinox-table-one-hard-top-black

- product.url: https://link.coupang.com/a/h1oPReJII0
- Issued: 2026-10-21T04:29:18Z (13:29:18 KST) via own Coupang Partners quicklink UI (간편 링크 만들기, 채널 기본값) from the exact source URL below. Not clicked/resolved.
- Partners restriction check: not restricted (no "링크 생성이 제한된 상품" message; 파트너스 URL shown immediately).
- Exact source: https://www.coupang.com/vp/products/7786090852?itemId=21053791063&vendorItemId=88116253660
- Native page observed 2026-10-21T04:27:54Z (13:27:54 KST, logged-in Aside browser, ordinary coupang.com product page). Final host www.coupang.com. Page title: "헬리녹스 테이블원 하드탑 블랙, 하드탑블랙, 1개 - 기타생활잡화 | 쿠팡". Excerpt:

```
헬리녹스 테이블원 하드탑 블랙, 하드탑블랙, 1개
13%
231,200원
199,900원
(1개당 199,900원)
색상 × 수량
하드탑블랙 × 1개
199,900원
하드탑코요테탄 × 1개
199,900원
모든 옵션 보기
무료배송
모레(금) 10/23 도착 예정
판매자:
레디하우스
배송사: CJ 대한통운
장바구니 담기
바로구매
개당 수량: 1개입
쿠팡상품번호: 7786090852 - 21053791063
---
필수 표기 정보: 품명 및 모델명 / 인증 / 제조국 / 제조자 모두 "상품 상세설명 참조"
상세설명 텍스트: 헬리녹스 테이블원 하드탑 / 제조사 : 헬리녹스 / 브랜드 : 헬리녹스 / 원산지 : 베트남산(헬리녹스)
제조일자 : 2023.01.17. / 1단~4단높이 : 39cm / 허용무게 : 50kg / 4폴딩접이식 / 상판소재 : 알루미늄 / 테이블프레임소재 : 알루미늄 / 제품무게 : 960g
```
- Screenshot: ops/evidence/helinox-table-one-hard-top-black-native.png ; full text: ops/evidence/helinox-table-one-hard-top-black-native.txt
- Stock: 장바구니 담기/바로구매 active, no 품절/판매종료 text. Seller 레디하우스 (seller-shipped, not rocket). Selected option: 하드탑블랙 × 1개.
- Rejected sibling listing (same seller): https://www.coupang.com/vp/products/7326181596?itemId=23702613847&vendorItemId=88116253635 showed option "사이즈 × 가로길이: L × 57cm" (Large-size dimension) under a regular "테이블원 하드탑" title -> option identity ambiguous, not used.

## Facts used
Official sources read 2026-10-21:
- Helinox global: https://helinox.com/products/table-one-hard-top (Black variant SKU 10003723) — Capacity 110 lb / 50 kg; Surface Width 15.5 in / 40 cm; packed Length 16 in / 41 cm; inner polycarbonate sheet creates a flat, stable surface; easy to wipe clean; shock-corded poles, no tools; DAC TH72M aluminum alloy frame + nylon resin hubs; recycled 600D polyester; 5-year warranty (global site).
- Helinox Korea: https://www.helinox.co.kr/shop/shopdetail.html?branduid=3552725 ("[2026 Ver.] 테이블원 하드탑", 블랙, 원산지 베트남) — official gallery shows folding hard top, corner fittings, two support poles, carry case.
- Listing agrees: 허용무게 50kg.

## Omitted (sources disagree)
- Height: global official 15 in / 38 cm vs listing 39cm -> omitted.
- Weight: global official 816 g (table) / 914 g (packed) vs listing 제품무게 960g -> omitted.
- Surface length: global official 23 in / 59 cm vs Korean retailer copy 60cm -> omitted (width 40cm is the same in both).
- Packed width/height: global 12 x 12.5 cm vs Korean retailer copy 11cm -> omitted (packed length 41cm agrees).
- Top material: listing "상판소재 : 알루미늄" vs official polyester with inner polycarbonate sheet -> listing value not used.
- Version: Korean official page sells the "2026 Ver."; listing states 제조일자 2023.01.17 -> article tells buyers to check the version/case design with the seller; no 2026-specific feature claimed.

## Re-check 2026-10-22 (sportsdash routine, logged-in Aside browser, Coupang pacing acquire.mjs)

- checkedAt: 2026-10-22T13:12:32+09:00
- ordinary listing: https://www.coupang.com/vp/products/7786090852?itemId=21053791063&vendorItemId=88116253660
- page title: 헬리녹스 테이블원 하드탑 블랙, 하드탑블랙, 1개 - 기타생활잡화 | 쿠팡
- verifyTokens all present in product main area (title/option/buy-button block, before recommendations): 헬리녹스 테이블원 하드탑 블랙, 하드탑블랙, 1개 / 7786090852 - 21053791063 / 하드탑블랙 × 1개
- not sold out (SOLD_OUT regex from shop-publisher lib.mjs: no match in main area or full page); 장바구니 담기/바로구매 present; no access denial
- listing detail text still shows "제조일자 : 2023.01.17." (unchanged since 2026-10-21; manuscript already tells buyers to check version with seller). Seller 레디하우스, 무료배송.
- screenshot: ops/evidence/helinox-table-one-hard-top-black-recheck-2026-10-22.png ; text: ops/evidence/helinox-table-one-hard-top-black-recheck-2026-10-22.txt
- own Partners link not opened.
