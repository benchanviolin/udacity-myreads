import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {

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
            bookWidth={style.bookWidth}
            bookHeight={style.bookHeight}
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
