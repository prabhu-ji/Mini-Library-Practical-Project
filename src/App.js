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

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
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
        return <BookList books={books} />;
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

      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
