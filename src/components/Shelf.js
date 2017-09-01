import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import BookShelfChanger from './BookShelfChanger'

class Shelf extends React.Component {
  static propTypes = {
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
                  />
                  <BookShelfChanger
                    options={this.props.options}
                  />
                </li>
              )) : ''
            }
            <li>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}></div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">Enders Game</div>
                <div className="book-authors">Orson Scott Card</div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
