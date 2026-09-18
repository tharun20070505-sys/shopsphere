import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [wishlist, setWishlist] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  // Fetch cart & wishlist whenever user logs in or token changes
  useEffect(() => {
    if (token) {
      fetchCart();
      fetchWishlist();
    } else {
      setCart({ items: [] });
      setWishlist([]);
    }
  }, [token]);

  const fetchCart = async () => {
    try {
      setLoadingCart(true);
      const res = await api.get('/cart');
      if (res.data.success && res.data.cart) {
        setCart(res.data.cart);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoadingCart(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await api.get('/wishlist');
      if (res.data.success && res.data.wishlist) {
        setWishlist(res.data.wishlist);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  // Add to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!token) {
      toast.info('Please log in to add items to your cart');
      return false;
    }

    try {
      const res = await api.post('/cart', { productId, quantity });
      if (res.data.success) {
        setCart(res.data.cart);
        toast.success('Added to cart!');
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to add item to cart';
      toast.error(msg);
      return false;
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    if (!token) return;
    try {
      const res = await api.put(`/cart/${productId}`, { quantity });
      if (res.data.success) {
        setCart(res.data.cart);
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update quantity';
      toast.error(msg);
      return false;
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (!token) return;
    try {
      const res = await api.delete(`/cart/${productId}`);
      if (res.data.success) {
        setCart(res.data.cart);
        toast.info('Item removed from cart');
        return true;
      }
    } catch (error) {
      toast.error('Failed to remove item');
      return false;
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!token) return;
    try {
      const res = await api.delete('/cart');
      if (res.data.success) {
        setCart({ items: [] });
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Wishlist toggle
  const toggleWishlist = async (product) => {
    if (!token) {
      toast.info('Please log in to manage your wishlist');
      return false;
    }

    const productId = typeof product === 'string' ? product : product._id;
    const isPresent = wishlist.some((item) => (item._id || item) === productId);

    try {
      if (isPresent) {
        const res = await api.delete(`/wishlist/${productId}`);
        if (res.data.success) {
          setWishlist(res.data.wishlist || []);
          toast.info('Removed from wishlist');
        }
      } else {
        const res = await api.post(`/wishlist/${productId}`);
        if (res.data.success) {
          setWishlist(res.data.wishlist || []);
          toast.success('Added to wishlist!');
        }
      }
      return true;
    } catch (error) {
      toast.error('Failed to update wishlist');
      return false;
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => (item._id || item) === productId);
  };

  // Derived calculations
  const cartItems = cart?.items || [];
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const wishlistCount = wishlist?.length || 0;

  const subtotal = cartItems.reduce((acc, item) => {
    if (!item.product) return acc;
    const price = item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  // Free shipping over $100, else $10 flat
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 10;
  const totalAmount = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        cartCount,
        wishlist,
        wishlistCount,
        subtotal,
        shippingFee,
        totalAmount,
        loadingCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        fetchCart,
        fetchWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
