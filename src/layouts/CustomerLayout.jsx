import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const CustomerLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isActive = (path) => location.pathname === path;
  const isParentActive = (paths) => paths.some(p => location.pathname.startsWith(p));

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      <Navbar />

      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Sidebar */}
          <aside className="w-full lg:w-56 flex-shrink-0 bg-white shadow-sm">
            {/* Hello, User */}
            <div className="px-4 py-4 border-b border-gray-100">
              <p className="text-sm text-gray-500">Hello, <span className="font-semibold text-gray-800">{user?.name}</span></p>
            </div>

            <nav className="py-2 text-sm">

              {/* Manage My Account */}
              <div className="px-4 py-2">
                <Link
                  to="/profile"
                  className={`font-semibold block mb-1 ${isParentActive(['/profile']) ? 'text-[#0F68C9]' : 'text-gray-800 hover:text-[#0F68C9]'}`}
                >
                  Manage My Account
                </Link>
                <div className="flex flex-col pl-2 gap-1">
                  <Link to="/profile" className={`py-1 ${isActive('/profile') ? 'text-[#0F68C9]' : 'text-gray-500 hover:text-[#0F68C9]'}`}>
                    My Profile
                  </Link>
                  <Link to="/profile/addresses" className={`py-1 ${isActive('/profile/addresses') ? 'text-[#0F68C9]' : 'text-gray-500 hover:text-[#0F68C9]'}`}>
                    Address Book
                  </Link>
                  <Link to="/profile/payment-options" className={`py-1 ${isActive('/profile/payment-options') ? 'text-[#0F68C9]' : 'text-gray-500 hover:text-[#0F68C9]'}`}>
                    My Payment Options
                  </Link>
                  <Link to="/profile/wallet" className={`py-1 ${isActive('/profile/wallet') ? 'text-[#0F68C9]' : 'text-gray-500 hover:text-[#0F68C9]'}`}>
                    Daraz Wallet
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-100 my-1"></div>

              {/* My Orders */}
              <div className="px-4 py-2">
                <Link
                  to="/profile/orders"
                  className={`font-semibold block mb-1 ${isParentActive(['/profile/orders', '/profile/order/']) ? 'text-[#0F68C9]' : 'text-gray-800 hover:text-[#0F68C9]'}`}
                >
                  My Orders
                </Link>
                <div className="flex flex-col pl-2 gap-1">
                  <Link to="/profile/returns" className={`py-1 ${isActive('/profile/returns') ? 'text-[#0F68C9]' : 'text-gray-500 hover:text-[#0F68C9]'}`}>
                    My Returns
                  </Link>
                  <Link to="/profile/cancellations" className={`py-1 ${isActive('/profile/cancellations') ? 'text-[#0F68C9]' : 'text-gray-500 hover:text-[#0F68C9]'}`}>
                    My Cancellations
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-100 my-1"></div>

              {/* Single links */}
              <div className="px-4 py-2">
                <Link to="/profile/reviews" className={`font-semibold block ${isActive('/profile/reviews') ? 'text-[#0F68C9]' : 'text-gray-800 hover:text-[#0F68C9]'}`}>
                  My Reviews
                </Link>
              </div>

              <div className="border-t border-gray-100 my-1"></div>

              <div className="px-4 py-2">
                <Link to="/wishlist" className={`font-semibold block ${isActive('/wishlist') ? 'text-[#0F68C9]' : 'text-gray-800 hover:text-[#0F68C9]'}`}>
                  My Wishlist &amp; Followed Stores
                </Link>
              </div>

              <div className="border-t border-gray-100 my-1"></div>

              <div className="px-4 py-2">
                <Link to="/sell" className={`font-semibold block ${isActive('/sell') ? 'text-[#0F68C9]' : 'text-gray-800 hover:text-[#0F68C9]'}`}>
                  Sell On Daraz
                </Link>
              </div>

              <div className="border-t border-gray-100 mt-1"></div>

              <div className="px-4 py-3">
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-500 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-h-[500px]">
            <Outlet />
          </main>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerLayout;
