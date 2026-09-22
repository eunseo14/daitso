import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getFarmById } from '../data/farms';
import { getProductsByFarmId } from '../data/products';
import { CertBadge } from '../components/common/Badge';
import { getUser } from '../hooks/useAuth';
import { SellerOnlyModal, SuccessModal } from '../components/common/Modal';

function ImageCarousel({ images, onClickImage }) {
  const [startIdx, setStartIdx] = useState(0);
  const visible = 4;
  if (!images || images.length === 0) return null;

  return (
    <div className="relative px-4">
      <div className="flex gap-2">
        {images.slice(startIdx, startIdx + visible).map((src, i) => (
          <button
            key={startIdx + i}
            onClick={() => onClickImage(startIdx + i)}
            className="flex-1 aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
          >
            <img src={src} alt={`갤러리 ${startIdx + i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      {startIdx > 0 && (
        <button
          onClick={() => setStartIdx(i => i - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 text-lg hover:text-primary"
        >
          ‹
        </button>
      )}
      {startIdx + visible < images.length && (
        <button
          onClick={() => setStartIdx(i => i + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 text-lg hover:text-primary"
        >
          ›
        </button>
      )}
    </div>
  );
}

function LightboxModal({ images, currentIndex, onClose, onPrev, onNext }) {
  if (currentIndex === null) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85" onClick={onClose}>
      <div className="relative max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt={`사진 ${currentIndex + 1}`}
          className="w-full max-h-[80vh] object-contain rounded-xl"
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
        >
          ✕
        </button>
        {currentIndex > 0 && (
          <button
            onClick={onPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white rounded-full flex items-center justify-center text-2xl hover:bg-black/70"
          >
            ‹
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button
            onClick={onNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white rounded-full flex items-center justify-center text-2xl hover:bg-black/70"
          >
            ›
          </button>
        )}
        <p className="text-center text-white/60 text-sm mt-2">{currentIndex + 1} / {images.length}</p>
      </div>
    </div>
  );
}

export default function FarmDetailPage() {
  const { id } = useParams();
  const farm = getFarmById(id);
  const farmProducts = farm ? getProductsByFarmId(farm.id) : [];
  const user = getUser();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  function handleInquiry() {
    setShowSellerModal(true);
  }

  if (!farm) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-4xl mb-3">😕</p>
        <p>농가를 찾을 수 없습니다.</p>
        <Link to="/farms" className="mt-4 inline-block text-primary underline text-sm">목록으로</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/farms" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-4">
        ← 농가 목록
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <img src={farm.heroImage} alt={farm.name} className="w-full h-56 object-cover" style={{ objectPosition: `center ${farm.heroImagePosition || '50%'}` }} />

        <div className="p-6">
          <p className="text-sm text-gray-400 mb-1">📍 {farm.location}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{farm.name}</h1>
          <p className="text-gray-500 text-sm mb-5">{farm.tagline}</p>

          {/* 갤러리 */}
          {farm.galleryImages?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">소개 사진</h2>
              <ImageCarousel images={farm.galleryImages} onClickImage={setLightboxIndex} />
            </div>
          )}

          {/* 농가 소개 */}
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-3">농가 소개</h2>
            {farm.story.map((section, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-sm font-semibold text-primary mb-1">{section.title}</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* 생산 과정 */}
          {farm.production && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">생산 과정</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{farm.production}</p>
            </div>
          )}

          {/* 인증정보 */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">인증정보</h2>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {farm.certs.map(cert => <CertBadge key={cert} type={cert} />)}
            </div>
            {farm.certHistory?.length > 0 && (
              <ul className="space-y-1">
                {[...farm.certHistory]
                  .sort((a, b) => (a.year || 9999) - (b.year || 9999))
                  .map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-primary font-medium w-10 shrink-0">{item.year || '—'}</span>
                      <span>{item.label}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* 생산 품목 */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">생산 품목</h2>
            {farmProducts.length === 0 ? (
              <p className="text-sm text-gray-400">현재 등록된 제품이 없습니다.</p>
            ) : (
              <div className="space-y-2">
                {farmProducts.map(p => (
                  <Link
                    key={p.id}
                    to={`/products/${p.id}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-primary-light transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-primary">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.volume}</p>
                    </div>
                    <span className="text-sm font-bold text-primary">{p.price.toLocaleString()}원</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 공급 정보 (판매처용) */}
          {farm.supply && (
            <div className="mb-6 border border-primary/20 rounded-xl p-4 bg-primary-light/30">
              <h2 className="text-sm font-semibold text-primary mb-3">📦 공급 정보</h2>
              <div className="space-y-1.5 text-sm">
                {[
                  ['공급 가능 수량', farm.supply.weeklyQty],
                  ['생산 주기', farm.supply.cycle],
                  ['포장 단위', farm.supply.packaging],
                  ['배송', farm.supply.delivery],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-2">
                    <span className="text-gray-500 w-24 shrink-0">{label}</span>
                    <span className="text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 체험 프로그램 */}
          {farm.experience?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">체험 프로그램</h2>
              <ul className="space-y-1">
                {farm.experience.map((exp, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 홈페이지 */}
          {farm.website && (
            <div className="mb-6">
              <a href={farm.website} target="_blank" rel="noopener noreferrer"
                className="text-sm text-primary hover:underline break-all">
                🌐 {farm.website}
              </a>
            </div>
          )}

          {/* CTA */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleInquiry}
              className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            >
              거래 문의하기
            </button>
          </div>
        </div>
      </div>

      <LightboxModal
        images={farm.galleryImages || []}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex(i => i - 1)}
        onNext={() => setLightboxIndex(i => i + 1)}
      />

      {showLoginModal && <LoginRequiredModal onClose={() => setShowLoginModal(false)} />}
      {showSellerModal && <SellerOnlyModal onClose={() => setShowSellerModal(false)} />}
      {showInquiryModal && (
        <SuccessModal
          title="거래 문의가 접수되었습니다"
          message="담당 농가에 전달되었어요. 빠른 시일 내에 연락드릴게요."
          onClose={() => setShowInquiryModal(false)}
        />
      )}
    </div>
  );
}
