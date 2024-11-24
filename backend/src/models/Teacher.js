const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
  type: String,  // Cử nhân, Thạc sĩ, etc.
  school: String,
  major: String,
  year: Number,
  isGraduated: Boolean
});

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  teacherPositions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeacherPosition'
  }],
  degrees: [degreeSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Teacher', teacherSchema);