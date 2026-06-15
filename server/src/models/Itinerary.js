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
    shareId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    subtitle: { type: String, default: null },
    dateRangeLabel: { type: String, default: null },
    heroImageUrl: { type: String, default: null },
    stopsCount: { type: Number, default: 0 },
    activitiesCount: { type: Number, default: 0 },
    overview: {
      weather: String,
      budget: String,
      language: String,
      progress: Number,
    },
    mapImageUrl: { type: String, default: null },
    packingList: [{ type: String }],
    days: [
      {
        dayNumber: Number,
        title: String,
        dateLabel: String,
        activities: [
          {
            type: { type: String, default: 'standard' },
            icon: String,
            iconBg: String,
            iconColor: String,
            title: String,
            time: String,
            description: String,
            badge: String,
            cta: String,
            images: [String],
          },
        ],
      },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('Itinerary', itinerarySchema)
