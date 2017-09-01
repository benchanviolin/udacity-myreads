import React from 'react'
import PropTypes from 'prop-types'

class Select extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    changedValueHandler: PropTypes.func
  }

  state = {

  }
  onChangeHandler = (event) => {
    if (this.props.hasOwnProperty('changedValueHandler')) {
      this.props.changedValueHandler(event.target.value);
    }
  }
  render() {
    const { options } = this.props;

    return (
      <select defaultValue={this.props.defaultValue} onChange={this.onChangeHandler}>
        {options.map((option, key) => (
          <option
            key={key}
            value={option.value}
            disabled={option.hasOwnProperty('disabled') && option.disabled === true?'disabled':''}
          >{option.label}</option>
        ))}
      </select>
    )
  }
}

export default Select
