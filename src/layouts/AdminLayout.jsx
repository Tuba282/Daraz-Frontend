import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  FiHome, FiUsers, FiShoppingBag, FiBox, 
  FiTag, FiPieChart, FiLogOut, FiMenu, FiGrid 
} from 'react-icons/fi';
import { logoutUser } from '../store/slices/authSlice';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiHome /> },
    { name: 'Users', path: '/admin/users', icon: <FiUsers /> },
    { name: 'Vendors', path: '/admin/vendors', icon: <FiShoppingBag /> },
    { name: 'Categories', path: '/admin/categories', icon: <FiGrid /> },
    { name: 'Products', path: '/admin/products', icon: <FiBox /> },
    { name: 'Orders', path: '/admin/orders', icon: <FiShoppingBag /> },
    { name: 'Coupons', path: '/admin/coupons', icon: <FiTag /> },
    { name: 'Reports', path: '/admin/reports', icon: <FiPieChart /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-dark text-white transform transition-transform duration-300 z-30 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex-shrink-0 flex flex-col`}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-700 bg-red-600">
          <h2 className="text-xl font-bold tracking-wider">Admin Portal</h2>
        </div>

        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center overflow-hidden">
              {user?.avatar?.url ? (
                <img src={user.avatar.url} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold truncate text-red-400">Super Admin</p>
              <p className="text-xs text-gray-400 truncate">{user?.name}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
          >
            <FiLogOut className="text-lg" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 z-10">
          <button 
            className="md:hidden text-gray-600 hover:text-red-600 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu className="text-2xl" />
          </button>
          <div className="ml-auto">
            <span className="text-sm text-gray-500">System Time: {new Date().toLocaleDateString()}</span>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-8">
          <div className="animate-slide-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
