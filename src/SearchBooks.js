import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './components/Book'

class SearchBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    booksByQuery: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    bookWidth: PropTypes.number.isRequired,
    bookHeight: PropTypes.number.isRequired,
    findBooksByQuery: PropTypes.func.isRequired,
    addBookToShelf: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.clearSearch();
  }

  state = {
    query: '',
    isSearchInProgress: false
  }
  updateQuery = query => {
    this.setState({
      query: query.trim(),
      isSearchInProgress: true
    }, () => {
      if (this.hasOwnProperty('waitBeforeSearchID')) {
        clearInterval(this.waitBeforeSearchID);
      }
      this.waitBeforeSearchID = setTimeout(() => this.props.findBooksByQuery(this.state.query, this.clearSearchProgress), 500);
    });
  }
  clearSearchProgress = () => {
    this.setState({
      isSearchInProgress: false
    });
  }
  isBookAlreadyOnShelf = book => {
    const findBookById = this.props.books.filter(function(elem, index, array) {
      return elem.id === book.id
    });
    return (findBookById.length > 0);
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
          {this.state.isSearchInProgress && (
            <div>Searching...</div>            
          )}
          <ol className="books-grid">
            {this.props.booksByQuery.length > 0 ?
              this.props.booksByQuery.map((data, key) => (
                <li key={key}>
                  <Book
                    key={key}
                    showShelfChanger={!this.isBookAlreadyOnShelf(data)}
                    showBookAlreadyOnShelf={true}
                    shelf="none"
                    book={data}
                    options={this.props.options}
                    width={this.props.bookWidth}
                    height={this.props.bookHeight}
                    id={data.id}
                    title={data.title}
                    authors={data.authors}
                    imageLinks={data.imageLinks}
                    moveBookToAnotherShelf={this.props.addBookToShelf}
                  />
                </li>
              )) : <div>
                reactnd-project-myreads-starter/SEARCH_TERMS.md - limited search terms include:<br /><br />
                Android, Art, Artificial Intelligence, Astronomy, Austen, Baseball, Basketball, Bhagat, Biography, Brief, Business, Camus, Cervantes, Christie, Classics, Comics, Cook, Cricket, Cycling, Desai, Design, Development, Digital Marketing, Drama, Drawing, Dumas, Education, Everything, Fantasy, Film, Finance, First, Fitness, Football, Future, Games, Gandhi, Homer, Horror, Hugo, Ibsen, Journey, Kafka, King, Lahiri, Larsson, Learn, Literary Fiction, Make, Manage, Marquez, Money, Mystery, Negotiate, Painting, Philosophy, Photography, Poetry, Production, Programming, React, Redux, River, Robotics, Rowling, Satire, Science Fiction, Shakespeare, Singh, Swimming, Tale, Thrun, Time, Tolstoy, Travel, Ultimate, Virtual Reality, Web Development, iOS
              </div>
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
