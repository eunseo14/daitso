import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { farms } from '../data/farms';
import FarmCard from '../components/farms/FarmCard';

const REGIONS = ['전체', '경남', '경북', '전남', '전북', '충남', '충북', '경기', '강원', '제주'];
const CERTS = ['HACCP', '무항생제', '깨끗한 축산농장'];
const TYPES = ['전체', '유제품', '농산물'];

export default function FarmsPage() {
  const navigate = useNavigate();
  const [region, setRegion] = useState('전체');
  const [selectedCerts, setSelectedCerts] = useState([]);
  const [type, setType] = useState('전체');

  function toggleCert(cert) {
    setSelectedCerts(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  }

  const filtered = useMemo(() => {
    return farms.filter(f => {
      if (region !== '전체' && f.region !== region) return false;
      if (type !== '전체' && f.type !== type) return false;
      if (selectedCerts.length > 0 && !selectedCerts.every(c => f.certs.includes(c))) return false;
      return true;
    });
  }, [region, type, selectedCerts]);

  return (
    <div>
      {/* 히어로 배너 */}
      <div className="bg-gradient-to-br from-primary/10 to-green-50 rounded-2xl border border-primary/10 p-5 mb-5">
        <p className="text-xs font-semibold text-primary mb-1">다잇소 인증 농가</p>
        <h2 className="text-lg font-bold text-gray-900 mb-1 leading-snug">정성껏 키운 농가의<br />이야기를 만나보세요 🌿</h2>
        <p className="text-xs text-gray-500 mb-4">생산 품목, 공급 정보, 인증 현황까지 한눈에 확인하세요</p>
        <div className="flex items-center justify-between">
          <Link
            to="/farms/f1"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-white border border-primary/30 rounded-full px-3 py-1.5 hover:bg-primary hover:text-white transition-colors"
          >
            야베스목장 스토리 보기 →
          </Link>
          <button
            onClick={() => navigate('/login')}
            className="text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:border-gray-400 transition-colors"
          >
            + 농가 등록
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 mb-2">지역</p>
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

        <div className="flex flex-wrap gap-7">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">생산 품목</p>
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
            <p className="text-xs font-semibold text-gray-500 mb-2.5">인증현황</p>
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
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-sm">조건에 맞는 농가가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(farm => (
            <FarmCard key={farm.id} farm={farm} />
          ))}
        </div>
      )}
    </div>
  );
}
