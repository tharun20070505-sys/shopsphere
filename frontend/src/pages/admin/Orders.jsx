import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import {
  FiShoppingCart,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiBox
} from 'react-icons/fi';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const statuses = ['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/orders');
      if (res.data.success) {
        setOrders(res.data.orders || []);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const res = await api.put(`/admin/orders/${orderId}`, { status: newStatus });
      if (res.data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? res.data.order : o))
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const term = search.toLowerCase();
    const matchesSearch =
      o._id.toLowerCase().includes(term) ||
      o.user?.name?.toLowerCase().includes(term) ||
      o.user?.email?.toLowerCase().includes(term) ||
      o.shippingAddress?.city?.toLowerCase().includes(term);

    const matchesStatus = statusFilter === 'ALL' || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PLACED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">PLACED</span>;
      case 'CONFIRMED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">CONFIRMED</span>;
      case 'SHIPPED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">SHIPPED</span>;
      case 'DELIVERED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">DELIVERED</span>;
      case 'CANCELLED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">CANCELLED</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Orders Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review orders, update dispatch status, and manage Cash on Delivery fulfillment ({orders.length} total)
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by Order ID, Customer Name, Email, or City..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <FiSearch className="absolute left-3.5 top-2.5 text-slate-400 text-sm" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500">Status:</span>
          {['ALL', ...statuses].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Current Status</th>
                <th className="py-3.5 px-4">Update Status</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No orders found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const isExpanded = expandedId === ord._id;

                  return (
                    <React.Fragment key={ord._id}>
                      <tr className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {ord._id.slice(-6)}
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-900">{ord.user?.name || 'Customer'}</p>
                          <p className="text-[10px] text-slate-400">{ord.user?.email}</p>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 font-black text-slate-900">
                          ${ord.totalAmount}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-600">
                          {ord.paymentMethod} (COD)
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(ord.orderStatus)}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={ord.orderStatus}
                            disabled={updatingId === ord._id}
                            onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                            className="px-2.5 py-1 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                          >
                            {statuses.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : ord._id)}
                            className="p-1 text-slate-400 hover:text-indigo-600 rounded-lg"
                          >
                            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Order Details Row */}
                      {isExpanded && (
                        <tr className="bg-slate-50/80">
                          <td colSpan="8" className="p-4 sm:p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Shipping address info */}
                              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 text-xs">
                                <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-2">
                                  Delivery Address
                                </h4>
                                <p className="font-bold text-slate-800">{ord.shippingAddress?.name}</p>
                                <p className="text-slate-600">{ord.shippingAddress?.address}</p>
                                <p className="text-slate-600">
                                  {ord.shippingAddress?.city}, {ord.shippingAddress?.state} - {ord.shippingAddress?.pincode}
                                </p>
                                <p className="text-slate-600 pt-1">
                                  <strong>Phone:</strong> {ord.shippingAddress?.phone}
                                </p>
                              </div>

                              {/* Products in this order */}
                              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                                <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-2">
                                  Order Items ({ord.products?.length || 0})
                                </h4>
                                <div className="space-y-2">
                                  {ord.products?.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-100 last:border-0">
                                      <span className="text-slate-800 font-medium">
                                        {item.product?.name || 'Product'} × {item.quantity}
                                      </span>
                                      <span className="font-bold text-slate-900">
                                        ${item.price * item.quantity}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
