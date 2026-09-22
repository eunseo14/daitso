import { Link } from 'react-router-dom';
import { RecruitBadge, DeadlineBadge } from '../common/Badge';
import { getDDay } from '../../data/listings';

export default function ListingCard({ listing }) {
  const dDay = getDDay(listing.deadline);

  return (
    <Link to={`/listings/${listing.id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <img
          src={listing.image}
          alt={listing.storeName}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <RecruitBadge type={listing.type} />
            <DeadlineBadge dDay={dDay} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{listing.storeName}</h3>
          <p className="text-xs text-gray-500 mb-1">📍 {listing.location}</p>
          <p className="text-xs text-gray-400 line-clamp-1">모집 품목: {listing.targetItems}</p>
        </div>
      </div>
    </Link>
  );
}
