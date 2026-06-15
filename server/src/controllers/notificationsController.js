const asyncHandler = require('../utils/asyncHandler')
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

const getNotifications = asyncHandler(async (req, res) => {
  const [uploads, itineraries] = await Promise.all([
    Upload.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5).lean(),
    Itinerary.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5).lean(),
  ])

  const notifications = []

  uploads.forEach((upload) => {
    notifications.push({
      id: `upload-${upload._id}`,
      icon: upload.icon || 'description',
      iconBg: upload.iconBg || 'bg-primary-fixed',
      iconColor: upload.iconColor || 'text-on-primary-fixed-variant',
      title: 'Document uploaded',
      status: 'new',
      message: `${upload.fileName} was added to your library${upload.tripLabel ? ` (${upload.tripLabel})` : ''}.`,
      time: formatRelative(upload.createdAt),
      action: 'View Uploads',
      link: '/upload',
    })
  })

  itineraries.forEach((trip) => {
    notifications.push({
      id: `trip-${trip._id}`,
      icon: 'auto_awesome',
      iconBg: 'bg-tertiary-fixed',
      iconColor: 'text-on-tertiary-fixed-variant',
      title: 'Itinerary ready',
      status: 'read',
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

  res.json({ success: true, data: { notifications } })
})

module.exports = { getNotifications }
