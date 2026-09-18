import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductList from '../components/ProductList';
import { FiArrowRight, FiCheckCircle, FiShield, FiTruck, FiShoppingBag, FiTag } from 'react-icons/fi';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, featuredRes, latestRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products?featured=true&limit=8'),
          api.get('/products?sort=newest&limit=8')
        ]);

        if (catRes.data.success) setCategories(catRes.data.categories || []);
        if (featuredRes.data.success) setFeaturedProducts(featuredRes.data.products || []);
        if (latestRes.data.success) setLatestProducts(latestRes.data.products || []);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6 shadow-2xl">
        {/* Background glow effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-28 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-wide text-indigo-300">
              <FiTag className="text-sm" /> Over 100+ Authentic Products Available
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Shop Smart.{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
                Shop Simple.
              </span>{' '}
              ShopSphere.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              Experience transparent, hassle-free online shopping. Browse through our curated
              selection of premium electronics, fashion, and home essentials with zero upfront payment.
            </p>

            {/* Value badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="text-emerald-400 text-base" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiTruck className="text-indigo-400 text-base" />
                <span>Fast Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiShield className="text-violet-400 text-base" />
                <span>100% Genuine Items</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Shop Now</span>
                <FiArrowRight className="text-base" />
              </Link>
              <Link
                to="/products?featured=true"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/15 transition-all"
              >
                <span>Featured Deals</span>
              </Link>
            </div>
          </div>

          {/* Hero Floating Visual Card */}
          <div className="relative w-full max-w-md lg:max-w-lg">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80"
                alt="ShopSphere Hero Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold w-fit mb-2">
                  Featured Category
                </span>
                <h3 className="text-xl font-bold text-white">Next-Gen Electronics & Audio</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Discover Sony, Apple, Bose, and more premium hardware at unbeatable rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Browse products across 10 top shopping departments
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            <span>View All</span>
            <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping"></span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Highlights
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Hand-picked top-rated products customers love
            </p>
          </div>
          <Link
            to="/products?featured=true"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            <span>See More</span>
            <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <ProductList products={featuredProducts} loading={loading} />
      </section>

      {/* COD Promotion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 border border-indigo-100 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
              Guaranteed Satisfaction
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Pay Only When It Arrives at Your Doorstep
            </h3>
            <p className="text-slate-600 text-sm max-w-xl">
              ShopSphere supports 100% Cash on Delivery on all 100+ catalog items. No credit cards,
              no online payments, and no prepayment risks. Order now and inspect your items first!
            </p>
          </div>

          <Link
            to="/products"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-200 transition-all flex-shrink-0"
          >
            Start Shopping Now
          </Link>
        </div>
      </section>

      {/* Latest Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Latest Additions
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Freshly stocked items in our catalog
            </p>
          </div>
          <Link
            to="/products?sort=newest"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
          >
            <span>Explore All</span>
            <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <ProductList products={latestProducts} loading={loading} />
      </section>
    </div>
  );
};

export default Home;
