import React, { useState } from 'react';

function AddBook({ addBook }) {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showGenres, setShowGenres] = useState(false);
  const genres = [
    'Fiction',
    'Mystery',
    'Romance',
    'Science Fiction',
    'Fantasy',
    'Horror',
    'Thriller',
    'Historical Fiction',
    'Biography',
    'Memoir',
    'Self-Help',
    'Poetry'
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddBook = () => {
    if (name.trim() !== '' && author.trim() !== '' && Number(quantity) >= 1) {
      addBook({ title: name, author, quantity: Number(quantity), description, tags: selectedTags });
      setName('');
      setAuthor('');
      setQuantity('');
      setDescription('');
      setSelectedTags([]);
    }
  };

  return (
    <>
      <h2 style={{ ...styles.heading, color: '#ff7f00', paddingTop: '20px', fontSize: '40px' }}>Add Book</h2>
      <div style={styles.inputContainer}>
        <label htmlFor="bookName" style={styles.label}>Book Name &nbsp; </label>
        <input
          type="text"
          id="bookName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ ...styles.input, width: '150px' }}
          placeholder="Enter book name"
        />
      </div>
      <div style={styles.inputContainer}>
        <label htmlFor="authorName" style={styles.label}>Author Name &nbsp;</label>
        <input
          type="text"
          id="authorName"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ ...styles.input, width: '150px' }}
          placeholder="Enter author name"
        />
      </div>
      <div style={styles.inputContainer}>
        <label htmlFor="tags" style={styles.label}>Genre &nbsp;</label>
        <button onClick={() => setShowGenres(!showGenres)} style={styles.tagsButton}>Add Tags</button>
        {showGenres && (
          <div style={styles.tagsContainer}>
            {genres.map((genre, index) => (
              <span
                key={index}
                onClick={() => toggleTag(genre)}
                style={{
                  ...styles.tag,
                  background: selectedTags.includes(genre) ? '#ff7f00' : '#eee',
                  color: selectedTags.includes(genre) ? '#fff' : '#333'
                }}
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
      <div>
        <br />
      </div>
      <div style={styles.inputContainer}>
        <label htmlFor="quantity" style={styles.label}>Quantity &nbsp;</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          style={{ ...styles.input, width: '70px' }}
        />
      </div>
      <div style={{ ...styles.inputContainer, display: 'flex', alignItems: 'center' }}>
        <label htmlFor="description" style={{ ...styles.label, marginRight: '10px' }}>Description (Optional) &nbsp;</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.input, height: '80px', width: '80%' }}
        />
      </div>
      <div>
        <button disabled={!name.trim() || !author.trim() || Number(quantity) < 1} onClick={handleAddBook} style={styles.addButton}>Add Book</button>
      </div>
    </>
  );
}

const styles = {
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    color: '#555',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  tagsButton: {
    padding: '8px',
    backgroundColor: '#ff7f00',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s ease',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    margin: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#ff7f00',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default AddBook;
