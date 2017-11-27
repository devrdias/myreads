import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
import BooksGrid from './BooksGrid';

const SearchBooks = props => {
  
       const { query = '' , books= [] , onBookUpdateShelf , onUpdateQuery } = props;
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" >Close </Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={ query }
                            onChange= {(e) => onUpdateQuery(e.target.value)}
                            />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid books= {books} onBookUpdateShelf={onBookUpdateShelf} 
                    onUpdateQuery={onUpdateQuery}/>
                </div>
            </div>

        );
    
}

// Define assinatura do componente
SearchBooks.propTypes = {
    query: PropTypes.string.isRequired,
    onBookUpdateShelf: PropTypes.func.isRequired,
    onUpdateQuery: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
};

export default SearchBooks;