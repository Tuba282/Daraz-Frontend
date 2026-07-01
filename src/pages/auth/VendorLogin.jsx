import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiBriefcase, FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser, clearError } from "../../store/slices/authSlice";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const VendorLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth,
  );
  const [showPassword, setShowPassword] = useState(false); // toggle password visibility

  useEffect(() => {
    if (isAuthenticated && user?.role === "vendor") {
      navigate("/vendor");
    } else if (isAuthenticated) {
      toast.error("Please logout first to login as vendor");
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch, user]);

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((res) => {
        if (res.user.role !== "vendor") {
          toast.error("Not a vendor account");
        } else {
          toast.success("Welcome to Seller Center!");
          navigate("/vendor");
        }
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-modal">
        <div className="text-center flex flex-col items-center">
          <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-lg mb-4">
            <FiBriefcase className="text-white text-3xl" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
            Seller Center
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage your store and grow your business
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number or Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="text"
                  {...register("email", {
                    required: "Email/Phone is required",
                  })}
                  className={`block w-full pl-10 pr-3 py-2 sm:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${errors.email ? "border-red-300" : "border-gray-300"}`}
                  placeholder="Enter your Email or Phone"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`block w-full pl-10 pr-10 py-2 sm:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${errors.password ? "border-red-300" : "border-gray-300"}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-500" />
                  ) : (
                    <FiEye className="text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password?.message && (
                <p className="mt-2 text-xs text-red-600">
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/vendor/forgot-password"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            size="lg"
            className="text-lg"
          >
            Access Seller Center
          </Button>

          <div className="mt-6 text-center text-sm text-gray-500 border-t pt-4">
            <Link to="/login" className="hover:text-primary underline">
              Back to Customer Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorLogin;
