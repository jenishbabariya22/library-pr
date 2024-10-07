const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Configure file filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb('Invalid file type, only images are allowed!', false);
  }
};

const upload = multer({ storage, fileFilter });

// Create a new book with image
router.post('/books', upload.single('image'), async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const newBook = new Book({
      title,
      author,
      genre,
      image: req.file ? req.file.path : null,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(400).json({ message: 'Error adding book', error: err.message });
  }
});

// Get all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching books', error: err.message });
  }
});

// Delete a book
router.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBook);
  } catch (err) {
    res.status(400).json({ message: 'Error deleting book', error: err.message });
  }
});

// Update a book
// routes/books.js
router.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (err) {
    console.error('Update error:', err); // Log error for debugging
    res.status(400).json({ message: 'Error updating book', error: err.message });
  }
});



module.exports = router;
