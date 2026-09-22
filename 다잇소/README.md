# 다잇소 🌿

> 소규모 농축산 농가와 판매처를 연결하는 판로지원 플랫폼

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
