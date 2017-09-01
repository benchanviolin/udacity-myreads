import React from 'react'
import PropTypes from 'prop-types'
import BookChangeBookShelf from './BookChangeBookShelf'

class Book extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired
  }
  state = {
    data: {},
    options: []
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
          <BookChangeBookShelf
            options={this.props.options}
          />
        </div>
        <div className="book-title">To Kill a Mockingbird</div>
        <div className="book-authors">Harper Lee</div>
      </div>
    )
  }
}

export default Book
