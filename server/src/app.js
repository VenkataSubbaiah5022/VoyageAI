const express = require('express')
const cors = require('cors')
const apiRoutes = require('./routes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const env = require('./config/env')

const app = express()

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))

app.use('/api', apiRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
