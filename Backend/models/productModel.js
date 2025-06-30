const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
      default: 0,
    },
    comparePrice: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Please add a product category'],
    },
    subcategory: {
      type: String,
    },
    sku: {
      type: String,
      unique: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    material: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        default: 'cm',
      },
    },
    weight: {
      value: Number,
      unit: {
        type: String,
        default: 'kg',
      },
    },
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Create a pre-save hook to generate SKU if not provided
productSchema.pre('save', async function (next) {
  if (!this.sku) {
    const count = await this.constructor.countDocuments();
    const category = this.category.substring(0, 3).toUpperCase();
    this.sku = `KIW-${category}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

// Update average rating when a new rating is added
productSchema.methods.updateAverageRating = function () {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
  } else {
    const sum = this.ratings.reduce((acc, item) => acc + item.rating, 0);
    this.averageRating = sum / this.ratings.length;
  }
  this.numReviews = this.ratings.length;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
