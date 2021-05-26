const AppError = require('../utils/appError');
const handleNoValidRouter = (req, res, next) => {
  next(new AppError('Cant find this URL on this server'));
};

module.exports = handleNoValidRouter;
