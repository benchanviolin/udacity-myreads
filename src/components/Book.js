import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
  /*
  Relevant values passed to this.props.data: id, title, authors, imageLinks.thumbnail
  */

  static propTypes = {
    style: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={
            {
              width: this.props.style.width,
              height: this.props.style.height,
              backgroundImage: 'url("' + this.props.data.imageLinks.thumbnail + '")'
            }
          }></div>          
        </div>
        <div className="book-title">To Kill a Mockingbird</div>
        <div className="book-authors">Harper Lee</div>
      </div>
    )
  }
}

export default Book
