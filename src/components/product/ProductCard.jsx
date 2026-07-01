import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../common/Image';
import Loader from '../common/Loader';
import { FiStar } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  // Support both {url: '...'} objects (MongoDB) and plain strings
  const rawImage = product.images?.[0];
  const imageSrc = imgError
    ? '/cards/card.png'
    : (typeof rawImage === 'string' ? rawImage : rawImage?.url) || '/cards/card.png';

  return (
    <Link to={`/product/${product.slug || product._id || product.id}`} className="group product-card bg-white hover:shadow-lg transition-all overflow-hidden flex flex-col h-full relative border border-gray-100">
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-0 right-0 z-10 bg-[#f57224] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-sm pointer-events-none">
          -{discountPercent}%
        </div>
      )}

      <div className="relative w-full pt-[100%] bg-gray-100 overflow-hidden">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
            <Loader size="sm" />
          </div>
        )}
        <Image
          src={imageSrc}
          alt={product.name || 'Product Image'}
          width={400}
          height={400}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <div className="p-2 flex flex-col flex-grow">
        <h3 className="text-[13px] text-gray-800 line-clamp-2 mb-1 group-hover:text-primary transition-colors leading-tight">
          {product.name}
        </h3>

        <div className="mt-auto">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[15px] text-[#f57224] font-semibold">
              Rs. {(product.salePrice || product.price).toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-gray-400 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <div className="flex text-[#f5a623]">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className={`w-2.5 h-2.5 ${star <= (product.rating?.average || product.rating || 5) ? 'fill-[#f5a623] text-[#f5a623]' : 'fill-gray-200 text-gray-200'}`}
                />
              ))}
            </div>
            <span>({product.reviewsCount || product.rating?.count || 0})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
