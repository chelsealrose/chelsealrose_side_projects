import React from 'react';

const BookItem = ({ book }) => {
  return (
    <div className="list-group-item">
      <h5>{book.title}</h5>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <button className="btn btn-danger">Delete</button>
    </div>
  );
};

export default BookItem;
