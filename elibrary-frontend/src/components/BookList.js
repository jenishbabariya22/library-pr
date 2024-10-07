// src/components/BookList.js
import React from 'react';
import BookCard from './BookCard';

function BookList({ books, updateBook, deleteBook }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          updateBook={updateBook}
          deleteBook={deleteBook}
        />
      ))}
    </div>
  );
}

export default BookList;
