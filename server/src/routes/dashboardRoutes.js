const { Router } = require('express')
const { protect } = require('../controllers/authController')
const { getDashboard, listItineraries, listUploads } = require('../controllers/dashboardController')

const router = Router()

router.use(protect)

router.get('/', getDashboard)
router.get('/itineraries', listItineraries)
router.get('/uploads', listUploads)

module.exports = router
