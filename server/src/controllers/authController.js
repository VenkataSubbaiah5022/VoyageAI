const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')
const env = require('../config/env')

const formatUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  createdAt: user.createdAt,
  preferences: user.preferences,
  notificationSettings: user.notificationSettings,
})

const sendAuthResponse = (res, user, statusCode = 200) => {
  const token = generateToken(user._id)

  res.status(statusCode).json({
    success: true,
    data: {
      user: formatUser(user),
      token,
    },
  })
}

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, acceptedTerms } = req.body

  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password) {
    throw new ApiError(400, 'All fields are required')
  }

  if (!acceptedTerms) {
    throw new ApiError(400, 'You must accept the terms and privacy policy')
  }

  if (password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters')
  }

  const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
  if (existingUser) {
    throw new ApiError(409, 'An account with this email already exists')
  }

  const user = await User.create({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.toLowerCase().trim(),
    password,
  })

  sendAuthResponse(res, user, 201)
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email?.trim() || !password) {
    throw new ApiError(400, 'Email and password are required')
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password')

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password')
  }

  sendAuthResponse(res, user)
})

const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      user: formatUser(req.user),
    },
  })
})

const protect = asyncHandler(async (req, _res, next) => {  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    throw new ApiError(401, 'Not authorized, no token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, env.jwtSecret)
    const user = await User.findById(decoded.id)

    if (!user) {
      throw new ApiError(401, 'Not authorized, user not found')
    }

    req.user = user
    next()
  } catch {
    throw new ApiError(401, 'Not authorized, invalid token')
  }
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email?.trim()) {
    throw new ApiError(400, 'Email is required')
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() })

  if (!user) {
    return res.json({
      success: true,
      message: 'If an account exists for that email, password reset instructions have been sent.',
    })
  }

  const resetToken = crypto.randomBytes(32).toString('hex')
  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000)
  await user.save({ validateBeforeSave: false })

  const resetUrl = `${env.clientUrl}/auth/reset?token=${resetToken}&email=${encodeURIComponent(user.email)}`

  const payload = {
    success: true,
    message: 'If an account exists for that email, password reset instructions have been sent.',
  }

  if (env.nodeEnv === 'development') {
    payload.data = { resetUrl }
  }

  res.json(payload)
})

const resetPassword = asyncHandler(async (req, res) => {
  const { email, token, password } = req.body

  if (!email?.trim() || !token || !password) {
    throw new ApiError(400, 'Email, token, and new password are required')
  }

  if (password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters')
  }

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({
    email: email.toLowerCase().trim(),
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  }).select('+passwordResetToken +passwordResetExpires +password')

  if (!user) {
    throw new ApiError(400, 'Password reset token is invalid or has expired')
  }

  user.password = password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  res.json({ success: true, message: 'Password reset successful. You can sign in now.' })
})

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  protect,
}
