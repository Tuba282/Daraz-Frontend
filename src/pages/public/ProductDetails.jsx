import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiChevronRight, FiShare2, FiHeart, FiMinus, FiPlus, FiMessageSquare, FiMapPin, FiTruck, FiShield, FiStar, FiThumbsUp, FiInfo, FiCheck, FiRefreshCcw } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

// Helper to generate stars
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

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showMoreSpecs, setShowMoreSpecs] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const navigate = useNavigate();

  // Format the slug into a readable title
  const formatTitle = (slug) => {
    if (!slug || slug === '123') return 'Candy - The Italian Style by Haier 0.8 Ton Heat and Cool DC Inverter';
    return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  // Generate dynamic data based on the ID (slug)
  const generateDynamicProduct = (slugId) => {
    const isAC = slugId === '123' || slugId.includes('inverter') || slugId.includes('haier');
    const title = formatTitle(slugId);
    
    // Hash function to get deterministic but varied prices/ratings based on slug
    const hash = slugId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const price = 500 + (hash * 13 % 15000); // Random price between 500 and 15500
    const discount = (hash % 40) + 5; // 5% to 45% discount
    const originalPrice = Math.round(price * (1 + discount / 100));
    
    // Dynamic image assignment based on keywords in title
    let mainImages = [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', // Headphones
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', // Watch
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800', // Camera
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', // Shoes
    ];
    
    if (title.toLowerCase().includes('watch')) mainImages = ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800'];
    else if (title.toLowerCase().includes('shoe') || title.toLowerCase().includes('footwear')) mainImages = ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'];
    else if (title.toLowerCase().includes('shirt') || title.toLowerCase().includes('cotton')) mainImages = ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'];
    else if (title.toLowerCase().includes('cat') || title.toLowerCase().includes('dog')) mainImages = ['https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=800'];

    if (isAC) {
       return {
          id: slugId,
          title: 'Candy - The Italian Style by Haier 0.8 Ton Heat and Cool DC Inverter - CSU-10HF - High Efficiency Inverter - Energy Saving - Eco-Environment - 10 Years Brand Warranty - Free Professional Installation By Haier',
          brand: 'Candy',
          category: 'Home Appliances',
          subCategory: 'Cooling & Heating',
          rating: 4.8,
          reviewsCount: 299,
          price: 77799,
          originalPrice: 89187,
          discount: 13,
          images: [
            'https://images.unsplash.com/photo-1527628217451-b2414a1ee733?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1620601429949-c12e2df74737?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
          ],
          seller: { name: 'Haier', rating: '93%', shippingPerformance: '94%' },
          specs: {
            'Brand Warranty': '10 Years Compressor Warranty', 'PCB Warranty': '5 Years PCB Warranty', 'Evaporator Warranty': '5 Years Evaporator Warranty',
            'BTU': '10,000', 'Current (A)': '1.5 ~ 5.5', 'Power (KW)': '0.3 ~ 1.15', 'Voltage': '150-242', 'Refrigerant': 'R-32',
            'Heat and Cool': 'Yes', 'Self Clean': 'Yes', 'Eco Mode': 'Yes', 'Anti Rust': 'Yes',
          },
          reviews: [
            { id: 1, user: 'Noman Hafeez', rating: 5, date: '4 weeks ago', verified: true, comment: 'Cooling Power: Good cooling\nEnergy Efficiency: very efficient\nNoise Level: no noise\n\narrived safely', images: ['https://images.unsplash.com/photo-1527628217451-b2414a1ee733?auto=format&fit=crop&q=80&w=200'], sellerResponse: 'Dear valued customer, thank you for choosing Haier.', responseDate: '2 weeks ago', colorFamily: 'White' },
            { id: 2, user: 'Khurram Saeed', rating: 5, date: '4 weeks ago', verified: true, comment: 'It is my 2nd purchase of the same ac. Works properly and cooling effectively.', images: ['https://images.unsplash.com/photo-1620601429949-c12e2df74737?auto=format&fit=crop&q=80&w=200'], sellerResponse: 'Dear valued customer, thank you for choosing Haier.', responseDate: '3 weeks ago', colorFamily: 'White' }
          ]
       };
    }

    return {
      id: slugId,
      title: title,
      brand: 'Generic Brand',
      category: 'General',
      subCategory: 'Accessories',
      rating: ((hash % 20) / 10) + 3, // Rating between 3.0 and 5.0
      reviewsCount: hash % 500,
      price: price,
      originalPrice: originalPrice,
      discount: discount,
      images: [
        mainImages[0 % mainImages.length],
        mainImages[(1) % mainImages.length] || mainImages[0],
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' // fallback remote
      ],
      seller: {
        name: 'Daraz Store',
        rating: `${(hash % 15) + 85}%`,
        shippingPerformance: `${(hash % 10) + 90}%`,
      },
      specs: {
        'Brand': 'Generic Brand',
        'Material': 'High Quality',
        'Condition': 'New',
        'Warranty': '1 Year Local Warranty',
        'Return Policy': '14 Days Easy Return'
      },
      reviews: [
        {
          id: 1,
          user: 'Ali Khan',
          rating: 5,
          date: '1 week ago',
          verified: true,
          comment: `Great product! Really satisfied with ${title}. Packaging was good.`,
          sellerResponse: 'Thank you for your valuable feedback!',
          responseDate: '5 days ago',
          colorFamily: 'Standard'
        },
        {
          id: 2,
          user: 'Sara Ahmed',
          rating: 4,
          date: '2 weeks ago',
          verified: true,
          comment: 'Good quality for the price. Delivery was slightly delayed but the product is fine.',
          sellerResponse: 'We apologize for the delay. Glad you liked the product.',
          responseDate: '1 week ago',
          colorFamily: 'Standard'
        }
      ]
    };
  };

  const product = generateDynamicProduct(id);

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
    dispatch(addToCart({ 
      productId: product.id, 
      quantity: qty, 
      product: { ...product, price: product.price } 
    }));
    navigate('/cart');
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
                  <FiHeart className="cursor-pointer hover:text-gray-600" />
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-6">
                Brand: <Link to="/" className="text-blue-600 hover:underline">{product.brand}</Link> | <Link to="/" className="text-blue-600 hover:underline">More {product.subCategory} from {product.brand}</Link>
              </div>

              <div className="mb-6 py-4 border-y border-gray-100">
                <div className="text-3xl text-primary font-semibold mb-1">Rs. {product.price.toLocaleString()}</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm text-gray-800 font-medium">-{product.discount}%</span>
                </div>
              </div>

              {/* Color Family */}
              <div className="mb-6">
                <span className="text-sm text-gray-500 mr-4">Color Family</span>
                <span className="text-sm font-medium text-gray-800">White</span>
                <div className="flex gap-2 mt-2">
                  <div className="border border-primary px-2 py-1 text-sm cursor-pointer relative">
                    White
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary transform translate-x-1/2 translate-y-1/2 rotate-45 border-t border-l border-white"></div>
                  </div>
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
          <h2 className="text-lg font-medium bg-gray-50 px-4 py-3 border border-gray-100 text-gray-800 mb-4">Product details of</h2>
          
          <div className={`overflow-hidden transition-all duration-300 ${showMoreSpecs ? 'max-h-[5000px]' : 'max-h-[600px]'}`}>
            <div className="text-sm text-gray-700 leading-relaxed mb-6 font-medium whitespace-pre-line px-4">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key}>{key === val ? val : `${key}: ${val}`}</div>
              ))}
            </div>

            {/* Huge promotional image matching the screenshot */}
            <div className="w-full mb-6">
              <img src="https://images.unsplash.com/photo-1594818379496-da1e345b0dee?auto=format&fit=crop&q=80&w=1600" alt="Anti Corrosion Spec" className="w-full h-auto" />
            </div>
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
                 <span className="text-5xl font-light text-gray-800">4.8</span>
                 <span className="text-2xl text-gray-400 mb-1">/5</span>
               </div>
               <div className="flex text-[#f5a623] text-3xl my-2">
                  ★★★★★
               </div>
               <p className="text-sm text-gray-400">{product.reviewsCount} Ratings</p>
            </div>

            <div className="flex-1 max-w-sm flex flex-col gap-1 justify-center">
               {[5,4,3,2,1].map(num => (
                 <div key={num} className="flex items-center gap-2">
                   <div className="flex text-[#f5a623] text-sm w-20">
                     {renderStars(num)}
                   </div>
                   <div className="flex-1 h-3 bg-gray-200 rounded-sm overflow-hidden">
                      <div className="h-full bg-[#f5a623]" style={{ width: num === 5 ? '80%' : num === 4 ? '10%' : num===3 ? '5%' : '0%' }}></div>
                   </div>
                   <span className="text-xs text-gray-500 w-8">{num === 5 ? 272 : num === 4 ? 9 : num === 3 ? 3 : num === 2 ? 6 : 9}</span>
                 </div>
               ))}
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

      </div>
    </div>
  );
};

export default ProductDetails;
