const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getProductReviews,
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// When mounted on /api/products/:productId/reviews
router.route('/')
  .get(getProductReviews)
  .post(protect, addReview);

// When mounted on /api/reviews/:id
router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
