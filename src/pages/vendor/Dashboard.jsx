import React from 'react';
import { FiBox, FiShoppingBag, FiDollarSign, FiClock } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <FiBox className="text-3xl text-primary mr-3" />
          <div>
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-xl font-semibold text-gray-800">0</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <FiShoppingBag className="text-3xl text-primary mr-3" />
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-semibold text-gray-800">0</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <FiDollarSign className="text-3xl text-primary mr-3" />
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-xl font-semibold text-gray-800">$0</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <FiClock className="text-3xl text-primary mr-3" />
          <div>
            <p className="text-sm text-gray-500">Recent Orders</p>
            <p className="text-xl font-semibold text-gray-800">0</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-medium mb-2">Recent Orders</h2>
        <p className="text-gray-500">No recent orders.</p>
      </div>
    </div>
  );
};

export default Dashboard;
