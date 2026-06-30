import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiBriefcase } from 'react-icons/fi';
import { loginUser, clearError } from '../../store/slices/authSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const VendorLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'vendor') {
      navigate('/vendor');
    } else if (isAuthenticated) {
      toast.error('Please logout first to login as vendor');
    }
    
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch, user]);

  const onSubmit = (data) => {
    dispatch(loginUser(data)).unwrap().then((res) => {
      if(res.user.role !== 'vendor') {
          toast.error('Not a vendor account');
      } else {
        toast.success('Welcome to Seller Center!');
        navigate('/vendor');
      }
    }).catch(()=>{});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
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
            <Input
              id="email"
              type="email"
              label="Vendor Email"
              icon={<FiMail />}
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
              })}
              error={errors.email?.message}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              icon={<FiLock />}
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/vendor/forgot-password" className="font-medium text-primary hover:text-primary-dark">
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" fullWidth isLoading={loading} size="lg" className="text-lg">
            Access Seller Center
          </Button>
          
          <div className="mt-6 text-center text-sm text-gray-500 border-t pt-4">
            <Link to="/login" className="hover:text-primary underline">Back to Customer Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorLogin;
