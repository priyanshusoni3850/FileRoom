// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  uploads: [
    {
      isText: {
        type: Boolean,
        required: true,
      },
      text: {
        type: String,
      },
      fileName: {
        type: String,
      },
      filePath: {
        type: String,
      },
    },
  ],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
