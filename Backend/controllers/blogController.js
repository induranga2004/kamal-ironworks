const asyncHandler = require('express-async-handler');
const BlogPost = require('../models/blogPostModel');
const { upload, uploadFile, deleteFile } = require('../utils/fileUpload');

// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private/Admin
const createBlogPost = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    excerpt,
    categories,
    tags,
    status,
    isFeatured,
    metaTitle,
    metaDescription,
    language,
  } = req.body;

  const blogPost = await BlogPost.create({
    title,
    content,
    excerpt,
    categories: categories || [],
    tags: tags || [],
    author: req.user._id,
    status: status || 'draft',
    publishedAt: status === 'published' ? Date.now() : null,
    isFeatured: isFeatured || false,
    metaTitle: metaTitle || title,
    metaDescription: metaDescription || '',
    language: language || 'en',
  });

  if (blogPost) {
    // Populate author details for response
    const populatedBlogPost = await BlogPost.findById(blogPost._id).populate('author', 'name');
    res.status(201).json(populatedBlogPost);
  } else {
    res.status(400);
    throw new Error('Invalid blog post data');
  }
});

// @desc    Upload featured image
// @route   PUT /api/blog/:id/image
// @access  Private/Admin
const uploadFeaturedImage = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // Check if file is in the request
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // Delete previous image if it exists
  if (blogPost.featuredImage && blogPost.featuredImage.publicId) {
    await deleteFile(blogPost.featuredImage.publicId);
  }

  // Upload new image
  const uploadResult = await uploadFile(req.file, 'blog');

  if (!uploadResult.success) {
    res.status(500);
    throw new Error('File upload failed');
  }

  // Update blog post with image info
  blogPost.featuredImage = {
    url: uploadResult.url,
    publicId: uploadResult.public_id,
  };

  const updatedBlogPost = await blogPost.save();
  res.json(updatedBlogPost);
});

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getBlogPosts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  // Build query based on filters
  const query = {};
  
  // Language filter
  if (req.query.language) {
    query.language = req.query.language;
  }
  
  // Category filter
  if (req.query.category) {
    query.categories = { $in: [req.query.category] };
  }
  
  // Tag filter
  if (req.query.tag) {
    query.tags = { $in: [req.query.tag] };
  }
  
  // Featured filter
  if (req.query.featured === 'true') {
    query.isFeatured = true;
  }
  
  // Search by title or content
  if (req.query.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { content: { $regex: req.query.search, $options: 'i' } },
    ];
  }
  
  // Only show published posts for non-admin users
  if (!req.user || !req.user.isAdmin) {
    query.status = 'published';
  }

  const count = await BlogPost.countDocuments(query);
  
  const blogPosts = await BlogPost.find(query)
    .populate('author', 'name')
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    blogPosts,
    page,
    pages: Math.ceil(count / pageSize),
    totalPosts: count,
  });
});

// @desc    Get featured blog posts
// @route   GET /api/blog/featured
// @access  Public
const getFeaturedBlogPosts = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 4;
  const language = req.query.language || 'en';
  
  const blogPosts = await BlogPost.find({ 
    isFeatured: true,
    status: 'published',
    language 
  })
    .populate('author', 'name')
    .sort({ publishedAt: -1 })
    .limit(limit);

  res.json(blogPosts);
});

// @desc    Get blog categories
// @route   GET /api/blog/categories
// @access  Public
const getBlogCategories = asyncHandler(async (req, res) => {
  const categories = await BlogPost.distinct('categories');
  res.json(categories);
});

// @desc    Get blog tags
// @route   GET /api/blog/tags
// @access  Public
const getBlogTags = asyncHandler(async (req, res) => {
  const tags = await BlogPost.distinct('tags');
  res.json(tags);
});

