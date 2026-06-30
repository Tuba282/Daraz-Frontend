import React from 'react';
import { FiSearch, FiTruck, FiLock, FiCreditCard, FiXCircle, FiRefreshCcw, FiDollarSign, FiMap, FiUser, FiTag, FiGrid, FiPackage, FiShoppingBag, FiHeadphones, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
  const selfServiceTools = [
    { name: 'Track My Order', icon: <FiTruck /> },
    { name: 'Reset Password', icon: <FiLock /> },
    { name: 'Daraz Wallet', icon: <FiCreditCard /> },
    { name: 'Cancel My Order', icon: <FiXCircle /> },
    { name: 'Return My Order', icon: <FiRefreshCcw /> },
    { name: 'My Payment Options', icon: <FiDollarSign /> },
    { name: 'Change Delivery Address', icon: <FiMap /> },
    { name: 'My Profile', icon: <FiUser /> },
  ];

  const categories = [
    { name: 'Promotions', icon: <FiTag /> },
    { name: 'Account Management', icon: <FiUser /> },
    { name: 'Daraz Categories', icon: <FiGrid /> },
    { name: 'Orders', icon: <FiPackage /> },
    { name: 'Shipping & Delivery', icon: <FiTruck /> },
    { name: 'Payments', icon: <FiDollarSign /> },
    { name: 'Returns & Refund', icon: <FiRefreshCcw /> },
    { name: 'Sell on Daraz', icon: <FiShoppingBag /> },
  ];

  const topQuestions = [
    "How do I place an order on Daraz?",
    "What are the terms and conditions when paying through Easy Monthly Instalment (EMI)?",
    "What is Daraz Collection point?",
    "What is Daraz Land and How to Play?",
    "What is Daraz FastCash?"
  ];

  return (
    <div className="w-full bg-gray-100 min-h-screen pb-12">
      {/* Top Banner */}
      <div className="w-full bg-primary relative overflow-hidden py-16">
        {/* Abstract shapes - simulated with CSS */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#B2F5EA] opacity-90 rounded-l-full transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute right-0 bottom-0 w-1/4 h-3/4 bg-primary-dark opacity-50 rounded-tl-full transform translate-x-1/4 translate-y-1/4"></div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <h1 className="text-white text-3xl font-medium mb-8">Hi, how can we help?</h1>
          
          <div className="w-full max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Search for topics, questions..." 
              className="w-full px-6 py-4 bg-white rounded-sm shadow-md focus:outline-none text-gray-700"
            />
            <button className="absolute right-0 top-0 h-full bg-[#F53E32] hover:bg-red-600 text-white px-8 rounded-r-sm transition-colors">
              <FiSearch className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-6">
        
        {/* Self Service Tool */}
        <div className="bg-white rounded-sm shadow-sm p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-8">Self Service Tool</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-4">
            {selfServiceTools.map((tool, index) => (
              <div key={index} className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className="w-12 h-12 rounded-full border border-orange-200 flex items-center justify-center text-primary text-2xl group-hover:bg-orange-50 transition-colors">
                  {tool.icon}
                </div>
                <span className="text-sm text-gray-700 text-center">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Questions & My Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top Questions */}
          <div className="lg:col-span-2 bg-white rounded-sm shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-6">Top Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
              {topQuestions.map((q, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1.5 text-xs">•</span>
                  <a href="#" className="text-sm text-gray-800 hover:text-primary transition-colors leading-relaxed">
                    {q}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* My Cases */}
          <div className="bg-white rounded-sm shadow-sm p-6 relative overflow-hidden">
             {/* Subtle background icon for 'My Cases' area */}
            <div className="absolute top-4 right-4 text-pink-100 text-6xl opacity-50">
              <FiShoppingBag />
            </div>
            
            <h2 className="text-lg font-medium text-gray-800 mb-2 relative z-10">My Cases</h2>
            <p className="text-sm text-gray-600 mb-6 relative z-10">To view your complains</p>
            <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors py-2 rounded-sm font-medium relative z-10">
              Click Here
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-sm shadow-sm p-6 mb-10">
          <h2 className="text-lg font-medium text-gray-800 mb-8">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-4">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary text-2xl group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <span className="text-sm text-gray-700 text-center">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us Footer Area */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Still looking for answers? Ask Daz anytime, day or night, Click on 'Contact Customer Care' to connect wit...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="bg-white rounded-sm shadow-sm p-6 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow border border-transparent hover:border-gray-200">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl">
              <FiHeadphones />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Contact Customer Care</h3>
              <p className="text-sm text-gray-500">Live Chat: 10AM - 6PM [Mon-Sun]</p>
            </div>
          </div>
          
          <div className="bg-white rounded-sm shadow-sm p-6 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow border border-transparent hover:border-gray-200">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl">
              <FiPhone />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Call Us 021-111-132729</h3>
              <p className="text-sm text-gray-500">9AM- 6PM [Mon - Sat]</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpCenter;
