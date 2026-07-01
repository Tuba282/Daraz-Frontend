import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard';
import ProductListCard from '../../components/product/ProductListCard';
import Loader from '../../components/common/Loader';
import { FiChevronDown, FiChevronUp, FiX, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import api from '../../services/api';

// ── Filter Section ───────────────────────────────────────
const Section = ({ title, children }) => {
  return (
    <div className="border-b border-gray-100 py-3">
      <div className="text-[14px] text-gray-800 mb-2">
        {title}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
};

// ── Single Checkbox Row ───────────────────────────────────────────────
const CheckRow = ({ label, checked, onChange, count }) => (
  <label className="flex items-center gap-2 cursor-pointer group py-1 hover:text-[#f57224]">
    <div className="relative flex-shrink-0 flex items-center justify-center">
      <input
        type="checkbox"
        className="peer appearance-none w-[14px] h-[14px] border border-gray-300 rounded-[2px] bg-white checked:bg-[#f57224] checked:border-[#f57224] transition-colors cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
      <svg className="absolute w-[10px] h-[10px] text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className={`text-[13px] select-none leading-snug flex-1 ${checked ? 'text-[#f57224] font-medium' : 'text-gray-600'}`}>
      {label}
    </span>
  </label>
);

// ── Star Rating Row ───────────────────────────────────────────────────
const StarRow = ({ stars, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer group py-0.5">
    <div className="relative flex-shrink-0">
      <input
        type="checkbox"
        className="peer appearance-none w-3.5 h-3.5 border border-gray-400 rounded-sm bg-white checked:bg-[#f57224] checked:border-[#f57224] transition-colors cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
        <svg className="absolute w-3 h-3 text-white left-[1px] top-0 pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={`w-3 h-3 ${s <= stars ? 'text-[#f5a623]' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">& Up</span>
    </div>
  </label>
);

// ── Expandable List ───────────────────────────────────────────────────
const ExpandableList = ({ items, renderItem, initialShow = 5 }) => {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? items : items.slice(0, initialShow);
  return (
    <div>
      <div className="flex flex-col gap-0.5">{shown.map(renderItem)}</div>
      {items.length > initialShow && (
        <button
          className="text-[#009da0] text-[12px] font-medium mt-1.5 hover:underline uppercase tracking-wide"
          onClick={() => setExpanded(e => !e)}
        >
          {expanded ? 'VIEW LESS' : `VIEW MORE`}
        </button>
      )}
    </div>
  );
};

// Static filter data (Daraz-style)
const SERVICE_PROMOTION = ['Free Delivery', 'Mall', 'Choice', 'Best Price Guaranteed', 'Coins'];
const SHIPPED_FROM = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Islamabad', 'Balochistan', 'Local'];
const WARRANTY_TYPES = ['No Warranty', 'Seller Warranty', 'Brand Warranty', 'Non-local warranty', 'Local Warranty'];
const COLOR_FAMILY = ['Clear', 'Black', 'Multicolor', 'Neutral', 'Blue', 'Silver', 'White', 'Gold', 'Green', 'Grey', 'Red', 'Brown', 'Pink', 'Yellow', 'Purple', 'Maroon', 'Orange', 'Beige', 'Rose Gold', 'Multi', 'Dark Brown'];
const DELIVERY_OPTIONS = ['Yes'];

// ── Main Page ─────────────────────────────────────────────────────────
const CategoryPage = () => {
  const { id } = useParams();

  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  // Filter state
  const [selCategories, setSelCategories] = useState([]);
  const [selRatings, setSelRatings] = useState([]);
  const [selBrands, setSelBrands] = useState([]);
  const [selServices, setSelServices] = useState([]);
  const [selShipped, setSelShipped] = useState([]);
  const [selWarranty, setSelWarranty] = useState([]);
  const [selColors, setSelColors] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // Default to list view as requested

  // Fetch products + categories
  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products?limit=200'),
          api.get('/categories'),
        ]);
        setAllProducts(prodRes.data.products || []);
        const cats = catRes.data.categories || catRes.data.data || [];
        setCategories(cats);

        // Pre-select from URL param (MongoDB ObjectId = 24 chars)
        if (id && id.length === 24) {
          setSelCategories([id]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setPageLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Derived filter options from products
  const STATIC_BRANDS = [
    "AUTOXPRESSIONS", "Jm Jadoon", "Hola", "MOJ TRADERS", "Remu", 
    "Bestin", "Liberty Mall", "SONECS INTERNATIONAL SP", "EASY KITCHEN", 
    "ElevateX Sports", "BIN-B", "AMEGO", "kidzooo", "Chohtai Toy Mart", 
    "Jmary", "Supreme Filters", "Jannat Store", "BuyToday", "Ghardaari", "Twin Shop"
  ];
  const dynamicBrands = allProducts.map(p => p.brand).filter(Boolean);
  const brands = [...new Set([...dynamicBrands, ...STATIC_BRANDS])];

  // Apply all filters
  const filtered = allProducts.filter(p => {
    if (selCategories.length > 0) {
      const catId = typeof p.category === 'object' ? p.category?._id : p.category;
      if (!selCategories.includes(String(catId))) return false;
    }
    if (selRatings.length > 0) {
      const avg = p.rating?.average || 0;
      if (!selRatings.some(r => avg >= r)) return false;
    }
    if (selBrands.length > 0 && !selBrands.includes(p.brand)) return false;
    const price = p.salePrice || p.price;
    if (priceMin !== '' && price < Number(priceMin)) return false;
    if (priceMax !== '' && price > Number(priceMax)) return false;
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc') return (a.salePrice || a.price) - (b.salePrice || b.price);
    if (sortBy === 'price_desc') return (b.salePrice || b.price) - (a.salePrice || a.price);
    if (sortBy === 'rating') return (b.rating?.average || 0) - (a.rating?.average || 0);
    if (sortBy === 'popular') return (b.totalSold || 0) - (a.totalSold || 0);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const toggle = (setter) => (val) => setter(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  const toggleCat = toggle(setSelCategories);
  const toggleRating = toggle(setSelRatings);
  const toggleBrand = toggle(setSelBrands);
  const toggleService = toggle(setSelServices);
  const toggleShipped = toggle(setSelShipped);
  const toggleWarranty = toggle(setSelWarranty);
  const toggleColor = toggle(setSelColors);

  const clearAll = () => {
    setSelCategories([]); setSelRatings([]); setSelBrands([]);
    setSelServices([]); setSelShipped([]); setSelWarranty([]); setSelColors([]);
    setPriceMin(''); setPriceMax('');
  };

  const hasFilters = selCategories.length || selRatings.length || selBrands.length ||
    selServices.length || selShipped.length || selWarranty.length ||
    selColors.length || priceMin || priceMax;

  const pageTitle = selCategories.length === 1
    ? (categories.find(c => String(c._id) === selCategories[0])?.name || 'All Products')
    : selCategories.length > 1 ? 'Multiple Categories' : 'All Products';

  // ── Sidebar ─────────────────────────────────────────────────────────
  const SidebarContent = () => (
    <div className="bg-white border border-gray-100 shadow-sm px-3 py-2">
      {hasFilters && (
        <button onClick={clearAll} className="flex items-center gap-1 text-[10px] text-[#f57224] hover:underline mb-2 font-medium uppercase">
          <FiX size={10}/> Clear All
        </button>
      )}

      {/* Category */}
      <Section title="Category">
        <div className="flex flex-col gap-0.5 mt-1">
          {categories.map(cat => (
            <CheckRow
              key={cat._id}
              label={cat.name}
              checked={selCategories.includes(String(cat._id))}
              onChange={() => toggleCat(String(cat._id))}
            />
          ))}
        </div>
      </Section>

      {/* Brand */}
      {brands.length > 0 && (
        <Section title="Brand">
          <ExpandableList
            items={brands}
            initialShow={5}
            renderItem={(b) => (
              <CheckRow key={b} label={b} checked={selBrands.includes(b)} onChange={() => toggleBrand(b)} />
            )}
          />
        </Section>
      )}

      {/* Service & Promotion */}
      <Section title="Service & Promotion">
        <div className="flex flex-col gap-0.5">
          {SERVICE_PROMOTION.map(s => (
            <CheckRow key={s} label={s} checked={selServices.includes(s)} onChange={() => toggleService(s)} />
          ))}
        </div>
      </Section>

      {/* Shipped From */}
      <Section title="Shipped From">
        <div className="flex flex-col gap-0.5">
          {SHIPPED_FROM.map(s => (
            <CheckRow key={s} label={s} checked={selShipped.includes(s)} onChange={() => toggleShipped(s)} />
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section title="Price">
        <div className="flex items-center gap-1.5 mt-1">
          <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            className="w-full border border-gray-300 text-xs px-2 py-1 rounded-sm focus:border-[#f57224] outline-none"
          />
          <span className="text-gray-400 text-xs flex-shrink-0">–</span>
          <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            className="w-full border border-gray-300 text-xs px-2 py-1 rounded-sm focus:border-[#f57224] outline-none"
          />
          <button className="bg-[#f57224] text-white px-2 py-1 rounded-sm text-xs flex-shrink-0 hover:bg-orange-600 transition-colors">
            ›
          </button>
        </div>
      </Section>

      {/* Rating */}
      <Section title="Rating">
        <div className="flex flex-col gap-0.5">
          {[4,3,2,1].map(r => (
            <StarRow key={r} stars={r} checked={selRatings.includes(r)} onChange={() => toggleRating(r)} />
          ))}
        </div>
      </Section>

      {/* Warranty Type */}
      <Section title="Warranty Type">
        <div className="flex flex-col gap-0.5">
          {WARRANTY_TYPES.map(w => (
            <CheckRow key={w} label={w} checked={selWarranty.includes(w)} onChange={() => toggleWarranty(w)} />
          ))}
        </div>
      </Section>

      {/* Color Family */}
      <Section title="Color Family">
        <ExpandableList
          items={COLOR_FAMILY}
          initialShow={8}
          renderItem={(c) => (
            <CheckRow key={c} label={c} checked={selColors.includes(c)} onChange={() => toggleColor(c)} />
          )}
        />
      </Section>

      {/* Delivery Option */}
      <Section title="Delivery Option">
        <div className="flex flex-col gap-0.5">
          {DELIVERY_OPTIONS.map(d => (
            <CheckRow key={d} label={d} checked={false} onChange={() => {}} />
          ))}
        </div>
      </Section>
    </div>
  );

  // Active filter tags
  const filterTags = [
    ...selCategories.map(cId => ({ key: `cat-${cId}`, label: categories.find(c => String(c._id) === cId)?.name, remove: () => toggleCat(cId) })),
    ...selRatings.map(r => ({ key: `rat-${r}`, label: `${r}+ Stars`, remove: () => toggleRating(r) })),
    ...selBrands.map(b => ({ key: `br-${b}`, label: b, remove: () => toggleBrand(b) })),
    ...selServices.map(s => ({ key: `sv-${s}`, label: s, remove: () => toggleService(s) })),
    ...selShipped.map(s => ({ key: `sh-${s}`, label: `From: ${s}`, remove: () => toggleShipped(s) })),
    ...selWarranty.map(w => ({ key: `wa-${w}`, label: w, remove: () => toggleWarranty(w) })),
    ...selColors.map(c => ({ key: `co-${c}`, label: c, remove: () => toggleColor(c) })),
    ...(priceMin || priceMax ? [{ key: 'price', label: `Rs.${priceMin||'0'} – ${priceMax||'∞'}`, remove: () => { setPriceMin(''); setPriceMax(''); } }] : []),
  ].filter(t => t.label);

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-10">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 py-4">

        {/* Breadcrumbs */}
        <div className="text-[13px] text-gray-500 mb-3 hidden md:flex items-center gap-2">
          <Link to="/" className="text-[#009da0] hover:underline">Home</Link>
          <span>›</span>
          <span className="text-[#009da0] hover:underline cursor-pointer">Categories</span>
          <span>›</span>
          <span>{pageTitle}</span>
        </div>

        {/* Mobile Filter Bar */}
        <div className="flex md:hidden justify-between items-center mb-3">
          <h1 className="text-sm font-semibold text-gray-800">{pageTitle}</h1>
          <button
            onClick={() => setShowMobileFilter(true)}
            className="flex items-center gap-1 border border-[#f57224] text-[#f57224] text-xs px-3 py-1.5 rounded-sm"
          >
            <FiFilter size={12}/> Filters
          </button>
        </div>

        {/* Mobile Drawer */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 flex">
            <div className="bg-black/40 flex-1" onClick={() => setShowMobileFilter(false)}/>
            <div className="w-72 bg-white overflow-y-auto p-3">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-sm text-gray-800">Filters</span>
                <button onClick={() => setShowMobileFilter(false)}><FiX size={16}/></button>
              </div>
              <SidebarContent/>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {/* ── Desktop Sidebar ──────────────────────────────────── */}
          <aside className="hidden md:block w-[185px] flex-shrink-0">
            <div className="sticky top-[150px] max-h-[calc(100vh-160px)] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
              <SidebarContent/>
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Top Bar */}
            <div className="mb-4 border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="hidden md:block">
                <h1 className="text-[22px] text-gray-800 mb-1">{pageTitle} Price in Pakistan</h1>
                <p className="text-[13px] text-gray-500">Showing {sorted.length} results for {pageTitle}</p>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-gray-600 hidden sm:inline">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="border border-gray-300 text-[13px] px-3 py-1.5 rounded-sm focus:border-[#f57224] outline-none bg-white min-w-[140px]"
                  >
                    <option value="newest">Best Match</option>
                    <option value="popular">Most Popular</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-[13px] text-gray-600">View:</span>
                  <button onClick={() => setViewMode('grid')} className={`hover:text-[#f57224] ${viewMode === 'grid' ? 'text-[#f57224]' : 'text-gray-400'}`}><FiGrid size={18}/></button>
                  <button onClick={() => setViewMode('list')} className={`hover:text-[#f57224] ${viewMode === 'list' ? 'text-[#f57224]' : 'text-gray-400'}`}><FiList size={18}/></button>
                </div>
              </div>
            </div>

            {/* Active Filter Tags */}
            {filterTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {filterTags.map(t => (
                  <span key={t.key} className="flex items-center gap-1 bg-orange-50 border border-[#f57224] text-[#f57224] text-[11px] px-2 py-0.5 rounded-full">
                    {t.label}
                    <button onClick={t.remove}><FiX size={9}/></button>
                  </span>
                ))}
                <button onClick={clearAll} className="text-[11px] text-gray-500 underline px-1">Clear All</button>
              </div>
            )}

            {/* Product Grid / List */}
            {pageLoading ? (
              <div className="flex justify-center py-20"><Loader size="md"/></div>
            ) : sorted.length === 0 ? (
              <div className="bg-white border border-gray-100 shadow-sm text-center py-20">
                <p className="text-gray-500 mb-4 text-sm">No products found.</p>
                <button onClick={clearAll} className="text-[#f57224] border border-[#f57224] px-6 py-2 text-xs uppercase hover:bg-orange-50 transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {sorted.map((product, i) => (
                  <ProductCard key={`${product._id || product.id}-${i}`} product={product}/>
                ))}
              </div>
            ) : (
              <div className="flex flex-col">
                {sorted.map((product, i) => (
                  <ProductListCard key={`${product._id || product.id}-${i}`} product={product}/>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
