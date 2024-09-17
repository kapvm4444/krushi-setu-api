const express = require('express');
const cartController = require('./../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect, cartController.setProductUserIds);

router
  .route('/')
  .get(cartController.getAllCartItems)
  .post(cartController.createCartItem);

router
  .route('/:id')
  .get(cartController.getCartItem)
  .patch(cartController.updateCartItem)
  .delete(cartController.deleteCartItem);

module.exports = router;
