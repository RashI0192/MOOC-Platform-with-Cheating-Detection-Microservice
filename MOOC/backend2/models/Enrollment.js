const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  moduleIndex: Number,
  videoIndex:  Number,
  completed:   { type: Boolean, default: false },
});

const enrollmentSchema = new mongoose.Schema({
  student:   { type: mongoose.Schema.Types.ObjectId, ref: 'User',   required: true },
  course:    { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  enrolledAt:{ type: Date, default: Date.now },
  completed: { type: Boolean, default: false },   // ✅ new field
  progress:  [progressSchema],
});

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
