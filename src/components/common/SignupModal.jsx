import React from 'react';
import { FiX } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
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

        <h2 className="text-xl font-medium text-center mb-6 mt-2 text-gray-800">Sign up</h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="w-24 border border-gray-300 rounded-md px-2 py-3 flex items-center justify-center bg-white">
              <span className="text-sm text-gray-800">PK+92</span>
            </div>
            <input 
              type="text" 
              placeholder="Please enter your phone number" 
              className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400"
            />
          </div>

          <div className="flex items-start gap-2 mt-1 mb-2">
            <input type="checkbox" id="terms" className="mt-1 custom-checkbox cursor-pointer" />
            <label htmlFor="terms" className="text-xs text-gray-500 leading-tight">
              By creating and/or using your account, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Use</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button 
            type="button" 
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-md transition-colors text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <FaWhatsapp className="text-2xl text-green-500 bg-white rounded-full p-0.5" />
            Send code via Whatsapp
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-blue-500 hover:underline">
            Log in Now
          </button>
        </div>

        <div className="mt-8 text-center relative">
          <div className="absolute inset-0 flex items-center">
             {/* No line, just text in the middle as per design */}
          </div>
          <span className="bg-white px-4 text-sm text-gray-500 relative z-10">Or, sign up with</span>
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

export default SignupModal;
