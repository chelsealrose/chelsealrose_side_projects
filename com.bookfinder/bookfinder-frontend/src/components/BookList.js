import React, { useEffect, useState } from "react"; // Import useState
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]); // Properly define books state

  useEffect(() => {
    // Fetching books data from the backend
    axios
      .get("http://localhost:8080/api/books") // Adjust with your backend API URL
      .then((response) => {
        console.log(response.data); // Log the response data here
        setBooks(response.data); // Set the books data to state (adjust if nested)
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h2>Book List</h2>
      {Array.isArray(books) && books.length > 0 ? (
        <ul className="list-group">
          {books.map((book, index) => (
            <li key={index} className="list-group-item">
              {book.title} by {book.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default BookList;





