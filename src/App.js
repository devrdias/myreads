import React from 'react';
import SearchBooks from './components/SearchBooks';
import Shelves from './components/Shelves';
import { Route } from 'react-router-dom';
import * as BooksAPI from './api/BooksAPI';

class BooksApp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        booksShelfs: [],
        booksSearch: [],
        query: ''
    }
  }
  
  // event life-cycle - inicia state depois do componente carregado no DOM
  componentDidMount() {
    this.loadBooks();
  }
  
  
  // ======================================================
  updateBookShelf = (book , shelf) => {
    console.warn('updateBookShelf' , book.id , shelf);
    BooksAPI.update(book , shelf).then( () => {
      // apos atualizar no servidor, refletir a alteracao de shelf na tela alterando o estado
      const filteredBooks = this.state.booksShelfs.filter(b => b.id !== book.id); //remove book clicado do array
      book.shelf = shelf; // atualiza shelf no book clicado
      filteredBooks.push(book); // inclui livro alterado no array

      const filteredSearchBooks = this.state.booksSearch.filter( b => b.id !== book.id);

      this.setState( {
         booksShelfs: filteredBooks,
         booksSearch: filteredSearchBooks
      })
    });
 }


   // atualiza estado Query
updateQuery = (query) => {   
    BooksAPI.search(query.trim() , 20 ).then( (response) => {

      // Nao consegui utilizar "Difference" para retirar do array de livros retornados no Search, 
      // os livros já em alguma das estantes. ????

      const setBooksOnShelf = new Set(this.state.booksShelfs);
      const setBooksSearch = new Set(response);
      
      console.debug('setBooksOnShelf', setBooksOnShelf.size);
      console.debug('setBooksSearch', setBooksSearch.size);
      const filteredSearchBooks = new Set (
        [...setBooksSearch].filter( book => !setBooksOnShelf.has(book))
      );
      console.log('filteredSearchBooks' , filteredSearchBooks.size);

        this.setState({ booksSearch : [...filteredSearchBooks] })
    });        

    this.setState({
            query: query.trim() 
    });
}

 loadBooks = () =>{
  BooksAPI.getAll().then((books) => {
    this.setState({
      booksShelfs: books
    })
  })
}


  
  render() {
    const { booksShelfs , query , booksSearch } = this.state;
    console.debug('booksShelfs', booksShelfs);

    return (
      <div className="app">
      <Route exact path="/create" render={({history})=>(
          <SearchBooks onBookUpdateShelf={this.updateBookShelf} 
                       onUpdateQuery={this.updateQuery} 
                       query={query}
                       books={booksSearch}
                       onClickReturn={() => history.push('/')}

          />)}
      />
      <Route exact path="/" render={({history})=>(
          <Shelves books= {booksShelfs} 
                      onBookUpdateShelf={this.updateBookShelf}
                      onClickSearch={() => history.push('/search')} 
          />)}
      />
      </div>
    )
  }
};

export default BooksApp;
