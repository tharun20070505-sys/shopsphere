import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import {
  FiCheckCircle,
  FiTruck,
  FiMapPin,
  FiPhone,
  FiUser,
  FiArrowLeft,
  FiShield
} from 'react-icons/fi';

const Checkout = () => {
  const { cartItems, subtotal, shippingFee, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {
      toast.error('Please fill in all shipping address fields');
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty');
      navigate('/products');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/orders', {
        shippingAddress: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim()
        }
      });

      if (res.data.success) {
        toast.success('Order placed successfully with Cash on Delivery!');
        // clearCart state
        await clearCart();
        navigate('/orders');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to place order';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-xs text-slate-500">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold">
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete your delivery details to place your Cash on Delivery order.
          </p>
        </div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600"
        >
          <FiArrowLeft />
          <span>Back to Cart</span>
        </Link>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4">
              <FiMapPin className="text-indigo-600 text-lg" />
              <span>Shipping Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Recipient Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <FiUser className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Phone *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <FiPhone className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House number, street name, apartment or suite"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Austin"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. Texas"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pincode / Postal *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="e.g. 78701"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method Notice */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4">
              <FiTruck className="text-emerald-600 text-lg" />
              <span>Payment Option</span>
            </h2>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                <FiCheckCircle />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-emerald-900">
                  Cash on Delivery (COD) Only
                </p>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Pay with cash when your shipment is handed over by the courier. No advance online payment, credit cards, or digital transfers required.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Review & Place Order Button */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-black text-slate-900 tracking-tight border-b border-slate-100 pb-4">
              Order Review
            </h2>

            {/* Compact Items List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cartItems.map((item) => {
                if (!item.product) return null;
                const prod = item.product;
                const unitPrice = prod.discountPrice > 0 ? prod.discountPrice : prod.price;
                return (
                  <div key={prod._id} className="flex items-center gap-3 text-xs">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                    />
                    <div className="flex-1 truncate">
                      <p className="font-bold text-slate-800 truncate">{prod.name}</p>
                      <p className="text-slate-400">Qty: {item.quantity} × ${unitPrice}</p>
                    </div>
                    <span className="font-bold text-slate-900">
                      ${unitPrice * item.quantity}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">${subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-semibold text-slate-800">
                  {shippingFee === 0 ? 'Free' : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Mode</span>
                <span className="font-bold text-emerald-600">COD</span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline text-sm">
                <span className="font-bold text-slate-900">Total Due</span>
                <span className="text-2xl font-black text-indigo-600">${totalAmount}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50 active:scale-95"
            >
              <FiCheckCircle className="text-base" />
              <span>{loading ? 'Confirming Order...' : 'Place Order (COD)'}</span>
            </button>

            <p className="text-center text-[11px] text-slate-400">
              By placing your order, you agree to receive delivery updates via phone/email.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
