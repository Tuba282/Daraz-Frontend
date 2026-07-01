import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./store/slices/authSlice";
import { fetchCart } from "./store/slices/cartSlice";
import { fetchWishlist } from "./store/slices/wishlistSlice";
import Loader from "./components/common/Loader";
import { Toaster } from "react-hot-toast";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import VendorLayout from "./layouts/VendorLayout";
import AdminLayout from "./layouts/AdminLayout";
import HelpCenterLayout from "./layouts/HelpCenterLayout";

// Guards
import { ProtectedRoute, RoleRoute, GuestRoute } from "./routes/RouteGuards";

// Pages
import Home from "./pages/public/Home";
import CustomerLogin from "./pages/auth/CustomerLogin";
import VendorLogin from "./pages/auth/VendorLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import UpdatePassword from "./pages/auth/UpdatePassword";
import HelpCenter from "./pages/public/HelpCenter";
import Faq from "./pages/public/Faq";
import ContactCustomerCare from "./pages/public/ContactCustomerCare";
import CategoryPage from "./pages/public/CategoryPage";
import HelpCenterOrder from "./pages/public/HelpCenterOrder";
import ManageAccount from "./pages/customer/ManageAccount";
import MyOrders from "./pages/customer/MyOrders";
import OrderDetails from "./pages/customer/OrderDetails";
import Checkout from "./pages/customer/Checkout";
import Cart from "./pages/customer/Cart";
import CheckoutPayment from "./pages/customer/CheckoutPayment";
import MyReturns from "./pages/customer/MyReturns";
import ProductDetails from "./pages/public/ProductDetails";
import Wishlist from "./pages/customer/Wishlist";
import MyCancellations from "./pages/customer/MyCancellations";

const NotFound = () => (
  <div className="p-8 text-center">
    <h1 className="text-4xl font-bold">404</h1>
    <p>Page Not Found</p>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe()).then((res) => {
      if (!res.error) {
        dispatch(fetchWishlist());
      }
    });
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/payment" element={<CheckoutPayment />} />

          {/* Auth Routes (Guest Only) */}
          <Route element={<GuestRoute />}>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/login" element={<CustomerLogin />} />
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Help Center Routes */}
        <Route element={<HelpCenterLayout />}>
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/help-center/faq" element={<Faq />} />
          <Route path="/contact" element={<ContactCustomerCare />} />
          <Route path="/order" element={<HelpCenterOrder />} />
        </Route>

        {/* Customer Routes */}
        <Route element={<RoleRoute allowedRoles={["customer"]} />}>
          <Route element={<CustomerLayout />}>
            <Route path="/profile" element={<ManageAccount />} />
            <Route path="/profile/orders" element={<MyOrders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile/order/:id" element={<OrderDetails />} />
            <Route
              path="/profile/addresses"
              element={
                <div className="p-6 text-gray-500">
                  Address Book (Coming Soon)
                </div>
              }
            />
            <Route
              path="/profile/payment-options"
              element={
                <div className="p-6 text-gray-500">
                  Payment Options (Coming Soon)
                </div>
              }
            />
            <Route
              path="/profile/wallet"
              element={
                <div className="p-6 text-gray-500">
                  Daraz Wallet (Coming Soon)
                </div>
              }
            />
            <Route path="/profile/returns" element={<MyReturns />} />
            <Route
              path="/profile/cancellations"
              element={<MyCancellations />}
            />
            <Route
              path="/profile/reviews"
              element={
                <div className="p-6 text-gray-500">
                  My Reviews (Coming Soon)
                </div>
              }
            />
          </Route>
        </Route>

        {/* Vendor Routes */}
        <Route element={<RoleRoute allowedRoles={["vendor"]} />}>
          <Route element={<VendorLayout />}>
            <Route
              path="/vendor"
              element={<div>Vendor Dashboard (TODO)</div>}
            />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<RoleRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<div>Admin Dashboard (TODO)</div>} />
          </Route>
        </Route>

        {/* Update Password (Protected) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/update-password" element={<UpdatePassword />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
