const path = require('path')
const fs = require('fs')
const multer = require('multer')

const uploadsDir = path.join(__dirname, '../../uploads')

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname)
    cb(null, `${unique}${ext}`)
  },
})

const fileFilter = (_req, file, cb) => {
  const isPdf = file.mimetype === 'application/pdf'
  const isImage = file.mimetype.startsWith('image/')
  if (isPdf || isImage) {
    cb(null, true)
  } else {
    cb(new Error('Only PDF and image files are allowed'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024, files: 10 },
})

module.exports = { upload, uploadsDir }
