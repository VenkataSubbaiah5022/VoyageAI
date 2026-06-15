const fs = require('fs')
const path = require('path')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const Upload = require('../models/Upload')
const { uploadsDir } = require('../middleware/uploadMiddleware')

const MOCK_EXTRACTED = [
  { title: 'Flight to Tokyo', status: 'Confirmed • Economy • NH854', icon: 'flight' },
  { title: 'Park Hyatt Kyoto', status: 'Confirmed • Aug 12-18 • King Room', icon: 'hotel' },
  {
    title: 'TeamLab Borderless',
    status: 'Ticket Secured • Aug 14 @ 10:00',
    icon: 'confirmation_number',
  },
  { title: 'JR Rail Pass', status: 'Validated • 7-Day Regional', icon: 'train' },
]

const iconForMime = (mimeType) => {
  if (mimeType === 'application/pdf') {
    return { icon: 'description', iconBg: 'bg-primary-fixed', iconColor: 'text-on-primary-fixed' }
  }
  return { icon: 'image', iconBg: 'bg-tertiary-fixed', iconColor: 'text-on-tertiary-fixed-variant' }
}

const formatFileSize = (bytes) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

const listUploads = asyncHandler(async (req, res) => {
  const uploads = await Upload.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .lean()

  res.json({
    success: true,
    data: {
      uploads: uploads.map((upload) => ({
        ...upload,
        id: upload._id,
        fileSizeLabel: formatFileSize(upload.fileSize),
      })),
    },
  })
})

const deleteUpload = asyncHandler(async (req, res) => {
  const upload = await Upload.findOne({ _id: req.params.id, user: req.user._id })

  if (!upload) {
    throw new ApiError(404, 'Document not found')
  }

  if (upload.storagePath) {
    const filePath = path.join(uploadsDir, upload.storagePath)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }

  await upload.deleteOne()

  res.json({ success: true, message: 'Document deleted' })
})

const deleteAllUploads = asyncHandler(async (req, res) => {
  const uploads = await Upload.find({ user: req.user._id })

  for (const upload of uploads) {
    if (upload.storagePath) {
      const filePath = path.join(uploadsDir, upload.storagePath)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }
  }

  await Upload.deleteMany({ user: req.user._id })

  res.json({ success: true, message: 'All documents deleted' })
})

const uploadFiles = asyncHandler(async (req, res) => {
  const files = req.files || []

  if (files.length === 0) {
    return res.status(400).json({ success: false, message: 'No files uploaded' })
  }

  const uploads = await Promise.all(
    files.map((file) => {
      const icons = iconForMime(file.mimetype)
      return Upload.create({
        user: req.user._id,
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        storagePath: file.filename,
        ...icons,
      })
    }),
  )

  res.status(201).json({ success: true, data: { uploads } })
})

const processUploads = asyncHandler(async (req, res) => {
  const { uploadIds = [] } = req.body

  if (!Array.isArray(uploadIds) || uploadIds.length === 0) {
    return res.status(400).json({ success: false, message: 'uploadIds required' })
  }

  const uploads = await Upload.find({ _id: { $in: uploadIds }, user: req.user._id })

  if (uploads.length === 0) {
    return res.status(404).json({ success: false, message: 'Uploads not found' })
  }

  const itemCount = Math.min(MOCK_EXTRACTED.length, uploads.length + 1)
  const items = MOCK_EXTRACTED.slice(0, itemCount)

  res.json({ success: true, data: { items, fileCount: uploads.length } })
})

module.exports = {
  listUploads,
  deleteUpload,
  deleteAllUploads,
  uploadFiles,
  processUploads,
  MOCK_EXTRACTED,
}
