import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import {
  selectCartItems,
  selectCartTotal,
  updateCartItem,
  removeFromCart,
} from '../../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const shippingFee = items.length > 0 ? 140 : 0;
  const platformFee = items.length > 0 ? 10 : 0;
  const total = subtotal + shippingFee + platformFee;

  const handleQtyChange = (itemId, newQty) => {
    if (newQty < 1) return;
    dispatch(updateCartItem({ itemId, quantity: newQty }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
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
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Left: Cart Items */}
          <div className="flex-1 space-y-4">

            {/* Shipping & Billing Header */}
            <div className="bg-white shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-gray-800">Shipping &amp; Billing</h2>
                <button className="text-xs text-primary hover:underline font-medium">EDIT</button>
              </div>
              <p className="text-sm text-gray-700 font-medium mb-1">
                User &nbsp;&nbsp;&nbsp; <span className="text-gray-500">03000000000</span>
              </p>
              <div className="flex items-start gap-2">
                <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm mt-0.5 flex-shrink-0">HOME</span>
                <span className="text-xs text-gray-600">Jodia Bazar, Karachi - Jodia Bazar, Sindh</span>
              </div>

              {/* Collection point hint */}
              <div className="mt-4 border border-dashed border-[#0F68C9] rounded-sm p-3 flex items-center justify-between">
                <p className="text-xs text-[#0F68C9]">Collect your parcels from a nearby location at a minimal delivery fee. &gt;</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">6 suggested collection point(s) nearby ⓘ</p>
            </div>

            {/* Package */}
            <div className="bg-white shadow-sm border border-gray-100">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <span className="text-sm text-gray-700 font-medium">Package 1 of 1</span>
                <span className="text-xs text-gray-500">
                  Shipped by <span className="font-semibold text-gray-700">AlMadani Traders</span>
                </span>
              </div>

              {/* Delivery Option */}
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Delivery or Pickup</p>
                <div className="border-2 border-[#0F68C9] rounded-sm p-3 w-fit max-w-[220px]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#0F68C9] flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">Rs. {shippingFee}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-7">Standard Delivery</p>
                  <p className="text-xs text-gray-400 ml-7">Guaranteed by 2-3 Jul</p>
                </div>
              </div>

              {/* Cart Items */}
              {items.map((item) => {
                const price = item.product?.salePrice || item.product?.price || item.priceAtAddition || 0;
                const origPrice = item.product?.price || 0;
                const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;

                return (
                  <div key={item._id} className="flex items-center gap-4 px-5 py-5 border-b border-gray-50 last:border-0">
                    <img
                      src={item.product?.images?.[0]?.url || '/cards/card.png'}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 line-clamp-2 mb-1">{item.product?.name}</p>
                      {item.product?.brand && (
                        <p className="text-xs text-gray-400">{item.product.brand}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-right min-w-[80px]">
                      <p className="text-sm font-medium text-primary">Rs. {price.toLocaleString()}</p>
                      {discount > 0 && (
                        <>
                          <p className="text-xs text-gray-400 line-through">Rs. {origPrice.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">-{discount}%</p>
                        </>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      {/* Qty control */}
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button
                          onClick={() => handleQtyChange(item._id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-800 text-sm"
                        >-</button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleQtyChange(item._id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-800 text-sm"
                        >+</button>
                      </div>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-4">

            {/* Promo Code */}
            <div className="bg-white shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-medium text-gray-800 mb-3">Promotion</h3>
              <div className="flex gap-0">
                <input
                  type="text"
                  placeholder="Enter Store/Daraz Code"
                  className="flex-1 border border-gray-300 px-3 py-2.5 text-xs focus:outline-none focus:border-primary rounded-l-sm"
                />
                <button className="bg-[#0F68C9] text-white text-xs font-semibold px-4 py-2.5 hover:bg-blue-700 transition-colors rounded-r-sm">
                  APPLY
                </button>
              </div>
            </div>

            {/* Invoice & Contact */}
            <div className="bg-white shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-800">Invoice and Contact Info</h3>
                <button className="text-xs text-primary hover:underline">Edit</button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-medium text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Items Total ({items.length} items)</span>
                  <span className="text-gray-800">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="text-gray-800">Rs. {shippingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1">Platform Fee <span className="text-gray-400 text-xs">ⓘ</span></span>
                  <span className="text-gray-800">Rs. {platformFee}</span>
                </div>
                <div className="border-t border-gray-100 pt-2.5 flex justify-between font-medium">
                  <span className="text-gray-800">Total:</span>
                  <span className="text-primary text-base font-semibold">Rs. {total.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray-400 text-right">VAT included, where applicable</p>
              </div>

              <button
                onClick={() => navigate('/checkout/payment')}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-sm transition-colors mt-4 text-sm"
              >
                Proceed to Pay
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
