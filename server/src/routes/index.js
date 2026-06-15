const { Router } = require('express')
const authRoutes = require('./authRoutes')

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', service: 'VoyageAI API' } })
})

router.use('/auth', authRoutes)

module.exports = router
