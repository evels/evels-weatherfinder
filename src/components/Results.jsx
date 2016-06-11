import React, { Component, PropTypes } from 'react'


class Results extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { timezone, humidity, temperature } = this.props;
    return (
      <div>
        {timezone}
        {humidity}
        {temperature}
      </div>
    );
  }
}

Results.propTypes = {
  timezone: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
}

export default Results
