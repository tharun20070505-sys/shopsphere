import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTruck, FiShield, FiHeadphones, FiCheckCircle } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Propositions Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800 text-sm">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl flex-shrink-0">
              <FiTruck />
            </div>
            <div>
              <p className="font-semibold text-white">Cash on Delivery</p>
              <p className="text-xs text-slate-400">Pay when your order arrives</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl flex-shrink-0">
              <FiShield />
            </div>
            <div>
              <p className="font-semibold text-white">100% Genuine Products</p>
              <p className="text-xs text-slate-400">Verified realistic inventory</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl flex-shrink-0">
              <FiHeadphones />
            </div>
            <div>
              <p className="font-semibold text-white">24/7 Dedicated Support</p>
              <p className="text-xs text-slate-400">Fast assistance & tracking</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center text-xl flex-shrink-0">
              <FiCheckCircle />
            </div>
            <div>
              <p className="font-semibold text-white">Easy Cancellations</p>
              <p className="text-xs text-slate-400">Cancel placed orders anytime</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <FiShoppingBag className="text-lg" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">ShopSphere</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Shop Smart. Shop Simple. ShopSphere brings you an intuitive intermediate MERN
              e-commerce experience built for learning, demonstration, and reliable online catalog exploration.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800">
                100% Cash On Delivery • No Payment Gateway Needed
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-indigo-400 transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=all" className="hover:text-indigo-400 transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-400 transition-colors">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-indigo-400 transition-colors">Wishlist</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/orders" className="hover:text-indigo-400 transition-colors">Track Orders</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-indigo-400 transition-colors">My Profile</Link>
              </li>
              <li>
                <span className="text-slate-400">Shipping Policy (COD Only)</span>
              </li>
              <li>
                <span className="text-slate-400">Order Cancellation Guide</span>
              </li>
              <li>
                <span className="text-slate-400">Privacy & Terms</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Demo Accounts</h4>
            <div className="text-xs text-slate-400 space-y-2 bg-slate-800/50 p-3 rounded-xl border border-slate-800">
              <div>
                <strong className="text-slate-200">Admin Account:</strong>
                <p className="font-mono text-indigo-300">admin@shopsphere.com</p>
                <p className="font-mono text-slate-400">Pass: Admin@123</p>
              </div>
              <div className="pt-1 border-t border-slate-700/60">
                <strong className="text-slate-200">Customer Account:</strong>
                <p className="font-mono text-indigo-300">alex.johnson@example.com</p>
                <p className="font-mono text-slate-400">Pass: Customer@123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ShopSphere Inc. Built with MERN Stack (MongoDB, Express, React, Node.js).</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400">Cash on Delivery Supported</span>
            <span>•</span>
            <span className="hover:text-slate-400">Portfolio & Learning Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
