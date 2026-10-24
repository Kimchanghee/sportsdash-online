# Link evidence: kovea-escape-cookset-1-2p

- product.url: https://link.coupang.com/a/h6d9Z4PQ0O
- Issued: 2026-10-24T02:17:55Z (11:17:55 KST) via own Coupang Partners quicklink UI (간편 링크 만들기, 채널 기본값) from the exact source URL below, inside the already-open partners page (no extra page load). Not clicked/resolved. A product-level test link for https://www.coupang.com/vp/products/351146 (h6d6PMEc8G, 02:17:15Z) was generated first only to check restriction and is NOT used.
- Partners restriction check: not restricted (no "제한" message; 파트너스 URL shown immediately).
- Exact source: https://www.coupang.com/vp/products/351146?itemId=862166&vendorItemId=3000727018 (itemId/vendorItemId read from the page's own product data: itemInfo.itemId 862166, vendorItemId 3000727018, soldOut false)
- Native page observed 2026-10-24T02:17:29Z (11:17:29 KST, logged-in Aside browser, ordinary coupang.com product page, acquire.mjs GO 02:17:24Z). Final host www.coupang.com. Page title: "코베아 이스케이프 코펠 - 코펠세트 | 쿠팡". Product main-area excerpt:

    품절임박•8개
    코베아 브랜드샵
    코베아 이스케이프 코펠
    186 개 상품평
    새벽도착 / 무료배송 / 무료반품 (로켓)
    다른 판매자 보기(21)
    사이즈 × 색상 × 수량: 150 x 150 x 160 mm × 코베아 이스케이프 코펠 × 1개
    장바구니 담기 / 바로구매
    재질: 알루미늄/양은 / 구성품개수: 4개 / 사용인원: 1인용 / 코펠재질: 경질
    Global Trade Item Number: 08809000508507
    쿠팡상품번호: 351146 - 862166
    ---
    필수 표기 정보: 품명 및 모델명 코베아 이스케이프1~2코펠 / KC 인증정보 해당없음 / 크기, 중량 규 격 : 150×150×160mm(Inner box) / 중 량 : 511g (케이스 포함) / 색상 혼합색상 / 재질 알루미늄 / 제품 구성 코펠 (1L, 0.6L)

- Screenshot: ops/evidence/kovea-escape-cookset-1-2p-native.png ; full text: ops/evidence/kovea-escape-cookset-1-2p-native.txt
- Stock: 장바구니 담기/바로구매 present in main area; SOLD_OUT regex (shop-publisher lib.mjs) no match anywhere on page. Low-stock badge "품절임박•8개" -> re-check before publishing.
- verifyTokens (all in product main area): "코베아 이스케이프 코펠" / "150 x 150 x 160 mm × 코베아 이스케이프 코펠 × 1개" / "351146 - 862166"

## Facts used
- KOVEA global official cookware page https://www.kovea.com/%EB%B3%B5%EC%A0%9C-alpine-master (read 2026-10-24): "ESCAPE VKK-ES01 - The Escape uses high grade aluminium, coated with hard anodizing. 30-micron thickness so superior durability & anti-abrasion. With its handle, it is easy to use." Official product image used as reference (refs kv-a).
- kovea.co.kr product page (https://kovea.co.kr/product/.../2660/) now redirects to the home page (2026-10-24) -> no current Korean official spec page.
- Listing 필수 표기: 150×150×160mm (Inner box), 511g incl. case, 알루미늄, 코펠 1L/0.6L, 구성품 4개, 경질.

## Omitted / not claimed
- 재질 "알루미늄/양은" (listing attribute) vs 알루미늄 (필수 표기, official) -> 양은 not used.
- 사용인원 "1인용" (attribute) vs "1~2" (product name 필수 표기) -> explained in FAQ, no single figure asserted.
- Per-piece weights, gas canister fit, nonstick coating -> no official statement -> not claimed (article says no nonstick claim exists).


## 2026-10-24 13:00 KST routine recheck
- Observed: 2026-10-24T13:03:04.222+09:00
- Exact source URL: https://www.coupang.com/vp/products/351146?itemId=862166&vendorItemId=3000727018
- All verifyTokens matched; selected option purchase controls present. No affiliate link opened.
- Text: ops/queue/evidence/kovea-escape-cookset-1-2p-recheck-20261024-1300.txt
- Screenshot: ops/queue/evidence/kovea-escape-cookset-1-2p-recheck-20261024-1300.webp
