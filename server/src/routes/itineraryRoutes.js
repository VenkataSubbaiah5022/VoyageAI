const { Router } = require('express')
const { protect } = require('../controllers/authController')
const {
  generateItinerary,
  listItineraries,
  getItinerary,
  updateItinerary,
  deleteItinerary,
} = require('../controllers/itineraryController')

const router = Router()

router.use(protect)

router.post('/generate', generateItinerary)
router.get('/', listItineraries)
router.get('/:id', getItinerary)
router.patch('/:id', updateItinerary)
router.delete('/:id', deleteItinerary)

module.exports = router
