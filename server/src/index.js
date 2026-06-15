require('./config/env')

const app = require('./app')
const connectDB = require('./config/db')
const env = require('./config/env')

const startServer = async () => {
  await connectDB()

  app.listen(env.port, () => {
    console.log(`VoyageAI API running on port ${env.port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server:', error.message)
  process.exit(1)
})
