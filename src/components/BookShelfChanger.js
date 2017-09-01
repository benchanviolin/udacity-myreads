import React from 'react'
import PropTypes from 'prop-types'
import Select from './Select'

class BookShelfChanger extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.string.isRequired,
    book: PropTypes.object.isRequired,
    moveBookToAnotherShelf: PropTypes.func
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <Select
          options={this.props.options}
          defaultValue={this.props.defaultValue}
          onChangeValue={this.props.moveBookToAnotherShelf}
          parentEntity={this.props.book}
        />
      </div>
    )
  }
}

export default BookShelfChanger
