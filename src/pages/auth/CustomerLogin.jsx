import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  loginUser,
  googleLogin,
  clearError,
} from "../../store/slices/authSlice";
import { FcGoogle } from "react-icons/fc";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const CustomerLogin = () => {
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
    if (isAuthenticated && user?.role === "customer") {
      navigate("/");
    } else if (isAuthenticated && user?.role === "vendor") {
      navigate("/");
    } else if (isAuthenticated) {
      toast.error("Please logout first to login as customer");
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
        if (res.user.role !== "customer" && res.user.role !== "vendor") {
          toast.error("Invalid credentials");
        } else {
          toast.success(`Welcome back, ${res.user.role}!`);
          navigate("/");
        }
      })
      .catch(() => {});
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin())
      .unwrap()
      .then((res) => {
        toast.success("Google login successful!");
        navigate("/");
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Daraz!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please login to your account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-card sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Forgot your password?
              </Link>
              <Link
                to="/vendor/login"
                className="text-primary hover:text-primary-dark font-medium"
              >
                Seller Login
              </Link>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New member?{" "}
                  <Link
                    to="/register"
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    Register here
                  </Link>
                </span>
              </div>
            </div>

            {/* <div className="my-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full inline-flex gap-3 items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                <FcGoogle className="text-2xl" />
                <span className="text-sm">Google</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
