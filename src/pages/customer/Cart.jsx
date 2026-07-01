import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiShoppingCart, FiHeart, FiChevronRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  updateCartItem,
  removeFromCart,
} from '../../store/slices/cartSlice';
import { toggleWishlistItem } from '../../store/slices/wishlistSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const totalQuantity = useSelector(selectCartItemCount);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [selectedItems, setSelectedItems] = useState(new Set());
  const [voucherCode, setVoucherCode] = useState('');

  const getItemId = (item) => item._id || item.itemId || item.product?._id || item.productId || item.product?.id;

  // Compute selected items info
  const selectedCartItems = useMemo(() => {
    return items.filter(item => selectedItems.has(getItemId(item)));
  }, [items, selectedItems]);

  const selectedSubtotal = useMemo(() => {
    return selectedCartItems.reduce((total, item) => {
      const price = item.product?.salePrice || item.product?.price || item.priceAtAddition || 0;
      return total + (price * item.quantity);
    }, 0);
  }, [selectedCartItems]);

  const selectedQuantity = useMemo(() => {
    return selectedCartItems.reduce((total, item) => total + item.quantity, 0);
  }, [selectedCartItems]);

  const wishlistSet = useMemo(
    () => new Set(wishlistItems.map((item) => item._id || item)),
    [wishlistItems]
  );

  const groupedBySeller = useMemo(() => {
    return items.reduce((groups, item) => {
      const seller = item.product?.brand || item.product?.seller?.name || 'Seller';
      groups[seller] = groups[seller] || [];
      groups[seller].push(item);
      return groups;
    }, {});
  }, [items]);

  const allSelected = items.length > 0 && items.every((item) => selectedItems.has(getItemId(item)));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedItems(new Set());
      return;
    }
    setSelectedItems(new Set(items.map((item) => getItemId(item)).filter(Boolean)));
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const removeSelected = () => {
    selectedItems.forEach((itemId) => dispatch(removeFromCart(itemId)));
    setSelectedItems(new Set());
  };

  const shippingFee = 0; // Set to 0 to match screenshot
  const total = selectedSubtotal + shippingFee;

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) {
      toast.error('Please select at least one item to checkout');
      return;
    }
    navigate('/checkout', { state: { checkoutItems: selectedCartItems } });
  };

  const handleQtyChange = (itemId, newQty) => {
    if (newQty < 1) return;
    dispatch(updateCartItem({ itemId, quantity: newQty }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleToggleWishlist = (productId) => {
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      return;
    }
    dispatch(toggleWishlistItem(productId));
    toast.success('Added to wishlist');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#f5f5f5]">
        <div className="bg-white p-12 rounded-sm shadow-sm flex flex-col items-center gap-4">
          <FiShoppingCart className="text-6xl text-gray-200" />
          <h2 className="text-xl text-gray-600 font-medium">Your cart is empty!</h2>
          <p className="text-sm text-gray-400">Add items to it now.</p>
          <Link to="/" className="bg-primary text-white px-8 py-2.5 rounded-sm hover:bg-primary-dark transition-colors text-sm font-medium">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-4">
      <div className="container mx-auto px-4 max-w-[1100px] flex flex-col lg:flex-row gap-4 items-start">
        {/* Left Column - Cart Items */}
        <div className="flex-1 w-full lg:w-auto">
          {/* Select All Header */}
          <div className="bg-white px-5 py-3 flex items-center justify-between shadow-sm mb-4">
            <label className="inline-flex items-center gap-3 cursor-pointer text-[13px] text-gray-500 uppercase">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded-sm focus:ring-primary"
              />
              SELECT ALL ({items.length} ITEM(S))
            </label>
            <button
              onClick={removeSelected}
              className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-red-500 uppercase"
            >
              <FiTrash2 className="text-lg" /> DELETE
            </button>
          </div>

          {/* Seller Groups */}
          {Object.entries(groupedBySeller).map(([seller, sellerItems]) => (
            <div key={seller} className="bg-white shadow-sm mb-4">
              <div className="px-5 py-3 flex items-center gap-2 border-b border-gray-100 text-[13px] text-gray-800">
                <input
                  type="checkbox"
                  checked={sellerItems.every((item) => selectedItems.has(getItemId(item)))}
                  onChange={() => {
                    const allSellerSelected = sellerItems.every((item) => selectedItems.has(getItemId(item)));
                    setSelectedItems((prev) => {
                      const next = new Set(prev);
                      sellerItems.forEach((item) => {
                        if (allSellerSelected) {
                          next.delete(getItemId(item));
                        } else {
                          next.add(getItemId(item));
                        }
                      });
                      return next;
                    });
                  }}
                  className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded-sm focus:ring-primary"
                />
                <span className="font-medium text-gray-600">{seller}</span>
                <FiChevronRight className="text-gray-400" />
              </div>

              {sellerItems.map((item) => {
                const price = item.product?.salePrice || item.product?.price || item.priceAtAddition || 0;
                const origPrice = item.product?.price || 0;
                const imgSrc = item.product?.images?.[0]?.url || item.product?.images?.[0] || '/cards/card.png';
                const inWishlist = wishlistSet.has(item.product?._id || item.productId);

                return (
                  <div key={getItemId(item)} className="px-5 py-5 flex flex-col md:flex-row gap-4 border-b border-gray-100 last:border-0">
                    {/* Checkbox and Image */}
                    <div className="flex items-start gap-3 w-full md:w-[45%]">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(getItemId(item))}
                        onChange={() => toggleSelectItem(getItemId(item))}
                        className="form-checkbox h-4 w-4 mt-2.5 text-primary border-gray-300 rounded-sm focus:ring-primary"
                      />
                      <img
                        src={imgSrc}
                        alt={item.product?.name}
                        className="w-20 h-20 object-cover border border-gray-100"
                      />
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <Link to={`/product/${item.product?._id || item.productId}`} className="text-sm text-gray-800 hover:text-primary line-clamp-2 leading-[1.3]">
                          {item.product?.name}
                        </Link>
                        <p className="text-[12px] text-gray-400 mt-0.5">
                          No Brand{item.product?.selectedColor ? `, Color family:${item.product.selectedColor.name}` : ''}
                        </p>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex flex-col gap-1 w-full md:w-[25%] md:items-start md:px-2 mt-1 md:mt-0">
                      <div className="flex flex-col">
                        <span className="text-primary text-base font-medium">Rs. {price.toLocaleString()}</span>
                        {origPrice > price && (
                          <span className="text-[12px] text-gray-400 line-through">Rs. {origPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => handleToggleWishlist(item.product?._id || item.productId)}
                          className={`text-[20px] ${inWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                          title="Add to Wishlist"
                        >
                          <FiHeart className={inWishlist ? "fill-current" : ""} />
                        </button>
                        <button
                          onClick={() => handleRemove(getItemId(item))}
                          className="text-[20px] text-gray-400 hover:text-red-500"
                          title="Remove from Cart"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-start justify-end w-full md:w-[30%]">
                      <div className="flex items-center gap-0 border border-transparent rounded-sm bg-gray-100 overflow-hidden">
                        <button
                          onClick={() => handleQtyChange(getItemId(item), item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-200 disabled:opacity-50 text-xl font-light"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center text-[13px] text-gray-800 bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQtyChange(getItemId(item), item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-200 text-xl font-light"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-[340px]">
          <div className="bg-white p-4 shadow-sm">
            <h3 className="text-[16px] text-gray-800 font-medium mb-4">Order Summary</h3>
            
            <div className="space-y-3 text-[14px] text-gray-500 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({selectedCartItems.length} items)</span>
                <span className="text-gray-800">Rs. {selectedSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-gray-800">Rs. {shippingFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2 mb-5">
              <input 
                type="text" 
                placeholder="Enter Voucher Code" 
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:border-primary" 
              />
              <button className="bg-[#2ebdeb] text-white px-6 py-2 text-[13px] font-medium hover:bg-[#20a4ce] transition-colors">
                APPLY
              </button>
            </div>

            <div className="flex justify-between items-center mb-5">
              <span className="text-gray-800 font-medium text-[14px]">Total</span>
              <span className="text-primary text-[18px] font-medium">Rs. {total.toLocaleString()}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-3 font-medium hover:bg-primary-dark transition-colors text-[14px]"
            >
              PROCEED TO CHECKOUT({selectedQuantity})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

