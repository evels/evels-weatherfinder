import React, { Component, PropTypes } from 'react'

import Map from '../components/Map'
import Results from '../components/Results'

class Weather extends Component {
  constructor(props) {
    super(props)
    this._changeData = this._changeData.bind(this);
  }

  _changeData(data) {
    console.log('hi');
    console.log(data);
    this.props.getWeather(data);
  }

  render() {
    // const hi = (        <Results
    //           timezone={weatherData.timezone || ''}
    //           humidity={weatherData.currently.humidity || ''}
    //           temperature={weatherData.currently.temperature || ''}
    //           />);
    const { getWeather, weatherData } = this.props;
    //const timezone = weatherData.timezone;
    //<Map changeData={this._changeData}/>
    return (
      <div>asdasdasd
        hi
      </div>
    );
  }
}

Weather.propTypes = {
  getWeather: PropTypes.func.isRequired,
  weatherData: PropTypes.object.isRequired,
}

export default Weather
