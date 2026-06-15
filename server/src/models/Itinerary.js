const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    travelersLabel: { type: String, default: 'Solo' },
    imageUrl: { type: String, required: true },
    tag: { type: String, default: null },
    transportIcon: { type: String, default: 'flight_takeoff' },
    status: {
      type: String,
      enum: ['upcoming', 'past'],
      default: 'upcoming',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Itinerary', itinerarySchema)
