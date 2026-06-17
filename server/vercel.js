const app = require('./src/app')
const connectDB = require('./src/config/db')

let connectionPromise = null

function ensureDbConnection() {
  if (!connectionPromise) {
    connectionPromise = connectDB().catch((err) => {
      connectionPromise = null
      throw err
    })
  }
  return connectionPromise
}

module.exports = async (req, res) => {
  try {
    await ensureDbConnection()
  } catch (err) {
    console.error('Database connection failed:', err.message)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, message: 'Database connection failed' }))
    return
  }

  return app(req, res)
}
