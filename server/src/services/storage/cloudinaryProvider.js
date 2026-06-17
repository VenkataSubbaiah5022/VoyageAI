const path = require('path')
const { v2: cloudinary } = require('cloudinary')
const env = require('../../config/env')

function createCloudinaryProvider() {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
  })

  return {
    driver: 'cloudinary',

    async save({ buffer, originalName, mimeType }) {
      const ext = path.extname(originalName) || ''
      const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9-_]/g, '_')
      const publicId = `voyageai/${Date.now()}-${baseName}`

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'voyageai',
            public_id: publicId,
            resource_type: 'auto',
            format: mimeType === 'application/pdf' ? 'pdf' : undefined,
          },
          (error, uploadResult) => {
            if (error) reject(error)
            else resolve(uploadResult)
          },
        )
        uploadStream.end(buffer)
      })

      return {
        storageKey: result.public_id,
        publicUrl: result.secure_url,
      }
    },

    async readBuffer(storageKey) {
      const url = cloudinary.url(storageKey, { secure: true, resource_type: 'auto' })
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Could not fetch file from cloud storage')
      }
      const arrayBuffer = await response.arrayBuffer()
      return Buffer.from(arrayBuffer)
    },

    createReadStream() {
      throw new Error('Streaming is not supported for cloudinary driver; use readBuffer')
    },

    async delete(storageKey) {
      if (!storageKey) return
      await cloudinary.uploader.destroy(storageKey, { resource_type: 'auto' })
    },
  }
}

module.exports = { createCloudinaryProvider }
