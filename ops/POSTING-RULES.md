# POSTING-RULES — sportsdash.online (시간당 1편, AI 작성자 체크리스트)

레인: 스포츠·홈트·러닝·캠핑·아웃도어 용품만. 생활·주방·정리·장난감(살림초이스), 의류·코디(핏샷),
홈시네마(whereonott), 만화·굿즈(mangadrop)와 겹치는 상품은 고르지 않는다.
형식: `C:\Users\HOME\.aside\u\0\skills\user\readable-commerce-blog\SKILL.md` (상단 고지, 답 먼저, 19px 본문,
24px 굵은 H2, 짧은 문단, 검증된 사양, 한계, 맞는 사람/피할 사람, 구매 전 확인).

## 매시간 순서 (하나라도 실패하면 그 슬롯은 건너뛴다. 채우기용 글 금지)

1. **질문 조사**: 구매자 질문 하나를 정한다. Google과 네이버에서 검색해 상위 원문 3–5개를 직접 읽고
   `ops/evidence/<slug>-brief.md`에 구조·빠진 점·자주 묻는 질문을 짧게 적는다. 문장 복사 금지.
2. **상품 선택**: 레인 안의 상품 1개. `ops/publish-log.jsonl`에서 최근 30일 같은 상품 URL·slug가 없는지 확인.
3. **링크 확인**: 제휴 링크(운영자가 만든 것)를 열어 정확한 상품·옵션(색상/길이/무게/구성 개수)에 도착하는지 확인.
   결과를 `ops/evidence/<slug>-link.md`에 기록(열어 본 시각 KST, 최종 도착 호스트, 옵션 표기). 검색결과 링크는 불가.
4. **사양 수집**: 상품 상세 페이지나 제조사 공식 페이지에서만. 두 곳이 다르면 그 항목은 빼고 쓴다.
   가격·재고·배송 조건은 숫자로 적지 않는다.
5. **작성 (트레일 가이드 형식, 2026-10-21 승인)**: 아래 템플릿. 질문형 H2 4–6개, 본문 1,400–2,600자(공백 제외,
   공백 포함 약 1,800–3,000자), 짧은 문단(1–3문장), 마크다운 표 1개 이상, 번호 목록 체크리스트 3항목 이상,
   FAQ 3개 이하, 내부 링크 2개 이상(관련 가이드·카테고리). 사양은 증거·브리프에 있는 값만, 자료끼리 다른 값은
   빼고 뺀 이유만 쓴다. 가격·평점·후기 수·1인칭 사용 경험·효능 주장 금지("직접 써보니" 등). 코드 블록·고정폭 글꼴 금지.
6. **이미지 (사진 6–9장)**: `genexis-gpt-image`(GENEXIS gpt-image, 동시성 ≤2, rate limit 시 중단·보고)로
   실제 공식 제품 사진을 참조해 만든 서로 다른 장면의 사진만. 참조 URL은 증거 폴더에 기록. 모양·색·개수·비율을
   공식 사진과 대조해 QA하고 틀린 컷은 다시 만든다. 형식은 WebP(1280×853, 3:2). 모든 사진은
   frontmatter `images`에 `src: "/images/posts/<slug>/<고유파일명>.webp"`로 적고(파일명은 글 안에서 중복 금지),
   표지(cover) 외 사진은 본문에서 관련 문단 바로 옆에 `![alt](src)`로 넣는다. 도식·PNG·텍스트 카드 금지.
   "AI 이미지" 같은 제작 캡션 금지(정보 캡션은 `![alt](src "캡션")`으로 선택). 큐 항목은
   `ops/queue/images/<slug>/<같은 파일명>.webp`에 두고 `ready.json` item.images에 전부 나열한다(발행기가 파일명으로 복사).
7. **게이트**: `pnpm gate -- --source src/content/posts/<slug>.md` 통과.
8. **발행**: `pwsh scripts/publish.ps1 -Slug <slug>` (부모 환경만. 에이전트는 `-DryRun`까지만).
   스크립트가 빌드 → 배포 → 실제 URL에서 200·제목·고지문·정확한 상품 href 확인 → IndexNow → 로그 기록.
