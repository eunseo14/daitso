import { Link, useLocation } from 'react-router-dom';
import { getUser } from '../../hooks/useAuth';
import { useSeniorMode } from '../../context/SeniorModeContext';

const TABS = [
  { label: '농가', path: '/farms' },
  { label: '입점·판촉', path: '/listings' },
  { label: '제품', path: '/products' },
  { label: '이용안내', path: '/guide' },
];

export default function Header() {
  const location = useLocation();
  const user = getUser();
  const { senior, toggle } = useSeniorMode();

  const activeTab = TABS.find(t => location.pathname.startsWith(t.path));

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* 1행: 로고 + 플랫폼명 + 버튼들 */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center h-24 gap-3">
            {/* 좌측: 로고 + 플랫폼명 */}
            <Link to="/farms" className="flex items-center gap-3 shrink-0">
              <img src="/logo.png" alt="다잇소" className="h-[88px] w-auto" />
              <span className="hidden sm:block text-lg font-semibold text-gray-500 leading-tight">
                농축산 판로지원 플랫폼
              </span>
            </Link>

            <div className="flex-1" />

            {/* 우측: 버튼들 */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
              >
                {senior ? '기본 모드' : '시니어 모드'}
              </button>

              {user ? (
                <Link
                  to="/mypage"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 text-white text-xs flex items-center justify-center font-bold shrink-0">
                    {user.name?.[0] || 'U'}
                  </span>
                  <span>마이페이지</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    로그인
                  </Link>
                  <Link
                    to="/signup"
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2행: 탭바 */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex">
            {TABS.map(tab => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-px
                  ${activeTab?.path === tab.path
                    ? 'border-primary text-primary font-semibold bg-white'
                    : 'border-transparent text-gray-600 hover:text-primary hover:bg-white/60'
                  }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
