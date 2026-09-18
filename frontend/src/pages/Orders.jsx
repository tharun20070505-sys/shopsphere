import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import {
  FiBox,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiArrowRight,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders');
      if (res.data.success) {
        setOrders(res.data.orders || []);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      toast.error('Failed to load your orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const res = await api.put(`/orders/${orderId}/cancel`);
      if (res.data.success) {
        toast.info('Order cancelled successfully');
        fetchOrders();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel order');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PLACED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <FiClock className="text-xs" /> Placed
          </span>
        );
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <FiCheckCircle className="text-xs" /> Confirmed
          </span>
        );
      case 'SHIPPED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <FiTruck className="text-xs" /> Shipped
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FiCheckCircle className="text-xs" /> Delivered
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <FiXCircle className="text-xs" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 text-sm font-medium">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-sm">
          <FiBox />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">No Orders Placed Yet</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You have not placed any orders so far. Explore products and place your first Cash on Delivery order!
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-bold shadow-md shadow-indigo-200 transition-all"
        >
          <span>Explore Catalog</span>
          <FiArrowRight className="text-base" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          My Orders ({orders.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review past deliveries, track status, or cancel newly placed COD orders.
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const isExpanded = expandedOrderId === order._id;
          const canCancel = order.orderStatus === 'PLACED';

          return (
            <div
              key={order._id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-slate-300"
            >
              {/* Order Card Header */}
              <div className="p-5 sm:p-6 bg-slate-50/60 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Order ID</span>
                    <span className="font-mono font-bold text-slate-800">{order._id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Order Date</span>
                    <span className="font-semibold text-slate-700">
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Total Amount</span>
                    <span className="font-black text-slate-900 text-sm">
                      ${order.totalAmount}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Payment</span>
                    <span className="font-bold text-emerald-600">
                      {order.paymentMethod} (Cash on Delivery)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(order.orderStatus)}

                  {canCancel && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}

                  <button
                    onClick={() => setExpandedOrderId(isExpanded ? null : order._id)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                    title={isExpanded ? 'Hide Details' : 'View Details'}
                  >
                    {isExpanded ? <FiChevronUp className="text-lg" /> : <FiChevronDown className="text-lg" />}
                  </button>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="divide-y divide-slate-100">
                  {order.products.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {item.product?.image ? (
                          <img
                            src={item.product.image}
                            alt={item.product?.name || 'Product'}
                            className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-100"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                            <FiBox />
                          </div>
                        )}
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-slate-800">
                            {item.product?.name || 'Product'}
                          </p>
                          <p className="text-xs text-slate-400">
                            Quantity: {item.quantity} × ${item.price}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="pt-4 mt-4 border-t border-slate-100 bg-slate-50 p-4 rounded-2xl text-xs space-y-3">
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Shipping Address (Cash on Delivery)
                    </h4>
                    <div className="text-slate-600 leading-relaxed">
                      <p className="font-bold text-slate-700">{order.shippingAddress?.name}</p>
                      <p>{order.shippingAddress?.address}</p>
                      <p>
                        {order.shippingAddress?.city}, {order.shippingAddress?.state} -{' '}
                        {order.shippingAddress?.pincode}
                      </p>
                      <p className="mt-1">
                        <strong>Phone:</strong> {order.shippingAddress?.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
