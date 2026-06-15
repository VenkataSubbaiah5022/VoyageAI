const { Router } = require('express')
const { register, login, getMe, protect } = require('../controllers/authController')

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)

module.exports = router
