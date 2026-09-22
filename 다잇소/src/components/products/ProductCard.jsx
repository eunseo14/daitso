import { Link } from 'react-router-dom';
import { CertBadge, PromotedBadge } from '../common/Badge';

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.promoted && (
            <div className="absolute top-2 left-2">
              <PromotedBadge />
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-400 mb-1">{product.farmName}</p>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.tagline}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {product.certs.map(cert => (
              <CertBadge key={cert} type={cert} />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{product.volume}</span>
            <span className="font-bold text-primary text-base">
              {product.price.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
