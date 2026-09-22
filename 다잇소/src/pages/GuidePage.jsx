export default function GuidePage() {
  const steps = {
    농가: [
      { step: 1, title: '회원가입', desc: '농가로 회원가입 후 사업자 정보를 등록합니다.' },
      { step: 2, title: '제품 등록', desc: '생산하는 제품의 정보, 공급 스펙, 인증 정보를 등록합니다.' },
      { step: 3, title: '입점·판촉 공고 탐색', desc: '마트, 휴게소, 로컬푸드 매장 등 판매처의 모집 공고를 확인합니다.' },
      { step: 4, title: '거래 문의', desc: '조건이 맞는 판매처에 거래를 문의하고 협의합니다.' },
      { step: 5, title: '소비자에게 홍보', desc: '등록된 농가·제품 정보가 소비자에게 노출되어 자연스럽게 홍보됩니다.' },
    ],
    판매처: [
      { step: 1, title: '회원가입', desc: '판매처로 회원가입 후 매장 정보를 등록합니다.' },
      { step: 2, title: '모집 공고 등록', desc: '필요한 제품, 납품 조건, 모집 기간 등을 공고로 올립니다.' },
      { step: 3, title: '농가 탐색', desc: '조건에 맞는 농가와 제품을 검색하고 인증 정보를 확인합니다.' },
      { step: 4, title: '거래 문의', desc: '원하는 농가에 직접 거래를 문의합니다.' },
    ],
    소비자: [
      { step: 1, title: '탐색', desc: '지역별·인증별로 농가와 제품을 자유롭게 탐색합니다.' },
      { step: 2, title: '농가 정보 확인', desc: '농가 소개, 인증 현황, 체험 프로그램 등을 확인합니다.' },
      { step: 3, title: '구매처 확인', desc: '제품 상세에서 구매 가능한 링크로 바로 이동합니다.' },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* 플랫폼 소개 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-primary p-8 text-white text-center">
          <img src="/logo.png" alt="다잇소" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">소규모 농축산 농가와<br />판매처를 연결합니다</h1>
          <p className="text-white/80 text-sm">농축산 판로지원 플랫폼 · 다잇소</p>
        </div>
        <div className="p-6">
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: '🐄', title: '농가', desc: '제품을 등록하고 판매처 공고를 한눈에 확인하세요.' },
              { icon: '🏪', title: '판매처', desc: '모집 공고를 올리고 조건에 맞는 농가를 찾아보세요.' },
              { icon: '👥', title: '소비자', desc: '믿을 수 있는 지역 농가와 제품을 탐색하세요.' },
            ].map(item => (
              <div key={item.title} className="p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 이용 방법 */}
      {Object.entries(steps).map(([role, roleSteps]) => (
        <div key={role} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {role === '농가' ? '🐄' : role === '판매처' ? '🏪' : '👥'} {role} 이용 방법
          </h2>
          <div className="space-y-3">
            {roleSteps.map(s => (
              <div key={s.step} className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 문의 */}
      <div className="bg-primary-light rounded-2xl p-6 text-center">
        <p className="text-sm text-primary font-semibold mb-1">궁금한 점이 있으신가요?</p>
        <p className="text-xs text-gray-500 mb-3">다잇소 운영팀이 도와드립니다.</p>
        <div className="flex flex-col items-center gap-1.5">
          <a href="tel:010-3438-0214" className="text-sm text-primary font-medium hover:underline">
            📞 010-3438-0214
          </a>
          <a href="mailto:leeeunseo1013@gmail.com" className="text-xs text-primary hover:underline">
            ✉️ leeeunseo1013@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
