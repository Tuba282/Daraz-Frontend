import React from 'react';
import { FiBarChart2, FiShoppingCart, FiDollarSign } from 'react-icons/fi';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4 flex items-center">
          <FiShoppingCart className="text-3xl text-primary mr-3" />
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-semibold text-gray-800">0</p>
          </div>
        </div>
        <div className="bg-white shadow rounded p-4 flex items-center">
          <FiDollarSign className="text-3xl text-primary mr-3" />
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-xl font-semibold text-gray-800">$0</p>
          </div>
        </div>
        <div className="bg-white shadow rounded p-4 flex items-center">
          <FiBarChart2 className="text-3xl text-primary mr-3" />
          <div>
            <p className="text-sm text-gray-500">Monthly Sales</p>
            <p className="text-xl font-semibold text-gray-800">$0</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-medium mb-2">Sales Summary Chart</h2>
        <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded">
          {/* Placeholder for chart component */}
          Chart will appear here.
        </div>
      </div>
    </div>
  );
};

export default Analytics;
