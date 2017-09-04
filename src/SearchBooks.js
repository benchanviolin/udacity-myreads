import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './components/Shelf'

class SearchBooks extends React.Component {
  static propTypes = {
    booksByQuery: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    bookWidth: PropTypes.number.isRequired,
    bookHeight: PropTypes.number.isRequired,
    findBooksByQuery: PropTypes.func.isRequired,
    addBookToShelf: PropTypes.func.isRequired
  }

  doesBookMatchQuery = book => {

  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Shelf
              id="searchResults"
              bookWidth={this.props.bookWidth}
              bookHeight={this.props.bookHeight}
              title="Search Results"
              books={this.props.booksByQuery.filter(book => this.doesBookMatchQuery(book))}
              options={this.props.options}
              addBookToShelf={this.props.addBookToShelf}
            />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
