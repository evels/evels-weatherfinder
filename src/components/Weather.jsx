import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WeatherActions from '../actions'
import Controls from '../components/Controls'
import Map from '../components/Map'

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
    const { getWeather, weatherData } = this.props;
    const timezone = weatherData.timezone;
    return (
      <div>asdasdasd
        hi {timezone}
        <Map changeData={this._changeData}/>
        <Controls getWeather={getWeather}/>
      </div>
    );
  }
}

Weather.propTypes = {
  getWeather: PropTypes.func.isRequired,
  weatherData: PropTypes.object.isRequired,
}

export default Weather
