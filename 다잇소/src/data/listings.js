// 마감일 기준: 2026-10-03 발표 기준
export const listings = [
  {
    id: 'l1',
    storeName: '함양산삼휴게소',
    type: '판촉행사',
    category: '유제품',
    region: '경남',
    location: '경상남도 함양군',
    deadline: '2026-10-10',
    targetItems: '유제품 전반 (요거트, 치즈)',
    minQty: '행사 기간 중 1일 50개 이상',
    supplyPeriod: '2026년 10월 3일 ~ 5일 (3일간)',
    periodStart: '2026-10-03',
    periodEnd: '2026-10-05',
    commission: '판매액의 20%, 행사 종료 후 7일 이내 정산',
    requiredDocs: ['원산지증명서', '축산물이력번호', '식품위생법 영업신고증'],
    hasColdStorage: true,
    hasTastingArea: true,
    notes: '부스 공간 제공, 시식 샘플 별도 준비 필요. 냉장 운반 가능한 업체만 신청 가능.',
    image: '/images/listing-1.png',
  },
  {
    id: 'l2',
    storeName: '의령로컬푸드직매장',
    type: '상시입점',
    category: '유제품',
    region: '경남',
    location: '경상남도 의령군',
    deadline: '2026-11-07',
    targetItems: '요거트, 치즈 등 지역 유가공 제품',
    minQty: '주 100개 이상 안정적 공급 가능한 업체',
    supplyPeriod: '상시 (입점 후 최소 3개월 계약)',
    periodStart: null,
    periodEnd: null,
    commission: '판매액의 15%, 월 1회 정산',
    requiredDocs: ['원산지증명서', '영업신고증 또는 즉석판매제조·가공업 신고증', '제품 성분표'],
    hasColdStorage: true,
    hasTastingArea: false,
    notes: '경남 의령군 내 생산 농가 우선 심사. 소규모 농가도 신청 가능.',
    image: '/images/listing-2.png',
  },
  {
    id: 'l3',
    storeName: 'GS25 경남지역점',
    type: '특판전',
    category: '유제품',
    region: '경남',
    location: '경상남도 전역',
    deadline: '2026-11-02',
    targetItems: '소용량 요거트 (150ml 이하), 스낵형 치즈',
    minQty: '1회 납품 최소 200개 이상, 주 2회 납품 가능 업체',
    supplyPeriod: '2026년 11월 1일 ~ 30일 (1개월)',
    periodStart: '2026-11-01',
    periodEnd: '2026-11-30',
    commission: '납품가 기준 협의 (별도 수수료 없음)',
    requiredDocs: ['원산지증명서', '축산물이력번호', 'HACCP 인증서 또는 영업신고증', '제품 바코드'],
    hasColdStorage: true,
    hasTastingArea: false,
    notes: '편의점 규격에 맞는 개별 포장 필수. 바코드 등록 지원 가능.',
    image: '/images/listing-3.png',
  },
  {
    id: 'l4',
    storeName: '여주 남한강로컬푸드',
    type: '상시입점',
    category: '유제품',
    region: '경기',
    location: '경기도 여주시',
    deadline: '2026-11-14',
    targetItems: '유제품 전반 (우유, 요거트, 치즈)',
    minQty: '주 50개 이상 (소규모 농가 환영)',
    supplyPeriod: '상시 (입점 후 최소 2개월 계약)',
    periodStart: null,
    periodEnd: null,
    commission: '판매액의 12%, 월 1회 정산',
    requiredDocs: ['원산지증명서', '영업신고증 또는 즉석판매제조·가공업 신고증'],
    hasColdStorage: true,
    hasTastingArea: true,
    notes: '경기 여주 및 인근 지역 농가 우선. 소규모 농가 적극 환영. 유통기한 5일 이상 제품만 가능.',
    image: '/images/listing-4.png',
  },
];

export function getListingById(id) {
  return listings.find(l => l.id === id);
}

export function getDDay(deadlineStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(deadlineStr);
  deadline.setHours(0, 0, 0, 0);
  return Math.floor((deadline - today) / (1000 * 60 * 60 * 24));
}
