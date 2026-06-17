const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../../.env') })
dotenv.config({ path: path.join(__dirname, '../../../.env') })

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/voyageai',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  geminiApiKey: process.env.GEMINI_API_KEY || null,
  openaiApiKey: process.env.OPENAI_API_KEY || null,
  storageDriver: process.env.STORAGE_DRIVER || 'local',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || null,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || null,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || null,
}

if (env.nodeEnv === 'production' && env.jwtSecret === 'dev-only-change-in-production') {
  throw new Error('JWT_SECRET must be set in production')
}

module.exports = env
