const { Router } = require('express')
const { protect } = require('../controllers/authController')
const { upload } = require('../middleware/uploadMiddleware')
const {
  uploadFiles,
  processUploads,
  listUploads,
  getUploadFile,
  deleteUpload,
  deleteAllUploads,
} = require('../controllers/uploadController')

const router = Router()

router.use(protect)

router.get('/', listUploads)
router.get('/:id/file', getUploadFile)
router.delete('/all', deleteAllUploads)
router.delete('/:id', deleteUpload)
router.post('/', upload.array('files', 10), uploadFiles)
router.post('/process', processUploads)

module.exports = router
