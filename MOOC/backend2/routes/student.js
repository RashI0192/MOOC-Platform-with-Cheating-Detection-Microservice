const express = require('express');
const router  = express.Router();
const Course       = require('../models/Course');
const Enrollment   = require('../models/Enrollment');
const requireAuth  = require('../middleware/requireAuth'); // JWT auth for students

/* ─────────────── Public Course Catalog ─────────────── */
router.get('/courses', async (_, res) => {
  try {
    const list = await Course.find()
      .select('title thumbnail instructor')
      .populate('instructor', 'username');
    
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load course catalog' });
  }
});

/* ─────────────── Enroll in a Course ─────────────── */
router.post('/enroll/:id', requireAuth, async (req, res) => {
  try {
    const courseId = req.params.id;
    await Enrollment.create({ student: req.user.id, course: courseId });
    const course = await Course.findById(courseId).populate('instructor', 'username email');
    console.log(`📢 Student ${req.user.id} enrolled in ${course.title}. Notify instructor: ${course.instructor.username}`);


    res.json({ message: 'Enrolled' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Already enrolled' });
    }
    console.error(err);
    res.status(500).json({ message: 'Enroll failed' });
  }
});

/* ─────────────── My Enrolled Courses (Progress Summary) ─────────────── */
router.get('/my-courses', requireAuth, async (req, res) => {
  try {
    const enrolls = await Enrollment.find({ student: req.user.id })
      .populate('course', 'title thumbnail modules');

    const data = enrolls.map((en) => ({
      _id: en.course._id,
      title: en.course.title,
      thumbnail: en.course.thumbnail,
      totalVideos: en.course.modules.reduce((n, m) => n + m.videos.length, 0),
      watched: en.progress.filter(p => p.completed).length,
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch enrolled courses' });
  }
});

/* ─────────────── Full Course Detail (For Course Player) ─────────────── */
router.get('/course/:id', requireAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const enrolled = await Enrollment.findOne({
      student: req.user.id,
      course: course._id,
    });

    if (!enrolled) return res.status(403).json({ message: 'You are not enrolled' });

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to load course' });
  }
});

/* ─────────────── Track Video Progress ─────────────── */
router.post('/track', requireAuth, async (req, res) => {
  try {
    const { courseId, moduleIndex, videoIndex } = req.body;
    const enroll = await Enrollment.findOne({ student: req.user.id, course: courseId });

    if (!enroll) return res.status(400).json({ message: 'Not enrolled' });

    const already = enroll.progress.find(p =>
      p.moduleIndex === moduleIndex && p.videoIndex === videoIndex
    );

    if (!already) {
      enroll.progress.push({ moduleIndex, videoIndex, completed: true });
      await enroll.save();
    }

    res.json({ message: 'Progress saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to track progress' });
  }
});

module.exports = router;
