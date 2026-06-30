import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const HelpCenterNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementation for help center search if needed later
  };

  return (
    <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Left: Logo & Title */}
        <Link to="/help-center" className="flex items-center gap-3">
          <img src="/logp.png" alt="Daraz" className="h-8 object-contain" />
          <span className="text-xl md:text-2xl font-normal text-gray-700 hidden sm:block">
            Help Center
          </span>
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-[500px] mx-4 hidden md:block">
          <form onSubmit={handleSearch} className="flex w-full">
            <input 
              type="text" 
              placeholder="Search for topics, questions..." 
              className="w-full px-4 py-2 border border-primary/50 rounded-l-sm focus:outline-none focus:border-primary text-sm"
            />
            <button 
              type="submit" 
              className="bg-primary text-white px-6 py-2 rounded-r-sm hover:bg-primary-dark transition-colors"
            >
              <FiSearch className="text-lg" />
            </button>
          </form>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-primary transition-colors text-sm font-medium"
          >
            Homepage
          </Link>
          <Link 
            to="/help-center/faq" 
            className={`text-sm font-medium pb-1 border-b-2 transition-colors ${location.pathname === '/help-center/faq' ? 'text-primary border-primary' : 'text-gray-600 border-transparent hover:text-primary'}`}
          >
            FAQ
          </Link>
        </div>
      </div>
      
      {/* Mobile Search Bar (shows below on small screens) */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="flex w-full">
          <input 
            type="text" 
            placeholder="search" 
            className="w-full px-4 py-2 border border-primary/50 rounded-l-sm focus:outline-none focus:border-primary text-sm"
          />
          <button 
            type="submit" 
            className="bg-primary text-white px-6 py-2 rounded-r-sm hover:bg-primary-dark transition-colors"
          >
            <FiSearch className="text-lg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpCenterNavbar;
