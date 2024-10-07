// backend/controllers/bookController.js
const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book.status === "available") {
      book.status = "borrowed";
      book.borrower = req.body.borrower;
      await book.save();
      res.status(200).json(book);
    } else {
      res.status(400).json({ message: "Book already borrowed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book.status === "borrowed") {
      book.status = "available";
      book.borrower = null;
      await book.save();
      res.status(200).json(book);
    } else {
      res.status(400).json({ message: "Book is not borrowed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
