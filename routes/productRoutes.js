const express = require('express');
const productController = require('./../controllers/productController');
const reviewRouter = require('./../routes/reviewRoutes');
const cartRouter = require('./../routes/cartRoutes');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use('/:productId/reviews', reviewRouter);
router.use('/:productId/cart', cartRouter);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
