// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error(err);
});



app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ["POST", "GET"],
  credentials: true
}));
// Define routes

// Serve uploaded files for download
app.use('/uploads', express.static('uploads'));

app.use('/api/rooms', require('./routes/room'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
