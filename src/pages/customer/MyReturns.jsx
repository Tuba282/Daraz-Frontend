import React from 'react';
import { Link } from 'react-router-dom';

const MyReturns = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-normal text-gray-800">My Returns</h1>

      <div className="bg-white shadow-sm border border-gray-100 p-16 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm">There are no returns yet.</p>
        <Link
          to="/"
          className="border border-[#f57224] text-[#f57224] px-6 py-2.5 text-xs font-semibold hover:bg-[#f57224] hover:text-white transition-colors uppercase tracking-wider"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default MyReturns;
