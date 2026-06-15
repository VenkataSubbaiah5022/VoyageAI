const { Router } = require('express')
const { protect } = require('../controllers/authController')
const {
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
} = require('../controllers/profileController')

const router = Router()

router.use(protect)

router.get('/', getProfile)
router.patch('/', updateProfile)
router.put('/password', updatePassword)
router.delete('/', deleteAccount)

module.exports = router
