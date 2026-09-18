import React from 'react';
import ProductCard from './ProductCard';
import { FiPackage, FiSearch } from 'react-icons/fi';

const ProductList = ({ products, loading, emptyMessage = 'No products found.' }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse flex flex-col"
          >
            <div className="aspect-[4/3] bg-slate-200 w-full"></div>
            <div className="p-4 space-y-3 flex-1">
              <div className="h-3 bg-slate-200 rounded w-1/3"></div>
              <div className="h-4 bg-slate-200 rounded w-4/5"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              <div className="pt-4 flex justify-between items-center">
                <div className="h-5 bg-slate-200 rounded w-1/4"></div>
                <div className="h-8 bg-slate-200 rounded-xl w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          <FiSearch />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">No Products Found</h3>
        <p className="text-sm text-slate-500 mb-6">{emptyMessage}</p>
        <button
          onClick={() => window.location.href = '/products'}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          Reset Filters & Explore
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
