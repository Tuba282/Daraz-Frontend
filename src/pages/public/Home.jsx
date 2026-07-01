import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchFlashSaleProducts } from '../../store/slices/productSlice';
import Image from '../../components/common/Image';
import Loader from '../../components/common/Loader';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../../components/product/ProductCard';

const heroSlides = [
  "/banner/s1.avif",
  "/banner/s2.avif",
  "/banner/s3.avif",
  "/banner/s4.avif",
  "/banner/s5.avif"
];

const rightAds = ["/banner/ad.png"];

const CATEGORIES_BASE = [
  { id: '6a458d9e0b9d4ade42a88ffa', name: 'Electronics',            image: '/categeories/microphones.avif' },
  { id: '6a458d9e0b9d4ade42a88ffb', name: 'Fashion',                image: '/categeories/hats.avif' },
  { id: '6a458d9f0b9d4ade42a88ffc', name: 'Home & Kitchen',         image: '/categeories/pots.avif' },
  { id: '6a458d9f0b9d4ade42a88ffd', name: 'Sports & Fitness',       image: '/categeories/footware.avif' },
  { id: '6a458d9f0b9d4ade42a88ffe', name: 'Beauty & Personal Care', image: '/categeories/neclace.avif' },
  { id: '6a458d9f0b9d4ade42a88fff', name: 'Books & Stationery',     image: '/categeories/3dprinter.avif' },
  { id: '6a458d9f0b9d4ade42a89000', name: 'Toys & Games',           image: '/categeories/toybox.avif' },
  { id: '6a458da00b9d4ade42a89001', name: 'Groceries',              image: '/categeories/pasta.avif' },
  { id: '6a458d9e0b9d4ade42a88ffa', name: 'Screen Protectors',      image: '/categeories/screen.avif' },
  { id: '6a458d9f0b9d4ade42a88ffd', name: 'SIM Tools',              image: '/categeories/sim.avif' },
  { id: '6a458d9f0b9d4ade42a88ffc', name: 'Casserole Pots',         image: '/categeories/c1.avif' },
  { id: '6a458d9e0b9d4ade42a88ffb', name: 'Hats & Caps',            image: '/categeories/hats.avif' },
  { id: '6a458d9f0b9d4ade42a88ffe', name: 'Scooters',               image: '/categeories/scooter.avif' },
  { id: '6a458d9f0b9d4ade42a88fff', name: 'Leashes & Harnesses',    image: '/categeories/harness.avif' },
  { id: '6a458d9e0b9d4ade42a88ffa', name: 'Microphones',            image: '/categeories/microphones.avif' },
  { id: '6a458da00b9d4ade42a89001', name: 'Dining Set',             image: '/categeories/Diningset.avif' },
];

// Fisher-Yates shuffle — returns a NEW shuffled array
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

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
      <div className="hidden lg:flex flex-col gap-4 w-full lg:w-1/5 h-[200px] sm:h-[300px] md:h-[350px]">
        <div className="flex-1 overflow-hidden relative cursor-pointer hover:shadow-md transition-shadow">
          <Image src={rightAds[0]} alt="Ad 1" className="w-full h-full object-cover absolute inset-0" />
        </div>
      </div>
    </div>
  );
};

// --- Home Page ---
const COLS = 6;           // cards per row (lg breakpoint)
const INITIAL_ROWS = 5;   // initial rows to show
const LOAD_MORE_ROWS = 6; // rows to add per click

