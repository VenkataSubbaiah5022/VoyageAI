const path = require('path')
const env = require('../../config/env')
const { createLocalProvider } = require('./localProvider')

const uploadsDir = path.join(__dirname, '../../../uploads')

let provider = null

function getStorageProvider() {
  if (provider) {
    return provider
  }

  if (env.storageDriver === 'cloudinary') {
    if (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret) {
      throw new Error(
        'Cloudinary storage selected but CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET is missing',
      )
    }
    const { createCloudinaryProvider } = require('./cloudinaryProvider')
    provider = createCloudinaryProvider()
  } else {
    provider = createLocalProvider(uploadsDir)
  }

  return provider
}

async function saveFile({ buffer, originalName, mimeType }) {
  const storage = getStorageProvider()
  const saved = await storage.save({ buffer, originalName, mimeType })
  return {
    storageDriver: storage.driver,
    storageKey: saved.storageKey,
    publicUrl: saved.publicUrl,
  }
}

async function readFileBuffer(upload) {
  if (upload.publicUrl && upload.storageDriver === 'cloudinary') {
    const response = await fetch(upload.publicUrl)
    if (!response.ok) {
      throw new Error('Could not fetch file from cloud storage')
    }
    return Buffer.from(await response.arrayBuffer())
  }

  const storage = getStorageProvider()
  const key = upload.storagePath || upload.storageKey
  return storage.readBuffer(key)
}

function createFileReadStream(upload) {
  const storage = getStorageProvider()
  const key = upload.storagePath || upload.storageKey

  if (storage.driver === 'cloudinary') {
    throw new Error('Use readFileBuffer for cloudinary files')
  }

  return storage.createReadStream(key)
}

function getLocalFilePath(upload) {
  if (upload.storageDriver === 'cloudinary') {
    return null
  }

  const storage = getStorageProvider()
  const key = upload.storagePath || upload.storageKey
  return storage.getPath(key)
}

async function deleteFile(upload) {
  const storage = getStorageProvider()
  const key = upload.storagePath || upload.storageKey
  await storage.delete(key)
}

module.exports = {
  uploadsDir,
  saveFile,
  readFileBuffer,
  createFileReadStream,
  getLocalFilePath,
  deleteFile,
  getStorageProvider,
}
