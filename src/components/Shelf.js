import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bookWidth: PropTypes.number.isRequired,
    bookHeight: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    books: PropTypes.array,
    options: PropTypes.array
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books && this.props.books.length > 0 ?
              this.props.books.map((data, key) => (
                <li key={key}>
                  <Book
                    width={this.props.bookWidth}
                    height={this.props.bookHeight}
                    id={data.id}
                    title={data.title}
                    author={data.authors.join(', ')}
                    thumbnail={data.imageLinks.thumbnail}
                    options={this.props.options}
                  />
                </li>
              )) : ''
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
