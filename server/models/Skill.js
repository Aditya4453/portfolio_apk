const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Tools & Technologies', 'AI & ML', 'Creative Production'],
      required: true,
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 80,
    },
    level: {
      type: String,
      default: 'Advanced',
    },
    experience: {
      type: String,
      default: '2+ yrs',
    },
    icon: {
      type: String,
      default: 'Code',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
