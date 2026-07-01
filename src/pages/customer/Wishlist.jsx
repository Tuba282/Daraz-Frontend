import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);

  const [activeTab, setActiveTab] = useState('wishlist');
  const [deleteModal, setDeleteModal] = useState({ open: false, productId: null, productName: '' });
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleDeleteClick = (productId, productName) => {
    setDeleteModal({ open: true, productId, productName });
  };

  const handleConfirmRemove = async () => {
    const { productId } = deleteModal;
    setRemoving(productId);
    try {
      await dispatch(removeFromWishlist(productId)).unwrap();
      toast.success('Item removed from wishlist');
    } catch {
      toast.error('Failed to remove item');
    } finally {
      setRemoving(null);
      setDeleteModal({ open: false, productId: null, productName: '' });
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      productId: product._id,
      quantity: 1,
      product,
    }));
    toast.success('Added to cart');
  };

  const tabs = [
    { id: 'wishlist', label: `My Wishlist (${items.length})` },
    { id: 'purchases', label: 'Past Purchases' },
    { id: 'stores', label: 'Followed Stores' },
  ];

  return (
    <div className="space-y-0">
      <h1 className="text-2xl font-normal text-gray-800 mb-4">
        My Wishlist &amp; Followed Stores ({items.length})
      </h1>

      <div className="bg-white shadow-sm border border-gray-100">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-[#0F68C9] border-b-2 border-[#0F68C9]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Add All to Cart */}
        {activeTab === 'wishlist' && items.length > 0 && (
          <div className="px-5 py-3 border-b border-gray-100">
            <button
              onClick={() => items.forEach((p) => handleAddToCart(p))}
              className="text-[#0F68C9] text-sm font-semibold hover:underline uppercase tracking-wide"
            >
              ADD ALL TO CART
            </button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <Loader size="md" />
          </div>
        ) : activeTab !== 'wishlist' ? (
          <div className="py-16 flex flex-col items-center justify-center text-gray-400">
            <FiHeart className="text-5xl mb-4" />
            <p className="text-sm">No {activeTab === 'purchases' ? 'past purchases' : 'followed stores'} yet.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center gap-4">
            <FiHeart className="text-5xl text-gray-200" />
            <p className="text-gray-500 text-base font-medium">Your wishlist is empty!</p>
            <p className="text-gray-400 text-sm">Add items you love to your wishlist.</p>
            <Link to="/" className="bg-[#f57224] text-white px-8 py-2.5 text-sm font-medium hover:bg-[#d05c1b] transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((product) => {
              const productId = product._id || product;
              const name = product.name || 'Product';
              const image = product.images?.[0] || '/cards/card.png';
              const price = product.salePrice || product.price || 0;
              const brand = product.brand || product.vendor?.storeName || '';

              return (
                <div key={productId} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  {/* Product Image */}
                  <Link to={`/product/${product.slug || productId}`} className="flex-shrink-0">
                    <img
                      src={image}
                      alt={name}
                      className="w-[100px] h-[100px] object-cover border border-gray-100"
                      onError={(e) => { e.target.src = '/cards/card.png'; }}
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    {brand && (
                      <p className="text-xs text-gray-400 mb-1">{brand}</p>
                    )}
                    <Link
                      to={`/product/${product.slug || productId}`}
                      className="text-sm text-gray-700 hover:text-[#0F68C9] line-clamp-2 leading-snug"
                    >
                      {name}
                    </Link>
                    {product.color && (
                      <p className="text-xs text-gray-400 mt-1">Color: {product.color}</p>
                    )}

                    {/* Delete icon */}
                    <button
                      onClick={() => handleDeleteClick(productId, name)}
                      className="mt-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <span className="text-base font-medium text-[#f57224]">
                      Rs. {price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 bg-[#f57224] hover:bg-[#d05c1b] text-white px-4 py-2 text-xs font-semibold transition-colors"
                    >
                      <FiShoppingCart /> ADD TO CART
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDeleteModal({ open: false, productId: null, productName: '' })}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-sm shadow-2xl w-[400px] mx-4 p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-2">Remove from wishlist</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this item?</p>

            <div className="flex items-center justify-end gap-6">
              <button
                onClick={() => setDeleteModal({ open: false, productId: null, productName: '' })}
                className="text-sm text-gray-500 font-medium hover:text-gray-700 uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                disabled={removing === deleteModal.productId}
                className="text-sm text-[#0F68C9] font-semibold hover:text-[#0a4e9a] uppercase disabled:opacity-50"
              >
                {removing === deleteModal.productId ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
