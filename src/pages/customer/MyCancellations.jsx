import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const MyCancellations = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        const { data } = await api.get('/orders/my-orders');
        const cancelled = (data.orders || []).filter(
          (o) => o.status?.toLowerCase() === 'cancelled'
        );
        setOrders(cancelled);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCancelledOrders();
  }, []);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '--';
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-normal text-gray-800">My Cancellations</h1>

      {loading ? (
        <div className="bg-white shadow-sm border border-gray-100 p-12 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white shadow-sm border border-gray-100 p-16 flex flex-col items-center justify-center gap-4">
          <p className="text-gray-500 text-sm">There are no cancellations yet.</p>
          <Link
            to="/"
            className="border border-[#f57224] text-[#f57224] px-6 py-2.5 text-xs font-semibold hover:bg-[#f57224] hover:text-white transition-colors uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-sm border border-gray-100">
              {/* Order Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <p className="text-sm text-gray-600">
                  Requested on{' '}
                  <span className="text-gray-800">{formatDateTime(order.updatedAt || order.createdAt)}</span>
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">
                    Order #{order.orderNumber || order._id?.slice(-12)}
                  </span>
                  <Link
                    to={`/profile/order/${order._id}`}
                    className="text-xs text-[#0F68C9] font-semibold hover:underline uppercase"
                  >
                    More Details
                  </Link>
                </div>
              </div>

              {/* Order Items */}
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 last:border-b-0">
                  <img
                    src={
                      item.product?.images?.[0]?.url ||
                      item.product?.images?.[0] ||
                      '/cards/card.png'
                    }
                    alt={item.product?.name}
                    className="w-[80px] h-[80px] object-cover border border-gray-100 flex-shrink-0"
                    onError={(e) => { e.target.src = '/cards/card.png'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {item.product?.name || 'Product'}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <span className="text-sm text-gray-600">
                      Qty: <span className="font-semibold">{item.quantity}</span>
                    </span>
                    <span className="text-xs text-gray-500 border border-gray-300 px-3 py-1 rounded-full">
                      Cancelled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCancellations;
