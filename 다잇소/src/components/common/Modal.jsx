import { useNavigate } from 'react-router-dom';

export function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function LoginRequiredModal({ onClose }) {
  const navigate = useNavigate();
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="text-3xl mb-3">🔒</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">로그인이 필요합니다</h3>
        <p className="text-sm text-gray-500 mb-5">이 기능은 로그인 후 이용할 수 있어요.</p>
        <div className="flex gap-2">
          <button
            className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark"
            onClick={() => { onClose(); navigate('/login'); }}
          >
            로그인
          </button>
        </div>
        <button
          className="mt-2 w-full text-xs text-primary underline"
          onClick={() => { onClose(); navigate('/signup'); }}
        >
          아직 계정이 없으신가요? 회원가입
        </button>
      </div>
    </Modal>
  );
}

export function RequiredFieldModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="text-3xl mb-3">⚠️</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">필수 항목을 입력해주세요</h3>
        <p className="text-sm text-gray-500 mb-5">표시된 필수 항목을 모두 입력해야 진행할 수 있어요.</p>
        <button
          className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </Modal>
  );
}

export function SuccessModal({ title, message, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="text-3xl mb-3">✅</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-5">{message}</p>
        <button
          className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </Modal>
  );
}

export function FarmOnlyModal({ onClose }) {
  const navigate = useNavigate();
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="text-3xl mb-3">🌿</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">농가 회원으로 신청하실 수 있어요</h3>
        <p className="text-sm text-gray-500 mb-5">농가 계정으로 로그인하시면 입점 신청을 하실 수 있어요.</p>
        <div className="flex gap-2">
          <button
            className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark"
            onClick={() => { onClose(); navigate('/login'); }}
          >
            로그인하러 가기
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function SellerOnlyModal({ onClose }) {
  const navigate = useNavigate();
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="text-3xl mb-3">🏪</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">판매처 회원으로 문의하실 수 있어요</h3>
        <p className="text-sm text-gray-500 mb-5">판매처 계정으로 로그인하시면 농가에 직접 거래 문의를 보낼 수 있어요.</p>
        <div className="flex gap-2">
          <button
            className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
            onClick={onClose}
          >
            닫기
          </button>
          <button
            className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark"
            onClick={() => { onClose(); navigate('/login'); }}
          >
            로그인하러 가기
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function PremiumModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="text-3xl mb-3">⭐</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">프리미엄 신청이 완료되었습니다</h3>
        <p className="text-sm text-gray-500 mb-5">담당자 검토 후 빠르게 연락드릴게요.</p>
        <button
          className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </Modal>
  );
}
