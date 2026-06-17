const { Router } = require('express')
const { register, login, getMe, forgotPassword, resetPassword, protect } = require('../controllers/authController')

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/me', protect, getMe)

module.exports = router
