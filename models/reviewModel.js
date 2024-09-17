//Reviews:
// 	description
// 	ratings
// 	productID (where rated?)
// 	userID (who rated?)
// 	date

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Provide a review please'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'A review must belong to a Product'],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A review must belong to a author'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Query Hooks
//Populate
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'name photo',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
