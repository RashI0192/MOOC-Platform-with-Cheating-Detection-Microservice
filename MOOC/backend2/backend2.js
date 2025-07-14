require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
console.log('JWT_SECRET:', process.env.JWT_SECRET);


// ✅ Middleware: Allow requests from frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ✅ Middleware: Allow reading JSON body
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// ✅ Routes
const authRoutes = require('./routes/auth');
console.log('✅ authRoutes type:', typeof authRoutes); // should be 'function' (a router)

const instructorRoutes = require('./routes/instructor');
console.log('✅ instructorRoutes type:', typeof instructorRoutes); // should be 'function'

const studentRoutes = require('./routes/student');
console.log('✅ studentRoutes type:', typeof studentRoutes); // should be 'function'





app.use('/api/auth', authRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/student', studentRoutes);

// ✅ Health check endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API working ✅' });
});

// ✅ Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

              