const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const multer = require('multer');
const path = require('path');

const upload = multer({ dest: 'public/images/users' });

const router = express.Router({ mergeParams: true });

//sign-up route
router.route('/sign-up').post(authController.signUp);

//log-in Users
router.route('/login').post(authController.login);

//forgot-password
router.route('/forgot-password').post(authController.forgotPassword);
router.route('/reset-password/:token').post(authController.resetPassword);

//update Password
router
  .route('/update-password')
  .post(authController.protect, authController.updatePassword);

router
  .route('/update-me')
  .patch(
    authController.protect,
    upload.single('photo'),
    userController.updateMe,
  );

router
  .route('/delete-me')
  .patch(authController.protect, userController.deleteMe);

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
