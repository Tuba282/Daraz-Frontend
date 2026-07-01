import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../components/common/Image';
import Loader from '../../components/common/Loader';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../../components/product/ProductCard';
import { productList } from '../../data/products';

const heroSlides = [
  "/banner/s1.avif",
  "/banner/s2.avif",
  "/banner/s3.avif",
  "/banner/s4.avif",
  "/banner/s5.avif"
];

const rightAds = ["/banner/ad.png"];

// First 6 products used for Flash Sale
const flashSaleProducts = productList.slice(0, 6);

const categories = [
  { id: 1, name: 'Mattress Protectors', image: '/categeories/c1.avif' },
  { id: 2, name: '3D Printers', image: '/categeories/3dprinter.avif' },
  { id: 3, name: 'Pasta, Noodle & Pizza Tools', image: '/categeories/pasta.avif' },
  { id: 4, name: 'SIM Tools', image: '/categeories/sim.avif' },
  { id: 5, name: 'Screen Protectors', image: '/categeories/screen.avif' },
  { id: 6, name: 'Casserole Pots', image: '/categeories/pots.avif' },
  { id: 7, name: 'Neclace', image: '/categeories/neclace.avif' },
  { id: 8, name: 'Toy Boxes & Organisers', image: '/categeories/toybox.avif' },
  { id: 9, name: 'Footwear', image: '/categeories/footware.avif' },
  { id: 10, name: 'Dog & Cat Electric Clippers', image: '/categeories/dog&catslipper.avif' },
  { id: 11, name: 'Bathroom Tapware', image: '/categeories/bathroomtape.avif' },
  { id: 12, name: 'Hats & Caps', image: '/categeories/hats.avif' },
  { id: 13, name: 'Microphones', image: '/categeories/microphones.avif' },
  { id: 14, name: 'Leashes & Harnesses', image: '/categeories/harness.avif' },
  { id: 15, name: 'Scooters', image: '/categeories/scooter.avif' },
  { id: 16, name: 'Dining Set', image: '/categeories/Diningset.avif' },
];

// --- Hero Slider Component ---
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  return (
    <div className="flex mb-8 mt-0">
      {/* Main Slider */}
      <div className="relative w-full lg:w-4/5 h-[200px] sm:h-[300px] md:h-[350px] overflow-hidden group">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <Image src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <FiChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <FiChevronRight size={24} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-primary' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </div>
      {/* Right Side Ad */}
      <div className="hidden lg:flex flex-col gap-4 w-[200px]">
        <div className="flex-1 overflow-hidden relative cursor-pointer hover:shadow-md transition-shadow">
          <Image src={rightAds[0]} alt="Ad 1" className="w-full h-full object-cover absolute inset-0" />
        </div>
      </div>
    </div>
  );
};

// --- Home Page ---
const Home = () => {
  // Initial 48 cards (8 rows × 6), load more adds 6 per click
  const INITIAL_COUNT = 48;
  const LOAD_MORE_COUNT = 6;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
      setIsLoadingMore(false);
    }, 800);
  };

  const visibleProducts = productList.slice(0, visibleCount);
  const hasMore = visibleCount < productList.length;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      <HeroSlider />

      {/* Flash Sale Section */}
      <section className="mb-8">
        <div className="bg-white shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 border-b border-gray-100 gap-3">
            <div className="flex items-center gap-4">
              <span className="text-[#f57224] font-semibold uppercase text-sm tracking-wide">Flash Sale</span>
              {/* <div className="flex items-center gap-1">
                <span className="text-gray-500 text-sm">Ending in</span>
                <div className="flex items-center gap-1 ml-1">
                  <span className="bg-[#f57224] text-white text-sm font-bold w-9 h-9 flex items-center justify-center rounded-sm">04</span>
                  <span className="text-[#f57224] font-bold">:</span>
                  <span className="bg-[#f57224] text-white text-sm font-bold w-9 h-9 flex items-center justify-center rounded-sm">23</span>
                  <span className="text-[#f57224] font-bold">:</span>
                  <span className="bg-[#f57224] text-white text-sm font-bold w-9 h-9 flex items-center justify-center rounded-sm">59</span>
                </div>
              </div> */}
            </div>
            <Link to="/flash-sale" className="text-[#f57224] border border-[#f57224] px-4 py-1.5 text-sm font-medium hover:bg-orange-50 transition-colors uppercase self-start sm:self-auto">
              SHOP MORE
            </Link>
          </div>
          <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
              className="flex flex-col items-center justify-center p-2 border border-gray-100 hover:bg-orange-50 transition-colors"
            >
              <div className="w-14 h-14 sm:w-20 sm:h-20 mb-2 overflow-hidden">
                <Image src={category.image} alt={category.name} className="w-full h-full object-cover" />
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
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 flex justify-center h-16 items-center">
          {isLoadingMore ? (
            <Loader size="sm" />
          ) : hasMore ? (
            <button
              onClick={handleLoadMore}
              className="border border-[#f57224] text-[#f57224] bg-white px-24 py-2 font-medium hover:bg-orange-50 transition-colors uppercase text-sm"
            >
              LOAD MORE
            </button>
          ) : (
            <p className="text-gray-400 text-sm">You've seen all products</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
