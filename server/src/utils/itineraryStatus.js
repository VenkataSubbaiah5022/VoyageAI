const Itinerary = require('../models/Itinerary')

async function syncItineraryStatuses(userId) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  await Itinerary.updateMany(
    { user: userId, endDate: { $lt: today }, status: 'upcoming' },
    { status: 'past' },
  )
}

module.exports = { syncItineraryStatuses }
