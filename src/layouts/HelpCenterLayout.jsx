import React from 'react';
import { Outlet } from 'react-router-dom';
import HelpCenterNavbar from '../components/common/HelpCenterNavbar';

const HelpCenterLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <HelpCenterNavbar />
      
      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Intentionally NO footer here per user requirements for Help Center */}
    </div>
  );
};

export default HelpCenterLayout;
