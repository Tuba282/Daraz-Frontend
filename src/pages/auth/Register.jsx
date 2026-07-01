import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { registerUser, clearError } from "../../store/slices/authSlice";

const Register = () => {
  const [role, setRole] = useState("customer"); // Default role
  const [showPassword, setShowPassword] = useState(false); // toggle password visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const password = watch("password");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: role,
    };

    dispatch(registerUser(payload))
      .unwrap()
      .then((res) => {
        toast.success("Registration successful! Welcome to Daraz Clone.");
        if (role === "vendor") {
          navigate("/vendor");
        } else {
          navigate("/");
        }
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join thousands of users on Daraz Clone
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-card sm:rounded-lg sm:px-10 border border-gray-100">
          {/* Role Selection Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                role === "customer"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setRole("customer")}
              type="button"
            >
              I am a Customer
            </button>
            <button
              className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                role === "vendor"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setRole("vendor")}
              type="button"
            >
              I am a Seller
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className={`block w-full pl-10 pr-3 py-2 sm:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${errors.name ? "border-red-300" : "border-gray-300"}`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className={`block w-full pl-10 pr-3 py-2 sm:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${errors.phone ? "border-red-300" : "border-gray-300"}`}
                    placeholder="123-456-7890"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  className={`block w-full pl-10 pr-3 py-2 sm:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${errors.email ? "border-red-300" : "border-gray-300"}`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Must be at least 6 characters",
                      },
                    })}
                    className={`block w-full pl-10 pr-10 py-2 sm:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${errors.password ? "border-red-300" : "border-gray-300"}`}
                    placeholder="Enter password"
                  />
                  <button type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff className="text-gray-500" /> : <FiEye className="text-gray-500" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className={`block w-full pl-10 pr-10 py-2 sm:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${errors.confirmPassword ? "border-red-300" : "border-gray-300"}`}
                    placeholder="Confirm password"
                  />
                  <button type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff className="text-gray-500" /> : <FiEye className="text-gray-500" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
              >
                {loading
                  ? "Processing..."
                  : role === "vendor"
                    ? "Register as Seller"
                    : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to={role === "vendor" ? "/vendor/login" : "/login"}
              className="font-medium text-primary hover:text-primary-dark"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
