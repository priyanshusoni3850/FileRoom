// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
mongoose.connect('mongodb://0.0.0.0:27017/file-sharing-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(
  cors({
    origin: ['https://fileroom.netlify.app', 'https://fileroom.netlify.app/'],
  })
);

// Define routes
app.use('/api/rooms', require('./routes/room'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
