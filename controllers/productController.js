const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const Product = require('./../models/productModel');
const factory = require('./handlerFactory');

//Get all the products
exports.getAllProducts = factory.getAll(Product);

//Get a specific Product
exports.getProduct = factory.getOne(Product);

// Create a Product
exports.createProduct = factory.createOne(Product);

//update a product
exports.updateProduct = factory.updateOne(Product);

//delete a Product
exports.deleteProduct = factory.deleteOne(Product);
