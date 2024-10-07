// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  status: { type: String, default: 'available' },
  borrower: { type: String, default: null },
  image: { type: String, default: null }, // Add image field
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
