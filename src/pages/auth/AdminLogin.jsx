import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiShield, FiMail, FiLock } from 'react-icons/fi';
import { loginUser, clearError } from '../../store/slices/authSlice';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      navigate('/admin');
    } else if (isAuthenticated) {
      toast.error('Unauthorized access');
    }
    
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch, user]);

  const onSubmit = (data) => {
    dispatch(loginUser(data)).unwrap().then((res) => {
      if(res.user.role !== 'admin') {
          toast.error('Unauthorized access. Admin privileges required.');
      } else {
        toast.success('Admin authentication successful');
        navigate('/admin');
      }
    }).catch(()=>{});
  };
  console.log(user)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="h-16 w-16 bg-primary rounded-xl flex items-center justify-center shadow-md mb-4">
           <FiShield className="text-white text-3xl" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-wide uppercase">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure system access
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-card sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Admin Identifier
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Identifier is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid format' }
                  })}
                  className={`block w-full pl-10 pr-3 py-2 sm:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter admin email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Passcode
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Passcode is required' })}
                  className={`block w-full pl-10 pr-3 py-2 sm:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter passcode"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                {loading ? 'AUTHORIZING...' : 'AUTHORIZE'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
