import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';

const ManageAccount = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my-orders');
        setOrders(data.orders || []);
      } catch {
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, []);

  // Format date as DD/MM/YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-normal text-gray-800">Manage My Account</h1>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Personal Profile Card */}
        <div className="bg-white shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-gray-800">Personal Profile</h2>
            <Link to="/profile/edit" className="text-xs text-[#0F68C9] hover:underline font-medium">EDIT</Link>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-700 font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">
              {user?.email
                ? user.email.replace(/(?<=.{2}).(?=.*@)/g, '*')
                : '--'}
            </p>
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input type="checkbox" className="w-3 h-3 accent-primary" />
              <span className="text-xs text-gray-500">Receive marketing emails</span>
            </label>
          </div>
        </div>

        {/* Address Book - Shipping */}
        <div className="bg-white shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-gray-800">Address Book</h2>
            <Link to="/profile/addresses" className="text-xs text-[#0F68C9] hover:underline font-medium">EDIT</Link>
          </div>
          <p className="text-[10px] text-[#0F68C9] font-semibold uppercase tracking-wider mb-2">Default Shipping Address</p>
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-gray-700">{user?.name?.split(' ')[0] || 'User'}</p>
            <p className="text-xs text-gray-500">Jodia Bazar, Karachi</p>
            <p className="text-xs text-gray-500">Sindh - Karachi - Jodia Bazar - Jodia Bazar</p>
            <p className="text-xs text-gray-500">(+92) 3000000000</p>
          </div>
        </div>

        {/* Address Book - Billing */}
        <div className="bg-white shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-gray-800 opacity-0">Address Book</h2>
          </div>
          <p className="text-[10px] text-[#0F68C9] font-semibold uppercase tracking-wider mb-2">Default Billing Address</p>
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-gray-700">{user?.name?.split(' ')[0] || 'User'}</p>
            <p className="text-xs text-gray-500">Jodia Bazar, Karachi</p>
            <p className="text-xs text-gray-500">Sindh - Karachi - Jodia Bazar - Jodia Bazar</p>
            <p className="text-xs text-gray-500">(+92) 3000000000</p>
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-medium text-gray-800 text-lg">Recent Orders</h2>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1.5fr_2fr_1.5fr_1fr] px-6 py-3 border-b border-gray-100 text-xs text-gray-500 font-medium">
          <span>Order #</span>
          <span>Placed On</span>
          <span>Items</span>
          <span>Total</span>
          <span></span>
        </div>

        {/* Table Body */}
        {loadingOrders ? (
          <div className="px-6 py-10 text-center text-gray-400 text-sm">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-400 text-sm">No orders found.</div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-[2fr_1.5fr_2fr_1.5fr_1fr] px-6 py-4 border-b border-gray-50 items-center hover:bg-gray-50 transition-colors"
            >
              {/* Order Number */}
              <span className="text-xs text-gray-700 font-mono">{order.orderNumber || order._id?.slice(-12)}</span>

              {/* Placed On */}
              <span className="text-xs text-gray-600">{formatDate(order.createdAt)}</span>

              {/* Items Thumbnails */}
              <div className="flex items-center gap-1 flex-wrap">
                {(order.items || []).slice(0, 3).map((item, idx) => (
                  <img
                    key={idx}
                    src={item.product?.images?.[0]?.url || '/cards/card.png'}
                    alt={item.product?.name}
                    className="w-10 h-10 object-cover border border-gray-200"
                  />
                ))}
                {(order.items?.length || 0) > 3 && (
                  <span className="text-xs text-gray-400">+{order.items.length - 3}</span>
                )}
              </div>

              {/* Total */}
              <span className="text-sm text-gray-700 font-medium">Rs. {order.totalAmount?.toLocaleString()}</span>

              {/* Manage Link */}
              <Link
                to={`/profile/order/${order._id}`}
                className="text-xs text-[#0F68C9] font-semibold hover:underline"
              >
                MANAGE
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
