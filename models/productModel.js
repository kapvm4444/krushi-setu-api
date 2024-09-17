//Products:
// 	name -r
// 	price -r
// 	description -r
// 	summary -r
// 	category -r
// 	quantity -r
// 	seller (reference)
// 	images -r
// 	createdAt
// 	reviews - virtual

const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name of the product'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide price for the product'],
  },
  description: {
    type: String,
  },
  summary: {
    type: String,
    max: 120,
  },
  category: {
    type: String,
    enum: ['dairy', 'vehicles', 'tools', 'grains', 'vegetables', 'fruits'],
    required: [true, 'Please provide category for the product'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity for the product'],
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Product must belong to a seller'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Document Hooks
//virtual populate reviews
//--code--
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

//Query Hooks
//Populate
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'seller',
    select: 'name photo',
  }).populate({
    path: 'reviews',
    select: '-__v ',
  });

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
