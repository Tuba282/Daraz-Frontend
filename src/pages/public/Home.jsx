import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../components/common/Image';
import Loader from '../../components/common/Loader';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../../components/product/ProductCard';

// --- MOCK DATA ---
const heroSlides = [
  "/banner/s1.avif",
  "/banner/s2.avif",
  "/banner/s3.avif",
  "/banner/s4.avif",
  "/banner/s5.avif"
];

const rightAds = [
  "/banner/ad.png"
];

const generateMockProduct = (id, name, price, salePrice, image) => ({
  _id: id,
  name,
  slug: name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
  price,
  salePrice,
  images: [{ url: image }],
  numReviews: Math.floor(Math.random() * 500) + 1,
});

const flashSaleProducts = [
  generateMockProduct('1', 'T900 Ultra Smartwatch 2.09" (Infinity Display)', 4999, 1148, 'https://static-01.daraz.pk/p/8525b306b3a9a5f78c85c2dfdbb72803.jpg'),
  generateMockProduct('2', '12Pcs/Set Magnetic Scarf Brooch Elegant', 450, 150, 'https://static-01.daraz.pk/p/a12b6f3c1d4a04ab4f9543beac9e3e7f.jpg'),
  generateMockProduct('3', 'Soft Rubber Protective Case For iPhone', 300, 149, 'https://static-01.daraz.pk/p/d1bdc75b82fb32f14371d9d9ab40c743.jpg'),
  generateMockProduct('4', 'Adjustable Portable Laptop Stand Foldable', 1000, 399, 'https://static-01.daraz.pk/p/f2010bfbb67beaa7c5c0c978059ff94b.jpg'),
  generateMockProduct('5', 'S20 Ultra Smart watch with 7 Straps', 5000, 1699, 'https://static-01.daraz.pk/p/4f9b8c0a87f549a3c114f8a8461a3375.jpg'),
  generateMockProduct('6', 'Multifunctional Mini Keychain Light USB Rechargeable', 599, 199, 'https://static-01.daraz.pk/p/78deebf76f7a637d77d70402b80df4e2.jpg'),
];

const categories = [
  { id: 1,  name: 'Mattress Protectors',         image: '/categeories/c1.avif' },
  { id: 2,  name: '3D Printers',                 image: '/categeories/3dprinter.avif' },
  { id: 3,  name: 'Pasta, Noodle & Pizza Tools', image: '/categeories/pasta.avif' },
  { id: 4,  name: 'SIM Tools',                   image: '/categeories/sim.avif' },
  { id: 5,  name: 'Screen Protectors',           image: '/categeories/screen.avif' },
  { id: 6,  name: 'Casserole Pots',              image: '/categeories/pots.avif' },
  { id: 7,  name: 'Neclace',                     image: '/categeories/neclace.avif' },
  { id: 8,  name: 'Toy Boxes & Organisers',      image: '/categeories/toybox.avif' },
  { id: 9,  name: 'Footwear',                    image: '/categeories/footware.avif' },
  { id: 10, name: 'Dog & Cat Electric Clippers', image: '/categeories/dog&catslipper.avif' },
  { id: 11, name: 'Bathroom Tapware',            image: '/categeories/bathroomtape.avif' },
  { id: 12, name: 'Hats & Caps',                 image: '/categeories/hats.avif' },
  { id: 13, name: 'Microphones',                 image: '/categeories/microphones.avif' },
  { id: 14, name: 'Leashes & Harnesses',         image: '/categeories/harness.avif' },
  { id: 15, name: 'Scooters',                    image: '/categeories/scooter.avif' },
  { id: 16, name: 'Dining Set',                  image: '/categeories/Diningset.avif' },
];

