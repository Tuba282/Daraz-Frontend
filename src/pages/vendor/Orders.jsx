import React from 'react';
import { FiShoppingBag, FiCheckCircle } from 'react-icons/fi';

const Orders = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
      <div className="bg-white shadow rounded p-4">
        <p className="text-gray-500">No orders to display.</p>
      </div>
    </div>
  );
};

export default Orders;
