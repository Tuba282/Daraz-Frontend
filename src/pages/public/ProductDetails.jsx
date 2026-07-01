import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiChevronRight, FiShare2, FiHeart, FiMinus, FiPlus, FiMessageSquare, FiMapPin, FiTruck, FiShield, FiThumbsUp, FiInfo, FiCheck, FiRefreshCcw } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlistItem, selectIsInWishlist } from '../../store/slices/wishlistSlice';
import toast from 'react-hot-toast';
import { generateProduct, productList } from '../../data/products';
import ProductCard from '../../components/product/ProductCard';
import { getDynamicDescription } from '../../utils/productDescriptions';

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg key={i} className={`w-3.5 h-3.5 ${i <= rating ? 'text-[#f5a623]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    );
  }
  return stars;
};

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const product = generateProduct(id || 'product');
  
  // Make the related products dynamic based on the current product ID
  const idValue = String(product.id || product._id || '1').replace(/\D/g, '');
  const seedNum = idValue ? parseInt(idValue, 10) : 1;
  const filteredList = productList.filter(p => String(p.id) !== String(product.id) && String(p.slug) !== String(product.slug));
  const offset = seedNum % Math.max(1, filteredList.length - 6);
  
  const relatedProducts = filteredList
    .slice(offset, offset + 6)
    .map(p => generateProduct(p.id));
    
  const productId = product._id || product.id;
  const isRealProduct = typeof productId === 'string' && productId.length === 24;
  const isWishlisted = useSelector((state) => selectIsInWishlist(state, productId));

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      return;
    }
    if (!isRealProduct) {
      toast.error('Only real database products can be wishlisted');
      return;
    }
    try {
      const res = await dispatch(toggleWishlistItem(productId)).unwrap();
      toast.success(res.inWishlist ? 'Added to wishlist!' : 'Removed from wishlist');
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [showMoreSpecs, setShowMoreSpecs] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedColor(product.selectedColor || product.colors?.[0]);
    setSelectedQuality(product.selectedQuality || product.qualities?.[0]);
  }, [id, product.selectedColor, product.selectedQuality]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ 
      productId: product.id, 
      quantity: qty, 
      product: { ...product, price: product.price } 
    }));
    setShowCartModal(true);
  };

  const handleBuyNow = () => {
    // Optionally add to cart, but usually buy now takes directly to checkout
    dispatch(addToCart({ 
      productId: product.id, 
      quantity: qty, 
      product: { ...product, price: product.salePrice || product.price } 
    }));
    
    const checkoutItem = {
      _id: 'buy-now-' + Date.now(),
      productId: product.id,
      quantity: qty,
      product: { ...product, price: product.salePrice || product.price }
    };
    
    navigate('/checkout', { state: { checkoutItems: [checkoutItem] } });
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-10 relative">
      {/* Added to Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-sm shadow-2xl w-full max-w-xl mx-4 overflow-hidden animate-fade-in relative">
            <button 
              onClick={() => setShowCartModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              ✕
            </button>
            <div className="p-8 flex items-center gap-3 border-b border-gray-100">
              <FiCheck className="text-white bg-green-500 rounded-full p-1 w-6 h-6 flex-shrink-0" />
              <span className="text-green-600 text-lg font-medium">Added to cart successfully!</span>
            </div>
            {/* Modal Body for next steps if needed */}
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3 text-xs text-gray-500 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="text-blue-600 hover:underline">Home Appliances</Link>
        <FiChevronRight className="text-gray-400" />
        <Link to="/" className="text-blue-600 hover:underline">Cooling &amp; Heating</Link>
        <FiChevronRight className="text-gray-400" />
        <Link to="/" className="text-blue-600 hover:underline">Air Conditioning</Link>
        <FiChevronRight className="text-gray-400" />
        <Link to="/" className="text-blue-600 hover:underline">Air Conditioners</Link>
        <FiChevronRight className="text-gray-400" />
        <span className="text-gray-500 truncate max-w-xs">{product.title}</span>
      </div>

      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="bg-white flex flex-col lg:flex-row shadow-sm">
          {/* Images & Details */}
          <div className="flex-1 flex flex-col md:flex-row p-4 border-r border-gray-100">
            {/* Image Gallery */}
            <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-4">
              <div className="w-full aspect-square border border-gray-200 p-2">
                <img src={product.images[activeImage]} alt={product.title} className="w-full h-full object-contain" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    onMouseEnter={() => setActiveImage(idx)}
                    className={`w-14 h-14 border cursor-pointer p-1 flex-shrink-0 ${activeImage === idx ? 'border-primary' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 md:px-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2 mb-2">
                {product.isFlashSale && <span className="bg-[#f85606] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Flash Sale</span>}
                <span className="bg-purple-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Daraz Mall</span>
              </div>
              <h1 className="text-[22px] leading-tight text-gray-800 font-medium mb-3">{product.title}</h1>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="flex text-[#f5a623] text-sm">
                      {renderStars(Math.round(product.rating))}
                    </div>
                    <span className="text-blue-600 text-sm hover:underline cursor-pointer ml-1">{product.reviewsCount} Ratings</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-xl">
                  <FiShare2 className="cursor-pointer hover:text-gray-600" />
                  <button onClick={handleWishlistToggle} className="focus:outline-none">
                    <FiHeart
                      className={`cursor-pointer transition-colors ${
                        isWishlisted ? 'fill-red-500 text-red-500' : 'hover:text-red-400'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-6">
                Brand: <Link to="/" className="text-blue-600 hover:underline">{product.brand}</Link> | <Link to="/" className="text-blue-600 hover:underline">More {product.subCategory} from {product.brand}</Link>
              </div>

              {/* Price Section (Flash Sale Styling) */}
              <div className="mb-6 rounded-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#f85606] to-[#ff7d40] text-white flex justify-between items-center px-4 py-3">
                   <div className="flex items-end gap-3">
                     <span className="text-3xl font-semibold leading-none">Rs. {product.salePrice.toLocaleString()}</span>
                     <div className="flex flex-col">
                       <span className="text-sm line-through opacity-80 leading-none mb-1">Rs. {product.price.toLocaleString()}</span>
                       <span className="text-xs font-semibold leading-none">-{product.discount}%</span>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="text-xs uppercase font-medium opacity-90 mb-1">Flash Sale ending in</div>
                     <div className="flex items-center gap-1 text-sm font-bold">
                       <span className="bg-white text-[#f85606] px-1.5 py-0.5 rounded-sm">11</span>
                       <span>:</span>
                       <span className="bg-white text-[#f85606] px-1.5 py-0.5 rounded-sm">45</span>
                       <span>:</span>
                       <span className="bg-white text-[#f85606] px-1.5 py-0.5 rounded-sm">59</span>
                     </div>
                   </div>
                </div>
              </div>

              {/* Promotions */}
              <div className="flex items-start gap-4 mb-6">
                <span className="text-sm text-gray-500 w-16">Promotions</span>
                <div className="flex-1 flex gap-2">
                  <span className="border border-[#f85606] text-[#f85606] bg-orange-50 text-[11px] font-medium px-2 py-1 rounded-sm">Min. Spend Rs. 4,999 Capped at Rs. 200</span>
                </div>
              </div>

              <div className="mb-4 text-sm text-gray-600 border-t border-gray-100 pt-4">{product.description}</div>

              <div className="mb-6">
                <span className="text-sm text-gray-500 mr-4">Color Family</span>
                <span className="text-sm font-medium text-gray-800">{selectedColor?.name || 'Standard'}</span>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {(product.colors || []).map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 border px-3 py-2 text-sm rounded-sm ${selectedColor?.name === color.name ? 'border-primary bg-orange-50' : 'border-gray-200'}`}
                    >
                      <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.hex, borderColor: color.border }} />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <span className="text-sm text-gray-500 mr-4">Quality</span>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {(product.qualities || []).map((quality) => (
                    <button
                      key={quality}
                      onClick={() => setSelectedQuality(quality)}
                      className={`border px-3 py-2 text-sm rounded-sm ${selectedQuality === quality ? 'border-primary bg-orange-50 text-primary' : 'border-gray-200 text-gray-700'}`}
                    >
                      {quality}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm text-gray-500 mr-6">Quantity</span>
                <div className="flex items-center">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-8 h-8 bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-500 transition-colors"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center text-sm">{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="w-8 h-8 bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-500 transition-colors"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#2abbe8] text-white font-medium py-3 rounded-sm hover:bg-[#1f9ec9] transition-colors"
                >
                  Buy Now
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-white font-medium py-3 rounded-sm hover:bg-primary-dark transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Delivery & Warranty */}
          <div className="w-full lg:w-[340px] bg-gray-50/50 p-4">
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                <span className="font-medium text-gray-600">Delivery Options</span>
                <FiInfo className="text-lg cursor-pointer hover:text-gray-800" />
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <FiMapPin className="text-gray-400 text-xl mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">Sindh, Karachi - Jodia Bazar, Jodia Bazar</p>
                  </div>
                  <button className="text-sm text-[#0F68C9] font-medium hover:underline uppercase">Change</button>
                </div>

                <div className="flex gap-3 border-t border-gray-200 pt-4">
                  <FiTruck className="text-gray-400 text-xl mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-800 font-medium">Standard Delivery</p>
                      <p className="text-sm font-semibold">FREE</p>
                    </div>
                    <p className="text-xs text-gray-500">Guaranteed by 13-20 Jul</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-xl">💵</span>
                  <p className="text-sm text-gray-800">Cash on Delivery Available</p>
                </div>
              </div>
            </div>

            <div className="mb-6 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                <span className="font-medium text-gray-600">Return & Warranty</span>
                <FiInfo className="text-lg cursor-pointer hover:text-gray-800" />
              </div>
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <FiRefreshCcw className="text-gray-400 text-xl" />
                  <p className="text-sm text-gray-800">14 days easy return</p>
                </div>
                <div className="flex gap-3 items-center">
                  <FiShield className="text-gray-400 text-xl" />
                  <p className="text-sm text-gray-800">10 Years Brand Warranty</p>
                </div>
              </div>
            </div>

            <div className="mb-6 border border-gray-200 bg-white p-2 flex items-center gap-2 rounded-sm shadow-sm">
              <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                <img src="/others/daraz-qr.png" alt="QR" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-center flex-1 text-center border border-orange-100 bg-orange-50/30 p-2 rounded-sm">
                 <img src="/logp.png" alt="Daraz" className="h-6 mb-1" />
                 <p className="text-[10px] text-gray-500 leading-tight">Download app to enjoy exclusive discounts!</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
               <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                 <span className="font-medium text-gray-600">Sold by</span>
               </div>
               <div className="flex items-center justify-between mb-4">
                 <div>
                   <p className="text-base text-gray-800 font-medium mb-1">{product.seller.name}</p>
                   <span className="bg-purple-900 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-semibold italic">Mall Flagship Store</span>
                 </div>
                 <button className="flex items-center gap-1 text-sm text-[#0F68C9] font-medium hover:underline">
                   <FiMessageSquare /> Chat Now
                 </button>
               </div>
               
               <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                 <div className="flex flex-col border-r border-gray-200 pr-4">
                   <span className="text-[11px] text-gray-400 mb-1">Positive Seller Ratings</span>
                   <span className="text-2xl font-light text-gray-800">{product.seller.rating}</span>
                 </div>
                 <div className="flex flex-col border-r border-gray-200 px-4">
                   <span className="text-[11px] text-gray-400 mb-1">Ship on Time</span>
                   <span className="text-2xl font-light text-gray-800">{product.seller.shippingPerformance}</span>
                 </div>
                 <div className="flex flex-col pl-4">
                   <span className="text-[11px] text-gray-400 mb-1">Chat Response Rate</span>
                   <span className="text-sm font-medium text-gray-300">Not enough data</span>
                 </div>
               </div>

               <div className="mt-4 text-center">
                 <Link to="/" className="text-sm font-medium text-[#0F68C9] hover:underline uppercase">GO TO STORE</Link>
               </div>
            </div>
          </div>
        </div>


        {/* Product Details Section */}
        <div className="bg-white mt-4 shadow-sm p-6">
          <h2 className="text-lg font-medium bg-gray-50 px-4 py-3 border border-gray-100 text-gray-800 mb-4">Product details of {product.title}</h2>
          
          <div className={`relative overflow-hidden transition-all duration-500 ${showMoreSpecs ? 'max-h-[5000px]' : 'max-h-[450px]'}`}>
            <div className="mb-6 px-4 mt-2">
              {getDynamicDescription(product)}
            </div>

            <div className="text-sm text-gray-600 leading-loose mb-6 px-4 space-y-8">
              <hr className="border-gray-200" />

              {/* Technical Specifications */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Technical Specifications</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-200 text-sm">
                    <tbody>
                      {[
                        ['Product Type', 'True Wireless Stereo (TWS) Bluetooth Earbuds'],
                        ['Bluetooth Version', 'Bluetooth 5.3'],
                        ['Bluetooth Profiles', 'HFP, HSP, A2DP, AVRCP'],
                        ['Wireless Range', 'Up to 10 meters (33 feet)'],
                        ['Driver Size', '10mm Dynamic Drivers'],
                        ['Frequency Response', '20Hz – 20kHz'],
                        ['Audio Quality', 'Hi-Fi Stereo Sound'],
                        ['Microphone', 'Dual HD Microphones'],
                        ['Noise Cancellation', 'ENC (Environmental Noise Cancellation)'],
                        ['Touch Controls', 'Yes'],
                        ['Voice Assistant Support', 'Google Assistant & Siri'],
                        ['Gaming Mode', 'Yes'],
                        ['Auto Pairing', 'Yes'],
                        ['Auto Power On/Off', 'Yes'],
                        ['Water Resistance', 'IPX5'],
                        ['Earbud Battery', '40mAh × 2'],
                        ['Charging Case Battery', '300mAh'],
                        ['Music Playback', 'Up to 6 Hours'],
                        ['Talk Time', 'Up to 5 Hours'],
                        ['Total Battery Backup', 'Up to 30 Hours (with Charging Case)'],
                        ['Charging Time', '1.5–2 Hours'],
                        ['Charging Interface', 'USB Type-C'],
                        ['Standby Time', 'Up to 120 Hours'],
                        ['Material', 'Premium ABS Plastic + Silicone Ear Tips'],
                        ['Weight', 'Approximately 45g (Including Charging Case)'],
                        ['Available Colors', 'Black, White, Blue, Pink'],
                      ].map(([key, val], idx) => (
                        <tr key={idx} className="border-b border-gray-200">
                          <td className="bg-gray-50 py-2 px-4 font-medium text-gray-700 w-1/3">{key}</td>
                          <td className="py-2 px-4 text-gray-600">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <hr className="border-gray-200" />

              {/* Premium Audio Performance */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Premium Audio Performance</h3>
                <p>Enjoy immersive stereo sound with deep bass, crisp vocals, and clear treble. The advanced dynamic drivers produce rich, balanced audio for music, movies, podcasts, and phone calls.</p>
              </section>

              {/* Crystal Clear Calling */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Crystal Clear Calling</h3>
                <p>Dual HD microphones combined with Environmental Noise Cancellation reduce surrounding noise, allowing your voice to remain clear during calls, video conferences, and online meetings.</p>
              </section>

              {/* Smart Touch Control */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Smart Touch Control</h3>
                <p className="mb-2">Control your <strong>{product.title}</strong> effortlessly with simple touch gestures:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Play/Pause Music</li>
                  <li>Answer or End Calls</li>
                  <li>Reject Incoming Calls</li>
                  <li>Next/Previous Track</li>
                  <li>Volume Control</li>
                  <li>Activate Google Assistant or Siri</li>
                </ul>
              </section>

              <hr className="border-gray-200" />

              {/* Comfortable Ergonomic Design */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Comfortable Ergonomic Design</h3>
                <p>Designed for extended wear, the lightweight body fits securely without causing discomfort. Multiple sizes of silicone tips ensure a customized fit for every user.</p>
              </section>

              {/* Long Battery Life */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Long Battery Life</h3>
                <p>The <strong>{product.title}</strong> provides up to <strong>6 hours</strong> of continuous playback on a single charge. The portable charging case offers multiple additional charges, extending total listening time to <strong>30 hours</strong>, making them ideal for travel and daily use.</p>
              </section>

              {/* Universal Compatibility */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Universal Compatibility</h3>
                <p className="mb-2">Compatible with:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Android Smartphones</li>
                  <li>Apple iPhone & iPad</li>
                  <li>Windows PCs & Laptops</li>
                  <li>MacBook</li>
                  <li>Tablets</li>
                  <li>Smart TVs</li>
                  <li>Bluetooth-enabled Gaming Devices</li>
                </ul>
              </section>

              <hr className="border-gray-200" />

              {/* Package Contents */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Package Contents</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>1 × Pair of <strong>{product.title}</strong></li>
                  <li>1 × Portable Charging Case</li>
                  <li>1 × USB Type-C Charging Cable</li>
                  <li>3 Pairs of Silicone Ear Tips (Small, Medium, Large)</li>
                  <li>1 × User Manual</li>
                  <li>1 × Warranty Card</li>
                </ul>
              </section>

              {/* Ideal For */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Ideal For</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Music Lovers', 'Students', 'Office Professionals', 'Online Meetings', 'Gaming', 'Running', 'Gym Workouts', 'Cycling', 'Traveling', 'Daily Entertainment'].map((tag, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{tag}</span>
                  ))}
                </div>
              </section>

              {/* Warranty */}
              <section>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Warranty</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>6 Months Limited Warranty</li>
                  <li>Customer Support Available</li>
                  <li>Quality Tested Before Dispatch</li>
                </ul>
              </section>

            </div>

            {/* Product image instead of the promotional banner */}
            <div className="w-full mb-6">
              <img src={product.images[0]} alt="Promotional Banner" className="w-full h-auto rounded-sm object-cover max-h-[800px]" />
            </div>

            {/* Fade-out Gradient when folded */}
            {!showMoreSpecs && (
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none"></div>
            )}
          </div>

          <div className="text-center mt-4 border-t border-gray-100 pt-4">
             <button 
               onClick={() => setShowMoreSpecs(!showMoreSpecs)}
               className="text-sm text-[#0F68C9] border border-[#0F68C9] px-10 py-2 rounded-sm hover:bg-blue-50 transition-colors uppercase font-medium"
             >
               {showMoreSpecs ? 'View Less' : 'View More'}
             </button>
          </div>
        </div>

        {/* Ratings & Reviews */}
        <div className="bg-white mt-4 shadow-sm p-6">
          <h2 className="text-lg font-medium bg-gray-50 px-4 py-3 border border-gray-100 text-gray-800 mb-6">
            Ratings & Reviews of {product.title}
          </h2>

          <div className="flex flex-col md:flex-row gap-10 mb-8 px-4">
            <div className="flex flex-col">
               <div className="flex items-end gap-1">
                 <span className="text-5xl font-light text-gray-800">{product.rating.toFixed(1)}</span>
                 <span className="text-2xl text-gray-400 mb-1">/5</span>
               </div>
               <div className="flex text-[#f5a623] text-3xl my-2">
                  {renderStars(Math.round(product.rating))}
               </div>
               <p className="text-sm text-gray-400">{product.reviewsCount} Ratings</p>
            </div>

            <div className="flex-1 max-w-sm flex flex-col gap-1 justify-center">
               {[5,4,3,2,1].map(num => {
                 const count = product.reviews.filter((review) => review.rating === num).length;
                 const width = product.reviewsCount ? `${Math.max(8, (count / product.reviewsCount) * 100)}%` : '0%';
                 return (
                   <div key={num} className="flex items-center gap-2">
                     <div className="flex text-[#f5a623] text-sm w-20">
                       {renderStars(num)}
                     </div>
                     <div className="flex-1 h-3 bg-gray-200 rounded-sm overflow-hidden">
                        <div className="h-full bg-[#f5a623]" style={{ width }}></div>
                     </div>
                     <span className="text-xs text-gray-500 w-8">{count}</span>
                   </div>
                 );
               })}
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-3 flex items-center justify-between px-4 mb-4">
             <span className="text-sm text-gray-600 font-medium">Product Reviews</span>
             <div className="flex items-center gap-4 text-xs text-gray-500">
               <span className="flex items-center gap-1 cursor-pointer hover:text-gray-800">Sort: Relevance</span>
               <span className="flex items-center gap-1 cursor-pointer hover:text-gray-800">Filter: All star</span>
             </div>
          </div>

          <div className="px-4">
            {product.reviews.map(review => (
              <div key={review.id} className="py-6 border-b border-gray-100 last:border-0">
                 <div className="flex items-center justify-between mb-2">
                   <div className="flex text-[#f5a623] text-sm">
                      {renderStars(review.rating)}
                   </div>
                   <span className="text-xs text-gray-400">{review.date}</span>
                 </div>

                 <div className="flex items-center gap-2 mb-3">
                   <span className="text-sm text-gray-600">{review.user}</span>
                   {review.verified && (
                     <span className="text-xs text-green-600 flex items-center gap-1"><FiCheck className="bg-green-600 text-white rounded-full p-0.5" /> Verified Purchase</span>
                   )}
                 </div>

                 <p className="text-sm text-gray-800 whitespace-pre-line mb-4">{review.comment}</p>

                 {review.images && (
                   <div className="flex gap-2 mb-4">
                     {review.images.map((img, i) => (
                       <img key={i} src={img} alt="Review" className="w-24 h-24 object-cover border border-gray-200 rounded-sm cursor-pointer hover:border-primary" />
                     ))}
                   </div>
                 )}

                 <p className="text-xs text-gray-400 mb-4">Color Family: {review.colorFamily}</p>

                 <div className="flex flex-col bg-gray-50 p-4 border border-gray-100 rounded-sm mt-4 relative">
                   <div className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600">⋮</div>
                   <div className="flex items-center gap-2 mb-2">
                     <span className="bg-[#f5a623] text-white p-1 rounded-sm text-xs">S</span>
                     <span className="text-sm text-primary font-medium">Seller Response - {review.responseDate}</span>
                   </div>
                   <p className="text-sm text-gray-700">{review.sellerResponse}</p>
                   <div className="flex items-center gap-1 mt-3 text-gray-400 text-xs">
                     <FiThumbsUp className="cursor-pointer hover:text-gray-600" /> 0
                   </div>
                 </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end px-4 py-4">
             <div className="flex items-center gap-1">
               <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-400 hover:bg-gray-50">&lt;</button>
               <button className="w-8 h-8 flex items-center justify-center border border-primary bg-primary text-white">1</button>
               <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50">2</button>
               <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50">3</button>
               <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50">4</button>
               <span className="mx-1 text-gray-400">...</span>
               <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50">61</button>
               <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50">&gt;</button>
             </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-8 mb-4 px-4 sm:px-0">
          <h2 className="text-xl font-medium text-gray-800 mb-4 px-2">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