const baseJustForYouProducts = [
  generateMockProduct('101', 'Cat Neck Rainbow Ribbon Adjustable Collar', 750, 276, 'https://static-01.daraz.pk/p/2d49eec2ccf9d14ea17b8f0471c25ec5.jpg'),
  generateMockProduct('102', 'Automatic Counting Hand Gripper Adjustabl...', 499, 299, 'https://static-01.daraz.pk/p/c7bb7414df5a92a7e781eb89cd8eddf4.jpg'),
  generateMockProduct('103', 'NEW TRENDY  D T F (STRONG &...', 3599, 799, 'https://static-01.daraz.pk/p/b9c7bf5eb5dc0cdb6278ef864c3c3a72.jpg'),
  generateMockProduct('104', 'Girls (7-14) & Women (S-XL) Soft Cotton Jersey...', 1999, 799, 'https://static-01.daraz.pk/p/0902c2e64b6ffebf9cda3b21adceb4f3.jpg'),
  generateMockProduct('105', 'New trendy fired printed black & white premium...', 1499, 664, 'https://static-01.daraz.pk/p/f2010bfbb67beaa7c5c0c978059ff94b.jpg'),
  generateMockProduct('106', 'M10 &stearo TWS i12 Double Wireless tws...', 1999, 653, 'https://static-01.daraz.pk/p/929949da6ab3fb20703c1bbf9073b302.jpg'),
  generateMockProduct('107', 'Elegant Umrah & Kids Saving Box - High-Qualit...', 400, 240, 'https://static-01.daraz.pk/p/5f9df49f2b879a83eb9e8fc5beec0883.jpg'),
  generateMockProduct('108', 'High Quality Bownot Collar For Cats - Pink', 200, 176, 'https://static-01.daraz.pk/p/0f1bc8059a4bb6d0c1511f9fc53ceea9.jpg'),
  generateMockProduct('109', 'Mister Traders Brand Acrylic Golden Umrah...', 799, 199, 'https://static-01.daraz.pk/p/58cd0173641774e64f7b4ea6c9d873d6.jpg'),
  generateMockProduct('110', 'Summer Collection Pack Of 3 Summer Cotton...', 1999, 379, 'https://static-01.daraz.pk/p/a18a55097bc01b44ec63eb70ecfcbf63.jpg'),
  generateMockProduct('111', 'Genuine Leather Slim Bifold Wallet for Men - 6-...', 599, 299, 'https://static-01.daraz.pk/p/b96e4fa8ec673ebf552f5231c54b9fdf.jpg'),
  generateMockProduct('112', 'Summer Tracksuit with New Luxury Design (T-...', 1299, 979, 'https://static-01.daraz.pk/p/c9d2f26ab56891040f7d9834ea27deff.jpg'),
  generateMockProduct('113', 'Original Sports Wireless Magnetic Handfree...', 1299, 593, 'https://static-01.daraz.pk/p/f0212a78f3068dcbe0d1b9d4f2061e38.jpg'),
  generateMockProduct('114', 'Dell pro Sleeve 13" Laptop Case Original', 5500, 2957, 'https://static-01.daraz.pk/p/7e008fa08eec931dbcd1db0c082725fa.jpg'),
  generateMockProduct('115', 'High Quality Metal Snap Buttons Press Plier_9.5m...', 899, 495, 'https://static-01.daraz.pk/p/c39385bfb3e6e8c7c9802cfd29c3664d.jpg'),
  generateMockProduct('116', 'One Step 3 in 1 Hair Dryer & Styler Hair Dryer Brush...', 2999, 1799, 'https://static-01.daraz.pk/p/eec1e07b36f7a731333e144a69c0d1ff.jpg'),
  generateMockProduct('117', 'Remote Control Helicopter Cool Electric...', 1999, 799, 'https://static-01.daraz.pk/p/6d338fbf238f4270d4fc167e416d84a7.jpg'),
  generateMockProduct('118', 'Ring for Men and Boys Stainless Steel Turkish...', 599, 191, 'https://static-01.daraz.pk/p/0ff8856bb5776d6ec001cb3dfbb22c1e.jpg'),
];

// Generate 120 items (20 lines x 6 cards)
const justForYouProducts = Array.from({ length: 120 }, (_, i) => {
  const baseProduct = baseJustForYouProducts[i % baseJustForYouProducts.length];
  return {
    ...baseProduct,
    _id: `product-jfu-${i}`,
    slug: `product-jfu-${i}`
  };
});

// --- COMPONENTS ---

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 4000); // 4 seconds auto play
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  return (
    <div className="flex mb-8 mt-0">
      {/* Main Slider */}
      <div className="relative w-full lg:w-4/5 h-[200px] sm:h-[300px] md:h-[350px]   overflow-hidden group">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          <FiChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Side Ads */}
      <div className="hidden lg:flex flex-col gap-4 w-[200px]">
        <div className="flex-1 overflow-hidden relative cursor-pointer hover:shadow-md transition-shadow">
          <Image src={rightAds[0]} alt="Ad 1" className="w-full h-full object-cover absolute inset-0" />
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  // Initially show 48 cards (8 lines x 6 cards)
  const [visibleProducts, setVisibleProducts] = useState(48);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate network loading time (1.2 seconds) to show the loader
    setTimeout(() => {
      setVisibleProducts(prev => prev + 12);
      setIsLoadingMore(false);
    }, 1200);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      <HeroSlider />

      {/* Flash Sale Section */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl text-gray-700 mb-4">Flash Sale</h2>
        <div className="bg-white p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
            <div className="flex items-center gap-4">
              <span className="text-primary font-medium">On Sale Now</span>
            </div>
            <Link to="/flash-sale" className="text-primary border border-primary px-3 py-1 rounded text-sm hover:bg-primary hover:text-white transition-colors">
              SHOP ALL PRODUCTS
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {flashSaleProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl text-gray-700 mb-4">Categories</h2>
        <div className="bg-white shadow-sm border border-gray-100 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center justify-center p-2 border  border-gray-100 "
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 mb-2 overflow-hidden">
                <Image src={category.image} alt={category.name} className="w-full h-full object-cover " />
              </div>
              <span className="text-xs text-center text-gray-800 line-clamp-2">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Just For You Section */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl text-gray-700 mb-4">Just For You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {justForYouProducts.slice(0, visibleProducts).map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Load More Button or Loader */}
        {visibleProducts < justForYouProducts.length && (
          <div className="mt-8 flex justify-center h-16 items-center">
            {isLoadingMore ? (
              <Loader size="sm" />
            ) : (
              <button 
                onClick={handleLoadMore}
                className="border border-primary text-primary bg-white px-24 py-2 font-medium"
              >
                LOAD MORE
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
