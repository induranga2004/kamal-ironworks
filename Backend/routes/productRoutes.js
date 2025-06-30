const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  createProductReview,
  uploadProductImage,
  deleteProductImage,
  getProductCategories,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

// Base routes
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

// Search and filter routes
router.get('/categories', getProductCategories);
router.get('/featured', getFeaturedProducts);

// Product by ID routes - these must come after other specific routes
router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// Product images
router.post(
  '/:id/images',
  protect,
  admin,
  upload.single('image'),
  uploadProductImage
);

router.delete('/:id/images/:imageId', protect, admin, deleteProductImage);

// Product reviews
router.post('/:id/reviews', protect, createProductReview);

module.exports = router;
