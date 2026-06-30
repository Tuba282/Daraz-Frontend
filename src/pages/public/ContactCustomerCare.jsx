import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ContactCustomerCare = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowWelcomeModal(true);
    }
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center py-10 relative">
      
      {/* The requested simple text */}
      <h1 className="text-2xl text-gray-800">customer care</h1>

      {/* The Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-md w-full max-w-[400px] shadow-2xl overflow-hidden">
            <div className="p-8 text-center border-b border-gray-100">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Welcome</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Thanks for stopping by! For better service, please log in to continue!
              </p>
            </div>
            <div className="p-4 text-center">
              <button 
                onClick={handleLoginClick}
                className="text-primary font-medium text-lg hover:text-primary-dark transition-colors"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ContactCustomerCare;
