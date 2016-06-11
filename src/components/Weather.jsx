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

  componentDidMount() {
    //this._changeData({ lat: 47.6062, lng: -122.3321 });
  }

  _changeData(lat, lng) {
    console.log('hi');
    console.log(lat, lng);
    this.props.getWeather({lat, lng});
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
