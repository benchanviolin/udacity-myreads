import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import Shelf from './components/Shelf'

class ListBooks extends React.Component {
  static propTypes = {
    bookWidth: PropTypes.number.isRequired,
    bookHeight: PropTypes.number.isRequired,
    onMoveBookToAnotherShelf: PropTypes.func
  }

  state = {
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
    ],
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  moveBookToAnotherShelf = (book, shelf) => {
    const oldShelf = book.shelf;
    BooksAPI.update(book, shelf).then((books) => {
      console.log(oldShelf);

    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.state.shelves.map((shelf, key) => (
              <Shelf
                key={key}
                id={shelf.value}
                bookWidth={this.props.bookWidth}
                bookHeight={this.props.bookHeight}
                title={shelf.label}
                books={this.state.books.filter(book => book.shelf === shelf.value)}
                options={this.state.options}
                moveBookToAnotherShelf={this.moveBookToAnotherShelf}
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
