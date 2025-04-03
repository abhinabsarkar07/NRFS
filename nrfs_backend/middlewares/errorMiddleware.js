// middlewares/errorMiddleware.js
const logger = require('../utils/logger');

const errorMiddleware = (err, req, res, next) => {
  logger.error(err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message });
};

module.exports = errorMiddleware;
