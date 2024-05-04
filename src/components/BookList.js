import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

function BookList({ books, handleIssue, handleReturn, handleDelete, handleFilterChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDesc, setShowDesc] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDescription = (index) => {
    setShowDesc((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const applyFilter = () => {
    const newFilteredBooks = books.filter((book) =>
      selectedGenres.length === 0 || selectedGenres.some((genre) => book.tags.includes(genre))
    );
    setFilteredBooks(newFilteredBooks);
    setShowFilter(false);
  };

  const clearFilter = () => {
    setSelectedGenres([]);
    setFilteredBooks(books);
  };

  useEffect(() => {
    const newFilteredBooks = books.filter((book) =>
      selectedGenres.length === 0 || selectedGenres.some((genre) => book.tags.includes(genre))
    );
    setFilteredBooks(newFilteredBooks);
  }, [selectedGenres, books]);

  const allGenres = [
    'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 
    'Romance', 'Horror', 'Historical Fiction', 'Biography', 'Autobiography', 'Poetry'
  ];

  return (
    <div className="booklist-container">
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search books..."
          className="search-input"
        />
        <FontAwesomeIcon
          icon={faFilter}
          className="filter-icon"
          onClick={() => setShowFilter(!showFilter)}
        />
      </div>
      {showFilter && (
        <div className="filter-options">
          <h3>Filter by Genre:</h3>
          <div className="genre-options">
            {allGenres.map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
          <div className="filter-buttons">
            <button onClick={applyFilter} className="filter-button">Apply</button>
            <button onClick={clearFilter} className="filter-button">Clear</button>
          </div>
        </div>
      )}
      <h2>Book List</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredBooks.map((book, index) => (
          <li key={index} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  fontWeight: 'bold',
                  marginRight: '0.5rem',
                  cursor: 'pointer',
                }}
                onClick={() => toggleDescription(index)}
              >
                {book.title}
              </div>
              <div style={{ fontSize: 'small', marginRight: '0.5rem' }}>by {book.author}</div>
              <button
                onClick={() => handleIssue(index)}
                className="action-button issue-button"
              >
                Issue
              </button>
              <button
                onClick={() => handleReturn(index)}
                className="action-button return-button"
              >
                Return
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="action-button delete-button"
              >
                Delete
              </button>
            </div>
            {showDesc[index] && (
              <div style={{ fontSize: 'small', color: book.description ? '#007bff' : '#999' }}>
                <div>Genre: {book.tags.join(', ')}</div>
                <div>Description: {book.description || 'Oops! Description is not available'}</div>
              </div>
            )}
            <div style={{ fontSize: 'small' }}>{book.count} available</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
