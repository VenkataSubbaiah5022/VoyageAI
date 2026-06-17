const { parseJsonFromText } = require('./parseJson')
const { requireAiProvider } = require('./provider')
const { generateJsonWithGemini } = require('./geminiClient')
const { generateJsonWithOpenAI } = require('./openaiClient')
const { readFileBuffer } = require('../storage')
const pdfParse = require('pdf-parse')

const ICON_BY_TYPE = {
  flight: 'flight',
  hotel: 'hotel',
  activity: 'confirmation_number',
  train: 'train',
  car: 'directions_car',
  restaurant: 'restaurant',
  other: 'description',
}

const EXTRACTION_PROMPT = `Analyze this travel document and extract structured booking information.

Return JSON with this exact shape:
{
  "tripLabel": "short trip name inferred from document",
  "destination": "city/region, country",
  "startDate": "YYYY-MM-DD or null",
  "endDate": "YYYY-MM-DD or null",
  "items": [
    {
      "title": "concise booking title",
      "status": "human-readable status line with key details (dates, class, confirmation)",
      "icon": "one of: flight, hotel, confirmation_number, train, directions_car, restaurant, description",
      "bookingType": "flight|hotel|activity|train|car|restaurant|other",
      "confirmationNumber": "string or null",
      "date": "YYYY-MM-DD or null",
      "location": "string or null",
      "notes": "extra details or null"
    }
  ]
}

Rules:
- Extract only what is clearly present in the document; do not invent confirmations.
- If multiple bookings exist in one document, return multiple items.
- Use icon values from the allowed list only.
- Prefer ISO dates when visible.`

function normalizeIcon(icon, bookingType) {
  const allowed = new Set(Object.values(ICON_BY_TYPE))
  if (icon && allowed.has(icon)) {
    return icon
  }
  return ICON_BY_TYPE[bookingType] || ICON_BY_TYPE.other
}

function normalizeExtraction(raw, fileName) {
  const items = Array.isArray(raw?.items) ? raw.items : []

  const normalizedItems = items.map((item) => {
    const bookingType = item.bookingType || 'other'
    return {
      title: item.title || 'Travel booking',
      status: item.status || 'Details extracted from document',
      icon: normalizeIcon(item.icon, bookingType),
      bookingType,
      confirmationNumber: item.confirmationNumber || null,
      date: item.date || null,
      location: item.location || null,
      notes: item.notes || null,
    }
  })

  if (normalizedItems.length === 0) {
    normalizedItems.push({
      title: fileName.replace(/\.[^.]+$/, ''),
      status: 'Document uploaded — limited details extracted',
      icon: 'description',
      bookingType: 'other',
      confirmationNumber: null,
      date: null,
      location: null,
      notes: null,
    })
  }

  return {
    tripLabel: raw?.tripLabel || 'New trip',
    destination: raw?.destination || null,
    startDate: raw?.startDate || null,
    endDate: raw?.endDate || null,
    items: normalizedItems,
  }
}

async function readDocumentContent(upload) {
  const buffer = await readFileBuffer(upload)
  const mimeType = upload.mimeType
  const fileName = upload.fileName

  if (mimeType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
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

async function callExtractionModel({ content, fileName }) {
  const provider = requireAiProvider()
  const textPrefix =
    content.mode === 'text'
      ? `Document text from "${fileName}":\n\n${content.text}\n\n${EXTRACTION_PROMPT}`
      : EXTRACTION_PROMPT

  let responseText

  if (provider === 'gemini') {
    const filePart = buildGeminiFilePart(content)
    responseText = await generateJsonWithGemini({
      prompt: textPrefix,
      filePart,
    })
  } else {
    responseText = await generateJsonWithOpenAI({
      prompt: textPrefix,
      imageBase64: content.mode === 'image' ? content.base64 : null,
      imageMimeType: content.mode === 'image' ? content.mimeType : null,
    })
  }

  return parseJsonFromText(responseText)
}

async function extractFromUpload(upload) {
  if (!upload.storagePath) {
    throw new Error(`Missing storage path for upload: ${upload.fileName}`)
  }

  const content = await readDocumentContent(upload)
  const raw = await callExtractionModel({ content, fileName: upload.fileName })
  return normalizeExtraction(raw, upload.fileName)
}

async function extractFromUploads(uploads) {
  const results = []

  for (const upload of uploads) {
    const extraction = await extractFromUpload(upload)

    results.push({
      uploadId: upload._id,
      fileName: upload.fileName,
      ...extraction,
    })
  }

  return mergeExtractions(results)
}

function mergeExtractions(results) {
  const allItems = []
  let tripLabel = 'New trip'
  let destination = null
  let startDate = null
  let endDate = null

  for (const result of results) {
    allItems.push(...result.items)
    if (result.tripLabel && result.tripLabel !== 'New trip') {
      tripLabel = result.tripLabel
    }
    if (result.destination) {
      destination = result.destination
    }
    if (result.startDate && (!startDate || result.startDate < startDate)) {
      startDate = result.startDate
    }
    if (result.endDate && (!endDate || result.endDate > endDate)) {
      endDate = result.endDate
    }
  }

  return {
    tripLabel,
    destination,
    startDate,
    endDate,
    items: allItems,
    fileCount: results.length,
    perFile: results,
  }
}

module.exports = {
  extractFromUploads,
  extractFromUpload,
}
