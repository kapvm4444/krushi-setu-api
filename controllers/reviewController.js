const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const factory = require('./handlerFactory');
const Review = require('./../models/reviewModel');

//middleware for setting the product and user fields automatically
exports.setProductUserIds = (req, res, next) => {
  if (!req.body.author) req.body.author = req.user._id;
  if (!req.body.product) req.body.product = req.params.productId;

  next();
};

//get all reviews
exports.getAllReviews = factory.getAll(Review);

//get a review
exports.getReview = factory.getOne(Review);

//create review
exports.createReview = factory.createOne(Review);

//update review
exports.updateReview = factory.updateOne(Review);

//delete review
exports.deleteReview = factory.deleteOne(Review);
