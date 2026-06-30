import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState('Promotions');

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

  const faqData = {
    'Promotions': [
      'What are the bank partners discount?',
      'What are the daraz coins offer?',
      'How to avail free shipping?',
      'How to use vouchers?',
      'Why am I unable to use collectible vouchers?'
    ],
    'Account Management': [
      'What safety measures can I take on Daraz to avoid being hacked or scammed?',
      'How to Clear Caches and cookies?',
      'Can I access Daraz app from multiple devices?',
      'How to unsubscribe Daraz Newsletters?',
      'How can I provide suggestions and feedback?'
    ],
    'Daraz Categories': [
      'What is Daraz Bills?',
      'What is the Fashion & Lifestyle Store at Daraz?',
      'I think my Daraz Mall item is Fake/Counterfeit What should I do?',
      'What is Daraz Coin/Gems Carnival?',
      'What is favourite number?'
    ],
    'Orders': [
      'How do I place an order on Daraz?',
      'What is the Daraz Buyer Policy?',
      'How to cancel the order (Local & Cross Border)?',
      'Order Selector',
      'What is Add-On Electronic Protection Insurance, and how can I purchase it?'
    ],
    'Payments': [
      'What is Platform Fee?',
      'What are the terms and conditions when paying through Easy Monthly Instalment (EMI)?',
      'COD and Credit/Debit Card payment issues?',
      'What is Easy Monthly Instalment (EMI)?',
      'What is Daraz FastCash?'
    ],
    'Shipping & Delivery': [
      'How to track my order?',
      'What are the delivery charges?',
      'What is Daraz Collection point?',
      'What are the expected delivery timelines?',
      'Which couriers does Daraz deliver through?'
    ],
    'Returns & Refund': [
      'What are the refund timelines?',
      'What is Daraz\'s refund policy?',
      'How do I return my item?',
      'How can I track my return?',
      'How should I pack the items for return?'
    ],
    'Sell on Daraz': [
      'How to contact Seller Support Team?',
      'What categories can i sell on Daraz?',
      'How can I sell on Daraz?',
      'What if incorrect information is submitted during Seller Signup?',
      'What is Daraz Commission?'
    ]
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen py-8">
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
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${activeCategory === cat ? 'bg-red-50 text-[#F53E32] border-l-4 border-[#F53E32] font-medium' : 'text-gray-600 hover:text-gray-800 border-l-4 border-transparent'}`}
                  >
                    <span>{cat}</span>
                    {activeCategory !== cat && <FiChevronDown className="text-gray-400" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <h1 className="text-lg font-medium text-gray-800 mb-6 hidden md:block">Categories</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {Object.entries(faqData).map(([categoryName, questions]) => (
                <div key={categoryName}>
                  <h3 className="text-gray-800 font-medium mb-4">{categoryName}</h3>
                  <ul className="flex flex-col gap-3">
                    {questions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-gray-300 mt-1.5 text-[10px]">•</span>
                        <a href="#" className="text-[13px] text-gray-700 hover:text-[#F53E32] transition-colors leading-relaxed">
                          {q}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Faq;
