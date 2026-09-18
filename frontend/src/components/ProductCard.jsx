import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product._id);

  const price = product.price;
  const discountPrice = product.discountPrice;
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const isLowStock = product.stock > 0 && product.stock < 10;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Link to={`/products/${product._id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80';
            }}
          />
        </Link>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Wishlist Toggle Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md backdrop-blur-md transition-all ${
            inWishlist
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
              : 'bg-white/90 text-slate-500 hover:text-rose-500 hover:bg-white'
          }`}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {inWishlist ? <FaHeart className="text-sm" /> : <FiHeart className="text-sm" />}
        </button>

        {/* Stock Status Badge */}
        <div className="absolute bottom-2.5 left-2.5">
          {isOutOfStock ? (
            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800/90 text-white backdrop-blur-sm">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white shadow-sm">
              Only {product.stock} Left!
            </span>
          ) : (
            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              In Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-slate-500">
              {product.brand}
            </span>
            <span className="text-[11px] text-slate-400">
              {product.category?.name || ''}
            </span>
          </div>

          {/* Product Name */}
          <Link to={`/products/${product._id}`} className="block">
            <h3
              className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-2 title-font mb-1.5"
              title={product.name}
            >
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center text-amber-400 text-xs">
              <FiStar className="fill-amber-400 text-amber-400" />
              <span className="ml-1 font-bold text-slate-700">
                {product.rating ? product.rating.toFixed(1) : '4.5'}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              ({product.numReviews || 0} reviews)
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900">
                ${hasDiscount ? discountPrice : price}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  ${price}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium text-emerald-600">
              COD Eligible
            </span>
          </div>

          <button
            onClick={() => addToCart(product._id, 1)}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow active:scale-95'
            }`}
          >
            <FiShoppingCart className="text-sm" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
