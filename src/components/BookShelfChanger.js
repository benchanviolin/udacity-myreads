import React from 'react'
import PropTypes from 'prop-types'
import Select from './Select'

class BookShelfChanger extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.string.isRequired
  }

  state = {

  }
  render() {
    return (
      <div className="book-shelf-changer">
        <Select
          options={this.props.options}
          defaultValue={this.props.defaultValue}
        />
      </div>
    )
  }
}

export default BookShelfChanger
