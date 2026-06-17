const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')
const Upload = require('../models/Upload')
const Itinerary = require('../models/Itinerary')

const formatRelative = (date) => {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function buildNotifications(uploads, itineraries, readIds) {
  const readSet = new Set(readIds)
  const notifications = []

  uploads.forEach((upload) => {
    const id = `upload-${upload._id}`
    notifications.push({
      id,
      icon: upload.icon || 'description',
      iconBg: upload.iconBg || 'bg-primary-fixed',
      iconColor: upload.iconColor || 'text-on-primary-fixed-variant',
      title: 'Document uploaded',
      status: readSet.has(id) ? 'read' : 'new',
      message: `${upload.fileName} was added to your library${upload.tripLabel ? ` (${upload.tripLabel})` : ''}.`,
      time: formatRelative(upload.createdAt),
      action: 'View Documents',
      link: '/profile',
    })
  })

  itineraries.forEach((trip) => {
    const id = `trip-${trip._id}`
    notifications.push({
      id,
      icon: 'auto_awesome',
      iconBg: 'bg-tertiary-fixed',
      iconColor: 'text-on-tertiary-fixed-variant',
      title: 'Itinerary ready',
      status: readSet.has(id) ? 'read' : 'new',
      message: `Your ${trip.destination} trip is ready to view and share.`,
      time: formatRelative(trip.createdAt),
      action: 'View Itinerary',
      link: trip.shareId ? `/share/${trip.shareId}` : '/dashboard',
    })
  })

  notifications.sort((a, b) => {
    const order = { new: 0, read: 1 }
    return order[a.status] - order[b.status]
  })

  return notifications
}

const getNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const readIds = user?.readNotificationIds || []

  const [uploads, itineraries] = await Promise.all([
    Upload.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5).lean(),
    Itinerary.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5).lean(),
  ])

  res.json({
    success: true,
    data: { notifications: buildNotifications(uploads, itineraries, readIds) },
  })
})

const markNotificationsRead = asyncHandler(async (req, res) => {
  const { ids = [], markAll = false } = req.body
  const user = await User.findById(req.user._id)

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  if (markAll) {
    const [uploads, itineraries] = await Promise.all([
      Upload.find({ user: user._id }).select('_id').lean(),
      Itinerary.find({ user: user._id }).select('_id').lean(),
    ])
    const allIds = [
      ...uploads.map((u) => `upload-${u._id}`),
      ...itineraries.map((t) => `trip-${t._id}`),
    ]
    user.readNotificationIds = [...new Set([...(user.readNotificationIds || []), ...allIds])]
  } else if (Array.isArray(ids) && ids.length > 0) {
    user.readNotificationIds = [...new Set([...(user.readNotificationIds || []), ...ids])]
  } else {
    throw new ApiError(400, 'Provide notification ids or markAll: true')
  }

  await user.save()

  const [uploads, itineraries] = await Promise.all([
    Upload.find({ user: user._id }).sort({ createdAt: -1 }).limit(5).lean(),
    Itinerary.find({ user: user._id }).sort({ createdAt: -1 }).limit(5).lean(),
  ])

  res.json({
    success: true,
    data: { notifications: buildNotifications(uploads, itineraries, user.readNotificationIds) },
  })
})

module.exports = { getNotifications, markNotificationsRead, formatRelative }
