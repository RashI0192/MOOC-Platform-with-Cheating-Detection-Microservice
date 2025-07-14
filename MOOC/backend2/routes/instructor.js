// routes/instructor.js
const express  = require('express');
const multer   = require('multer');
const path     = require('path');
const router   = express.Router();

const requireAuth = require('../middleware/requireAuth');
const Course      = require('../models/Course');
const User        = require('../models/User');
const Enrollment  = require('../models/Enrollment');

/* every route needs instructor role */
router.use(requireAuth('instructor'));

/* multer — store in uploads/ */
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads'),
  filename   : (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/* ───── POST /api/instructor/courses ───── */
router.post(
  '/courses',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'videos',    maxCount: 100 },
  ]),
  async (req, res) => {
    try {
      /* 1️⃣ parse modules */
      let modules = JSON.parse(req.body.modules || '[]');
      if (!Array.isArray(modules))
        return res.status(400).json({ message: 'Invalid modules JSON' });

      /* 2️⃣ attach uploaded video files */
      const files   = req.files.videos || [];
      let   filePtr = 0;

      modules = modules.map((mod, mIdx) => {
        mod.videos = mod.videos.map((v, vIdx) => {
          const file = files[filePtr++];
          if (!file)
            throw new Error(`Video file missing for module ${mIdx + 1} video ${vIdx + 1}`);

          return {
            title        : v.title,
            filename     : file.filename,
            originalName : file.originalname,
            url          : `/uploads/${file.filename}`,
          };
        });
        return mod;            // keep quiz intact
      });

      /* 3️⃣ save */
      const course = await Course.create({
        instructor : req.user.id,
        title      : req.body.title,
        testEnabled: req.body.testEnabled === 'true',
        thumbnail  : req.files.thumbnail?.[0]?.filename || '',
        modules,
      });

      res.status(201).json({ message: 'Course saved', courseId: course._id });
    } catch (err) {
      console.error('❌ Error creating course:', err);
      res.status(500).json({ message: err.message || 'Error creating course' });
    }
  }
);


/* ─────────────── GET /api/instructor/profile ─────────────── */
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const courseIds     = await Course.find({ instructor: user._id }).distinct('_id');
    const coursesCount  = courseIds.length;
    const studentsCount = await Enrollment.countDocuments({ course: { $in: courseIds } });

    res.json({
      name : user.username,
      email: user.username + '@example.com',
      photo: user.photo || null,
      coursesCount,
      studentsCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

/* ─────────────── PUT /profile/password ─────────────── */
router.put('/profile/password', async (req, res) => {
  if (!req.body.password)
    return res.status(400).json({ message: 'Password is required' });

  const user = await User.findById(req.user.id);
  user.password = req.body.password;
  await user.save();
  res.json({ message: 'Password updated' });
});

/* ─────────────── PUT /profile/photo ─────────────── */
router.put('/profile/photo', upload.single('photo'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { photo: `/uploads/${req.file.filename}` },
    { new: true }
  );
  res.json({ photoUrl: user.photo });
});

/* ─────────────── GET /api/instructor/courses ─────────────── */
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id })
      .select('title thumbnail')
      .lean();

    const courseIds = courses.map((c) => c._id);
    const enrollmentCounts = await Enrollment.aggregate([
      { $match: { course: { $in: courseIds } } },
      { $group: { _id: '$course', count: { $sum: 1 } } },
    ]);

    const countMap = Object.fromEntries(
      enrollmentCounts.map((e) => [e._id.toString(), e.count])
    );

    res.json(
      courses.map((c) => ({
        _id         : c._id,
        title       : c.title,
        thumbnail   : c.thumbnail,
        studentCount: countMap[c._id.toString()] || 0,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

module.exports = router;