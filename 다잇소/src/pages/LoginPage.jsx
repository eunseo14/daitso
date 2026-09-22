import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setUser, authenticateUser } from '../hooks/useAuth';
import { RequiredFieldModal, SuccessModal } from '../components/common/Modal';

function LoginFailModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
        <div className="text-center">
          <div className="text-3xl mb-3">🔐</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">로그인 실패</h3>
          <p className="text-sm text-gray-500 mb-5">이메일 또는 비밀번호가 일치하지 않습니다.</p>
          <button className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [modal, setModal] = useState(null);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setModal('required');
      return;
    }
    const user = authenticateUser(form.email, form.password);
    if (!user) {
      setModal('fail');
      return;
    }
    setUser(user);
    setModal('success');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          ← 뒤로가기
        </button>

        <div className="text-center mb-8">
          <Link to="/farms">
            <img src="/logo.png" alt="다잇소" className="h-16 w-auto mx-auto" />
          </Link>
          <p className="text-sm text-gray-500 mt-2">농축산 판로지원 플랫폼</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">로그인</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">이메일</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">비밀번호</label>
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
              className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            >
              로그인
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400">계정이 없으신가요? </span>
            <Link to="/signup" className="text-xs text-primary font-semibold hover:underline">
              회원가입
            </Link>
          </div>
        </div>
      </div>

      {modal === 'required' && <RequiredFieldModal onClose={() => setModal(null)} />}
      {modal === 'fail' && <LoginFailModal onClose={() => setModal(null)} />}
      {modal === 'success' && (
        <SuccessModal
          title="로그인 완료!"
          message="다잇소에 오신 것을 환영합니다."
          onClose={() => { setModal(null); navigate('/farms'); }}
        />
      )}
    </div>
  );
}
