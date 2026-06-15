const { Router } = require('express')
const authRoutes = require('./authRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const shareRoutes = require('./shareRoutes')
const uploadRoutes = require('./uploadRoutes')
const itineraryRoutes = require('./itineraryRoutes')
const exploreRoutes = require('./exploreRoutes')
const notificationsRoutes = require('./notificationsRoutes')

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', service: 'VoyageAI API' } })
})

router.use('/auth', authRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/share', shareRoutes)
router.use('/uploads', uploadRoutes)
router.use('/itineraries', itineraryRoutes)
router.use('/explore', exploreRoutes)
router.use('/notifications', notificationsRoutes)

module.exports = router
