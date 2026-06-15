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
  },
  { timestamps: true },
)

module.exports = mongoose.model('Upload', uploadSchema)
