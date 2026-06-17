const fs = require('fs')
const path = require('path')
const pdfParse = require('pdf-parse')

async function readDocumentContent(filePath, mimeType) {
  const buffer = fs.readFileSync(filePath)

  if (mimeType === 'application/pdf' || filePath.toLowerCase().endsWith('.pdf')) {
    const parsed = await pdfParse(buffer)
    const text = parsed.text?.trim()
    if (!text) {
      return {
        mode: 'binary',
        buffer,
        mimeType: 'application/pdf',
      }
    }
    return {
      mode: 'text',
      text,
      mimeType: 'application/pdf',
    }
  }

  if (mimeType.startsWith('image/')) {
    return {
      mode: 'image',
      buffer,
      mimeType,
      base64: buffer.toString('base64'),
    }
  }

  throw new Error(`Unsupported file type: ${mimeType}`)
}

function buildGeminiFilePart(content) {
  if (content.mode === 'text') {
    return null
  }

  return {
    inlineData: {
      data: content.buffer.toString('base64'),
      mimeType: content.mimeType,
    },
  }
}

module.exports = {
  readDocumentContent,
  buildGeminiFilePart,
}
