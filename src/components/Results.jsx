import React, { Component, PropTypes } from 'react'

class Results extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { humidity, temperature, visibility, windSpeed, cloudCover } = this.props;
    return (
      <div className={'results'}>
        <div className={'resultBox'}>
          <h2>Temperature</h2>
          <p>{temperature}&#176;</p>
        </div>
        <div className={'resultBox'}>
          <h2>Humidity</h2>
          <p>{humidity}</p>
        </div>
        <div className={'resultBox'}>
          <h2>Visibility</h2>
          <p>{visibility}</p>
        </div>
        <div className={'resultBox'}>
          <h2>Wind speed</h2>
          <p>{windSpeed}</p>
        </div>
        <div className={'resultBox'}>
          <h2>Cloud Cover</h2>
          <p>{cloudCover}</p>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  humidity: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  visibility: PropTypes.number.isRequired,
  windSpeed: PropTypes.number.isRequired,
}

export default Results
