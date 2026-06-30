import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMessageSquare, FiInfo } from 'react-icons/fi';
import api from '../../services/api';

const statusColors = {
  Completed: 'text-gray-600 border-gray-400',
  Delivered: 'text-gray-600 border-gray-400',
  Pending: 'text-yellow-600 border-yellow-400',
  Processing: 'text-blue-600 border-blue-400',
  Cancelled: 'text-red-600 border-red-400',
  Shipped: 'text-green-600 border-green-400',
};

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data.order);
      } catch {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '--';
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')} ${d.toLocaleString('en-US', { month: 'short' })} ${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white shadow-sm p-10 text-center text-gray-500">
        <p className="text-lg mb-4">Order not found.</p>
        <Link to="/profile/orders" className="text-[#0F68C9] hover:underline text-sm">← Back to Orders</Link>
      </div>
    );
  }

  const statusLabel = order.status || 'Processing';
  const statusClass = statusColors[statusLabel] || 'text-gray-600 border-gray-400';

  const subtotal = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || order.totalAmount;
  const shippingFee = order.shippingFee || 160;
  const darazVoucher = order.darazVoucher || 0;
  const shippingVoucher = order.shippingVoucher || 0;
  const codFee = order.codFee || 11;

  return (
    <div className="space-y-4">
      {/* Back link */}
      <Link to="/profile" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-2">
        <FiArrowLeft /> Back to Account
      </Link>

      <h1 className="text-2xl font-normal text-gray-800">Order Details</h1>

      {/* Main Order Card */}
      <div className="bg-white shadow-sm border border-gray-100">

        {/* Seller & Status Row */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-sm flex items-center justify-center text-primary text-xs font-bold">
              D
            </div>
            <span className="text-sm font-medium text-gray-700">
              {order.vendor?.businessName || order.vendor?.name || 'Daraz Hub'}{' '}
              <span className="text-gray-400 font-mono text-xs ml-1">{order._id?.slice(-10)}</span>
            </span>
            <button className="flex items-center gap-1 text-xs text-[#0F68C9] border border-[#0F68C9] px-2 py-1 rounded-sm hover:bg-blue-50 transition-colors ml-2">
              <FiMessageSquare className="text-xs" /> Chat with Seller
            </button>
          </div>
          <span className={`text-sm border px-3 py-1 rounded-sm ${statusClass}`}>{statusLabel}</span>
        </div>

        {/* Delivery & Track */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 flex-wrap text-sm text-gray-600">
            <span className="text-gray-400">|</span>
            <span className="flex items-center gap-1">
              <span className="text-xs text-gray-400">⬡</span> Standard Delivery
            </span>
            <span className="font-mono text-xs text-gray-700">
              PK·DEX{order._id?.slice(-9)?.toUpperCase()}
            </span>
            <span className="font-medium text-gray-700">Rs. {order.totalAmount?.toLocaleString()}</span>
            <FiInfo className="text-gray-400" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <button className="bg-[#00B8D4] text-white text-xs px-5 py-2 rounded-sm hover:bg-[#0097B2] transition-colors font-medium">
              Track Package
            </button>
            <p className="text-[11px] text-gray-500">
              {statusLabel === 'Completed' || statusLabel === 'Delivered' ? 'Package delivered!' : 'In transit'}{' '}
              {new Date(order.updatedAt || order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            </p>
          </div>
        </div>

        {/* Order Items */}
        {(order.items || []).map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
            <img
              src={item.product?.images?.[0]?.url || '/cards/card.png'}
              alt={item.product?.name}
              className="w-20 h-20 object-cover border border-gray-100 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 line-clamp-2">{item.product?.name || 'Product'}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-sm text-gray-700">Rs. {(item.price)?.toLocaleString()}</p>
            </div>
            <div className="flex-shrink-0 text-sm text-gray-600 w-16 text-center">
              Qty: {item.quantity}
            </div>
            <div className="flex-shrink-0 text-right">
              <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                Cancel <FiInfo className="text-xs" />
              </button>
              <button className="text-xs text-[#0F68C9] font-medium mt-1 block">WRITE A REVIEW</button>
            </div>
          </div>
        ))}

        {/* Timestamps */}
        <div className="px-6 py-5 border-b border-gray-100 space-y-1">
          <p className="text-xs text-gray-500 font-medium">Order {order.orderNumber || order._id?.slice(-15)}</p>
          <p className="text-xs text-gray-400">Placed on {formatDateTime(order.createdAt)}</p>
          <p className="text-xs text-gray-400">Paid on {formatDateTime(order.paidAt || order.createdAt)}</p>
          <p className="text-xs text-gray-400">Delivered on {formatDateTime(order.deliveredAt || order.updatedAt)}</p>
          {order.completedAt && (
            <p className="text-xs text-gray-400">Completed on {formatDateTime(order.completedAt)}</p>
          )}
          <p className="text-xs text-[#0F68C9] mt-1">
            Paid by {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod || 'Cash on Delivery'}
          </p>
        </div>

        {/* Bottom: Address + Total Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

          {/* Delivery Address */}
          <div className="px-6 py-5 border-r border-gray-100">
            <p className="text-sm font-medium text-gray-800 mb-3">
              {order.shippingAddress?.firstName || order.user?.name?.split(' ')[0] || 'Customer'}
            </p>
            <span className="inline-block bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold mr-2">HOME</span>
            <span className="text-xs text-gray-600">
              {order.shippingAddress?.address || 'Jodia Bazar, Karachi, Pakistan'}
            </span>
            <p className="text-xs text-gray-500 mt-2">{order.shippingAddress?.phone || '03000000000'}</p>
          </div>

          {/* Total Summary */}
          <div className="px-6 py-5">
            <h3 className="text-sm font-medium text-gray-800 mb-4">Total Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal({order.items?.length || 1} Item{(order.items?.length || 1) > 1 ? 's' : ''})</span>
                <span className="text-gray-700">Rs. {subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping Fee</span>
                <span className="text-gray-700">Rs. {shippingFee?.toLocaleString()}</span>
              </div>
              {darazVoucher > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Daraz Voucher</span>
                  <span className="text-[#0F68C9]">-Rs. {darazVoucher}</span>
                </div>
              )}
              {shippingVoucher > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping Fee Voucher</span>
                  <span className="text-[#0F68C9]">-Rs. {shippingVoucher}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-1">
                  COD Handling Fee <FiInfo className="text-xs text-gray-400" />
                </span>
                <span className="text-gray-700">Rs. {codFee}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-medium">
                <span className="text-gray-800 text-base">Total</span>
                <span className="text-gray-900 text-base">Rs. {order.totalAmount?.toLocaleString()}</span>
              </div>
              <p className="text-xs text-[#0F68C9]">
                Paid by {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod || 'Cash on Delivery'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
