import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import Shelf from './components/Shelf'

class ListBooks extends React.Component {
  static propTypes = {
    bookWidth: PropTypes.number.isRequired,
    bookHeight: PropTypes.number.isRequired
  }

  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    const options = [
      {
        value: 'none',
        disabled: true,
        label: 'Move to...'
      },
      {
        value: 'currentlyReading',
        label: 'Currently Reading',
        isShelf: true
      },
      {
        value: 'wantToRead',
        label: 'Want to Read',
        isShelf: true
      },
      {
        value: 'read',
        label: 'Read',
        isShelf: true
      },
      {
        value: 'none',
        label: 'None'
      }
    ];

    const shelves = options.filter(option => option.hasOwnProperty('isShelf') && option.isShelf === true);

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf, key) => (
              <Shelf
                key={key}
                id={shelf.value}
                bookWidth={this.props.bookWidth}
                bookHeight={this.props.bookHeight}
                title={shelf.label}
                books={this.state.books.filter(book => book.shelf == shelf.value)}
                options={options}
              />
          ))}
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search-books'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
