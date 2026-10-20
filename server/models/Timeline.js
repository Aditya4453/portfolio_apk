const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['education', 'experience', 'leadership', 'community'],
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    tags: [String],
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Timeline', timelineSchema);
