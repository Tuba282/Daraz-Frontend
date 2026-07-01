import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiHome,
  FiBox,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiBarChart2,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import { logoutUser } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((err) => toast.error(err || "Failed to logout"));
  };

  const navItems = [
    { name: "Dashboard", path: "/vendor/analytics", icon: <FiHome /> },
    { name: "My Products", path: "/vendor/products", icon: <FiBox /> },
    { name: "Orders", path: "/vendor/orders", icon: <FiShoppingBag /> },
    { name: "Store Settings", path: "/vendor/settings", icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 transform transition-transform duration-300 ease-in-out z-30 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex-shrink-0 flex flex-col shadow-2xl`}
        style={{ backgroundColor: "#1e293b" }}
      >
        {/* Header with logo */}
        <div className="h-16 flex items-center justify-between px-5 bg-primary">
          <h2 className="text-xl font-bold tracking-wide text-white">
            Vendor Panel
          </h2>
          <button
            className="md:hidden text-white hover:text-gray-200"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* User Profile Section */}
        <div
          className="px-5 py-4"
          style={{ borderBottom: "1px solid #334155" }}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
              style={{ backgroundColor: "#475569" }}
            >
              {user?.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate text-white">
                {user?.name}
              </p>
              <p className="text-xs truncate" style={{ color: "#94a3b8" }}>
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
                style={
                  isActive
                    ? { backgroundColor: "#f97316", color: "#ffffff" }
                    : { color: "#cbd5e1" }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#334155";
                    e.currentTarget.style.color = "#ffffff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#cbd5e1";
                  }
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="px-3 py-4" style={{ borderTop: "1px solid #334155" }}>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200"
            style={{ color: "#f87171" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#dc2626";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#f87171";
            }}
          >
            <FiLogOut className="text-lg" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{ backgroundColor: "#f1f5f9" }}
      >
        {/* Top Header */}
        <header
          className="h-16 bg-white flex items-center justify-between px-4 md:px-8 z-10"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          <button
            className="md:hidden focus:outline-none"
            style={{ color: "#475569" }}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <FiMenu className="text-2xl" />
          </button>

          <div className="hidden md:block">
            <h3 className="text-lg font-semibold" style={{ color: "#1e293b" }}>
              {navItems.find((item) => item.path === location.pathname)?.name ||
                "Dashboard"}
            </h3>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 text-sm font-medium text-primary hover:underline"
            >
              <FiExternalLink className="text-sm" />
              <span>View Store</span>
            </Link>
          </div>
        </header>

        {/* Main scrollable content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
