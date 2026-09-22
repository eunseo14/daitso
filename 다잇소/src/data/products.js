export const products = [
  {
    id: 'p1',
    name: '야베스목장 수제 플레인 요거트',
    farmId: 'f1',
    farmName: '야베스목장',
    volume: '500ml × 1개',
    price: 6000,
    tagline: '원유의 진한 풍미를 느낄 수 있는 플레인 요거트',
    description: `갓짜낸 무항생제 원유만 사용해 만든 요거트입니다. 오로지 유산균으로만 발효시킨 순수 요거트로, HACCP 인증을 받은 집유장과 유가공 공장에서 생산됩니다.

인공 첨가물(방부제, 합성착향료 등)을 일체 사용하지 않으며, 1ml당 270억 마리의 유산균이 살아있습니다. 유통과정 없이 산지직송 배송되어 언제나 신선합니다.

야베스 목장만의 유산균 배합으로 신맛은 줄이고 우유의 고소함은 극대화했습니다. 체세포 수 1등급 원유를 사용하며, 일체 외부 노출이 되지 않는 상태로 생산해 이물질 혼입을 최소화합니다.

야베스 목장은 1마리당 젖소의 지정된 사육규모와는 다르게 철저히 더 넓은 공간을 사용하여 젖소의 스트레스를 최소화하였습니다. 가공부터 판매까지 모든 것이 수제인 6차 산업 적용 목장입니다.`,
    shelfLife: '소비기한 - 제조일로부터 25일',
    origin: '국내산',
    certs: ['무항생제', 'HACCP'],
    purchaseUrl: 'https://www.coupang.com/vp/products/8664472933',
    image: '/images/product-yabes-plain.png',
    galleryImages: [
      '/images/p1-gallery-1.png',
      '/images/p1-gallery-2.png',
      '/images/p1-gallery-3.png',
      '/images/p1-gallery-4.png',
      '/images/p1-gallery-5.png',
    ],
    promoted: true,
    category: '요거트',
    type: '유제품',
    region: '경남',
  },
  {
    id: 'p2',
    name: '해뜰목장 스위트 요거트',
    farmId: 'f2',
    farmName: '해뜰목장',
    volume: '150ml × 1개',
    price: 2000,
    tagline: '자연의 신선함을 담은 건강한 요거트',
    description: `당일 새벽에 착유한 해뜰목장 원유 그대로 담았습니다. 안정제, 착향료, 색소, 방부제 등 화학 첨가물이 전혀 들어가지 않아 더욱 건강합니다.

단맛에 익숙해진 요즘, 건강한 맛을 찾고 계신 분들에게 당은 확 줄이고 맛은 살린 해뜰목장 요거트를 권해드립니다. 해뜰목장은 요거트 본연의 맛으로 승부합니다.

해뜰목장의 모든 제품은 HACCP 인증 시설에서 위생적으로 생산되고 있습니다.`,
    shelfLife: '제조일로부터 20일 이내',
    origin: '국산 (경상남도 하동군)',
    certs: ['HACCP'],
    purchaseUrl: 'https://www.coupang.com/vp/products/8243788380',
    image: '/images/product-haedeul-yogurt.png',
    galleryImages: [
      '/images/p2-gallery-1.png',
      '/images/p2-gallery-2.png',
      '/images/p2-gallery-3.png',
    ],
    promoted: false,
    category: '요거트',
    type: '유제품',
    region: '경남',
  },
  {
    id: 'p3',
    name: '야베스목장 수제 짜먹는 요거트 세트',
    farmId: 'f1',
    farmName: '야베스목장',
    volume: '100ml × 7개',
    price: 12000,
    tagline: '야베스 목장의 수제 요거트 3가지 맛을 한번에!',
    description: `갓짜낸 무항생제 원유만 사용해 만든 짜먹는 요거트 세트입니다. 플레인, 딸기, 블루베리 3가지 맛을 한 번에 즐길 수 있습니다.

오로지 유산균으로만 발효시킨 순수 요거트로, HACCP 인증을 받은 집유장과 유가공 공장에서 생산됩니다. 인공 첨가물(방부제, 합성착향료 등)을 일체 사용하지 않으며, 1ml당 270억 마리의 유산균이 살아있습니다.

휴대하기 편한 짜먹는 형태로, 야외 나들이나 간식으로 안성맞춤입니다. 유통과정 없이 산지직송 배송됩니다.`,
    shelfLife: '소비기한 - 제조일로부터 25일',
    origin: '국내산',
    certs: ['무항생제', 'HACCP'],
    purchaseUrl: 'https://www.coupang.com/vp/products/8202266607',
    image: '/images/product-yabes-set.png',
    galleryImages: [
      '/images/p3-gallery-1.png',
      '/images/p3-gallery-2.png',
      '/images/p3-gallery-3.png',
      '/images/p3-gallery-4.png',
    ],
    promoted: false,
    category: '요거트',
    type: '유제품',
    region: '경남',
  },
  {
    id: 'p4',
    name: '야베스목장 찢어먹는 스트링치즈',
    farmId: 'f1',
    farmName: '야베스목장',
    volume: '100g × 1개',
    price: 8000,
    tagline: '손으로 쭉쭉 찢어먹는 재미 스트링치즈!',
    description: `손으로 쭉쭉 찢어 먹는 재미가 있는 스트링 치즈입니다. 성장기 어린아이들, 바쁜 현대인들의 영양 간식으로 간편하게 즐길 수 있습니다.

갓짜낸 무항생제 원유만 사용해 만들었으며, HACCP 인증을 받은 집유장과 유가공 공장에서 생산됩니다. 인공 첨가물(방부제, 합성착향료 등)을 일체 사용하지 않아 믿고 드실 수 있습니다.

체세포 수 1등급 원유를 사용하며 유통과정 없이 산지직송 배송됩니다.`,
    shelfLife: '소비기한 - 제조일로부터 3일',
    origin: '국내산',
    certs: ['무항생제', 'HACCP'],
    purchaseUrl: 'https://www.coupang.com/vp/products/8032865958',
    image: '/images/product-yabes-cheese.png',
    galleryImages: [
      '/images/p4-gallery-1.png',
      '/images/p4-gallery-2.png',
      '/images/p4-gallery-3.png',
      '/images/p4-gallery-4.png',
    ],
    promoted: false,
    category: '치즈',
    type: '유제품',
    region: '경남',
  },
];

export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getProductsByFarmId(farmId) {
  return products.filter(p => p.farmId === farmId);
}
