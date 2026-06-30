import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const statusColors = {
  Completed: 'text-gray-500 border-gray-400',
  Delivered: 'text-green-600 border-green-400',
  Pending: 'text-yellow-600 border-yellow-400',
  Processing: 'text-blue-600 border-blue-400',
  Cancelled: 'text-red-600 border-red-400',
  Shipped: 'text-teal-600 border-teal-400',
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my-orders');
        setOrders(data.orders || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-normal text-gray-800">My Orders</h1>

      <div className="bg-white shadow-sm border border-gray-100">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1.5fr_2fr_1.5fr_1.2fr_1fr] px-6 py-3 border-b border-gray-100 text-xs text-gray-500 font-medium">
          <span>Order #</span>
          <span>Placed On</span>
          <span>Items</span>
          <span>Total</span>
          <span>Status</span>
          <span></span>
        </div>

        {loading ? (
          <div className="px-6 py-16 text-center text-gray-400 text-sm">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-400 text-sm">
            <p className="text-lg mb-2">No orders yet!</p>
            <Link to="/" className="text-[#0F68C9] hover:underline text-sm">Continue Shopping</Link>
          </div>
        ) : (
          orders.map((order) => {
            const statusLabel = order.status || 'Processing';
            const statusClass = statusColors[statusLabel] || 'text-gray-500 border-gray-400';
            return (
              <div
                key={order._id}
                className="grid grid-cols-[2fr_1.5fr_2fr_1.5fr_1.2fr_1fr] px-6 py-4 border-b border-gray-50 items-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-xs text-gray-700 font-mono">{order.orderNumber || order._id?.slice(-12)}</span>
                <span className="text-xs text-gray-600">{formatDate(order.createdAt)}</span>
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
                <span className="text-sm text-gray-700 font-medium">Rs. {order.totalAmount?.toLocaleString()}</span>
                <span className={`text-xs border px-2 py-1 rounded-sm w-fit ${statusClass}`}>{statusLabel}</span>
                <Link
                  to={`/profile/order/${order._id}`}
                  className="text-xs text-[#0F68C9] font-semibold hover:underline"
                >
                  MANAGE
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyOrders;
