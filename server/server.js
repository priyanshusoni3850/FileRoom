// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
// mongoose.connect('mongodb+srv://priyanshuair3850:<Manu3850>@cluster0.p5fo3hu.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

require('dotenv').config();
mongoose.connect(process.env.mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error(err);
});


app.use(express.json());
// app.use(
//   cors({
//     origin: ['https://fileroom.netlify.app', 'https://fileroom.netlify.app/'],
//   })
// );
app.use(cors({
  origin: '*',
  methods: ["POST", "GET"],
  credentials: true
}));
// Define routes
app.use('/api/rooms', require('./routes/room'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
