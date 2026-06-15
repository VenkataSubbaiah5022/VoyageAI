const ApiError = require('../utils/ApiError')

const notFound = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal server error'

  if (err.code === 11000) {
    statusCode = 409
    message = 'An account with this email already exists'
  }

  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ')
  }

  if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
    console.error(err)
  }

  res.status(statusCode).json({
    success: false,
    message,
  })
}

module.exports = { notFound, errorHandler }
