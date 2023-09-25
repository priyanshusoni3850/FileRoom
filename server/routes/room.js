// routes/room.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
router.use('/uploads', express.static('uploads'));


// Serve uploaded files for download
// Serve uploaded files for download
// router.get('/download', (req, res) => {
//     console.log("Clicked000");
//     const { filePath } = req.query; // Get the filePath from the query parameters
//     console.log(filePath);
//     const fileLocation = path.join(__dirname, '..', filePath);
//     console.log(fileLocation);

//   const fileStream = fs.createReadStream(fileLocation);

//   fileStream.on('error', () => {
//     res.status(404).send('File not found');
//   });

//   // Set appropriate response headers
//   res.setHeader('Content-disposition', `attachment; filename=${filePath}`);
//   res.setHeader('Content-type', 'application/octet-stream');

//   // Pipe the file stream to the response
//   fileStream.pipe(res);
// });

// Serve uploaded files for download


//////////////////////////////////////////////////////////////////////////////////////
router.get('/download', (req, res) => {
    console.log("clicked");
    const { filePath } = req.query; // Get the filePath from the query parameters
    console.log(filePath);
    const fileLocation = path.join(__dirname, '..', filePath);
    console.log(fileLocation);
    
    const fileStream = fs.createReadStream(fileLocation);
    console.log(fileStream);

    fileStream.on('error', () => {
        res.status(404).send('File not found');
    });

    // Determine the content type based on the file extension
    let contentType = 'application/octet-stream'; // Default content type for unknown files
    const fileExtension = path.extname(filePath).toLowerCase();

    if (fileExtension === '.pdf') {
        contentType = 'application/pdf';
    } else if (fileExtension === '.xls' || fileExtension === '.xlsx') {
        contentType = 'application/vnd.ms-excel';
    }

    // Set appropriate response headers
    res.setHeader('Content-disposition', `attachment; filename=${path.basename(filePath)}`);
    res.setHeader('Content-type', contentType);

    // Pipe the file stream to the response
    fileStream.pipe(res);
});

















// Create a room
router.post('/create', async (req, res) => {
    console.log("/create");
    try {
      const { roomCode } = req.body;
      const room = new Room({ roomCode });
      await room.save();
      res.json(room);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create a room' });
    }
  });
  

// Get room by code
router.get('/:code', async (req, res) => {
    console.log("/code");
  try {
    const { code } = req.params;
    const room = await Room.findOne({ roomCode: code });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});
// Upload a file to the room
router.post('/:code/upload', upload.single('file'), async (req, res) => {
    console.log("/code/upload");
    try {
      const { code } = req.params;
      const room = await Room.findOne({ roomCode: code });
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      const { file } = req;
      const isText = false;
      const fileName = file.originalname;
      const filePath = file.path.replace('uploads/', ''); // Remove 'uploads/' from the path
  
      room.uploads.push({ isText, fileName, filePath }); // Store the corrected filePath
      await room.save();
  
      res.json({ message: 'File uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });
  

// Upload text to the room
router.post('/:code/upload-text', async (req, res) => {
    console.log("/code/upload text");
  try {
    const { code } = req.params;
    const room = await Room.findOne({ roomCode: code });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const { text } = req.body;
    const isText = true;

    room.uploads.push({ isText, text });
    await room.save();

    res.json({ message: 'Text uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload text' });
  }
});

// Get uploads in the room
router.get('/:code/uploads', async (req, res) => {
    console.log("code/uploads");
  try {
    const { code } = req.params;
    const room = await Room.findOne({ roomCode: code });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ uploads: room.uploads });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
});

module.exports = router;
