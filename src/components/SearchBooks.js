import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';
import {DebounceInput} from 'react-debounce-input';

const SearchBooks = props => {
  
       const { query = '' , books= [] , onBookUpdateShelf , onUpdateQuery } = props;
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" >Close </Link>
                    <div className="search-books-input-wrapper">
                    <DebounceInput
                        minLength={2}
                        debounceTimeout={300}
                        placeholder="Search by title or author"
                        value={ query }
                        onChange={(e) => onUpdateQuery(e.target.value)} />
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