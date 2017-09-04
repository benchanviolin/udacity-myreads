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
    BooksAPI.update(book, shelf).then((shelves) => {
      /* ASSUMPTION: Only one user uses this application at a time.  With concurrent users I would consider web sockets or else refreshing the entire data set after each change just to be sure the data doesn't get stale */
      // invert the keys returned by BooksAPI.update() so that they can be applied to the prior state.books values by book.id
      let bookUpdates = {};
      for(const [shelfId, bookIds] of Object.entries(shelves)) {
        for(const bookId of bookIds) {
          bookUpdates[bookId] = shelfId;
        }
      }
      this.setState(state => {
        /* HELP! Can you please explain a way to refactor the code below?  I'm still fairly new to ES6 so I struggled with conciseness.  Thank you! */
        state.books = state.books.map(book => {
          if (bookUpdates.hasOwnProperty(book.id)) {
            book.shelf = bookUpdates[book.id];
          }
          return book;
        })
        return state;
      })
    })
  }
  findBooksByQuery = query => {
    BooksAPI.search(query, 20).then((res) => {
      console.log(res);
      if (res.hasOwnProperty('error')){
        this.setState({ booksByQuery: [] })
      } else {
        this.setState({ booksByQuery: res })
      }
    })
  }
  addBookToShelf = (book, shelf) => {

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
            booksByQuery={this.state.booksByQuery}
            options={this.state.options}
            bookWidth={style.bookWidth}
            bookHeight={style.bookHeight}
            findBooksByQuery={this.findBooksByQuery}
            addBookToShelf={this.addBookToShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
