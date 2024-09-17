//DocumentProofs:
// 	documentID
// 	sellerID
// 	isVerified

const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Cart must be owned by someone'],
  },
  documentNumber: {
    type: String,
    required: [true, 'must provide your document number'],
  },
  documentType: {
    type: String,
    enum: ['landNumber', 'shramYogiCardNumber'],
    required: [
      true,
      'Must provide type of document Number, either landNumber or shramYogiCardNumber',
    ],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

documentSchema.index(
  { seller: 1, documentNumber: 1 },
  {
    unique: true,
  },
);
//Query Hooks
//population
documentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'seller',
    select: 'name photo',
  });

  next();
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
