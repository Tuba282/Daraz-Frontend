import React, { useState } from 'react';
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import toast from 'react-hot-toast';

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('password'); // 'password' or 'phone'
  const [showPassword, setShowPassword] = useState(false);
  
  // Password tab state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // Phone tab state
  const [phone, setPhone] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Determine if identifier is email or phone
    const isEmail = identifier.includes('@');
    const credentials = isEmail ? { email: identifier, password } : { phone: identifier, password };

    dispatch(loginUser(credentials))
      .unwrap()
      .then(() => {
        toast.success('Logged in successfully');
        onClose();
      })
      .catch((err) => toast.error(err || 'Failed to login'));
  };

  const handleSendOtp = () => {
    if (!phone) {
      toast.error('Please enter your phone number');
      return;
    }
    // Mock OTP sending
    toast.success('Code sent via Whatsapp! (Mocked: enter any code)');
    setShowOtp(true);
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    if (!phone || !otp) {
      toast.error('Please enter phone number and code');
      return;
    }

    dispatch(loginWithPhone({ phone }))
      .unwrap()
      .then(() => {
        toast.success('Logged in successfully');
        onClose();
      })
      .catch((err) => toast.error(err || 'Failed to login with phone'));
  };

  const handleGoogleSuccess = (credentialResponse) => {
    dispatch(socialLogin({ provider: 'google', token: credentialResponse.credential || credentialResponse.access_token }))
      .unwrap()
      .then(() => {
        toast.success('Logged in with Google');
        onClose();
      })
      .catch((err) => toast.error(err || 'Google login failed'));
  };

  const handleFacebookResponse = (response) => {
    if (response.accessToken) {
      dispatch(socialLogin({ provider: 'facebook', token: response.accessToken, userID: response.userID }))
        .unwrap()
        .then(() => {
          toast.success('Logged in with Facebook');
          onClose();
        })
        .catch((err) => toast.error(err || 'Facebook login failed'));
    } else {
      toast.error('Facebook login cancelled or failed');
    }
  };

  // Custom Google Login Hook for the button
  const GoogleLoginButton = () => {
    const login = useGoogleLogin({
      onSuccess: handleGoogleSuccess,
      onError: () => toast.error('Google login failed'),
    });
    return (
      <button type="button" onClick={() => login()} className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors">
        <FcGoogle className="text-2xl" />
        <span className="text-sm">Google</span>
      </button>
    );
  };

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

        {/* <h2 className="text-xl font-medium text-center mb-4 mt-2 text-gray-800">Welcome to Daraz! Please login.</h2> */}

        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 mb-6">
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

        {/* Password Form */}
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordLogin} className="flex flex-col gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Please enter your Phone or Email" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400"
              />
            </div>
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Please enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-md transition-colors mt-2 text-sm uppercase disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
          </form>
        )}

        {/* Phone Form */}
        {activeTab === 'phone' && (
          <form onSubmit={handlePhoneLogin} className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="w-24 border border-gray-300 rounded-md px-2 py-3 flex items-center justify-center bg-white">
                <span className="text-sm text-gray-800">PK+92</span>
              </div>
              <input 
                type="text" 
                placeholder="Please enter your phone number" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400"
              />
            </div>

            {!showOtp ? (
              <button 
                type="button" 
                onClick={handleSendOtp}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-md transition-colors text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <FaWhatsapp className="text-2xl text-green-500 bg-white rounded-full p-0.5" />
                Send code via Whatsapp
              </button>
            ) : (
              <>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-md transition-colors text-sm uppercase disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'LOGIN'}
                </button>
              </>
            )}

            <div className="flex items-start gap-2 mt-1 mb-2">
              <input type="checkbox" id="terms" className="mt-1 custom-checkbox cursor-pointer" required />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-tight">
                By creating and/or using your account, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Use</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
              </label>
            </div>
          </form>
        )}

        <div className="mt-8 text-center relative">
          <div className="absolute inset-0 flex items-center">
             {/* No line, just text in the middle as per design */}
          </div>
          <span className="bg-white px-4 text-sm text-gray-500 relative z-10">Or, login with</span>
        </div>

        <div className="flex items-center justify-center gap-8 mt-6 mb-2">
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLoginButton />
          </GoogleOAuthProvider>
          
          <FacebookLogin
            appId="YOUR_FACEBOOK_APP_ID"
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFacebookResponse}
            render={renderProps => (
              <button type="button" onClick={renderProps.onClick} className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors">
                <FaFacebook className="text-2xl text-[#1877F2]" />
                <span className="text-sm">Facebook</span>
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
