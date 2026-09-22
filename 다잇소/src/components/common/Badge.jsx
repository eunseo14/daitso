export function CertBadge({ type }) {
  const map = {
    HACCP: { label: 'HACCP', color: 'bg-blue-100 text-blue-700' },
    무항생제: { label: '무항생제', color: 'bg-green-100 text-green-700' },
    '깨끗한 축산농장': { label: '깨끗한 축산농장', color: 'bg-amber-100 text-amber-700' },
  };
  const config = map[type] || { label: type, color: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}

export function RecruitBadge({ type }) {
  const map = {
    상시입점: { color: 'bg-primary-light text-primary' },
    판촉행사: { color: 'bg-orange-100 text-orange-700' },
    특판전: { color: 'bg-purple-100 text-purple-700' },
  };
  const config = map[type] || { color: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${config.color}`}>
      {type}
    </span>
  );
}

export function DeadlineBadge({ dDay }) {
  const color = dDay <= 3 ? 'bg-red-100 text-red-600' : dDay <= 7 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500';
  const label = dDay === 0 ? 'D-day' : dDay < 0 ? '마감' : `D-${dDay}`;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      {label}
    </span>
  );
}

export function PromotedBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-white shadow-sm">
      ⭐ 추천
    </span>
  );
}
