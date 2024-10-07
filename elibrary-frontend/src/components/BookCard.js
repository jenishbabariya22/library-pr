import React from 'react';

function BookCard({ book, updateBook, deleteBook }) {

  const handleBorrowReturn = () => {
    if (book.status === 'available') {
      const borrower = prompt('Enter your name to borrow the book:');
      if (borrower) {
        // Make sure to pass the correct structure
        updateBook(book._id, { ...book, status: 'borrowed', borrower });
      }
    } else {
      updateBook(book._id, { ...book, status: 'available', borrower: null }); // For returning the book
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      {/* Display the book image if available */}
      {book.image ? (
        <img
          src={`http://localhost:5000/${book.image}`} // Ensure the correct path
          alt={book.title}
          className="w-full h-48 object-cover rounded mb-2" // Style the image as needed
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded mb-2 flex items-center justify-center">
          <span>No Image Available</span>
        </div>
      )}
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Status:</strong> {book.status}</p>
      {book.status === 'borrowed' && <p><strong>Borrower:</strong> {book.borrower}</p>}
      <button
        onClick={handleBorrowReturn}
        className={`mt-2 p-2 ${book.status === 'available' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
      >
        {book.status === 'available' ? 'Borrow' : 'Return'}
      </button>
      <button
        onClick={() => deleteBook(book._id)}
        className="mt-2 p-2 bg-red-500 text-white ml-2"
      >
        Delete
      </button>

      <button
        onClick={() => updateBook(book._id)}
        className="mt-2 p-2 bg-blue-300 text-white ml-2"
      >
        Update
      </button>
    </div>
  );
}

export default BookCard;
