import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { categories } from '../../data/categories';

const MegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div 
      className="hidden lg:block w-[220px] bg-white border border-gray-100 shadow-sm rounded-md relative z-40 h-[340px] text-[13px]"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <ul className="py-2 h-full flex flex-col justify-between">
        {categories.map((cat) => (
          <li 
            key={cat.id}
            onMouseEnter={() => setActiveCategory(cat.id)}
            className={`px-4 py-1 flex items-center justify-between cursor-pointer transition-colors ${
              activeCategory === cat.id ? 'bg-gray-100 text-[#f85606]' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-gray-400">{cat.icon}</span>
              <span className="truncate">{cat.name}</span>
            </span>
            <FiChevronRight className="text-gray-400" />
          </li>
        ))}
      </ul>

      {/* Subcategory Panel */}
      {activeCategory && (
        <div 
          className="absolute top-0 left-full ml-1 w-[700px] h-[340px] bg-white shadow-xl border border-gray-100 rounded-md p-6 flex flex-wrap gap-8 content-start"
        >
          {categories.find(c => c.id === activeCategory)?.subcategories.map((sub, idx) => (
            <div key={idx} className="w-[200px]">
              <h3 className="font-bold text-gray-800 mb-2 border-b border-gray-100 pb-1">{sub.title}</h3>
              <ul className="space-y-1">
                {sub.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link to={`/search?q=${item}`} className="text-gray-600 hover:text-[#f85606] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
