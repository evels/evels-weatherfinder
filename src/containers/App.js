import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import * as WeatherActions from '../actions'
import * as location from '../constants/Location'
import Results from '../components/Results'
import Map from '../components/Map'
import DateTime from 'react-datetime'

class App extends Component {
  constructor(props) {
    super(props);

    this._handleDateChange = this._handleDateChange.bind(this);
    this._handleLocationChange = this._handleLocationChange.bind(this);
  }

  componentDidMount() {
    //this.props.actions.getWeather({ lat: location.DEFAULT_LAT, lng: location.DEFAULT_LNG, date: moment().format() });
  }

  _handleDateChange(newDate) {
    const { actions, weather } = this.props;
    actions.getWeather({ lat: weather.data.latitude, lng: weather.data.longitude, date: moment().format() });
  }

  _handleLocationChange(lat, lng) {
    const { actions, date } = this.props;
    actions.getWeather({ lat: lat, lng: lng, date: date.format() });
  }

  render() {
    const {
      actions,
      weather,
      date,
    } = this.props;

    const results = (weather.data) ? (<Results
              timezone={weather.data.timezone || ''}
              humidity={weather.data.currently.humidity || ''}
              temperature={weather.data.currently.temperature || ''}
              />) : null;

    return (
      <div className="app">
        <Map changeData={this._handleLocationChange}/>
        <DateTime
          value={date}
          onChange={this._handleDateChange}/>
        {results}
      </div>
    )
  };
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
}

function mapStateToProps(state) {
  return {
    weather: state.weather,
    date: state.date || moment(),
    lng: state.lng || location.DEFAULT_LNG,
    lat: state.lat || location.DEFAULT_LAT
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WeatherActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
