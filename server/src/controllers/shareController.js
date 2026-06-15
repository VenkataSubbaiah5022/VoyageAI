const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/ApiError')
const Itinerary = require('../models/Itinerary')

const getSharedItinerary = asyncHandler(async (req, res) => {
  const { shareId } = req.params

  const itinerary = await Itinerary.findOne({ shareId }).populate('user', 'firstName lastName').lean()

  if (!itinerary) {
    throw new ApiError(404, 'Shared itinerary not found')
  }

  res.json({
    success: true,
    data: {
      itinerary: {
        shareId: itinerary.shareId,
        tag: itinerary.tag || 'AI OPTIMIZED',
        subtitle: itinerary.subtitle,
        destination: itinerary.destination,
        dateRange: itinerary.dateRangeLabel,
        heroImage: itinerary.heroImageUrl || itinerary.imageUrl,
        stopsCount: itinerary.stopsCount,
        activitiesCount: itinerary.activitiesCount,
        overview: itinerary.overview,
        mapImage: itinerary.mapImageUrl,
        packingList: itinerary.packingList || [],
        days: itinerary.days || [],
        sharedBy: itinerary.user
          ? `${itinerary.user.firstName} ${itinerary.user.lastName}`
          : null,
      },
    },
  })
})

module.exports = { getSharedItinerary }
