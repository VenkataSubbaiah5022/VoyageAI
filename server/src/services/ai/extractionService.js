const path = require('path')
const { parseJsonFromText } = require('./parseJson')
const { requireAiProvider } = require('./provider')
const { generateJsonWithGemini } = require('./geminiClient')
const { generateJsonWithOpenAI } = require('./openaiClient')
const { readDocumentContent, buildGeminiFilePart } = require('./fileContent')

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

async function extractFromFile({ filePath, mimeType, fileName }) {
  const content = await readDocumentContent(filePath, mimeType)
  const raw = await callExtractionModel({ content, fileName })
  return normalizeExtraction(raw, fileName)
}

async function extractFromUploads(uploads, uploadsDir) {
  const results = []

  for (const upload of uploads) {
    if (!upload.storagePath) {
      throw new Error(`Missing storage path for upload: ${upload.fileName}`)
    }

    const filePath = path.join(uploadsDir, upload.storagePath)
    const extraction = await extractFromFile({
      filePath,
      mimeType: upload.mimeType,
      fileName: upload.fileName,
    })

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
  extractFromFile,
}
