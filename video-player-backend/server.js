const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { google } = require('googleapis');
const fs = require('fs');
const { OAuth2 } = google.auth;
const app = express();
const streamifier = require('streamifier');
require('dotenv').config(); 

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/videos', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for videos
const videoSchema = new mongoose.Schema({
  title: String,
  driveFileId: String, // Store the Google Drive file ID
});
const Video = mongoose.model('Video', videoSchema);

// Set up Multer for file uploads (temporary storage for videos)
const storage = multer.memoryStorage();  // Use memory storage instead of disk
const upload = multer({ storage });

// Google Drive API setup
const CLIENT_ID = "read from json";
const CLIENT_SECRET = "read from json";
const REDIRECT_URI = "read from json";
const REFRESH_TOKEN = "read from jsons";
const FOLDER_ID = "read from json";

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Upload video to Google Drive
// Upload video to Google Drive
async function uploadToGoogleDrive(fileBuffer, filename) {
  const fileMetadata = {
    name: filename,
    mimeType: 'video/mp4',  // You can adjust the mime type based on your file type
    parents: [FOLDER_ID],   // Specify the folder ID here
  };

  // Convert the buffer to a readable stream using streamifier
  const media = {
    body: streamifier.createReadStream(fileBuffer)  // Convert the buffer to a readable stream
  };

  const file = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',  // Get the file ID from Google Drive response
  });

  return file.data.id;  // Return the file ID from Google Drive
}


// Upload video endpoint
app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    // Upload video to Google Drive
    const videoFileId = await uploadToGoogleDrive(req.file.buffer, req.file.originalname);

    // Save the file metadata in MongoDB
    const video = new Video({ title: req.body.title, driveFileId: videoFileId });
    await video.save();
    
    res.send('Video uploaded to Google Drive successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to upload video');
  }
});

// Get videos endpoint
app.get('/videos', async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

// Serve video files (you can also create a link to Google Drive video)
app.get('/videos/:filename', async (req, res) => {
  const video = await Video.findOne({ title: req.params.filename });

  if (video) {
    const fileId = video.driveFileId;

    // Generate a public link to the video on Google Drive
    const file = await drive.files.get({
      fileId: fileId,
      fields: 'webContentLink',
    });

    res.redirect(file.data.webContentLink);
  } else {
    res.status(404).send('Video not found');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
