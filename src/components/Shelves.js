import React from 'react';
import PropTypes from 'prop-types';
import Shelf from './Shelf';
import { Link } from 'react-router-dom';

 const Shelves = props => {

    const { books = [] , onBookUpdateShelf } = props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf title="Currently Reading" 
                       books={books.filter((book) => book.shelf === 'currentlyReading')}
                       onBookUpdateShelf={onBookUpdateShelf}
            />            
            <Shelf title="Want To Read" 
                       books={books.filter((book) => book.shelf === 'wantToRead')}
                       onBookUpdateShelf={onBookUpdateShelf}
            />
            <Shelf title="Read" 
                       books={books.filter((book) => book.shelf === 'read')}
                       onBookUpdateShelf={onBookUpdateShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" >Add a book</Link>
        </div>
      </div>
    );
  }


Shelves.propTypes = {
  books: PropTypes.array.isRequired,
  onBookUpdateShelf: PropTypes.func.isRequired
};

export default Shelves;