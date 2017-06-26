/**
 * About React Container Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 * Container Component Docs - https://css-tricks.com/learning-react-container-components/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CounterActions from '../actions';

class About extends React.Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
  };

  render() {
    return (
      <div>
        <h2>About</h2>
        <p>This is a sample about page</p>
        <p>
          Clicked: {this.props.counter} times
          {' '}
          <button onClick={this.props.increment}>+</button>
          {' '}
          <button onClick={this.props.decrement}>-</button>
          {' '}
          <button onClick={this.props.incrementIfOdd}>Increment if odd</button>
          {' '}
          <button onClick={() => this.props.incrementAsync()}>Increment async</button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
