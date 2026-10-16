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
5. **작성**: 아래 템플릿. 질문형 H2 4개 이상, 본문 1,400자 이상(공백 제외), 내부 링크 2개 이상
   (관련 가이드·카테고리). "직접 써보니", "제가 사용해보니" 같은 1인칭 사용 경험, 가짜 별점·후기 금지.
6. **이미지**: 표지 1장 이상 + 정보 역할(context/detail/comparison/use)이 다른 사진만. 실제 파일, alt, role,
   rights(generated|provider-api|own) 필수. 옵션과 다른 색·구성을 보여 주는 이미지는 버린다.
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
  - { src: /images/posts/foam-roller-length-45-vs-90/cover.webp, alt: "...", role: cover, credit: "...", rights: generated }
sources:
  - { title: "제조사 상품 정보", url: "https://..." }
faq:
  - { q: "...", a: "..." }
---

(고지문은 provider에서 자동으로 맨 위에 렌더링된다. 본문에 따로 쓰지 않는다.)

## 폼롤러 길이는 무엇을 기준으로 고르나?
## 경도와 표면은 어떻게 다르나?
## 이 상품은 어떤 사람에게 맞고, 누가 피해야 하나?
## 구매 전에 무엇을 확인하나?
```
