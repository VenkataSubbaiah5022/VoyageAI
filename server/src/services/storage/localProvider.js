const fs = require('fs')
const path = require('path')

function createLocalProvider(uploadsDir) {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }

  return {
    driver: 'local',

    async save({ buffer, originalName }) {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
      const ext = path.extname(originalName)
      const storageKey = `${unique}${ext}`
      const filePath = path.join(uploadsDir, storageKey)
      fs.writeFileSync(filePath, buffer)
      return { storageKey, publicUrl: null }
    },

    getPath(storageKey) {
      return path.join(uploadsDir, storageKey)
    },

    async readBuffer(storageKey) {
      const filePath = path.join(uploadsDir, storageKey)
      if (!fs.existsSync(filePath)) {
        throw new Error('File not found on disk')
      }
      return fs.readFileSync(filePath)
    },

    createReadStream(storageKey) {
      const filePath = path.join(uploadsDir, storageKey)
      if (!fs.existsSync(filePath)) {
        throw new Error('File not found on disk')
      }
      return fs.createReadStream(filePath)
    },

    async delete(storageKey) {
      if (!storageKey) return
      const filePath = path.join(uploadsDir, storageKey)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    },
  }
}

module.exports = { createLocalProvider }
