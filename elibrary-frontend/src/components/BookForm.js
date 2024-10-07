// src/components/BookForm.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function BookForm({ addBook }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('genre', formData.genre);
    if (image) {
      formDataToSend.append('image', image);
    }

    addBook(formDataToSend);

    setFormData("")
    setImage("")
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="border p-2 m-2"
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
        className="border p-2 m-2"
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        required
        className="border p-2 m-2"
      />
      <div {...getRootProps()} className="border-dashed border-2 p-4 m-2 cursor-pointer">
        <input {...getInputProps()} />
        {image ? (
          <p>{image.name}</p>
        ) : (
          <p>Drag 'n' drop an image here, or click to select one</p>
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Add Book</button>
    </form>
  );
}

export default BookForm;
