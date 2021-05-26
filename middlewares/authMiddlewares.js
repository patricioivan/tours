const User = require('../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const protect = catchAsync(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer'))
    token = authHeader.split(' ')[1];
  if (!token) return next(new AppError('Please log in to get access', 401));
  const decoded = await promisify(jwt.verify(token, process.env.JWT_SECRET));
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next(new AppError('The token is not valid now', 401));
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User changed his password. Please try login again', 401)
    );
  }
  // ALLOW ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();
});

module.exports = {
  protect,
};
