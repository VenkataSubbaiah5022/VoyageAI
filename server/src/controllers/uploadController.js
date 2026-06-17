const fs = require('fs')
const path = require('path')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const Upload = require('../models/Upload')
const { saveFile, readFileBuffer, createFileReadStream, deleteFile, getLocalFilePath } = require('../services/storage')
const { extractFromUploads } = require('../services/ai/extractionService')

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
    .populate('itineraryId', 'title shareId destination')
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

const getUploadFile = asyncHandler(async (req, res) => {
  const upload = await Upload.findOne({ _id: req.params.id, user: req.user._id })

  if (!upload) {
    throw new ApiError(404, 'Document not found')
  }

  const disposition = req.query.download === '1' ? 'attachment' : 'inline'
  res.setHeader('Content-Type', upload.mimeType)
  res.setHeader('Content-Disposition', `${disposition}; filename="${upload.fileName}"`)

  if (upload.storageDriver === 'cloudinary' && upload.publicUrl) {
    const buffer = await readFileBuffer(upload)
    return res.send(buffer)
  }

  const filePath = getLocalFilePath(upload)
  if (!filePath || !fs.existsSync(filePath)) {
    throw new ApiError(404, 'File not found on server')
  }

  return createFileReadStream(upload).pipe(res)
})

const deleteUpload = asyncHandler(async (req, res) => {
  const upload = await Upload.findOne({ _id: req.params.id, user: req.user._id })

  if (!upload) {
    throw new ApiError(404, 'Document not found')
  }

  await deleteFile(upload)
  await upload.deleteOne()

  res.json({ success: true, message: 'Document deleted' })
})

const deleteAllUploads = asyncHandler(async (req, res) => {
  const uploads = await Upload.find({ user: req.user._id })

  for (const upload of uploads) {
    await deleteFile(upload)
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
    files.map(async (file) => {
      const icons = iconForMime(file.mimetype)
      const stored = await saveFile({
        buffer: file.buffer,
        originalName: file.originalname,
        mimeType: file.mimetype,
      })

      return Upload.create({
        user: req.user._id,
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        storagePath: stored.storageKey,
        storageDriver: stored.storageDriver,
        publicUrl: stored.publicUrl,
        processingStatus: 'pending',
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

  await Upload.updateMany(
    { _id: { $in: uploads.map((u) => u._id) } },
    { processingStatus: 'processing', processingError: null },
  )

  try {
    const merged = await extractFromUploads(uploads)

    await Promise.all(
      merged.perFile.map((fileResult) =>
        Upload.findByIdAndUpdate(fileResult.uploadId, {
          processingStatus: 'completed',
          processingError: null,
          tripLabel: fileResult.tripLabel,
          extractedData: {
            tripLabel: fileResult.tripLabel,
            destination: fileResult.destination,
            startDate: fileResult.startDate,
            endDate: fileResult.endDate,
            items: fileResult.items,
          },
        }),
      ),
    )

    const items = merged.items.map(({ title, status, icon }) => ({ title, status, icon }))

    res.json({
      success: true,
      data: {
        items,
        fileCount: merged.fileCount,
        meta: {
          tripLabel: merged.tripLabel,
          destination: merged.destination,
          startDate: merged.startDate,
          endDate: merged.endDate,
        },
      },
    })
  } catch (err) {
    await Upload.updateMany(
      { _id: { $in: uploads.map((u) => u._id) } },
      { processingStatus: 'failed', processingError: err.message },
    )

    throw new ApiError(502, err.message || 'AI extraction failed')
  }
})

module.exports = {
  listUploads,
  getUploadFile,
  deleteUpload,
  deleteAllUploads,
  uploadFiles,
  processUploads,
}
