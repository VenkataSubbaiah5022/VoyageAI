const asyncHandler = require('../utils/asyncHandler')
const Itinerary = require('../models/Itinerary')
const Upload = require('../models/Upload')
const { syncItineraryStatuses } = require('../utils/itineraryStatus')

const formatFileSize = (bytes) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

const listItineraries = asyncHandler(async (req, res) => {
  const { status = 'upcoming' } = req.query
  await syncItineraryStatuses(req.user._id)

  const itineraries = await Itinerary.find({ user: req.user._id, status })
    .sort({ startDate: status === 'past' ? -1 : 1 })
    .lean()

  res.json({ success: true, data: { itineraries } })
})

const listUploads = asyncHandler(async (req, res) => {
  const uploads = await Upload.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean()

  const formatted = uploads.map((upload) => ({
    ...upload,
    id: upload._id,
    fileSizeLabel: formatFileSize(upload.fileSize),
  }))

  res.json({ success: true, data: { uploads: formatted } })
})

const getDashboard = asyncHandler(async (req, res) => {
  await syncItineraryStatuses(req.user._id)

  const [itineraries, uploads] = await Promise.all([
    Itinerary.find({ user: req.user._id, status: 'upcoming' }).sort({ startDate: 1 }).lean(),
    Upload.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5).lean(),
  ])

  res.json({
    success: true,
    data: {
      itineraries,
      uploads: uploads.map((upload) => ({
        ...upload,
        id: upload._id,
        fileSizeLabel: formatFileSize(upload.fileSize),
      })),
    },
  })
})

module.exports = {
  listItineraries,
  listUploads,
  getDashboard,
}
