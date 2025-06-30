const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { upload, uploadFile, deleteFile } = require('../utils/fileUpload');

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    comparePrice,
    category,
    subcategory,
    sku,
    countInStock,
    material,
    dimensions,
    weight,
    featured,
  } = req.body;

  // Check if product with same SKU exists
  if (sku) {
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      res.status(400);
      throw new Error('Product with this SKU already exists');
    }
  }

  const product = await Product.create({
    name,
    description,
    price,
    comparePrice: comparePrice || 0,
    category,
    subcategory: subcategory || '',
    sku,
    countInStock: countInStock || 0,
    material: material || '',
    dimensions: dimensions || {},
    weight: weight || {},
    featured: featured || false,
    createdBy: req.user._id,
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
});

// @desc    Upload product image
// @route   PUT /api/products/:id/images
// @access  Private/Admin
const uploadProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if file is in the request
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // Upload new image
  const uploadResult = await uploadFile(req.file, 'products');

  if (!uploadResult.success) {
    res.status(500);
    throw new Error('File upload failed');
  }

  // Add image to product
  product.images.push({
    url: uploadResult.url,
    publicId: uploadResult.public_id,
  });

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Delete product image
// @route   DELETE /api/products/:id/images/:imageId
// @access  Private/Admin
const deleteProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const image = product.images.find(
    img => img._id.toString() === req.params.imageId
  );

  if (!image) {
    res.status(404);
    throw new Error('Image not found');
  }

  // Delete from cloud storage
  if (image.publicId) {
    await deleteFile(image.publicId);
  }

  // Remove from product
  product.images = product.images.filter(
    img => img._id.toString() !== req.params.imageId
  );

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  
  const category = req.query.category ? { category: req.query.category } : {};
  const featured = req.query.featured === 'true' ? { featured: true } : {};

  const count = await Product.countDocuments({ ...keyword, ...category, ...featured });
  
  const products = await Product.find({ ...keyword, ...category, ...featured })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    totalProducts: count,
  });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 8;
  
  const products = await Product.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(limit);

  res.json(products);
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // If SKU is changing, check for uniqueness
  if (req.body.sku && req.body.sku !== product.sku) {
    const existingProduct = await Product.findOne({ sku: req.body.sku });
    if (existingProduct) {
      res.status(400);
      throw new Error('Product with this SKU already exists');
    }
  }

  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price !== undefined ? req.body.price : product.price;
  product.comparePrice = req.body.comparePrice !== undefined ? req.body.comparePrice : product.comparePrice;
  product.category = req.body.category || product.category;
  product.subcategory = req.body.subcategory !== undefined ? req.body.subcategory : product.subcategory;
  product.sku = req.body.sku || product.sku;
  product.countInStock = req.body.countInStock !== undefined ? req.body.countInStock : product.countInStock;
  product.material = req.body.material !== undefined ? req.body.material : product.material;
  product.dimensions = req.body.dimensions || product.dimensions;
  product.weight = req.body.weight || product.weight;
  product.featured = req.body.featured !== undefined ? req.body.featured : product.featured;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Delete all product images
  for (const image of product.images) {
    if (image.publicId) {
      await deleteFile(image.publicId);
    }
  }

  await product.remove();
  res.json({ message: 'Product removed' });
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if user already reviewed
  const alreadyReviewed = product.ratings.find(
    r => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  product.ratings.push(review);
  product.updateAverageRating();

  await product.save();
  res.status(201).json({ message: 'Review added' });
});

module.exports = {
  createProduct,
  uploadProductImage,
  deleteProductImage,
  getProducts,
  getFeaturedProducts,
  getProductCategories,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
};
