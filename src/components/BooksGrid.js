import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BooksGrid = props => {
    const { books = [] , onBookUpdateShelf } = props;

    return (
        <ol className="books-grid">
            {books.map((book, index) => (
                <li key={index}>
                    <Book book={book} onBookUpdateShelf={onBookUpdateShelf}/>
                </li>
            ))}
        </ol>
    );
};

BooksGrid.propTypes = {
    books: PropTypes.array.isRequired,
    onBookUpdateShelf: PropTypes.func.isRequired

};

export default BooksGrid;