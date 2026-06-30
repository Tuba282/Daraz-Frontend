import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail, FiLock } from 'react-icons/fi';
import { loginUser, clearError } from '../../store/slices/authSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const CustomerLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'customer') {
      navigate('/');
    } else if (isAuthenticated) {
      // If a vendor/admin is trying to access customer login while logged in
      toast.error('Please logout first to login as customer');
    }
    
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch, user]);

  const onSubmit = (data) => {
    dispatch(loginUser(data)).unwrap().then((res) => {
      if(res.user.role !== 'customer') {
          toast.error('Invalid customer credentials');
          // we could dispatch logout here if we strictly want to enforce
      } else {
        toast.success('Welcome back!');
        navigate('/');
      }
    }).catch(()=>{}); // Error handled by useEffect
  };

  return (
    <div className="w-full bg-[#f5f5f5] min-h-[70vh] flex flex-col items-center py-10 font-sans">
      
      <div className="w-full max-w-5xl flex justify-between items-end mb-4 px-4">
        <h1 className="text-[22px] text-gray-700 font-normal">Welcome to Daraz! Please login.</h1>
        <span className="text-xs text-gray-500">
          New member? <Link to="/register" className="text-blue-500 hover:underline">Register</Link> here.
        </span>
      </div>

      <div className="w-full max-w-5xl bg-white p-8 md:p-12 rounded-sm shadow-sm flex flex-col md:flex-row gap-8">
        
        {/* Left Side - Login Form */}
        <div className="flex-1 max-w-md">
          <h2 className="text-lg font-medium text-gray-800 mb-6">Login with Password</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Phone Number or Email*</label>
              <input 
                {...register('email', { required: 'Email/Phone is required' })}
                type="text" 
                placeholder="Please enter your Phone Number or Email" 
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-primary placeholder-gray-400"
              />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs text-gray-600">Password*</label>
                <a href="#" className="text-xs text-blue-500 hover:underline">Forgot Password?</a>
              </div>
              <div className="relative">
                <input 
                  {...register('password', { required: 'Password is required' })}
                  type="password" 
                  placeholder="Please enter your password" 
                  className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-primary placeholder-gray-400"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiLock className="text-lg" />
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-sm transition-colors mt-2 text-sm uppercase"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          <div className="mt-8 text-center relative">
            <div className="absolute inset-0 flex items-center">
               <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="bg-white px-4 text-xs text-gray-400 relative z-10">Or, login with</span>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 py-2.5 rounded-sm transition-colors">
              <span className="text-blue-600 font-bold text-lg">f</span>
              <span className="text-sm text-gray-600">Facebook</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 py-2.5 rounded-sm transition-colors">
              <span className="text-red-500 font-bold text-lg">G</span>
              <span className="text-sm text-gray-600">Google</span>
            </button>
          </div>
        </div>

        {/* Right Side - Empty for now to match screenshot spacing, or could have promotional content */}
        <div className="hidden md:block flex-1 border-l border-gray-100 pl-8">
          {/* Daraz often puts a QR code or promotional banner here, leaving it empty as per typical clean login screen if not provided */}
        </div>

      </div>
    </div>
  );
};

export default CustomerLogin;