// @desc    Get blog post by slug
// @route   GET /api/blog/slug/:slug
// @access  Public
const getBlogPostBySlug = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findOne({ slug: req.params.slug })
    .populate('author', 'name');

  if (blogPost) {
    // Only show published posts to non-admin users
    if (blogPost.status !== 'published' && (!req.user || !req.user.isAdmin)) {
      res.status(404);
      throw new Error('Blog post not found');
    }
    
    // Increment view count
    blogPost.views += 1;
    await blogPost.save();
    
    res.json(blogPost);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Get blog post by ID
// @route   GET /api/blog/:id
// @access  Private/Admin
const getBlogPostById = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id)
    .populate('author', 'name');

  if (blogPost) {
    res.json(blogPost);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
const updateBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // Check if changing from draft to published
  const publishNow = req.body.status === 'published' && blogPost.status !== 'published';

  blogPost.title = req.body.title || blogPost.title;
  blogPost.content = req.body.content || blogPost.content;
  blogPost.excerpt = req.body.excerpt !== undefined ? req.body.excerpt : blogPost.excerpt;
  blogPost.categories = req.body.categories || blogPost.categories;
  blogPost.tags = req.body.tags || blogPost.tags;
  blogPost.status = req.body.status || blogPost.status;
  blogPost.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : blogPost.isFeatured;
  blogPost.metaTitle = req.body.metaTitle || blogPost.metaTitle;
  blogPost.metaDescription = req.body.metaDescription !== undefined ? req.body.metaDescription : blogPost.metaDescription;
  blogPost.language = req.body.language || blogPost.language;
  
  // Set published date if publishing for the first time
  if (publishNow) {
    blogPost.publishedAt = Date.now();
  }

  const updatedBlogPost = await blogPost.save();
  res.json(updatedBlogPost);
});

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // Delete featured image if it exists
  if (blogPost.featuredImage && blogPost.featuredImage.publicId) {
    await deleteFile(blogPost.featuredImage.publicId);
  }

  await blogPost.remove();
  res.json({ message: 'Blog post removed' });
});

// @desc    Add comment to blog post
// @route   POST /api/blog/:id/comments
// @access  Mixed
const addComment = asyncHandler(async (req, res) => {
  const { comment, name, email } = req.body;
  
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // If user is logged in, use their info
  if (req.user) {
    const newComment = {
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
      comment,
      isApproved: req.user.isAdmin, // Auto-approve admin comments
    };
    
    blogPost.comments.push(newComment);
  } else {
    // Guest comment
    if (!name || !email || !comment) {
      res.status(400);
      throw new Error('Name, email, and comment are required');
    }
    
    const newComment = {
      name,
      email,
      comment,
      isApproved: false, // Guest comments require approval
    };
    
    blogPost.comments.push(newComment);
  }

  const updatedBlogPost = await blogPost.save();
  
  res.status(201).json({
    message: req.user && req.user.isAdmin 
      ? 'Comment added' 
      : 'Comment submitted for approval',
    comments: updatedBlogPost.comments,
  });
});

// @desc    Approve comment
// @route   PUT /api/blog/:id/comments/:commentId
// @access  Private/Admin
const approveComment = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  const comment = blogPost.comments.id(req.params.commentId);
  
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }
  
  comment.isApproved = true;
  
  const updatedBlogPost = await blogPost.save();
  res.json(updatedBlogPost.comments);
});

// @desc    Delete comment
// @route   DELETE /api/blog/:id/comments/:commentId
// @access  Private/Admin
const deleteComment = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    res.status(404);
    throw new Error('Blog post not found');
  }

  // Remove comment
  blogPost.comments = blogPost.comments.filter(
    comment => comment._id.toString() !== req.params.commentId
  );
  
  const updatedBlogPost = await blogPost.save();
  res.json({ message: 'Comment removed', comments: updatedBlogPost.comments });
});

module.exports = {
  createBlogPost,
  uploadFeaturedImage,
  getBlogPosts,
  getFeaturedBlogPosts,
  getBlogCategories,
  getBlogTags,
  getBlogPostBySlug,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  addComment,
  approveComment,
  deleteComment,
};
