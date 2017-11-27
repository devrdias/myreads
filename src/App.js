import React from 'react';
import SearchBooks from './components/SearchBooks';
import ListShelfs from './components/ListShelfs';
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
    this.setState({query: ''}); 
    this.setState({booksSearch: []});
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

      this.setState( {
         booksShelfs: filteredBooks
      })
    });
 }

 updateBookSearchShelf = (book, shelf) => {
  console.warn('updateBookSearchShelf' , book.id , shelf);
  BooksAPI.update(book , shelf).then( () => {
    // apos atualizar no servidor, refletir a alteracao de shelf na tela alterando o estado
    console.log('this.state.booksSearch' , this.state.booksSearch);
    const filteredSearchBooks = this.state.booksSearch.filter( b => b.id !== book.id);
    // book.shelf = shelf; // atualiza shelf no book clicado
    // filteredSearchBooks.push(book); // inclui livro alterado no array

    this.loadBooks();
    // console.log('this.stae.booksShelfs=' , this.state.booksShelfs)
    // const allBooks = this.state.booksShelfs.push(book);


    this.setState( {
       booksSearch: filteredSearchBooks
    })
  });
 }


   // atualiza estado Query
updateQuery = (query) => {   
    BooksAPI.search(query.trim() , 20 ).then( (response) => {
        this.setState({ booksSearch : response })
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
          <SearchBooks onBookUpdateShelf={this.updateBookSearchShelf} 
                       onUpdateQuery={this.updateQuery} 
                       query={query}
                       books={booksSearch}
                       onClickReturn={() => history.push('/')}

          />)}
      />
      <Route exact path="/" render={({history})=>(
          <ListShelfs books= {booksShelfs} 
                      onBookUpdateShelf={this.updateBookShelf}
                      onClickSearch={() => history.push('/search')} 
          />)}
      />
      </div>
    )
  }
};

export default BooksApp;
