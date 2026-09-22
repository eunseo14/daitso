import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUser, removeUser, getWishlist, toggleWishlist } from '../hooks/useAuth';
import { products } from '../data/products';

function WishlistSection() {
  const [wishlist, setWishlist] = useState(getWishlist());
  const wishedProducts = products.filter(p => wishlist.includes(p.id));

  function handleRemove(productId) {
    const updated = toggleWishlist(productId);
    setWishlist([...updated]);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
      <h2 className="text-base font-bold text-gray-900 mb-4">관심 목록</h2>
      {wishedProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p className="text-3xl mb-2">♡</p>
          <p className="text-sm">관심 등록한 제품이 없습니다.</p>
          <Link to="/products" className="mt-3 inline-block text-xs text-primary underline">
            제품 둘러보기
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {wishedProducts.map(p => (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <Link to={`/products/${p.id}`} className="text-sm font-medium text-gray-800 hover:text-primary line-clamp-1">
                  {p.name}
                </Link>
                <p className="text-xs text-gray-400">{p.farmName}</p>
                <p className="text-sm font-bold text-primary">{p.price.toLocaleString()}원</p>
              </div>
              <button
                onClick={() => handleRemove(p.id)}
                className="text-red-400 hover:text-red-600 text-xs shrink-0"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyPage() {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    if (!user) navigate('/login');
  }, []);

  if (!user) return null;

  function handleLogout() {
    removeUser();
    navigate('/farms');
  }

  const isBusiness = user.type === '농가' || user.type === '판매처';

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-5">마이페이지</h1>

      {/* 프로필 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary text-white text-lg flex items-center justify-center font-bold shrink-0">
            {user.name?.[0]}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-bold text-gray-900">{isBusiness ? (user.bizName || user.name) : user.name}</p>
              {isBusiness && (
                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                  심사 중
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">{user.type} · {user.email}</p>
          </div>
        </div>
      </div>

      {/* 농가/판매처 심사 안내 */}
      {isBusiness && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="text-center py-4">
            <p className="text-3xl mb-3">📋</p>
            <p className="font-semibold text-gray-800 mb-1">신청이 접수되었습니다</p>
            <p className="text-sm text-gray-500">
              담당자 검토 후 빠르게 연락드릴게요.<br />
              승인 완료 시 {user.type === '농가' ? '제품 등록' : '공고 등록'}이 가능해집니다.
            </p>
          </div>
        </div>
      )}

      {/* 관심 목록 (모든 유형) */}
      <WishlistSection />

      {/* 로그아웃 */}
      <div className="mt-2 mb-8">
        <button
          onClick={handleLogout}
          className="w-full py-3 border border-gray-300 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
