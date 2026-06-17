const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fileName: { type: String, required: true, trim: true },
    fileSize: { type: Number, required: true },
    mimeType: { type: String, required: true },
    tripLabel: { type: String, default: 'Unassigned' },
    icon: { type: String, default: 'description' },
    iconBg: { type: String, default: 'bg-primary-fixed' },
    iconColor: { type: String, default: 'text-on-primary-fixed' },
    storagePath: { type: String, default: null },
    storageDriver: { type: String, enum: ['local', 'cloudinary'], default: 'local' },
    publicUrl: { type: String, default: null },
    itineraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Itinerary',
      default: null,
      index: true,
    },
    processingStatus: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    processingError: { type: String, default: null },
    extractedData: {
      tripLabel: { type: String, default: null },
      destination: { type: String, default: null },
      startDate: { type: String, default: null },
      endDate: { type: String, default: null },
      items: [
        {
          title: String,
          status: String,
          icon: String,
          bookingType: String,
          confirmationNumber: String,
          date: String,
          location: String,
          notes: String,
        },
      ],
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Upload', uploadSchema)
