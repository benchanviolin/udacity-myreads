import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

class Book extends React.Component {
  /*
  Relevant values passed to this.props.data: id, title, authors, imageLinks.thumbnail
  */

  static propTypes = {
    showShelfChanger: PropTypes.bool,
    showBookAlreadyOnShelf: PropTypes.bool,
    shelf: PropTypes.string,
    book: PropTypes.object,
    moveBookToAnotherShelf: PropTypes.func,
    options: PropTypes.array,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // allows this component to be more easily reused since we don't know what the context will be
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    imageLinks: PropTypes.object
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={
            {
              width: this.props.width,
              height: this.props.height,
              backgroundImage: this.props.imageLinks && this.props.imageLinks.hasOwnProperty('thumbnail') ? 'url("' + this.props.imageLinks.thumbnail + '")' : ''
            }
          }></div>
          {this.props.showShelfChanger && (
            <BookShelfChanger
              options={this.props.options}
              defaultValue={this.props.shelf}
              book={this.props.book}
              moveBookToAnotherShelf={this.props.moveBookToAnotherShelf}
            />
          )}
          {this.props.showBookAlreadyOnShelf && !this.props.showShelfChanger && (
            <div className="book-already-on-shelf" />
          )}
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors?this.props.authors.join(', '):''}</div>
      </div>
    )
  }
}

export default Book
