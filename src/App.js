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
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })
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

          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
