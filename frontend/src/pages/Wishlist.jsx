import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { FiHeart, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';

const Wishlist = () => {
  const { wishlist, wishlistCount } = useCart();

  if (wishlistCount === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-sm">
          <FiHeart />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Your Wishlist is Empty</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You haven't saved any items yet. Click the heart icon on any product to save it here for later!
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-bold shadow-md shadow-indigo-200 transition-all"
        >
          <FiArrowLeft className="text-base" />
          <span>Explore Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Wishlist ({wishlistCount} {wishlistCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Products you have saved for future orders.
          </p>
        </div>

        <Link
          to="/products"
          className="text-xs text-indigo-600 hover:text-indigo-700 font-bold self-start sm:self-auto hover:underline"
        >
          + Add More Products
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          if (!product || !product._id) return null;
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Wishlist;
