import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard';
import { productList } from '../../data/products';

const CATEGORIES = [
  { id: 1, name: 'Mattress Protectors' },
  { id: 2, name: '3D Printers' },
  { id: 3, name: 'Pasta, Noodle & Pizza Tools' },
  { id: 4, name: 'SIM Tools' },
  { id: 5, name: 'Screen Protectors' },
  { id: 6, name: 'Casserole Pots' },
  { id: 7, name: 'Neclace' },
  { id: 8, name: 'Toy Boxes & Organisers' },
  { id: 9, name: 'Footwear' },
  { id: 10, name: 'Dog & Cat Electric Clippers' },
  { id: 11, name: 'Bathroom Tapware' },
  { id: 12, name: 'Hats & Caps' },
  { id: 13, name: 'Microphones' },
  { id: 14, name: 'Leashes & Harnesses' },
  { id: 15, name: 'Scooters' },
  { id: 16, name: 'Dining Set' }
];

// Map productList to have categories based on their ID for mock filtering purposes
const productsWithCategories = productList.map(product => {
  // Assign a category predictably based on product id
  const categoryIndex = (product.id - 1) % CATEGORIES.length;
  return {
    ...product,
    categoryId: CATEGORIES[categoryIndex].id
  };
});

const CategoryPage = () => {
  const { id } = useParams();
  const initialCategoryId = id ? parseInt(id, 10) : null;
  
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategories([initialCategoryId]);
    }
  }, [initialCategoryId]);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(c => c !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Filter products based on selected checkboxes
  const filteredProducts = selectedCategories.length > 0 
    ? productsWithCategories.filter(p => selectedCategories.includes(p.categoryId))
    : productsWithCategories;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white shadow-sm border border-gray-100 p-4 sticky top-24">
            <h3 className="font-medium text-gray-800 mb-4 border-b pb-2">Categories</h3>
            <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {CATEGORIES.map(category => (
                <label key={category.id} className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center mt-0.5">
                    <input 
                      type="checkbox"
                      className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm bg-white checked:bg-[#f57224] checked:border-[#f57224] transition-colors cursor-pointer"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCheckboxChange(category.id)}
                    />
                    <svg className="absolute w-3 h-3 text-white left-0.5 top-0.5 pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className={`text-sm select-none transition-colors leading-snug ${selectedCategories.includes(category.id) ? 'text-[#f57224] font-medium' : 'text-gray-600 group-hover:text-[#f57224]'}`}>
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="bg-white shadow-sm border border-gray-100 p-4 mb-4 flex justify-between items-center">
            <h1 className="text-xl text-gray-800 font-medium">
              {selectedCategories.length === 1 
                ? CATEGORIES.find(c => c.id === selectedCategories[0])?.name || 'Products'
                : selectedCategories.length > 1 
                  ? 'Multiple Categories' 
                  : 'All Products'}
              <span className="text-gray-400 text-sm ml-2 font-normal">({filteredProducts.length} items found)</span>
            </h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white shadow-sm border border-gray-100">
              <p className="text-gray-500">No products found in the selected categories.</p>
              <button 
                onClick={() => setSelectedCategories([])}
                className="mt-4 text-[#f57224] border border-[#f57224] px-6 py-2 rounded-sm hover:bg-orange-50 transition-colors uppercase text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default CategoryPage;
