import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../common/Image';
import Loader from '../common/Loader';
import { FiStar } from 'react-icons/fi';

const ProductListCard = ({ product }) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const rawImage = product.images?.[0];
  const imageSrc = imgError
    ? '/cards/card.png'
    : (typeof rawImage === 'string' ? rawImage : rawImage?.url) || '/cards/card.png';

  // Extract bullets from description if available, else mock some based on title
  const descriptionBullets = product.description 
    ? product.description.substring(0, 150).split('\n').filter(b => b.trim().length > 0).slice(0, 3)
    : [
        "High quality material, durable and practical to use.",
        "Perfect fit for your device, providing excellent protection.",
        "Easy to use, lightweight, elegant construction and stitching."
      ];

  return (
    <Link to={`/product/${product.slug || product._id || product.id}`} className="group flex flex-col sm:flex-row bg-white hover:shadow-md transition-all overflow-hidden border border-gray-100 p-3 sm:p-4 gap-4 mb-2">
      {/* Image Container */}
      <div className="relative w-full sm:w-[200px] h-[200px] flex-shrink-0 bg-gray-100 overflow-hidden">
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

      {/* Middle Details */}
      <div className="flex flex-col flex-1 py-1">
        <h3 className="text-[15px] sm:text-[16px] text-gray-800 line-clamp-2 mb-1 group-hover:text-primary transition-colors leading-snug">
          {/* Mocking a badge like 7.7 as in the image */}
          <span className="inline-flex bg-primary text-white text-[10px] font-bold px-1 py-0.5 rounded-sm mr-2 align-middle">
            Mall
          </span>
          {product.name}
        </h3>

        {/* Mock promotional text */}
        <div className="text-[12px] text-[#f57224] mb-1">
          Coins save Rs. 15
        </div>

        {/* Ratings and Sales */}
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-gray-500 mb-1">
          {(product.totalSold || 0) > 0 && (
            <>
              <span className="text-gray-700">{product.totalSold || 0} sold</span>
              <span className="text-gray-300">|</span>
            </>
          )}
          <div className="flex items-center gap-1">
            <div className="flex text-[#f5a623]">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className={`w-3 h-3 ${star <= (product.rating?.average || product.rating || 5) ? 'fill-[#f5a623] text-[#f5a623]' : 'fill-gray-200 text-gray-200'}`}
                />
              ))}
            </div>
            <span>({product.reviewsCount || product.rating?.count || 0})</span>
          </div>
        </div>

        {/* Location mock */}
        <div className="text-[12px] text-gray-400 mb-3">
          Sindh
        </div>

        {/* Bullets */}
        <ul className="list-disc list-inside text-[12px] text-gray-500 space-y-1 mt-auto hidden sm:block">
          {descriptionBullets.map((bullet, idx) => (
            <li key={idx} className="line-clamp-1">{bullet.replace(/<[^>]*>?/gm, '')}</li>
          ))}
        </ul>
      </div>

      {/* Right Side - Price */}
      <div className="flex flex-col items-end sm:w-[150px] flex-shrink-0 sm:pt-4">
        <div className="text-[20px] text-[#f57224] font-semibold leading-none mb-1">
          Rs. {(product.salePrice || product.price).toLocaleString()}
        </div>
        {hasDiscount && (
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-400 line-through">
              Rs. {product.price.toLocaleString()}
            </span>
            <span className="text-[12px] text-gray-800">
              -{discountPercent}%
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductListCard;
