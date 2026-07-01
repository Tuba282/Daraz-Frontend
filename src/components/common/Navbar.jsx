import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice";
import { selectCartItemCount } from "../../store/slices/cartSlice";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiChevronDown,
  FiChevronRight,
  FiLogOut,
  FiGrid,
  FiHelpCircle,
  FiMessageSquare,
  FiPackage,
  FiTruck,
  FiCreditCard,
  FiRefreshCcw,
  FiCheck,
} from "react-icons/fi";
import toast from "react-hot-toast";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { categories } from "../../data/categories";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItemCount = useSelector(selectCartItemCount);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;

  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((err) => toast.error(err || "Failed to logout"));
  };

  const menuItems = [
    { name: "Home", href: "/", icon: <FiUser /> }, // placeholder icon, replace as needed
    { name: "Categories", href: "/categories", icon: <FiGrid /> },
    { name: "Flash Sale", href: "/flash-sale", icon: <FiHelpCircle /> },
    { name: "Cart", href: "/cart", icon: <FiShoppingCart /> },
    { name: "Wishlist", href: "/wishlist", icon: <FiHeart /> },
    { name: "Profile", href: "/profile", icon: <FiUser /> },
  ];

  return (
    <header className="w-full flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-primary text-white text-xs px-4 hidden md:block">
        <div className="container mx-auto flex justify-end items-center h-[30px]">
          <div className="flex space-x-4 uppercase items-center h-full">
            {/* Save More on App Dropdown */}
            <div className="relative h-full flex items-center">
              <span
                onClick={() => toggleDropdown("app")}
                className="hover:text-gray-200 transition-colors cursor-pointer"
              >
                Save More on App
              </span>

              {activeDropdown === "app" && (
                <div className="absolute top-full -left-4 w-[280px] bg-white rounded-sm shadow-xl p-4 z-100 text-black border border-gray-100">
                  <div className="absolute -top-1.5 left-10 w-3 h-3 bg-white transform rotate-45 border-l border-t border-gray-100"></div>
                  <h3 className="text-sm font-semibold mb-3 capitalize text-gray-800">
                    Download the App
                  </h3>
                  <div className="flex gap-4 items-center">
                    <div className="w-[100px] h-[100px] border border-gray-200 p-1 rounded-sm">
                      <img
                        src="/others/daraz-qr.png"
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="bg-black rounded-md overflow-hidden">
                        <img
                          src="/footer/appstrore.png"
                          alt="App Store"
                          className="w-full object-contain h-8"
                        />
                      </div>
                      <div className="bg-black rounded-md overflow-hidden">
                        <img
                          src="/footer/googleplay.png"
                          alt="Google Play"
                          className="w-full object-contain h-8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <span className="text-gray-300">|</span>

            <Link
              to="/sell"
              className="hover:text-gray-200 cursor-pointer transition-colors"
            >
              Sell On Daraz
            </Link>

            <span className="text-gray-300">|</span>

            {/* Help & Support Dropdown */}
            <div className="relative h-full flex items-center">
              <span
                onClick={() => toggleDropdown("help")}
                className="hover:text-gray-200 transition-colors cursor-pointer"
              >
                Help & Support
              </span>

              {activeDropdown === "help" && (
                <div className="absolute top-full -left-4 w-[250px] bg-white rounded-sm shadow-xl z-100 text-black border border-gray-100 pb-2">
                  <div className="absolute -top-1.5 left-16 w-3 h-3 bg-white transform rotate-45 border-l border-t border-gray-100"></div>
                  <div className="flex flex-col gap-2 mt-2">
                    <Link
                      to="/help-center"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 hover:text-primary transition-colors text-[13px] capitalize font-medium text-gray-600"
                    >
                      <FiHelpCircle className="text-lg text-gray-500" /> Help
                      Center
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 hover:text-primary transition-colors text-[13px] capitalize font-medium text-gray-600"
                    >
                      <FiMessageSquare className="text-lg text-gray-500" />{" "}
                      Contact Customer Care
                    </Link>
                    <Link
                      to="/order"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 px-3 py-3 hover:bg-gray-50 hover:text-primary transition-colors text-[13px] capitalize font-medium text-gray-600"
                    >
                      <FiPackage className="text-lg text-gray-500" /> Order
                    </Link>
                    <Link
                      to="/shipping"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 hover:text-primary transition-colors text-[13px] capitalize font-medium text-gray-600"
                    >
                      <FiTruck className="text-lg text-gray-500" /> Shipping &
                      Delivery
                    </Link>
                    <Link
                      to="/payment"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 hover:text-primary transition-colors text-[13px] capitalize font-medium text-gray-600"
                    >
                      <FiCreditCard className="text-lg text-gray-500" /> Payment
                    </Link>
                    <Link
                      to="/returns"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50 hover:text-primary transition-colors text-[13px] capitalize font-medium text-gray-600"
                    >
                      <FiRefreshCcw className="text-lg text-gray-500" /> Returns
                      & Refunds
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <span className="text-gray-300">|</span>
            {isAuthenticated ? (
              <div className="relative h-full flex items-center">
                <span
                  onClick={() => toggleDropdown("account")}
                  className="hover:text-gray-200 cursor-pointer transition-colors font-medium flex items-center gap-1 uppercase"
                >
                  {user?.name ? `${user.name}'S ACCOUNT` : "MY ACCOUNT"}
                  <FiChevronDown className="text-sm" />
                </span>

                {activeDropdown === "account" && (
                  <div className="absolute top-full right-0 w-[240px] bg-white rounded-sm shadow-xl z-100 text-black border border-gray-100 py-2">
                    <div className="absolute -top-1.5 right-4 w-3 h-3 bg-white transform rotate-45 border-l border-t border-gray-100"></div>
                    <div className="flex flex-col">
                      <Link
                        to="/profile"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-[13px] text-gray-600"
                      >
                        <FiUser className="text-lg text-gray-400" /> Manage My
                        Account
                      </Link>
                      <Link
                        to="/profile/orders"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-[13px] text-gray-600"
                      >
                        <FiPackage className="text-lg text-gray-400" /> My
                        Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-[13px] text-gray-600"
                      >
                        <FiHeart className="text-lg text-gray-400" /> My
                        Wishlist & Followed Stores
                      </Link>
                      <Link
                        to="/profile/reviews"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-[13px] text-gray-600"
                      >
                        <FiMessageSquare className="text-lg text-gray-400" /> My
                        Reviews
                      </Link>
                      <Link
                        to="/profile/returns"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-[13px] text-gray-600"
                      >
                        <FiRefreshCcw className="text-lg text-gray-400" /> My
                        Returns & Cancellations
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(logoutUser());
                          setActiveDropdown(null);
                          toast.success("Logged out successfully");
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-[13px] text-gray-600 text-left w-full"
                      >
                        <FiLogOut className="text-lg text-gray-400" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-gray-200 cursor-pointer transition-colors uppercase"
                >
                  Login
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => navigate("/register")}
                  className="hover:text-gray-200 cursor-pointer transition-colors uppercase"
                >
                  Sign Up
                </button>
              </>
            )}
            <span className="text-gray-300">|</span>
            {isAuthenticated && user?.role === "vendor" && (
              <button
                onClick={() => navigate("/vendor")}
                className="hover:text-gray-200 cursor-pointer transition-colors flex items-center gap-1"
              >
                <FiGrid className="text-lg text-white" /> Dashboard
              </button>
            )}

            {/* Language Dropdown */}
            <div className="relative h-full flex items-center">
              <span
                onClick={() => toggleDropdown("lang")}
                className="hover:text-gray-200 transition-colors cursor-pointer flex items-center gap-1"
              >
                زبان تبدیل کریں
              </span>

              {activeDropdown === "lang" && (
                <div className="absolute top-full right-0 w-[180px] bg-white rounded-sm shadow-xl z-100 text-black border border-gray-100 py-2">
                  <div className="absolute -top-1.5 right-4 w-3 h-3 bg-white transform rotate-45 border-l border-t border-gray-100"></div>
                  <div className="flex flex-col">
                    <button
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src="/others/urdu.png"
                          alt="PK"
                          className="w-7 h-7 rounded-full object-cover"
                          style={{ aspectRatio: "1/1" }}
                        />
                        <span className="text-[12px] font-medium text-gray-600">
                          UR / Urdu
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src="/others/english.png"
                          alt="EN"
                          className="w-7 h-7 rounded-full object-cover"
                          style={{ aspectRatio: "1/1" }}
                        />
                        <span className="text-[12px] font-medium text-gray-600">
                          EN / English
                        </span>
                      </div>
                      <FiCheck className="text-primary text-lg" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />

      {/* Main Header Bar */}
      <div className="bg-primary text-white sticky top-0 z-50 shadow-md py-4 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-4 justify-start">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center  justify-end w-full md:w-[300px]">
            {/* Logo */}
            <Link
              to="/"
              className="text-3xl font-extrabold tracking-tight flex items-center"
            >
              <img src="/logp.png" alt="Daraz" className="h-8 mr-2" />
            </Link>

            {/* Mobile Icons */}
            <div className="flex items-center space-x-4 md:hidden">
              <Link to="/cart" className="relative p-1">
                <FiShoppingCart className="text-2xl" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-primary">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex  max-w-2xl w-full">
            <div className="relative flex-grow flex items-center rounded-[4px] bg-white overflow-hidden shadow-inner">
              <input
                type="text"
                placeholder="Search in Daraz..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 text-gray-800 focus:outline-none placeholder-gray-400 text-sm bg-transparent"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-orange-100 hover:bg-orange-200 text-primary transition-colors flex items-center justify-center border-l border-gray-100"
              >
                <FiSearch className="text-lg font-bold" />
              </button>
            </div>
          </form>

          {/* Nav Icons & Login */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 hover:text-secondary group transition-colors"
            >
              <div className="relative p-1">
                <FiShoppingCart className="text-2xl group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-primary badge-flash">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Auth Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                {/* <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  onBlur={() => setTimeout(() => setShowUserDropdown(false), 200)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full transition-colors font-medium text-sm focus:outline-none"
                >
                  <FiUser className="text-base" />
                  <span className="max-w-[120px] truncate">{user?.name}</span>
                  <FiChevronDown className={`transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} />
                </button> */}
                {/* Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-lg shadow-dropdown border border-gray-100 py-2 text-gray-800 animate-slide-down z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold truncate text-gray-800">
                        {user?.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-orange-50 text-primary text-[10px] font-semibold rounded-full uppercase border border-orange-100">
                        {user?.role}
                      </span>
                    </div>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 text-sm font-medium transition-colors text-gray-700"
                      >
                        <FiGrid className="text-primary" /> Admin Portal
                      </Link>
                    )}
                    {user?.role === "vendor" && (
                      <Link
                        to="/vendor"
                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 text-sm font-medium transition-colors text-gray-700"
                      >
                        <FiGrid className="text-primary" /> Vendor Dashboard
                      </Link>
                    )}
                    {user?.role === "customer" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-gray-50 text-sm font-medium transition-colors text-gray-700"
                      >
                        <FiUser className="text-primary" /> My Profile
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-red-600 hover:bg-red-50 text-sm font-medium transition-colors border-t border-gray-100 mt-1"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-white border-b border-gray-200 hidden md:block relative z-40">
        <div className="container mx-auto px-4">
          <div
            className="relative w-fit"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button
              className={`flex items-center gap-2 py-3 text-sm font-medium focus:outline-none transition-colors ${showCategories ? "text-[#f85606]" : "text-gray-700 hover:text-[#f85606]"}`}
            >
              Categories{" "}
              <FiChevronDown
                className={`transition-transform duration-200 ${showCategories ? "rotate-180 text-[#f85606]" : ""}`}
              />
            </button>

            {/* Professional Nested Dropdown List */}
            {showCategories && (
              <div className="absolute top-full left-0 flex shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-white border border-gray-100/50 rounded-b-sm animate-fade-in text-[13px]">
                {/* Left Pane: Categories */}
                <ul className="w-[240px] py-2 flex flex-col bg-gray-50/30">
                  {categories.map((cat) => (
                    <li
                      key={cat.id}
                      onMouseEnter={() => setActiveDropdown(cat.id)}
                      className={`px-4 py-1.5 flex items-center justify-between cursor-pointer transition-colors ${
                        activeDropdown === cat.id
                          ? "bg-gray-100 text-[#f85606]"
                          : "text-gray-600 hover:bg-gray-100 hover:text-[#f85606]"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {activeDropdown === cat.id && (
                        <FiChevronRight className="text-[#f85606] text-sm" />
                      )}
                    </li>
                  ))}
                </ul>

                {/* Right Pane: Subcategories */}
                {activeDropdown && (
                  <div className="w-[280px] min-h-[380px] bg-white border-l border-gray-100 p-4 shadow-[4px_4px_12px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col gap-1">
                      {categories
                        .find((c) => c.id === activeDropdown)
                        ?.subcategories.flatMap((sub) => sub.items)
                        .map((item, idx) => (
                          <Link
                            key={idx}
                            to={`/search?q=${encodeURIComponent(item)}`}
                            className="px-2 py-1.5 text-gray-500 hover:text-[#f85606] transition-colors hover:bg-gray-50/50 rounded-sm"
                          >
                            {item}
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
