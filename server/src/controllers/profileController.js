const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')
const Upload = require('../models/Upload')
const Itinerary = require('../models/Itinerary')
const { deleteFile } = require('../services/storage')

const formatProfile = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  preferences: user.preferences || {
    travelStyle: 'Adventure',
    budget: 'Premium',
    dining: 'Foodie',
    interests: [],
  },
  notificationSettings: user.notificationSettings || {
    tripUpdates: true,
    priceAlerts: true,
    weeklyDigest: false,
  },
})

const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: formatProfile(req.user) } })
})

const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, preferences, notificationSettings } = req.body
  const user = req.user

  if (firstName?.trim()) user.firstName = firstName.trim()
  if (lastName?.trim()) user.lastName = lastName.trim()

  if (email?.trim()) {
    const normalized = email.toLowerCase().trim()
    const existing = await User.findOne({ email: normalized, _id: { $ne: user._id } })
    if (existing) {
      throw new ApiError(409, 'An account with this email already exists')
    }
    user.email = normalized
  }

  if (preferences) {
    user.preferences = {
      ...user.preferences?.toObject?.() || user.preferences || {},
      ...preferences,
    }
    if (Array.isArray(preferences.interests)) {
      user.preferences.interests = preferences.interests.filter(Boolean)
    }
    user.markModified('preferences')
  }

  if (notificationSettings) {
    user.notificationSettings = {
      ...user.notificationSettings?.toObject?.() || user.notificationSettings || {},
      ...notificationSettings,
    }
    user.markModified('notificationSettings')
  }

  await user.save()

  res.json({ success: true, data: { user: formatProfile(user) } })
})

const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, 'Current and new password are required')
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, 'New password must be at least 6 characters')
  }

  const user = await User.findById(req.user._id).select('+password')
  const isMatch = await user.comparePassword(currentPassword)

  if (!isMatch) {
    throw new ApiError(401, 'Current password is incorrect')
  }

  user.password = newPassword
  await user.save()

  res.json({ success: true, message: 'Password updated successfully' })
})

const deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body

  if (!password) {
    throw new ApiError(400, 'Password is required to delete your account')
  }

  const user = await User.findById(req.user._id).select('+password')
  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    throw new ApiError(401, 'Password is incorrect')
  }

  const uploads = await Upload.find({ user: user._id })
  for (const upload of uploads) {
    await deleteFile(upload)
  }

  await Promise.all([
    Upload.deleteMany({ user: user._id }),
    Itinerary.deleteMany({ user: user._id }),
    user.deleteOne(),
  ])

  res.json({ success: true, message: 'Account deleted successfully' })
})

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
  formatProfile,
}
