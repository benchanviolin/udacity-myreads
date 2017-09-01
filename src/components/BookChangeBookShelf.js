import React from 'react'
import PropTypes from 'prop-types'

class BookChangeBookShelf extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired
  }

  state = {

  }
  render() {
    const { options } = this.props;

    return (
      <div className="book-shelf-changer">
        <select>
          {options.map((option, key) => (
            <option
              key={key}
              value={option.value}
              disabled={option.hasOwnProperty('disabled') && option.disabled === true?'disabled':''}
            >{option.label}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default BookChangeBookShelf
