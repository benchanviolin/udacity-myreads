import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    booksByQuery: [],
    options: [
      {
        value: 'none',
        disabled: true,
        label: 'Move to...'
      },
      {
        value: 'currentlyReading',
        label: 'Currently Reading'
      },
      {
        value: 'wantToRead',
        label: 'Want to Read'
      },
      {
        value: 'read',
        label: 'Read'
      },
      {
        value: 'none',
        label: 'None'
      }
    ],
    shelves: [
      {
        value: 'currentlyReading',
        label: 'Currently Reading'
      },
      {
        value: 'wantToRead',
        label: 'Want to Read'
      },
      {
        value: 'read',
        label: 'Read'
      }
    ]
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  moveBookToAnotherShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf

        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }
  findBooksByQuery = (query, callback) => {
    BooksAPI.search(query, 20).then((res) => {
      let books = [];
      if (!res.hasOwnProperty('error')){
        books = res;
      }
      this.setState({ booksByQuery: books }, callback);
    });
  }
  clearSearch = () => {
    this.setState({
      booksByQuery: []
    });
  }

  render() {
    const style = {
      bookWidth: 128,
      bookHeight: 192
    }
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            shelves={this.state.shelves}
            options={this.state.options}
            bookWidth={style.bookWidth}
            bookHeight={style.bookHeight}
            moveBookToAnotherShelf={this.moveBookToAnotherShelf}
          />
        )}/>
      <Route path='/search-books' render={() => (
          <SearchBooks
            books={this.state.books}
            booksByQuery={this.state.booksByQuery}
            options={this.state.options}
            bookWidth={style.bookWidth}
            bookHeight={style.bookHeight}
            findBooksByQuery={this.findBooksByQuery}
            addBookToShelf={this.moveBookToAnotherShelf}
            clearSearch={this.clearSearch}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
