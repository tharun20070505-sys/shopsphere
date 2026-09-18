import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import {
  FiStar,
  FiHeart,
  FiShoppingCart,
  FiTruck,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiTrash2,
  FiEdit2,
  FiArrowLeft
} from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Review form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      if (res.data.success) {
        setProduct(res.data.product);
      }
    } catch (err) {
      console.error('Error fetching product details:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/products/${id}/reviews`);
      if (res.data.success) {
        setReviews(res.data.reviews || []);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, quantity);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error('Please write a comment for your review');
      return;
    }

    try {
      setSubmittingReview(true);
      if (editingReviewId) {
        const res = await api.put(`/reviews/${editingReviewId}`, {
          rating: newRating,
          comment: newComment
        });
        if (res.data.success) {
          toast.success('Review updated!');
          setEditingReviewId(null);
        }
      } else {
        const res = await api.post(`/products/${id}/reviews`, {
          rating: newRating,
          comment: newComment
        });
        if (res.data.success) {
          toast.success('Review submitted successfully!');
        }
      }
      setNewComment('');
      setNewRating(5);
      fetchReviews();
      fetchProductDetails();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await api.delete(`/reviews/${reviewId}`);
      if (res.data.success) {
        toast.info('Review deleted');
        fetchReviews();
        fetchProductDetails();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete review');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <p className="text-slate-500 mt-2 mb-6">The item you are looking for might have been removed.</p>
        <Link to="/products" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold">
          Back to Products
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);
  const price = product.price;
  const discountPrice = product.discountPrice;
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock < 10;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-indigo-600">Products</Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Product Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        {/* Left: Product Image */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80';
            }}
          />
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
              {discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* Right: Product Details & Controls */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400">
                Category: <strong>{product.category?.name}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>

            {/* Ratings Overview */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-sm ${
                      i < Math.round(product.rating || 4.5)
                        ? 'text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-700">
                {product.rating ? product.rating.toFixed(1) : '4.5'}
              </span>
              <span className="text-xs text-slate-400">
                ({reviews.length} customer {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                ${hasDiscount ? discountPrice : price}
              </span>
              {hasDiscount && (
                <span className="text-lg text-slate-400 line-through">
                  ${price}
                </span>
              )}
              <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Cash on Delivery Only
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock status indicator */}
            <div className="pt-2">
              {isOutOfStock ? (
                <div className="flex items-center gap-2 text-sm text-rose-600 font-semibold">
                  <FiAlertCircle className="text-lg" />
                  <span>Currently Out of Stock</span>
                </div>
              ) : isLowStock ? (
                <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold">
                  <FiAlertCircle className="text-lg" />
                  <span>Hurry! Only {product.stock} items left in stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">
                  <FiCheckCircle className="text-lg" />
                  <span>In Stock ({product.stock} units available)</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Row: Quantity + Add To Cart + Wishlist */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-4">
              {/* Quantity selector */}
              {!isOutOfStock && (
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-xs text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  isOutOfStock
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-lg active:scale-95'
                }`}
              >
                <FiShoppingCart className="text-base" />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-2xl border transition-all ${
                  inWishlist
                    ? 'bg-rose-50 border-rose-200 text-rose-500 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-200 shadow-sm'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                {inWishlist ? <FaHeart className="text-xl" /> : <FiHeart className="text-xl" />}
              </button>
            </div>

            {/* Shopping perks badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <FiTruck className="text-indigo-600 text-base" />
                <span>Cash on Delivery checkout</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <FiShield className="text-emerald-600 text-base" />
                <span>100% Guaranteed authentic</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Customer Reviews ({reviews.length})
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Read real feedback from verified buyers across the ShopSphere community
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-2xl font-black text-slate-900">
              {product.rating ? product.rating.toFixed(1) : '4.5'}
            </div>
            <div>
              <div className="flex text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.round(product.rating || 4.5) ? 'text-amber-400' : 'text-slate-200'} />
                ))}
              </div>
              <span className="text-[11px] text-slate-400">Average Store Rating</span>
            </div>
          </div>
        </div>

        {/* Add / Edit Review Form */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            {editingReviewId ? 'Edit Your Review' : 'Write a Customer Review'}
          </h3>

          {user ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Your Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <FaStar
                        className={`text-xl ${
                          star <= newRating ? 'text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-700">{newRating} of 5 Stars</span>
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="block text-xs font-semibold text-slate-600 mb-1">
                  Your Review Comments
                </label>
                <textarea
                  id="comment"
                  rows="3"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your experience regarding performance, build quality, and value..."
                  className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-indigo-200 transition-all disabled:opacity-50"
                >
                  {submittingReview ? 'Submitting...' : editingReviewId ? 'Update Review' : 'Submit Review'}
                </button>
                {editingReviewId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingReviewId(null);
                      setNewComment('');
                      setNewRating(5);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="text-center py-4 text-xs text-slate-500">
              Please{' '}
              <Link to="/login" className="text-indigo-600 font-bold hover:underline">
                log in
              </Link>{' '}
              to submit or manage product reviews.
            </div>
          )}
        </div>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">
              No reviews yet. Be the first to share your feedback!
            </p>
          ) : (
            reviews.map((rev) => {
              const isOwner = user && (user._id === rev.user?._id || user._id === rev.user);
              return (
                <div
                  key={rev._id}
                  className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                        {rev.user?.name ? rev.user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {rev.user?.name || 'Verified Buyer'}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex text-amber-400 text-xs">
                        {[...Array(5)].map((_, idx) => (
                          <FaStar
                            key={idx}
                            className={idx < rev.rating ? 'text-amber-400' : 'text-slate-200'}
                          />
                        ))}
                      </div>

                      {isOwner && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setEditingReviewId(rev._id);
                              setNewRating(rev.rating);
                              setNewComment(rev.comment);
                            }}
                            className="p-1 text-slate-400 hover:text-indigo-600"
                            title="Edit review"
                          >
                            <FiEdit2 className="text-xs" />
                          </button>
                          <button
                            onClick={() => handleDeleteReview(rev._id)}
                            className="p-1 text-slate-400 hover:text-rose-600"
                            title="Delete review"
                          >
                            <FiTrash2 className="text-xs" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                    {rev.comment}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
