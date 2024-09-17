const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const factory = require('./handlerFactory');
const Cart = require('./../models/cartModel');

exports.setProductUserIds = (req, res, next) => {
  if (!req.body.owner) req.body.owner = req.user._id;
  if (!req.body.product) req.body.product = req.params.productId;

  next();
};

//getAllCartItems
exports.getAllCartItems = factory.getAll(Cart);

//getCartItem
exports.getCartItem = factory.getOne(Cart);

//createCartItem
exports.createCartItem = factory.createOne(Cart);

//updateCartItem
exports.updateCartItem = factory.updateOne(Cart);

//deleteCartItem
exports.deleteCartItem = factory.deleteOne(Cart);
