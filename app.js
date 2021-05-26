const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const handleNoValidRouter = require('./middlewares/handleNoValidRouter');
const app = express();

//middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.all('*', handleNoValidRouter);
app.all('*', handleNoValidRouter);

app.use(globalErrorHandler);
module.exports = app;
