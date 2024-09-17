const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const factory = require('./handlerFactory');
const Document = require('./../models/documentModel');

//Get all Document
exports.getAllDocs = factory.getAll(Document);

//Get a Document
exports.getDocs = factory.getOne(Document);

//Create Document
exports.createDocs = factory.createOne(Document);

//Update Document
exports.updateDocs = factory.updateOne(Document);

//delete Document
exports.deleteDocs = factory.deleteOne(Document);
