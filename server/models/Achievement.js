const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Recognition',
    },
    description: {
      type: String,
      default: '',
    },
    certificateUrl: {
      type: String,
      default: '',
    },
    badge: {
      type: String,
      default: 'Verified',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Achievement', achievementSchema);
