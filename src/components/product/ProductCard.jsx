import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../common/Image';
import Loader from '../common/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlistItem } from '../../store/slices/wishlistSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const inWishlist = wishlistItems.some(item => (item._id || item) === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link click
    dispatch(addToCart({ productId: product._id, quantity: 1, product }))
      .unwrap()
      .then(() => toast.success('Added to cart'))
      .catch(() => toast.error('Failed to add to cart'));
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to use wishlist');
      return;
    }
    dispatch(toggleWishlistItem(product._id));
  };

  // Calculate discount
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Link to={`/product/${product.slug}`} className="group product-card bg-white hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full relative">

      {/* Badges - Commented out as per new layout
      {hasDiscount && (
        <div className="absolute top-2 left-2 z-10 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
          -{discountPercent}%
        </div>
      )}
      */}

      {/* Image Container */}
      <div className="relative w-full pt-[100%] bg-gray-100 overflow-hidden">
        {/* Shimmer skeleton - shows while image is loading */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
            <Loader size="sm" />
          </div>
        )}
        {/* Actual product image */}
        <Image
          src={imgError ? '/cards/card.png' : (product.images[0]?.url || '/cards/card.png')} 
          alt={product.name || 'Product Image'}
          width={400}
          height={400}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Quick Actions overlay - Commented out as per new layout
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button 
            onClick={handleToggleWishlist}
            className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
          >
            <FiHeart className={inWishlist ? "fill-red-500 text-red-500" : ""} />
          </button>
        </div>
        */}
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 flex flex-col flex-grow">
        <h3 className="text-[13px] sm:text-sm text-gray-800 line-clamp-2 mb-1 group-hover:text-primary transition-colors leading-tight">
          {product.name}
        </h3>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-lg sm:text-xl text-primary font-normal">
              Rs.{product.salePrice || product.price}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-500 ml-1">
                -{discountPercent}%
              </span>
            )}

            {/* Old price - Commented out
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                Rs. {product.price}
              </span>
            )}
            */}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar key={star} className="fill-yellow-400 w-2.5 h-2.5 sm:w-3 sm:h-3" />
                ))}
              </div>
              <span className="text-gray-400 text-[11px] sm:text-xs">({product.numReviews || 0})</span>
            </div>

            {/* Add to cart - Commented out
            <button 
              onClick={handleAddToCart}
              className="text-primary hover:text-primary-dark p-1 rounded-full hover:bg-orange-50 transition-colors"
              title="Add to cart"
            >
              <FiShoppingCart className="text-lg" />
            </button>
            */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
