const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  url: String, // S3 / local path
});

const quizSchema = new mongoose.Schema({
  question: String,
  type: { type: String, enum: ['mcq', 'text'] },
  options: [String],
  answer: String,
  estimatedTime: Number,
});

const moduleSchema = new mongoose.Schema({
  title: String,
  videos: [videoSchema],
  quiz: quizSchema,
});

const courseSchema = new mongoose.Schema({
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  thumbnail: String,
  testEnabled: Boolean,
  modules: [moduleSchema],
});

module.exports = mongoose.model('Course', courseSchema);