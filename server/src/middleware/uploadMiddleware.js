const multer = require('multer')

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
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024, files: 10 },
})

module.exports = { upload }
