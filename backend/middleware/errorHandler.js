/**
 * Error Handling Middleware
 * Centralizes error responses and logging
 */

const logger = require('../utils/logger');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Log error
  logger.error(`[${new Date().toISOString()}] ${err.statusCode} - ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = `A record with this ${field} already exists. Please use a different ${field}.`;
    return res.status(409).json({
      success: false,
      message,
      error: { [field]: message }
    });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const errors = {};
    Object.keys(err.errors).forEach(field => {
      errors[field] = err.errors[field].message;
    });
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors
    });
  }

  // Mongoose Cast Error
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }

  // Custom App Error
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Generic error response
  res.status(err.statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'An error occurred. Please try again later.'
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = { errorHandler, AppError };
