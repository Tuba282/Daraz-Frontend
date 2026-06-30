import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { registerUser, clearError } from '../../store/slices/authSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Register = () => {
  const [role, setRole] = useState('customer'); // Default role
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const password = watch("password");

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
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

    dispatch(registerUser(payload)).unwrap().then((res) => {
      toast.success('Registration successful! Welcome to Daraz Clone.');
      if(role === 'vendor') {
         navigate('/vendor');
      } else {
         navigate('/');
      }
    }).catch(()=>{});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-card">
        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join thousands of users on Daraz Clone
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              role === 'customer' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setRole('customer')}
            type="button"
          >
            I am a Customer
          </button>
          <button
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              role === 'vendor' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setRole('vendor')}
            type="button"
          >
            I am a Seller
          </button>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              id="name"
              type="text"
              label="Full Name"
              icon={<FiUser />}
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />

            <Input
              id="email"
              type="email"
              label="Email Address"
              icon={<FiMail />}
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
              })}
              error={errors.email?.message}
            />

            <Input
              id="phone"
              type="tel"
              label="Phone Number"
              icon={<FiPhone />}
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: { value: /^[0-9+\-\s()]+$/, message: 'Invalid phone number' }
              })}
              error={errors.phone?.message}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              icon={<FiLock />}
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              error={errors.password?.message}
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              icon={<FiLock />}
              {...register('confirmPassword', { 
                required: 'Please confirm password',
                validate: value => value === password || "The passwords do not match"
              })}
              error={errors.confirmPassword?.message}
            />
          </div>

          <Button type="submit" fullWidth isLoading={loading} size="lg">
            {role === 'vendor' ? 'Register as Seller' : 'Sign Up'}
          </Button>

          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to={role === 'vendor' ? '/vendor/login' : '/login'} className="font-medium text-primary hover:text-primary-dark">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
