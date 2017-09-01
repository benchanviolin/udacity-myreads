import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

class Book extends React.Component {
  /*
  Relevant values passed to this.props.data: id, title, authors, imageLinks.thumbnail
  */

  static propTypes = {
    shelf: PropTypes.string,
    options: PropTypes.array,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // allows this component to be more easily reused since we don't know what the context will be
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={
            {
              width: this.props.width,
              height: this.props.height,
              backgroundImage: 'url("' + this.props.thumbnail + '")'
            }
          }></div>
        {this.props.shelf && this.props.shelf !== '' && this.props.options && this.props.options.length > 0 ?
            <BookShelfChanger
              options={this.props.options.filter(option => option.value !== this.props.shelf)}
            />
            : ''
          }
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.author}</div>
      </div>
    )
  }
}

export default Book
