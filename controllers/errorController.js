const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value '${value}'. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data.'${errors.join('. ')}'.`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid Token. Login!', 401);
const handleExpiredTokenError = () => new AppError('Token expired!', 401);
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status,
    message,
    stack,
    err,
  });
};

const sendErrorProd = (err, res) => {
  // Just send operational errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // unknow errors
  } else {
    console.error('ERROR!');
    res.status(500).json({
      status: 'error',
      message: err,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  status = err.status || 'error';
  message = err.message;
  stack = err.stack;
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateErrorDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (err.name === 'TokenExpiredError')
      error = handleExpiredTokenError(error);
    sendErrorProd(error, res);
  }
};
