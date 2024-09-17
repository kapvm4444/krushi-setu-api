//Users:
// 	name
// 	email
// 	mobile
// 	password
// 	role
// 	photo
// 	isVarified
// 	reportCount
// 	isActive
// 	deletedAt
// 	createdAt
// 	location
// 	ShippingLocations

//create mongoose model for users
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

//defining the schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User Must provide a name'],
    },
    email: {
      type: String,
      required: [true, 'User Must provide an email'],
      validator: [validator.isEmail, 'Please provide a valid email address'],
      unique: [true, 'Email already in use'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'User must enter password'],
      minlength: 8,
      maxlength: 64,
      select: false,
    },
    mobile: {
      type: Number,
      required: [true, 'User must provide a mobile number'],
      unique: [true, 'mobile number already in use'],
      validator: [
        validator.isMobilePhone,
        'Please provide a valid mobile number',
      ],
    },
    role: {
      type: String,
      default: 'customer',
      enum: ['customer', 'seller'],
    },
    photo: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    passwordChangedAt: Date,
    currentLocation: String,
    ShippingLocation: String,
    passwordResetToken: String,
    passwordResetExpire: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//Document Hooks:
//encrypt the password
userSchema.pre('save', async function (next) {
  //check if password is modified or not
  if (!this.isModified('password')) next();
  //encrypt the password
  this.password = await bcrypt.hash(this.password, 12);
  //next
  next();
});

//change the password changed at field
userSchema.pre('save', async function (next) {
  //check if password is modified and not new
  if (!this.isModified('password') || this.isNew) next();
  //set the password change date
  this.passwordChangedAt = Date.now() - 1000;
  //next
  next();
});

//model methods
//Check password
userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//checking if password is changed after jwt token is generated or not
userSchema.methods.isPasswordChangedAfter = function (JWTTokenTime) {
  if (this.passwordChangedAt) {
    const passwordChangedTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
    );

    return JWTTokenTime < passwordChangedTime;
  }

  return false;
};

//get the password reset token and store the hashed reset token in db
userSchema.methods.getPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpire = Date.now() + 5 * 60 * 1000;

  return resetToken;
};

//creating the model
const User = mongoose.model('User', userSchema);

module.exports = User;
