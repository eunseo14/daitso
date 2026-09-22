import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setUser, registerUser } from '../hooks/useAuth';
import { RequiredFieldModal, SuccessModal } from '../components/common/Modal';

export default function SignupBusinessPage() {
  const navigate = useNavigate();
  // useState 초기화 함수로 한 번만 읽어 재렌더시 덮어쓰이지 않게 함
  const [step1] = useState(() => JSON.parse(sessionStorage.getItem('signup_step1') || '{}'));
  const [form, setForm] = useState({ bizName: '', bizNo: '', file: null });
  const [modal, setModal] = useState(null);
  const [fileName, setFileName] = useState('');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFile(e) {
    const f = e.target.files[0];
    if (f) {
      setFileName(f.name);
      setForm(prev => ({ ...prev, file: f.name }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.bizName || !form.bizNo) {
      setModal('required');
      return;
    }
    const user = {
      name: step1.name,
      email: step1.email,
      password: step1.password,
      type: step1.type,
      bizName: form.bizName,
    };
    registerUser(user);
    setUser(user);
    sessionStorage.removeItem('signup_step1');
    setModal('success');
  }

  if (!step1.type) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">잘못된 접근입니다.</p>
          <Link to="/signup" className="text-primary underline text-sm">회원가입으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <button onClick={() => navigate('/signup')} className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-primary">
          ← 뒤로가기
        </button>
        <div className="text-center mb-8">
          <Link to="/products">
            <img src="/logo.png" alt="다잇소" className="h-16 w-auto mx-auto" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 text-xs flex items-center justify-center">1</div>
              <span className="text-xs text-gray-400">기본 정보</span>
            </div>
            <div className="w-8 h-px bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</div>
              <span className="text-xs font-semibold text-primary">사업자 인증</span>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-1">사업자 인증</h2>
          <p className="text-xs text-gray-400 mb-5">
            {step1.type} 계정으로 가입합니다. 사업자 정보를 입력해주세요.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">유형</label>
              <div className={`px-4 py-2.5 rounded-xl text-sm font-medium border
                ${step1.type === '농가' ? 'bg-primary-light text-primary border-primary/30' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                {step1.type === '농가' ? '🐄 농가' : '🏪 판매처'}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                {step1.type === '농가' ? '농가명(목장명)' : '매장명(상호명)'} <span className="text-red-400">*</span>
              </label>
              <input
                name="bizName"
                value={form.bizName}
                onChange={handleChange}
                placeholder={step1.type === '농가' ? '예: 야베스목장' : '예: ○○마트 의령점'}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                사업자등록번호 <span className="text-red-400">*</span>
              </label>
              <input
                name="bizNo"
                value={form.bizNo}
                onChange={handleChange}
                placeholder="000-00-00000"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                사업자등록증 업로드
                <span className="text-gray-400 font-normal ml-1">(또는 즉석판매제조·가공업 신고증)</span>
              </label>
              <label className="flex items-center gap-3 border border-dashed border-gray-300 rounded-xl px-4 py-3 cursor-pointer hover:border-primary transition-colors">
                <span className="text-xl">📎</span>
                <span className="text-xs text-gray-500 flex-1">
                  {fileName || '파일을 선택하세요 (PDF, JPG, PNG)'}
                </span>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile} className="hidden" />
              </label>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50"
              >
                ← 이전
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
              >
                가입 완료
              </button>
            </div>
          </form>
        </div>
      </div>

      {modal === 'required' && <RequiredFieldModal onClose={() => setModal(null)} />}
      {modal === 'success' && (
        <SuccessModal
          title="가입이 완료되었습니다!"
          message={`${step1.type} 계정으로 다잇소에 오신 것을 환영합니다.`}
          onClose={() => { setModal(null); navigate('/mypage'); }}
        />
      )}
    </div>
  );
}
