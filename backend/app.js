// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/api', require('./routes/book'));
// MongoDB connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // Optional: if you need to create indexes
  serverSelectionTimeoutMS: 5000, // Optional: to wait 5 seconds before failing
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Import Routes
const booksRouter = require('./routes/book');

// demo route
app.get("/",(req,res)=>{
  res.send("hi");
})

// Routes Middleware
app.use('/api', booksRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!'); // Customize your error message
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
