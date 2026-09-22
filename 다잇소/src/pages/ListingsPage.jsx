import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { listings, getDDay } from '../data/listings';
import ListingCard from '../components/listings/ListingCard';

const REGIONS = ['전체', '경남', '경북', '전남', '전북', '충남', '충북', '경기', '강원', '제주'];
const TYPES = ['전체', '상시입점', '판촉행사', '특판전'];
const CATEGORIES = ['전체', '유제품', '농산물'];

export default function ListingsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('전체');
  const [type, setType] = useState('전체');
  const [category, setCategory] = useState('전체');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return listings.filter(l => {
      if (q && !l.storeName.toLowerCase().includes(q) && !l.location.toLowerCase().includes(q)) return false;
      if (region !== '전체' && l.region !== region) return false;
      if (type !== '전체' && l.type !== type) return false;
      if (category !== '전체' && l.category !== category) return false;
      if (startDate || endDate) {
        if (l.periodStart && l.periodEnd) {
          if (startDate && l.periodEnd < startDate) return false;
          if (endDate && l.periodStart > endDate) return false;
        }
      }
      return true;
    });
  }, [search, region, type, category, startDate, endDate]);

  return (
    <div>
      {/* 배너 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 mb-5">
        <p className="text-xs font-semibold text-indigo-500 mb-1">입점·판촉 공고</p>
        <h2 className="text-lg font-bold text-gray-900 mb-0 leading-snug">우리 농가에 맞는<br />공고를 찾아보세요 🔎</h2>
        <div className="flex items-end justify-between gap-2">
          <p className="text-xs text-gray-500">지역, 모집 형태, 마감일 필터로 빠르게 검색하세요</p>
          <button
            onClick={() => navigate('/login')}
            className="shrink-0 text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:border-gray-400 transition-colors"
          >
            + 공고 등록
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="판매처명, 지역으로 검색"
          className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 pl-9 text-gray-700 focus:outline-none focus:border-primary"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 space-y-3">
        {/* 지역 */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">지역</p>
          <div className="flex flex-wrap gap-1.5">
            {REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                  ${region === r ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary-light hover:text-primary'}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* 모집 형태 + 모집 품목 */}
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">모집 형태</p>
            <div className="flex gap-1.5">
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
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">모집 품목</p>
            <div className="flex gap-1.5">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                    ${category === c ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary-light hover:text-primary'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 공고 기간 */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">공고 기간</p>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:border-primary"
            />
            <span className="text-xs text-gray-400">~</span>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 focus:outline-none focus:border-primary"
            />
            {(startDate || endDate) && (
              <button
                onClick={() => { setStartDate(''); setEndDate(''); }}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                초기화
              </button>
            )}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">조건에 맞는 공고가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
