import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import { getWishlist } from '../hooks/useAuth';

const REGIONS = ['전체', '경남', '경북', '전남', '전북', '충남', '충북', '경기', '강원', '제주'];
const CERTS = ['HACCP', '무항생제', '깨끗한 축산농장'];
const SORTS = ['최신순', '인기순'];
const TYPES = ['전체', '유제품', '농산물'];

export default function ProductsPage() {
  const navigate = useNavigate();
  const promoted = products.find(p => p.promoted);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('전체');
  const [selectedCerts, setSelectedCerts] = useState([]);
  const [sort, setSort] = useState('최신순');
  const [type, setType] = useState('전체');

  function toggleCert(cert) {
    setSelectedCerts(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = products.filter(p => {
      if (q && !p.name.toLowerCase().includes(q) && !p.farmName.toLowerCase().includes(q)) return false;
      if (region !== '전체' && p.region !== region) return false;
      if (type !== '전체' && p.type !== type) return false;
      if (selectedCerts.length > 0 && !selectedCerts.every(c => p.certs.includes(c))) return false;
      return true;
    });
    if (sort === '인기순') {
      const wishlist = getWishlist();
      return [...result].sort((a, b) => {
        const aWished = wishlist.includes(a.id) ? 1 : 0;
        const bWished = wishlist.includes(b.id) ? 1 : 0;
        if (bWished !== aWished) return bWished - aWished;
        if (b.promoted !== a.promoted) return (b.promoted ? 1 : 0) - (a.promoted ? 1 : 0);
        return b.price - a.price;
      });
    }
    return result;
  }, [search, region, type, selectedCerts, sort]);

  return (
    <div>
      {/* 추천 제품 배너 */}
      {promoted && (
        <button
          onClick={() => navigate(`/products/${promoted.id}`)}
          className="w-full text-left bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-4 mb-5 flex items-center gap-4 hover:border-amber-300 transition-colors"
        >
          <img src={promoted.image} alt={promoted.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs font-bold bg-amber-400 text-white px-2 py-0.5 rounded-full">⭐ 이달의 추천</span>
            </div>
            <p className="text-sm font-bold text-gray-900 truncate">{promoted.name}</p>
            <p className="text-xs text-gray-500">{promoted.farmName} · {promoted.volume}</p>
          </div>
          <span className="text-sm font-bold text-primary shrink-0">{promoted.price.toLocaleString()}원</span>
        </button>
      )}

      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="제품명, 농가명으로 검색"
          className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 pl-9 text-gray-700 focus:outline-none focus:border-primary"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 mb-2">생산 지역</p>
          <div className="flex flex-wrap gap-1.5">
            {REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                  ${region === r
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-light hover:text-primary'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">품목 종류</p>
          <div className="flex gap-1.5 mb-3">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                  ${type === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary-light hover:text-primary'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">인증정보</p>
              <div className="flex gap-3">
                {CERTS.map(cert => (
                  <label key={cert} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCerts.includes(cert)}
                      onChange={() => toggleCert(cert)}
                      className="accent-primary w-4 h-4"
                    />
                    <span className="text-xs text-gray-700">{cert}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-1 self-end">
              {SORTS.map(s => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors
                    ${sort === s
                      ? 'bg-primary-light text-primary font-semibold'
                      : 'text-gray-500 hover:text-primary'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">조건에 맞는 제품이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