9. **확인**: 실패 시 재발행하지 않는다. 로그와 실제 URL을 먼저 대조한 뒤 원인을 고친다.

## 포스트 템플릿 (`src/content/posts/<slug>.md`)

```md
---
title: "폼롤러 길이, 45cm와 90cm 중 무엇이 맞을까?"   # 40자 이내
slug: foam-roller-length-45-vs-90
question: "폼롤러 길이는 어떻게 고르나?"
answer: "등 전체를 굴리려면 90cm, 다리·부분 위주와 좁은 공간이면 45cm가 다루기 쉽습니다."
description: "폼롤러 길이·경도·표면을 운동 부위와 공간 기준으로 정리한 구매 체크리스트."
published: 2026-10-16T09:00:00+09:00
updated: 2026-10-16T09:00:00+09:00
category: home-training
primaryKeyword: 폼롤러 길이
product:
  name: "(판매 페이지 표기 그대로)"
  optionDetail: "90cm / 블랙 / 1개"
  provider: coupang            # coupang | ohou | toss | naver
  url: "https://link.coupang.com/a/XXXX"   # 운영자가 만든 정확한 제휴 URL
  landingHost: www.coupang.com
  verifiedAt: 2026-10-16T08:40:00+09:00
  evidence: ops/evidence/foam-roller-length-45-vs-90-link.md
images:
  - { src: "/images/posts/foam-roller-length-45-vs-90/roller-hero-living.webp", alt: "...", role: cover, credit: "스포츠대시 제작 (제조사 공식 사진 참고)", rights: generated }
  # ... 사진 6–9장, 각 장 역할(context/detail/comparison/use)이 달라야 함
sources:
  - { title: "제조사 상품 정보", url: "https://..." }
faq:
  - { q: "...", a: "..." }
---

(고지문은 provider에서 자동으로 맨 위에 렌더링된다. 본문에 따로 쓰지 않는다.)

(도입 2–3문장: 무엇을 다루고 어떤 자료 기준인지)

## 폼롤러 길이는 무엇을 기준으로 고르나?
짧은 문단 → ![사진 alt](/images/posts/<slug>/xxx.webp) → 짧은 문단
## 경도와 표면은 어떻게 다르나?
| 구분 | A | B |
| --- | --- | --- |
## 이 상품은 어떤 사람에게 맞고, 누가 피해야 하나?
## 이 글에 없는 값은 왜 뺐나?        (자료끼리 다른 값이 있을 때)
## 주문 전 체크리스트
1. **모델명이 맞나** 설명
2. **옵션(색·크기·개수)이 맞나** 설명
3. **판매자 조건을 봤나** 설명
```

## 템플릿이 자동으로 그리는 것 (본문에 쓰지 않는다)
맨 위 제휴 고지(17px) → H1 → 작성일(한국어 날짜) → 표지 사진(모바일 4:3 전체 폭) → 초록 "먼저 답부터"(=answer)
→ 상품 카드(썸네일·이름·옵션·버튼 1개) → 본문 → FAQ → 끝 CTA → 출처. 데스크톱은 720px 본문 + 300px 고정 카드,
첫 화면에 답 상자와 카드가 보인다. 광고 꺼짐(PUBLIC_ADS_ENABLED≠true)이면 광고 자리·로더를 출력하지 않는다.

## 자동 검사 (scripts/gate.mjs, FORMAT)
발행 로그에 없는 모든 글(=새 글)에 적용: 사진 ≥6장(.webp/.jpg)·≤9장, 파일명 중복 없음, src가
`/images/posts/<slug>/`, PNG/도식 금지, 표지 외 사진은 본문에 배치, 본문 이미지는 frontmatter에 있어야 함,
본문 1,400–2,600자, 질문형 H2 4–6개, 표 1개 이상, 번호 체크리스트 3개 이상, FAQ ≤3, 코드 블록 금지, 제작 캡션 금지.
빌드 페이지: 광고 꺼짐일 때 ad-slot/adsbygoogle 없음, monospace 글꼴 없음, 고지문이 article 첫 블록.
이미 발행된 글은 `format: trail`을 frontmatter에 넣으면 같은 규칙을 적용받는다.
