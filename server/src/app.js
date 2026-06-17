const express = require('express')
const cors = require('cors')
const apiRoutes = require('./routes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const env = require('./config/env')

const app = express()

const allowedOrigins = env.clientUrl
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }
      callback(null, false)
    },
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))

app.use('/api', apiRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
