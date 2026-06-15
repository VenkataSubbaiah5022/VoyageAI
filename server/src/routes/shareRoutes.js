const { Router } = require('express')
const { getSharedItinerary } = require('../controllers/shareController')

const router = Router()

router.get('/:shareId', getSharedItinerary)

module.exports = router
