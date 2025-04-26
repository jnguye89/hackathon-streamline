const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/videos', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for videos
const videoSchema = new mongoose.Schema({
  title: String,
  filename: String
});
const Video = mongoose.model('Video', videoSchema);

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Upload video endpoint
app.post('/upload', upload.single('video'), async (req, res) => {
  const video = new Video({ title: req.body.title, filename: req.file.filename });
  await video.save();
  res.send('Video uploaded successfully');
});

// Get videos endpoint
app.get('/videos', async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

// Serve video files
app.get('/videos/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads', req.params.filename));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});