/**
 * Form Input React Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 */

import '../../styles/components/FormInput.scss';
import React from 'react';
import PropTypes from 'prop-types';

class FormInput extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    validate: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['email','text']),
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valid: !this.props.required
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const inputVal = e.target.value;
    let validInput = true;
    this.setState({
      value: inputVal,
      valid: validInput
    });
    if(this.props.required || inputVal !== '') {
      validInput = this.validate(inputVal);
    }
    this.props.handleChange(this.props.id, inputVal, validInput);
  }

  validate(inputVal) {
    switch (this.props.type) {
      case 'email':
        const filter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
        if (filter.test(inputVal)) {
          this.setState({valid: true});
          return true;
        } else if(inputVal === '' && !this.props.required) {
          this.setState({valid: true});
          return true;
        } else {
          this.setState({valid: false});
          return false;
        }
      default:
        if (inputVal !== '') {
          this.setState({valid: true});
          return true;
        } else {
          this.setState({valid: false});
          return false;
        }
    }
  }

  render() {
    return (
      <input
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.handleChange}
        className={(this.props.validate && !this.state.valid) ? `form-input ${this.props.className} invalid` : `form-input ${this.props.className}`}
        disabled={this.props.disabled}
      />
    );
  }
}

export default FormInput;
