const Review = require('../models/Review');
const Product = require('../models/Product');

// Helper to recalculate product rating & numReviews
const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });
  const numReviews = reviews.length;
  let rating = 0;

  if (numReviews > 0) {
    const sum = reviews.reduce((acc, item) => acc + item.rating, 0);
    rating = parseFloat((sum / numReviews).toFixed(1));
  }

  await Product.findByIdAndUpdate(productId, {
    rating,
    numReviews
  });
};

// @desc    Get reviews for a product
// @route   GET /api/products/:productId/reviews
// @access  Public
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching reviews'
    });
  }
};

// @desc    Add review for a product
// @route   POST /api/products/:productId/reviews
// @access  Private
const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Rating and comment are required'
      });
    }

    const parsedRating = Number(rating);
    if (parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating: parsedRating,
      comment
    });

    await updateProductRating(productId);

    const populatedReview = await Review.findById(review._id).populate('user', 'name');

    return res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review: populatedReview
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error adding review'
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if review belongs to current user or user is admin
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to edit this review'
      });
    }

    if (rating !== undefined) {
      const parsedRating = Number(rating);
      if (parsedRating < 1 || parsedRating > 5) {
        return res.status(400).json({
          success: false,
          message: 'Rating must be between 1 and 5'
        });
      }
      review.rating = parsedRating;
    }

    if (comment !== undefined) {
      review.comment = comment;
    }

    await review.save();
    await updateProductRating(review.product);

    const populatedReview = await Review.findById(review._id).populate('user', 'name');

    return res.json({
      success: true,
      message: 'Review updated successfully',
      review: populatedReview
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating review'
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    const productId = review.product;
    await Review.findByIdAndDelete(id);
    await updateProductRating(productId);

    return res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting review'
    });
  }
};

module.exports = {
  getProductReviews,
  addReview,
  updateReview,
  deleteReview
};
