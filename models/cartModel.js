//Cart:
// 	ProductIDs [array]
// 	UserID
// 	quantity - must be stored locally in device

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: [true, 'Cart must be owned by someone'],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

//Query Hooks
//population
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'owner',
    select: 'name photo',
  }).populate({
    path: 'product',
    select: 'name price image',
  });

  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
