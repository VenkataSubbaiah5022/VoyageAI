const { Router } = require('express')
const { protect } = require('../controllers/authController')
const { getNotifications } = require('../controllers/notificationsController')

const router = Router()

router.use(protect)
router.get('/', getNotifications)

module.exports = router