const Home = () => {
  const dispatch = useDispatch();
  const { products: apiProducts, flashSale: apiFlashSale, loading } = useSelector((state) => state.products);

  const INITIAL_COUNT = INITIAL_ROWS * COLS;   // 30
  const LOAD_MORE_COUNT = LOAD_MORE_ROWS * COLS; // 36

  // Shuffled state arrays
  const [shuffledProducts, setShuffledProducts]   = useState([]);
  const [shuffledFlash, setShuffledFlash]         = useState([]);
  const [shuffledCategories, setShuffledCategories] = useState(() => shuffle(CATEGORIES_BASE));
  const [prevProductIds, setPrevProductIds] = useState(new Set());

  const [visibleCount, setVisibleCount]     = useState(INITIAL_COUNT);
  const [isLoadingMore, setIsLoadingMore]   = useState(false);

  // When API products arrive — new products go to front, rest shuffled
  useEffect(() => {
    if (apiProducts?.length > 0) {
      setShuffledProducts(prev => {
        const prevIds = new Set(prev.map(p => String(p._id || p.id)));
        const newOnes = apiProducts.filter(p => !prevIds.has(String(p._id || p.id)));
        const existing = apiProducts.filter(p => prevIds.has(String(p._id || p.id)));
        // new products at front, rest shuffled
        return newOnes.length > 0
          ? [...newOnes, ...shuffle(existing)]
          : shuffle(apiProducts);
      });
    }
  }, [apiProducts]);

  useEffect(() => {
    if (apiFlashSale?.length > 0) {
      setShuffledFlash(shuffle(apiFlashSale));
    }
  }, [apiFlashSale]);

  // Fetch on mount + poll every 30s so new products appear automatically
  useEffect(() => {
    const doFetch = () => {
      dispatch(fetchFlashSaleProducts());
      dispatch(fetchProducts({ limit: 200 }));
    };
    doFetch();
    const interval = setInterval(doFetch, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // Load More: always shuffle + reveal more (if all shown, just re-shuffle)
  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setShuffledProducts(prev => {
        const allShown = visibleCount >= prev.length;
        if (allShown) return shuffle(prev); // reshuffle in place
        return shuffle(prev);
      });
      setShuffledFlash(prev => shuffle(prev));
      setShuffledCategories(shuffle(CATEGORIES_BASE));
      setVisibleCount(prev => {
        // if all products are already visible, reset to initial for fresh shuffle feel
        if (prev >= shuffledProducts.length && shuffledProducts.length > 0) {
          return INITIAL_COUNT;
        }
        return prev + LOAD_MORE_COUNT;
      });
      setIsLoadingMore(false);
    }, 600);
  }, [visibleCount, shuffledProducts.length, LOAD_MORE_COUNT, INITIAL_COUNT]);

  const visibleProducts = shuffledProducts.slice(0, visibleCount);
  const allShown = shuffledProducts.length > 0 && visibleCount >= shuffledProducts.length;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      <HeroSlider />

      {/* Flash Sale Section */}
      <section className="mb-8">
        <div className="bg-white shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 border-b border-gray-100 gap-3">
            <div className="flex items-center gap-4">
              <span className="text-[#f57224] font-semibold uppercase text-sm tracking-wide">Flash Sale</span>
            </div>
            <Link to="/products" className="text-[#f57224] border border-[#f57224] px-4 py-1.5 text-sm font-medium hover:bg-orange-50 transition-colors uppercase self-start sm:self-auto">
              SHOP MORE
            </Link>
          </div>
          <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {loading && shuffledFlash.length === 0 ? (
              <div className="col-span-6 flex justify-center py-6"><Loader size="sm" /></div>
            ) : shuffledFlash.length > 0 ? (
              shuffledFlash.slice(0, 6).map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 text-sm p-4 col-span-6">No flash sale products available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl text-gray-700 mb-4">Categories</h2>
        <div className="bg-white shadow-sm border border-gray-100 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8">
          {shuffledCategories.map((category) => (
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

        {loading && visibleProducts.length === 0 ? (
          <div className="flex justify-center p-8">
            <Loader size="md" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {visibleProducts.map((product, idx) => (
              <ProductCard key={`${product._id || product.id}-${idx}`} product={product} />
            ))}
          </div>
        )}

        {/* Load More — always visible when products exist */}
        <div className="mt-8 flex flex-col justify-center items-center gap-2 h-16">
          {isLoadingMore ? (
            <Loader size="sm" />
          ) : shuffledProducts.length > 0 ? (
            <>
              <button
                onClick={handleLoadMore}
                className="border border-[#f57224] text-[#f57224] bg-white px-24 py-2 font-medium hover:bg-orange-50 transition-colors uppercase text-sm"
              >
                LOAD MORE
              </button>
              {allShown && (
                <p className="text-gray-400 text-xs">Reshuffling products for you…</p>
              )}
            </>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Home;
