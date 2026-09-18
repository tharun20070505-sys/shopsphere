import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiAlertTriangle,
  FiArrowRight,
  FiPlus,
  FiList,
  FiLayers
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/dashboard');
      if (res.data.success) {
        setStats(res.data.stats);
        setLowStockProducts(res.data.lowStockProducts || []);
        setRecentOrders(res.data.recentOrders || []);
      }
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 text-sm font-medium">Loading admin dashboard statistics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="text-xs text-slate-300">
            Real-time catalog metrics, inventory alerts, and order workflows.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            <FiPlus />
            <span>Add Product</span>
          </Link>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm border border-white/10 transition-all"
          >
            <FiBox />
            <span>Products</span>
          </Link>
          <Link
            to="/admin/categories"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm border border-white/10 transition-all"
          >
            <FiLayers />
            <span>Categories</span>
          </Link>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm border border-white/10 transition-all"
          >
            <FiShoppingCart />
            <span>Orders</span>
          </Link>
          <Link
            to="/admin/users"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm border border-white/10 transition-all"
          >
            <FiUsers />
            <span>Users</span>
          </Link>
        </div>
      </div>

      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Products</span>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats?.totalProducts || 0}</p>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">100+ Catalog Items</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl">
            <FiBox />
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Users</span>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats?.totalUsers || 0}</p>
            <span className="text-[11px] text-indigo-600 font-semibold mt-1 inline-block">1 Admin + Customers</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
            <FiUsers />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats?.totalOrders || 0}</p>
            <span className="text-[11px] text-violet-600 font-semibold mt-1 inline-block">All COD Payment</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center text-2xl">
            <FiShoppingCart />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
            <p className="text-3xl font-black text-slate-900 mt-1">${stats?.totalRevenue || 0}</p>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">Delivered & Active COD</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">
            <FiDollarSign />
          </div>
        </div>
      </div>

      {/* Low Stock Alert and Simple Status Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Low Stock Alerts (< 10) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FiAlertTriangle className="text-lg" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Low Stock Products (Stock &lt; 10)
                </h2>
                <p className="text-xs text-slate-400">Products requiring restocking attention</p>
              </div>
            </div>
            <Link
              to="/admin/products"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>Manage Stock</span>
              <FiArrowRight />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">All product stocks are healthy!</p>
            ) : (
              lowStockProducts.map((prod) => (
                <div key={prod._id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-10 h-10 rounded-xl object-cover bg-slate-100"
                    />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                        {prod.name}
                      </p>
                      <p className="text-[11px] text-slate-400">Brand: {prod.brand}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800">
                      {prod.stock} left
                    </span>
                    <p className="text-[11px] font-bold text-slate-700 mt-0.5">${prod.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Status Distribution Visual Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-4">
            Orders by Status
          </h2>

          <div className="space-y-3 pt-2">
            {stats?.statusDistribution?.map((item) => {
              const count = item.count;
              const total = stats.totalOrders || 1;
              const percentage = Math.round((count / total) * 100);

              const colorMap = {
                PLACED: 'bg-blue-500',
                CONFIRMED: 'bg-amber-500',
                SHIPPED: 'bg-indigo-500',
                DELIVERED: 'bg-emerald-500',
                CANCELLED: 'bg-rose-500'
              };
              const barColor = colorMap[item._id] || 'bg-slate-500';

              return (
                <div key={item._id} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{item._id}</span>
                    <span className="text-slate-500">{count} orders ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Update Order Statuses →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900">Recent Customer Orders</h2>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All</span>
            <FiArrowRight />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((ord) => (
                <tr key={ord._id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{ord._id.slice(-6)}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{ord.user?.name || 'Customer'}</td>
                  <td className="py-3 px-4">{new Date(ord.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">${ord.totalAmount}</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">{ord.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">
                      {ord.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
