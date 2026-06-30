import React, { useState } from 'react';
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('password'); // 'password' or 'phone'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-md w-full max-w-[400px] p-6 relative shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <FiX className="text-2xl" />
        </button>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 mb-8 mt-2">
          <button 
            onClick={() => setActiveTab('password')}
            className={`text-lg font-medium ${activeTab === 'password' ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Password
          </button>
          <span className="text-gray-200">|</span>
          <button 
            onClick={() => setActiveTab('phone')}
            className={`text-lg font-medium ${activeTab === 'phone' ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Phone Number
          </button>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Please enter your Phone or Email" 
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400"
            />
          </div>
          
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Please enter your password" 
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEye className="text-xl" /> : <FiEyeOff className="text-xl" />}
            </button>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs text-gray-500 hover:text-primary transition-colors">Forgot password?</a>
          </div>

          <button 
            type="button" 
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-md transition-colors mt-2 text-sm uppercase"
          >
            LOGIN
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-500">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignup} className="text-blue-500 hover:underline">
            Sign up
          </button>
        </div>

        <div className="mt-8 text-center relative">
          <div className="absolute inset-0 flex items-center">
             {/* No line, just text in the middle as per design */}
          </div>
          <span className="bg-white px-4 text-sm text-gray-500 relative z-10">Or, login with</span>
        </div>

        <div className="flex items-center justify-center gap-8 mt-6 mb-2">
          <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors">
            <FcGoogle className="text-2xl" />
            <span className="text-sm">Google</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors">
            <FaFacebook className="text-2xl text-[#1877F2]" />
            <span className="text-sm">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
