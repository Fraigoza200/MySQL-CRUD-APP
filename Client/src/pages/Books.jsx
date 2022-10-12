import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/books/" +id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Books In Library</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() =>handleDelete(book.id)}>Delete</button>
            <button className="update">Update</button>
          </div>
        ))}
      </div>
        <button><Link to="/add"> Add New Book </Link></button>
    </div>
  );
};

export default Books;
