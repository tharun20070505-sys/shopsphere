const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Helper to get or create cart
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      select: 'name price discountPrice image stock brand category'
    });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Filter out items where product may have been deleted
    const validItems = cart.items.filter((item) => item.product !== null);
    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    return res.json({
      success: true,
      cart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching cart'
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const qty = parseInt(quantity, 10);

    if (!productId || qty <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid product ID and quantity are required'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    let cart = await getOrCreateCart(req.user._id);

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    let newQuantity = qty;
    if (existingItemIndex > -1) {
      newQuantity = cart.items[existingItemIndex].quantity + qty;
    }

    // Check stock limit
    if (newQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Cannot add more items. Only ${product.stock} available in stock.`
      });
    }

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      cart.items.push({ product: productId, quantity: qty });
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'name price discountPrice image stock brand category'
    });

    return res.json({
      success: true,
      message: 'Item added to cart',
      cart: populatedCart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error adding to cart'
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const qty = parseInt(quantity, 10);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    let cart = await getOrCreateCart(req.user._id);

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (qty <= 0) {
      // If quantity reduced to 0 or less, remove it
      cart.items.splice(itemIndex, 1);
    } else {
      // Check stock before updating
      if (qty > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} available in stock.`
        });
      }
      cart.items[itemIndex].quantity = qty;
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'name price discountPrice image stock brand category'
    });

    return res.json({
      success: true,
      message: 'Cart updated',
      cart: populatedCart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating cart'
    });
  }
};

// @desc    Remove single item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await getOrCreateCart(req.user._id);

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'name price discountPrice image stock brand category'
    });

    return res.json({
      success: true,
      message: 'Item removed from cart',
      cart: populatedCart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error removing item from cart'
    });
  }
};

// @desc    Clear all items in cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    let cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();

    return res.json({
      success: true,
      message: 'Cart cleared successfully',
      cart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error clearing cart'
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart
};
