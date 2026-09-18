import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiArrowRight, FiArrowLeft, FiShoppingBag, FiTruck } from 'react-icons/fi';

const Cart = () => {
  const {
    cartItems,
    cartCount,
    subtotal,
    shippingFee,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadingCart
  } = useCart();

  const navigate = useNavigate();

  if (loadingCart) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 text-sm font-medium">Loading your cart items...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-sm">
          <FiShoppingBag />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Your Cart is Empty</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore 100+ top brand products today!
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-bold shadow-md shadow-indigo-200 transition-all"
        >
          <FiArrowLeft className="text-base" />
          <span>Explore Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review your selected products before proceeding to Cash on Delivery checkout.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold self-start sm:self-auto hover:underline"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
            {cartItems.map((item) => {
              if (!item.product) return null;
              const prod = item.product;
              const unitPrice = prod.discountPrice > 0 ? prod.discountPrice : prod.price;
              const itemTotal = unitPrice * item.quantity;

              return (
                <div key={prod._id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:bg-slate-50/50 transition-colors">
                  {/* Thumbnail */}
                  <Link
                    to={`/products/${prod._id}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {prod.brand}
                    </span>
                    <Link
                      to={`/products/${prod._id}`}
                      className="block text-sm sm:text-base font-bold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-1"
                    >
                      {prod.name}
                    </Link>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-slate-900">${unitPrice}</span>
                      {prod.discountPrice > 0 && prod.discountPrice < prod.price && (
                        <span className="text-xs text-slate-400 line-through">${prod.price}</span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1 self-start sm:self-center">
                    <button
                      onClick={() => updateQuantity(prod._id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white shadow-xs text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-xs"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(prod._id, item.quantity + 1)}
                      disabled={item.quantity >= prod.stock}
                      className="w-7 h-7 rounded-lg bg-white shadow-xs text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-xs disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                    <span className="text-base font-extrabold text-slate-900">
                      ${itemTotal}
                    </span>
                    <button
                      onClick={() => removeFromCart(prod._id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <FiTrash2 className="text-base" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-2"
          >
            <FiArrowLeft />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary Card */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-black text-slate-900 tracking-tight border-b border-slate-100 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">${subtotal}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span>Shipping</span>
                  <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-bold">
                    {shippingFee === 0 ? 'FREE' : 'FLAT'}
                  </span>
                </span>
                <span className="font-semibold text-slate-800">
                  {shippingFee === 0 ? 'Free' : `$${shippingFee}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 text-xs">
                <span>Payment Method</span>
                <span className="font-bold text-emerald-600">Cash on Delivery (COD)</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-2xl font-black text-indigo-600">${totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 hover:shadow-lg active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <FiArrowRight className="text-base" />
            </button>

            <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
              <FiTruck className="text-emerald-500" />
              <span>Zero prepayment needed • Pay at your door</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
