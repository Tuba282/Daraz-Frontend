import React from 'react';
import { FiBox, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';

const Products = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Products</h1>
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-1 px-4 py-2 bg-primary text-white rounded hover:bg-primary-600 transition-colors">
          <FiBox className="text-lg" />
          <span>Add New Product</span>
        </button>
        <div className="relative flex-1">
          <FiSearch className="absolute inset-y-0 left-3 flex items-center text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div className="bg-white shadow rounded p-4">
        <p className="text-gray-500">No products yet. Use the button above to add one.</p>
      </div>
    </div>
  );
};

export default Products;
