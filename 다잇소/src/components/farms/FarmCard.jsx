import { Link } from 'react-router-dom';
import { CertBadge } from '../common/Badge';

export default function FarmCard({ farm }) {
  return (
    <Link to={`/farms/${farm.id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <img
          src={farm.heroImage}
          alt={farm.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs text-gray-400">📍 {farm.location}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{farm.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{farm.tagline}</p>
          <div className="flex flex-wrap gap-1">
            {farm.certs.map(cert => (
              <CertBadge key={cert} type={cert} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
