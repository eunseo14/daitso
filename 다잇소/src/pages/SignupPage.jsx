import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setUser, registerUser } from '../hooks/useAuth';
import { RequiredFieldModal, SuccessModal } from '../components/common/Modal';

const USER_TYPES = ['소비자', '농가', '판매처'];

export default function SignupPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('소비자');
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [modal, setModal] = useState(null);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const required = userType === '소비자'
      ? [form.name, form.email, form.password]
      : [form.name, form.email, form.password, form.phone];

    if (required.some(v => !v)) {
      setModal('required');
      return;
    }

    if (userType === '소비자') {
      const user = { name: form.name, email: form.email, password: form.password, type: '소비자' };
      registerUser(user);
      setUser(user);
      setModal('success');
    } else {
      // 농가/판매처는 2단계로
      sessionStorage.setItem('signup_step1', JSON.stringify({ ...form, type: userType }));
      navigate('/signup/business');
    }
  }

  const isBusiness = userType !== '소비자';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-primary">
          ← 뒤로가기
        </button>
        <div className="text-center mb-8">
          <Link to="/products">
            <img src="/logo.png" alt="다잇소" className="h-16 w-auto mx-auto" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* 단계 표시 */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</div>
              <span className="text-xs font-semibold text-primary">기본 정보</span>
            </div>
            {isBusiness && (
              <>
                <div className="w-8 h-px bg-gray-200" />
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 text-xs flex items-center justify-center font-bold">2</div>
                  <span className="text-xs text-gray-400">사업자 인증</span>
                </div>
              </>
            )}
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-5">회원가입</h2>

          {/* 유형 선택 */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-600 mb-2">회원 유형</label>
            <div className="grid grid-cols-3 gap-2">
              {USER_TYPES.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setUserType(t)}
                  className={`py-2 rounded-xl text-sm font-medium border transition-colors
                    ${userType === t
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
                    }`}
                >
                  {t === '소비자' ? '👥 소비자' : t === '농가' ? '🐄 농가' : '🏪 판매처'}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                {isBusiness ? '담당자명' : '이름'} <span className="text-red-400">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                이메일 <span className="text-red-400">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            {isBusiness && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  연락처 <span className="text-red-400">*</span>
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                비밀번호 <span className="text-red-400">*</span>
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors mt-1"
            >
              {isBusiness ? '다음 단계 →' : '가입 완료'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400">이미 계정이 있으신가요? </span>
            <Link to="/login" className="text-xs text-primary font-semibold hover:underline">로그인</Link>
          </div>
        </div>
      </div>

      {modal === 'required' && <RequiredFieldModal onClose={() => setModal(null)} />}
      {modal === 'success' && (
        <SuccessModal
          title="가입이 완료되었습니다!"
          message="다잇소에 오신 것을 환영합니다."
          onClose={() => { setModal(null); navigate('/mypage'); }}
        />
      )}
    </div>
  );
}
