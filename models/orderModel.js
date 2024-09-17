//Orders:
// 	productID
// 	shipping address
// 	pickup Address
// 	buyerID
// 	SellerID
// 	isApprovedBySeller
// 	isApprovedByBuyer
// 	totalPrice
// 	OrderDate
// 	Quantity

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'A review must belong to a Product'],
    },
  ],
  shippingAddress: {
    type: String,
    required: [true, 'Must provide a shipping address'],
  },
  pickupAddress: {
    type: String,
    required: [true, 'Must provide a shipping address'],
  },
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a buyer'],
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Product must belong to a seller'],
  },
  isShipped: {
    type: Boolean,
    default: false,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  totalPrice: {
    type: Number,
    required: [true, 'must enter final total price'],
  },
  productsQuantity: [Number],
  createdAt: Date,
});

//Query Hooks
//population
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'seller',
    select: 'name photo',
  })
    .populate({
      path: 'buyer',
      select: 'name photo',
    })
    .populate({
      path: 'products',
      select: '-__v ',
    });

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
