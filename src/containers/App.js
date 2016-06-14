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
    const { actions } = this.props;
    const now = moment();
    //actions.setDate(now);
    actions.getWeather({ lat: location.DEFAULT_LAT, lng: location.DEFAULT_LNG, date: now.format() });
  }

  _handleDateChange(newDate) {
    const { actions, weather } = this.props;
    actions.setDate(newDate);
    actions.getWeather({ lat: weather.data.latitude, lng: weather.data.longitude, date: newDate.format() });
  }

  _handleLocationChange(lat, lng) {
    const { actions, weather } = this.props;
    actions.getWeather({ lat: lat, lng: lng, date: weather.date.format() });
  }

  render() {
    const {
      actions,
      weather,
    } = this.props;
    const date = (weather.date) ? weather.date.format('MM/DD/YYYY h:mm A') : moment().format('MM/DD/YYYY h:mm A');
    const results = (weather.data.currently) ? (<Results
              humidity={weather.data.currently.humidity}
              temperature={weather.data.currently.apparentTemperature}
              visibility={weather.data.currently.visibility}
              windSpeed={weather.data.currently.windSpeed}
              cloudCover={weather.data.currently.cloudCover}
              />) : null;

    return (
      <div className={'app'}>
        <h1>Weather<span>Nerdzzz</span></h1>
        {results}
        <div className={'container'}>
          <div className={'column'}>
            <h3>Pick location</h3>
            <Map changeData={this._handleLocationChange}/>
          </div>
          <div className={'column'}>
            <h3>Select time/date</h3>
            <DateTime
              open={true}
              value={date}
              defaultDate={new Date()}
              onChange={this._handleDateChange}/>
          </div>
        </div>
      </div>
    )
  };
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    weather: state.weather,
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
