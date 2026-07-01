import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectCartItems } from '../../store/slices/cartSlice';
import { FiChevronRight, FiCheckCircle } from 'react-icons/fi';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector(selectCartItems);
  
  // Use checkoutItems passed from Buy Now or Cart Proceed, otherwise fallback to cart
  const items = location.state?.checkoutItems || cartItems;

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      const price = item.product?.salePrice || item.product?.price || item.priceAtAddition || 0;
      return total + (price * item.quantity);
    }, 0);
  }, [items]);

  const totalQuantity = useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  const { user } = useSelector((state) => state.auth);

  const deliveryFee = items.length > 0 ? 140 : 0;
  const platformFee = items.length > 0 ? 10 : 0;
  const total = subtotal + deliveryFee + platformFee;

  const groupedBySeller = useMemo(() => {
    return items.reduce((groups, item) => {
      const seller = item.product?.brand || item.product?.seller?.name || 'Seller';
      groups[seller] = groups[seller] || [];
      groups[seller].push(item);
      return groups;
    }, {});
  }, [items]);

  const defaultAddress = user?.address || "Serai quarters ,jaswani street, jodia bazar, Jodia Bazar, Karachi - Jodia Bazar, Sindh";
  const defaultPhone = user?.phone || "3130260559";
  const defaultName = user?.name || "Bushra";

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 bg-[#f5f5f5]">
        <h2 className="text-xl text-gray-600 font-medium">Your cart is empty!</h2>
        <button onClick={() => navigate('/')} className="bg-primary text-white px-8 py-2.5 rounded-sm hover:bg-primary-dark transition-colors text-sm font-medium">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-4">
      <div className="container mx-auto px-4 max-w-[1200px] flex flex-col lg:flex-row gap-4 items-start">
        
        {/* Left Column */}
        <div className="flex-1 w-full lg:w-auto ">
          {/* Shipping & Billing Address */}
          <div className="bg-white border border-gray-100 my-3  shadow-sm mb-4">
            <div className="px-5 py-3 border-b bg-gray-50 border-gray-100 flex justify-between items-center">
              <span className="text-[13px] font-medium text-gray-600">Shipping & Billing</span>
              <button className="text-[12px] text-[#2ebdeb] uppercase font-medium hover:underline">EDIT</button>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-center gap-4 text-[13px] text-gray-800 mb-2">
                <span className="font-medium">{defaultName}</span>
                <span>{defaultPhone}</span>
              </div>
              <div className="flex items-start gap-2 text-[13px] text-gray-600">
                <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-sm flex-shrink-0 mt-0.5">HOME</span>
                <p>{defaultAddress}</p>
              </div>
            </div>
            <div className="mx-5 py-3 mb-4 border border-[#2ebdeb] border-dashed rounded-sm p-3 bg-[#f0fbff] flex justify-between items-center cursor-pointer hover:bg-[#e6f8ff] transition-colors">
              <div>
                <p className="text-[#2ebdeb] text-[13px] font-medium mb-1">Collect your parcels from a nearby location at a minimal delivery fee.</p>
                <p className="text-[11px] text-gray-500">6 suggested collection point(s) nearby</p>
              </div>
              <FiChevronRight className="text-[#2ebdeb]" />
            </div>
          </div>

          {/* Packages */}
          {Object.entries(groupedBySeller).map(([seller, sellerItems], index) => (
            <div key={seller} className="bg-white shadow-sm mb-4 border border-gray-100">
              <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <span className="text-[13px] font-medium text-gray-800">Package {index + 1} of {Object.keys(groupedBySeller).length}</span>
                <span className="text-[11px] text-gray-500">Shipped by <span className="font-medium text-gray-800">{seller}</span></span>
              </div>
              
              <div className="px-5 py-4 flex flex-col gap-6">
                {/* Delivery Option */}
                <div className="w-full md:w-[280px] flex-shrink-0">
                  <p className="text-[12px] text-gray-500 mb-2">Delivery or Pickup</p>
                  <div className="border border-[#2ebdeb] rounded-sm p-4 relative bg-[#f0fbff]/30">
                    <div className="flex gap-2">
                      <FiCheckCircle className="text-[#2ebdeb] text-lg mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[13px] text-gray-800 font-medium">Rs. {deliveryFee.toLocaleString()}</span>
                        </div>
                        <p className="text-[13px] text-gray-700">Standard Delivery</p>
                        <p className="text-[11px] text-gray-500 mt-4">Guaranteed by 5-6 Jul</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items in Package */}
                <div className="flex-1 space-y-4">
                  {sellerItems.map((item) => {
                    const price = item.product?.salePrice || item.product?.price || item.priceAtAddition || 0;
                    const origPrice = item.product?.price || 0;
                    const discount = origPrice > price ? Math.round(((origPrice - price) / origPrice) * 100) : 0;
                    const imgSrc = item.product?.images?.[0]?.url || item.product?.images?.[0] || '/cards/card.png';

                    return (
                      <div key={item._id || item.productId} className="flex gap-4">
                        <img src={imgSrc} alt={item.product?.name} className="w-20 h-20 object-cover border border-gray-100 rounded-sm" />
                        <div className="flex-1 flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1 md:pr-4">
                            <p className="text-[13px] text-gray-800 line-clamp-2 leading-tight hover:text-primary cursor-pointer mb-1">
                              {item.product?.name}
                            </p>
                            <p className="text-[12px] text-gray-500">
                              No Brand{item.product?.selectedColor ? `, Color family:${item.product.selectedColor.name}` : ''}
                            </p>
                          </div>
                          <div className="flex flex-row md:flex-row justify-between md:items-start w-full md:w-[250px] flex-shrink-0">
                            <div className="text-left md:text-left flex-1">
                              <p className="text-[14px] text-[#f57224] font-medium">Rs. {price.toLocaleString()}</p>
                              {origPrice > price && (
                                <p className="text-[12px] text-gray-400 line-through mt-0.5">Rs. {origPrice.toLocaleString()}</p>
                              )}
                              {discount > 0 && (
                                <p className="text-[12px] text-gray-800 mt-0.5">-{discount}%</p>
                              )}
                            </div>
                            <span className="text-[13px] text-gray-600">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-[340px] flex-shrink-0">
          {/* Promotion */}
          <div className="bg-white shadow-sm mb-4 p-4 border border-gray-100">
            <h3 className="text-[13px] font-medium text-gray-800 mb-3">Promotion</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter Store/Daraz Code" 
                className="flex-1 border border-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:border-primary rounded-sm" 
              />
              <button className="bg-[#2ebdeb] text-white px-5 py-2 text-[13px] font-medium hover:bg-[#20a4ce] transition-colors rounded-sm">
                APPLY
              </button>
            </div>
          </div>

          {/* Invoice */}
          <div className="bg-white shadow-sm mb-4 p-4 border border-gray-100 flex justify-between items-center">
            <h3 className="text-[13px] font-medium text-gray-800">Invoice and Contact Info</h3>
            <button className="text-[12px] text-[#2ebdeb] uppercase font-medium hover:underline">Edit</button>
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-sm p-4 border border-gray-100">
            <h3 className="text-[15px] font-medium text-gray-800 mb-4">Order Summary</h3>
            
            <div className="space-y-3 text-[13px] text-gray-500 mb-6">
              <div className="flex justify-between">
                <span>Items Total ({totalQuantity} items)</span>
                <span className="text-gray-800">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-gray-800">Rs. {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">Platform Fee <span className="text-gray-400 bg-gray-100 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">?</span></span>
                <span className="text-gray-800">Rs. {platformFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-1">
              <span className="text-gray-800 font-medium text-[14px]">Total:</span>
              <span className="text-primary text-[18px] font-semibold">Rs. {total.toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-gray-400 text-right mb-4">VAT included, where applicable</p>

            <button
              onClick={() => navigate('/checkout/payment')}
              className="w-full bg-primary text-white py-3 rounded-sm font-medium hover:bg-primary-dark transition-colors text-[14px]"
            >
              Proceed to Pay
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
