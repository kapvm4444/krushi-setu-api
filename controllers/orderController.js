const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const factory = require('./handlerFactory');
const Order = require('./../models/orderModel');

//get all Orders
exports.getAllOrders = factory.getAll(Order);

//get an Order
exports.getOrder = factory.getOne(Order);

//create Order
exports.createOrder = factory.createOne(Order);

//update Order
exports.updateOrder = factory.updateOne(Order);

//delete delete
exports.deleteOrder = factory.deleteOne(Order);
