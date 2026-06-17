const { Router } = require('express')
const { protect } = require('../controllers/authController')
const { getNotifications, markNotificationsRead } = require('../controllers/notificationsController')

const router = Router()

router.use(protect)
router.get('/', getNotifications)
router.patch('/read', markNotificationsRead)

module.exports = router
