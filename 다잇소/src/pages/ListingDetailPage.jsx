import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getListingById, getDDay } from '../data/listings';
import { RecruitBadge, DeadlineBadge } from '../components/common/Badge';
import { FarmOnlyModal, SuccessModal } from '../components/common/Modal';
import { getUser } from '../hooks/useAuth';

export default function ListingDetailPage() {
  const { id } = useParams();
  const listing = getListingById(id);
  const user = getUser();
  const [showFarmModal, setShowFarmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!listing) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-4xl mb-3">😕</p>
        <p>공고를 찾을 수 없습니다.</p>
        <Link to="/listings" className="mt-4 inline-block text-primary underline text-sm">목록으로</Link>
      </div>
    );
  }

  const dDay = getDDay(listing.deadline);

  function handleApply() {
    if (user?.type === '농가') {
      setShowSuccessModal(true);
    } else {
      setShowFarmModal(true);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/listings" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-4">
        ← 입점·판촉 목록
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <img src={listing.image} alt={listing.storeName} className="w-full h-48 object-cover" />

        <div className="p-6">
          {/* 배지 */}
          <div className="flex items-center gap-2 mb-3">
            <RecruitBadge type={listing.type} />
            <DeadlineBadge dDay={dDay} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">{listing.storeName}</h1>
          <p className="text-sm text-gray-400 mb-5">📍 {listing.location}</p>

          {/* 공고 상세 */}
          <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2.5 text-sm">
            {[
              ['모집 품목', listing.targetItems],
              ['필요 수량', listing.minQty],
              ['사업 기간', listing.supplyPeriod],
              ['마감일', `${listing.deadline} (D-${dDay < 0 ? '마감' : dDay})`],
              ['수수료·정산', listing.commission],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <span className="text-gray-500 w-20 shrink-0">{label}</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          {/* 요구 서류 */}
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">요구 서류</h2>
            <ul className="space-y-1">
              {listing.requiredDocs.map((doc, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 매장 특성 */}
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">매장 특성</h2>
            <div className="flex gap-4">
              <div className={`flex items-center gap-1.5 text-sm ${listing.hasColdStorage ? 'text-primary' : 'text-gray-300'}`}>
                <span className="text-lg">{listing.hasColdStorage ? '❄️' : '❌'}</span>
                <span>냉장 진열대</span>
              </div>
              <div className={`flex items-center gap-1.5 text-sm ${listing.hasTastingArea ? 'text-primary' : 'text-gray-300'}`}>
                <span className="text-lg">{listing.hasTastingArea ? '🥄' : '❌'}</span>
                <span>시식 공간</span>
              </div>
            </div>
          </div>

          {/* 추가 안내 */}
          {listing.notes && (
            <div className="mb-5 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-xs text-amber-700">💡 {listing.notes}</p>
            </div>
          )}

          {/* CTA */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleApply}
              className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            >
              입점 신청하기
            </button>
          </div>
        </div>
      </div>

      {showFarmModal && <FarmOnlyModal onClose={() => setShowFarmModal(false)} />}
      {showSuccessModal && (
        <SuccessModal
          title="입점 신청이 접수되었습니다"
          message="담당자 검토 후 빠른 시일 내에 연락드릴게요."
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
}
