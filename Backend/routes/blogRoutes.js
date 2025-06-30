const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  addComment,
  deleteComment,
  uploadFeaturedImage,
  getFeaturedBlogPosts,
  getBlogCategories,
  getBlogTags,
  getBlogPostBySlug,
} = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

// Base routes
router.route('/')
  .get(getBlogPosts)
  .post(protect, admin, createBlogPost);

// Blog image upload
router.post(
  '/upload',
  protect,
  admin,
  upload.single('image'),
  uploadFeaturedImage
);

// Filtered blog routes
router.get('/featured', getFeaturedBlogPosts);
router.get('/categories', getBlogCategories);
router.get('/tags', getBlogTags);
router.get('/slug/:slug', getBlogPostBySlug);

// Blog post by ID routes - must come after other specific routes
router.route('/:id')
  .get(getBlogPostById)
  .put(protect, admin, updateBlogPost)
  .delete(protect, admin, deleteBlogPost);

// Blog comments
router.post('/:id/comments', protect, addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);

module.exports = router;
