import React from 'react';
import { FiSettings, FiUpload, FiKey } from 'react-icons/fi';

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Store Settings</h1>
      <div className="bg-white shadow rounded p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <FiSettings className="text-xl text-primary" />
          <span className="font-medium">Store Name</span>
        </div>
        <div className="flex items-center space-x-3">
          <FiUpload className="text-xl text-primary" />
          <span className="font-medium">Store Logo</span>
        </div>
        <div className="flex items-center space-x-3">
          <FiKey className="text-xl text-primary" />
          <span className="font-medium">Password Change</span>
        </div>
        <p className="text-gray-500">All fields are placeholders. Implement actual forms later.</p>
      </div>
    </div>
  );
};

export default Settings;
