import React from 'react'
import PropTypes from 'prop-types'
import Select from './Select'

class BookShelfChanger extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired
  }

  state = {

  }
  render() {
    const { options } = this.props;

    return (
      <div className="book-shelf-changer">
        <Select
          options={ options }
        />
      </div>
    )
  }
}

export default BookShelfChanger
