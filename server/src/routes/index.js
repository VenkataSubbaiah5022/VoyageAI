const { Router } = require('express')
const authRoutes = require('./authRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const shareRoutes = require('./shareRoutes')

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', service: 'VoyageAI API' } })
})

router.use('/auth', authRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/share', shareRoutes)

module.exports = router
