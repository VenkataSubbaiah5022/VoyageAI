const { Router } = require('express')
const { protect } = require('../controllers/authController')
const { upload } = require('../middleware/uploadMiddleware')
const { uploadFiles, processUploads } = require('../controllers/uploadController')

const router = Router()

router.use(protect)

router.post('/', upload.array('files', 10), uploadFiles)
router.post('/process', processUploads)

module.exports = router
