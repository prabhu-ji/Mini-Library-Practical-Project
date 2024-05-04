import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import AddBook from './components/AddBook';
import BookList from './components/BookList';

function App() {
  const [page, setPage] = useState('home');
  const [books, setBooks] = useState([]);
  const [filterTags, setFilterTags] = useState([]);

  const addBook = (newBook) => {
    setBooks([...books, { ...newBook, count: newBook.quantity }]);
  };

  const handleIssue = (index) => {
    const updatedBooks = [...books];
    if (updatedBooks[index].count > 0) {
      updatedBooks[index].count -= 1;
      setBooks(updatedBooks);
    }
  };

  const handleReturn = (index) => {
    const updatedBooks = [...books];
    if (updatedBooks[index].count < updatedBooks[index].quantity) {
      updatedBooks[index].count += 1;
      setBooks(updatedBooks);
    }
  };

  const handleDelete = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const handleFilterChange = (tags) => {
    if (filterTags.includes(tags)) {
      setFilterTags(filterTags.filter((tag) => tag !== tags));
    } else {
      setFilterTags([...filterTags, tags]);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'blog':
        return <Blog />;
      case 'add-book':
        return <AddBook addBook={addBook} />;
      case 'book-list':
        return (
          <BookList
            books={books}
            handleIssue={handleIssue}
            handleReturn={handleReturn}
            handleDelete={handleDelete}
            handleFilterChange={handleFilterChange}
          />
        );
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <button onClick={() => setPage('home')}>Home</button>
          </li>
          <li>
            <button onClick={() => setPage('about')}>About</button>
          </li>
          <li>
            <button onClick={() => setPage('blog')}>Blog</button>
          </li>
          <li>
            <button onClick={() => setPage('add-book')}>Add Book</button>
          </li>
          <li>
            <button onClick={() => setPage('book-list')}>Book List</button>
          </li>
        </ul>
      </nav>

      <div className="content">{renderPage()}</div>
    </div>
  );
}

export default App;
