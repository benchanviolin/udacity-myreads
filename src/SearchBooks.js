import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './components/Book'

class SearchBooks extends React.Component {
  static propTypes = {
    booksByQuery: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    bookWidth: PropTypes.number.isRequired,
    bookHeight: PropTypes.number.isRequired,
    findBooksByQuery: PropTypes.func.isRequired,
    addBookToShelf: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }
  updateQuery = (query) => {
    if (this.hasOwnProperty('waitBeforeSearchID')) {
      clearInterval(this.waitBeforeSearchID);
    }
    this.setState({ query: query.trim() });
    this.waitBeforeSearchID = setTimeout(() => this.props.findBooksByQuery(this.state.query), 500);
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
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.booksByQuery && this.props.booksByQuery.length > 0 ?
              this.props.booksByQuery.map((data, key) => (
                <li key={key}>
                  <Book
                    key={key}
                    shelf="none"
                    book={data}
                    options={this.props.options}
                    width={this.props.bookWidth}
                    height={this.props.bookHeight}
                    id={data.id}
                    title={data.title}
                    authors={data.authors}
                    thumbnail={data.imageLinks.thumbnail}
                    moveBookToAnotherShelf={this.props.addBookToShelf}
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

export default SearchBooks
