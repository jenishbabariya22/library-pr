// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async (newBookData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', newBookData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };


  const updateBook = async (id, updatedBook) => {
    console.log('Updating book:', id, updatedBook); // Log what you're trying to update

    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });

      console.log('Response from server:', response); // Log the response

      if (!response.ok) {
        throw new Error('Failed to update the book');
      }

      const updatedData = await response.json();
      // Update the local state with the new book data
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book._id === id ? updatedData : book))
      );
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };


  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">E-Library Management System</h1>
      <BookForm addBook={addBook} />
      <BookList
        books={books}
        updateBook={updateBook}
        deleteBook={deleteBook}
      />
    </div>
  );
}

export default App;
