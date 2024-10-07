// src/pages/Home.js
import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';

const Home = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="container mx-auto my-8">
      <BookForm selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
      <BookList setSelectedBook={setSelectedBook} />
    </div>
  );
};

export default Home;
