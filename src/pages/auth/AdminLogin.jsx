import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiShield, FiMail, FiLock } from 'react-icons/fi';
import { loginUser, clearError } from '../../store/slices/authSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
        <div className="text-center flex flex-col items-center">
          <div className="h-20 w-20 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] mb-6 transform rotate-12 transition-transform hover:rotate-0">
             <FiShield className="text-white text-4xl" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white tracking-widest uppercase">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Secure system access
          </p>
        </div>
        
        <form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <Input
              id="email"
              type="email"
              label={<span className="text-gray-300">Admin Identifier</span>}
              icon={<FiMail className="text-gray-500" />}
              className="bg-gray-700 border-gray-600 text-white focus:border-red-500 focus:ring-red-500"
              {...register('email', { 
                required: 'Identifier is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid format' }
              })}
              error={errors.email?.message}
            />
            <Input
              id="password"
              type="password"
              label={<span className="text-gray-300">Passcode</span>}
              icon={<FiLock className="text-gray-500" />}
              className="bg-gray-700 border-gray-600 text-white focus:border-red-500 focus:ring-red-500"
              {...register('password', { required: 'Passcode is required' })}
              error={errors.password?.message}
            />
          </div>

          <Button 
            type="submit" 
            fullWidth 
            isLoading={loading} 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] tracking-wider"
          >
            AUTHORIZE
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
