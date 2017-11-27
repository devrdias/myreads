import React from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../api/BooksAPI';

const Book = props => {
    const { title, authors , shelf , imageLinks } = props.book;
    const { onBookUpdateShelf} = props;

    // inicializa selecao da shelf
    const selectedShelf = (shelf ? shelf : 'none');
 
    // define style para book thumbnail
    const style = {
        width: 128,
        height: 193,
        backgroundImage: (imageLinks ? `url(${imageLinks.thumbnail})` : '')
    }

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={style} />
                <div className="book-shelf-changer">
                    <select value={selectedShelf} onChange={(e) => onBookUpdateShelf(props.book , e.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want To Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
        </div>
    );
}


// TODO: DUVIDA !!
// Como fazer nesse caso, utilizar Shape e definir todo o objeto Book , ou somente as propriedades 
// de book utilizadas nesta tela ?


Book.propTypes = {
    book: PropTypes.object.isRequired,
    onBookUpdateShelf: PropTypes.func.isRequired
};

export default Book;