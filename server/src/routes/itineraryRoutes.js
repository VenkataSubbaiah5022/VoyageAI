const { Router } = require('express')
const { protect } = require('../controllers/authController')
const { generateItinerary } = require('../controllers/itineraryController')

const router = Router()

router.use(protect)

router.post('/generate', generateItinerary)

module.exports = router
