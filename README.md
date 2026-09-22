# 다잇소

> 소규모 농축산 농가와 판매처, 소비자를 연결하는 농축산물 판로지원 플랫폼

## 소개

다잇소는 소규모 농가가 새로운 판매처와 판로를 보다 쉽게 찾을 수 있도록 돕기 위해 개발한 웹 플랫폼입니다.

농가는 자신이 생산하는 제품과 공급 정보를 등록하고 판매처의 입점·판촉 모집 공고를 한곳에서 확인할 수 있으며, 판매처는 필요한 품목과 납품 조건을 등록하여 조건에 맞는 농가와 제품을 탐색할 수 있습니다. 여기서 더 나아가 소비자가 지역 소농가의 제품과 생산 과정을 직접 둘러보고 발견할 수 있도록 하여, 판로 개척과 가치소비 확대라는 두 가지 목표를 함께 지향합니다.

2026 차세대 축산리더 아카데미 팀 프로젝트로 시작되었으며, 야베스목장 실습 경험을 바탕으로 기획되었습니다.

## 주요 기능

| 탭 | 설명 |
|---|---|
| 농가 | 인증 농가 정보 · 스토리 · 갤러리 · 공급 정보 |
| 입점·판촉 | 판매처 모집 공고 · 지역·모집형태·기간 필터 · 입점 신청 |
| 제품 | 농가 직접 생산 제품 목록 · 필터·검색 · 관심 등록 |
| 이용안내 | 플랫폼 소개 · 연락처 |

## 기술 스택

- React 19 + Vite
- React Router v6
- Tailwind CSS
- localStorage (인증·위시리스트 상태 관리)

## 프로젝트 구조

```
src/
├── components/
│   ├── common/       # Modal, Badge 등 공통 컴포넌트
│   ├── layout/       # Header, Layout
│   ├── products/     # ProductCard
│   ├── farms/        # FarmCard, ImageCarousel, LightboxModal
│   └── listings/     # ListingCard
├── pages/            # 각 탭·상세 페이지
├── data/             # 목업 데이터 (products, farms, listings)
├── hooks/            # useAuth (localStorage 기반 인증)
└── context/          # SeniorModeContext
```

## 로컬 실행

```bash
npm install
npm run dev
```
