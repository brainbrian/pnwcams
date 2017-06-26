/**
 * Not Found React Container Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 * Container Component Docs - https://css-tricks.com/learning-react-container-components/
 */

// import '../../styles/containers/NotFound.scss';
import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found</h1>
        <p>We are sorry but the page you are looking for does not exist.</p>
      </div>
    );
  }
}

export default NotFound;
