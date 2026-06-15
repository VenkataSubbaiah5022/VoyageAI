const dns = require('dns')
const mongoose = require('mongoose')
const env = require('./env')

dns.setDefaultResultOrder('ipv4first')

const connectDB = async () => {
  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(env.mongodbUri, {
      serverSelectionTimeoutMS: 15000,
    })
    console.log(`MongoDB connected: ${mongoose.connection.host}`)
  } catch (error) {
    if (error.message?.includes('querySrv')) {
      console.error(
        '\nMongoDB DNS (SRV) lookup failed. Try:\n' +
          '  1. Check internet / VPN / firewall\n' +
          '  2. Use the standard (non-SRV) connection string from Atlas\n' +
          '  3. Ensure MONGODB_URI includes a database name, e.g. ...mongodb.net/voyageai?...\n',
      )
    }
    throw error
  }
}

module.exports = connectDB
