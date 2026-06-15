const { Router } = require('express')
const { getExploreDestinations } = require('../controllers/exploreController')

const router = Router()

router.get('/', getExploreDestinations)

module.exports = router
