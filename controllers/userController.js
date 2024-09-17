const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const User = require('./../models/userModel');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

//update the user information, not the password
exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  //1. create error if user try to update the password
  if (req.body.password)
    return next(
      new AppError(
        'You can not change your password here, use /update-password',
        400,
      ),
    );

  //2. Filter out the unwanted fields
  const filteredBody = filterObj(req.body, 'name', 'mobile', 'photo'); //simply filters and give only values which are mentioned in arguments

  //3. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: 'success',
    updatedUser,
  });
});

//Delete the user
exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    active: false,
    deletedAt: Date.now(),
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
