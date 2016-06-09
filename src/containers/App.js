import React, { Component, PropTypes } from 'react'

import Weather from '../components/Weather'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.children || <Weather />}
        </div>
      </div>
    )
  }
}

export default App
