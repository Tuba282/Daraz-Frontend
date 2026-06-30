import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom'; 
const HelpCenterOrder = () => {
  const [activeCategory, setActiveCategory] = useState('Orders');

  const categories = [
    'Promotions',
    'Account Management',
    'Daraz Categories',
    'Orders',
    'Payments',
    'Shipping & Delivery',
    'Returns & Refund',
    'Sell on Daraz'
  ];

  return (
    <div className="w-full bg-white min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Mobile Sidebar toggle (optional, for smaller screens) */}
        <div className="md:hidden bg-primary text-white w-10 h-10 flex items-center justify-center rounded-sm mb-4 cursor-pointer">
          <span className="font-bold text-xl">≡</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Sidebar */}
          <div className="w-full md:w-1/4 bg-white hidden md:block rounded-sm shadow-sm">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-gray-800 font-medium">Categories</h2>
            </div>
            <ul className="flex flex-col py-2">
              {categories.map((cat, index) => (
                <li key={index}>
                  <Link
                    to={cat === 'Orders' ? '/order' : '/help-center/faq'}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${activeCategory === cat ? 'bg-red-50 text-[#F53E32] border-l-4 border-[#F53E32] font-medium' : 'text-gray-600 hover:text-gray-800 border-l-4 border-transparent'}`}
                  >
                    <span>{cat}</span>
                    {activeCategory !== cat && <FiChevronDown className="text-gray-400" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content - Empty State */}
          <div className="w-full md:w-3/4 flex flex-col items-center justify-center pt-20">
            {/* Using an emoji or simple CSS representation as a placeholder for the bag graphic, since we don't have the exact image */}
            <div className="relative mb-4 opacity-80">
              <img src="/others/infopagecartpic.webp" alt="Cartinfo" />
            </div>

            <h2 className="text-gray-500 font-medium text-lg mb-1">Empty Content</h2>
            <p className="text-gray-400 text-sm">Sorry, there is no result, please try different keywords.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HelpCenterOrder;
