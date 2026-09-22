import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getProductById } from '../data/products';
import { CertBadge } from '../components/common/Badge';
import { getUser, isWishlisted, toggleWishlist } from '../hooks/useAuth';
import { LoginRequiredModal } from '../components/common/Modal';

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

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const user = getUser();
  const [wished, setWished] = useState(() => isWishlisted(id));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-4xl mb-3">😕</p>
        <p>제품을 찾을 수 없습니다.</p>
        <Link to="/products" className="mt-4 inline-block text-primary underline text-sm">목록으로</Link>
      </div>
    );
  }

  function handleWish() {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    const updated = toggleWishlist(product.id);
    setWished(updated.includes(product.id));
  }

  const gallery = product.galleryImages || [];

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-4">
        ← 제품 목록
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <Link
            to={`/farms/${product.farmId}`}
            className="text-sm text-primary hover:underline font-medium"
          >
            {product.farmName}
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mt-1 mb-1">{product.name}</h1>
          <p className="text-gray-500 text-sm mb-3">{product.tagline}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.certs.map(cert => <CertBadge key={cert} type={cert} />)}
          </div>

          <div className="flex items-center justify-between py-3 border-t border-gray-100 mb-4">
            <span className="text-sm text-gray-500">{product.volume}</span>
            <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()}원</span>
          </div>

          {/* 상세 갤러리 */}
          {gallery.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">상세 사진</h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className="aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
                  >
                    <img src={src} alt={`상세 사진 ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">제품 상세</h2>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">소비기한</span>
              <span className="text-gray-800">{product.shelfLife}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">원산지</span>
              <span className="text-gray-800">{product.origin}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">인증정보</span>
              <div className="flex gap-1">
                {product.certs.map(c => <CertBadge key={c} type={c} />)}
              </div>
            </div>
          </div>

          {/* CTA 버튼 영역 */}
          <div className="flex gap-3">
            <button
              onClick={handleWish}
              className={`flex items-center gap-1.5 px-4 py-3.5 rounded-xl border-2 font-semibold transition-colors shrink-0
                ${wished
                  ? 'bg-red-50 border-red-300 text-red-500'
                  : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400'
                }`}
            >
              <span>{wished ? '♥' : '♡'}</span>
              <span className="text-sm">{wished ? '관심 해제' : '관심 등록'}</span>
            </button>
            <a
              href={product.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 block text-center py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            >
              구매하러 가기 →
            </a>
          </div>
        </div>
      </div>

      <LightboxModal
        images={gallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex(i => i - 1)}
        onNext={() => setLightboxIndex(i => i + 1)}
      />

      {showLoginModal && <LoginRequiredModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}
