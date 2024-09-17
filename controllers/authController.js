const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const sendEmail = require('./../util/sendMail');
const crypto = require('crypto');

const getJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Create User and return a JWT token
exports.signUp = catchAsync(async (req, res, next) => {
  //1. Create User
  const user = await User.create(req.body);

  //2. Generate token
  const token = getJwtToken(user._id);

  //3. send Response
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

//login user and return a JWT token
exports.login = catchAsync(async (req, res, next) => {
  //1. get the email/phone and password
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Please provide email and password both', 400));

  //2. check if user exist and password is correct or not
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError('Email or Password is incorrect', 401));

  //4. log in with JWT
  const token = getJwtToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

//protect content (check if user is logged in or not by JWT)
exports.protect = catchAsync(async (req, res, next) => {
  //1. check if there is a bearer token or not
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];

  //2. check if bearer token is valid or not
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3. check if user still exist or not
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError(
        'User belong to this token do not exist, please Log in Again',
      ),
      404,
    );

  //4. check if user changed password after generating the bearer token
  if (currentUser.isPasswordChangedAfter(decoded.iat))
    return next(
      new AppError('User changed password recently, please Login Again'),
      404,
    );

  //set the user in req, for further use
  req.user = currentUser;
  next();
});

//restrictTo - restrict the user roles for authorization
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You are not authorized to use this resource'),
        403,
      );
    next();
  };
};

//forgot Password - create and sent the password reset token in mail
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //check if email exist or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('There is no user with that email', 404));

  //create the password reset token
  const resetToken = user.getPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send the token along with mail
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;
  const message = `Forgot your password? Click this link to reset your password - valid for 5 minutes\n ${resetUrl}`;

  try {
    await sendEmail({
      message,
      email: user.email,
      subject: 'Password Reset Request [Valid for 5 Mins]',
    });

    res.status(200).json({
      status: 'success',
      message:
        'Token is sent through email, check your inbox and also spam folder',
    });
  } catch (e) {
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email, please try again later',
        500,
      ),
    );
  }
});

//reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  //check if user available based on token
  const resetToken = req.params.token;
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpire: { $gt: Date.now() },
  });
  if (!user) return next(new AppError('Token is invalid or Expired', 400));

  //if user is valid, set the new password
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  await user.save();

  //update the password changed at property [Done in Model side]
  //send the response
  res.status(200).json({
    status: 'success',
    message: 'Your Password is successfully changed',
    data: {
      user,
    },
  });
});

//Update the password [for logged-in users]
exports.updatePassword = catchAsync(async (req, res, next) => {
  //1. get the user from collection
  //check if user entered both fields or not
  if (!req.body.currentPassword || !req.body.newPassword)
    return next(new AppError('Please provide current and new passwords', 400));

  const user = await User.findById(req.user._id).select('+password');
  if (!user)
    return next(new AppError('Invalid JWT token, please log in again', 400));

  //2. check if password is correct or not
  if (!(await user.checkPassword(req.body.currentPassword, user.password)))
    return next(new AppError('Your current password is invalid', 400));

  //3. if yes, then change the password
  user.password = req.body.newPassword;
  user.save();

  res.status(200).json({
    status: 'success',
    message: 'Your Password is updated successfully',
    data: {
      user,
    },
  });
});
