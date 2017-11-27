import React from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';

const Shelf = props => {
    const { title , books , onBookUpdateShelf } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ title }</h2>
                <div className="bookshelf-books">
                    <BooksGrid books={ books } onBookUpdateShelf={onBookUpdateShelf}/>
               </div>
        </div>
    );
};

Shelf.propTypes = {
    title: PropTypes.string.isRequired ,
    books: PropTypes.array.isRequired,
    onBookUpdateShelf: PropTypes.func.isRequired
};

export default Shelf;