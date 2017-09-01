import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './components/Shelf'

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    bookWidth: PropTypes.number.isRequired,
    bookHeight: PropTypes.number.isRequired,
    moveBookToAnotherShelf: PropTypes.func.isRequired
  }

  state = {

  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.shelves.map((shelf, key) => (
              <Shelf
                key={key}
                id={shelf.value}
                bookWidth={this.props.bookWidth}
                bookHeight={this.props.bookHeight}
                title={shelf.label}
                books={this.props.books.filter(book => book.shelf === shelf.value)}
                options={this.props.options}
                moveBookToAnotherShelf={this.props.moveBookToAnotherShelf}
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
