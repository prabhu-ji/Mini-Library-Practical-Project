import React from 'react';

function BookList({ books }) {
  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
