const crypto = require('crypto')
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const Itinerary = require('../models/Itinerary')
const Upload = require('../models/Upload')
const { generateItineraryFromExtractions } = require('../services/ai/itineraryService')

const generateItinerary = asyncHandler(async (req, res) => {
  const { uploadIds = [], extractedItems = [], meta = {} } = req.body

  let items = extractedItems
  let mergedMeta = meta

  if (uploadIds.length > 0) {
    const uploads = await Upload.find({
      _id: { $in: uploadIds },
      user: req.user._id,
      processingStatus: 'completed',
    })

    if (uploads.length === 0) {
      throw new ApiError(400, 'No processed uploads found for the provided uploadIds')
    }

    const fromDb = uploads.flatMap((upload) => upload.extractedData?.items || [])
    if (fromDb.length > 0) {
      items = fromDb
    }

    const destinations = uploads.map((u) => u.extractedData?.destination).filter(Boolean)
    const startDates = uploads.map((u) => u.extractedData?.startDate).filter(Boolean)
    const endDates = uploads.map((u) => u.extractedData?.endDate).filter(Boolean)

    mergedMeta = {
      tripLabel: uploads[0]?.extractedData?.tripLabel || meta.tripLabel,
      destination: destinations[0] || meta.destination,
      startDate: startDates.sort()[0] || meta.startDate,
      endDate: endDates.sort().reverse()[0] || meta.endDate,
    }
  }

  if (!items.length) {
    throw new ApiError(400, 'No extracted items available. Upload and process documents first.')
  }

  let itineraryPayload
  try {
    itineraryPayload = await generateItineraryFromExtractions({
      extractedItems: items,
      mergedMeta,
      user: req.user,
    })
  } catch (err) {
    throw new ApiError(502, err.message || 'AI itinerary generation failed')
  }

  const shareId = crypto.randomBytes(6).toString('hex')

  const itinerary = await Itinerary.create({
    user: req.user._id,
    shareId,
    sourceUploadIds: uploadIds,
    ...itineraryPayload,
  })

  if (uploadIds.length > 0 && mergedMeta.tripLabel) {
    await Upload.updateMany(
      { _id: { $in: uploadIds }, user: req.user._id },
      { tripLabel: mergedMeta.tripLabel },
    )
  }

  res.status(201).json({ success: true, data: { itinerary } })
})

module.exports = {
  generateItinerary,
}
