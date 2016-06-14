import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import DateTime from 'react-datetime'

import * as WeatherActions from '../actions'
import * as location from '../constants/Location'
import * as PlotSettings from '../constants/PlotSettings'
import Results from '../components/Results'
import Map from '../components/Map'
import Plotly from '../components/Plotly'

class App extends Component {
  constructor(props) {
    super(props);
    this._handleDateChange = this._handleDateChange.bind(this);
    this._handleLocationChange = this._handleLocationChange.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    const now = moment();
    actions.setDate(now);
    this._getWeatherData(location.DEFAULT_LAT, location.DEFAULT_LNG, now);
  }

  _handleDateChange(newDate) {
    const { actions, weather } = this.props;
    actions.setDate(newDate);
    this._getWeatherData(weather.data.longitude, weather.data.latitude, newDate);
  }

  _handleLocationChange(lat, lng) {
    const { weather } = this.props;
    this._getWeatherData(lat, lng, weather.date);
  }

  _getWeatherData(lat, lng, date) {
    //until I learn how to make two API calls in one action, this will have to do...
    const { actions } = this.props;
    actions.getWeather({ lat, lng, date: moment(date).subtract(1, 'days').format() }, 1);
    actions.getWeather({ lat, lng, date: date.format() });

  }

  render() {
    const {
      actions,
      weather,
    } = this.props;
    let date;
    let currentHour;
    let results;
    let temperatureGraph;
    if (weather.date && weather.data && weather.dataPreviousDay) {
      date = weather.date.format('MM/DD/YYYY h:mm A');
      currentHour = weather.date.hour();
      const data = { hours: [], temps: [] };
      let yesterHour = 23;
      for(var i = 0; i < 24; i++) {
        data.hours.push(-i);
        const hour = (currentHour - i);
        if (hour >= 0) { //today's data
          data.temps.push(weather.data.hourly.data[hour].apparentTemperature);
        } else { //yesterday's data
          data.temps.push(weather.data.hourly.data[yesterHour].apparentTemperature);
          yesterHour--;
        }
      }
      let graphData = [
        {
          type: 'scatter',
          x: data.hours,
          y: data.temps,
          mode: 'lines',
        },
      ];
      results = (
        <Results
          humidity={weather.data.currently.humidity}
          temperature={weather.data.currently.apparentTemperature}
          visibility={weather.data.currently.visibility}
          windSpeed={weather.data.currently.windSpeed}
          cloudCover={weather.data.currently.cloudCover}
        />);
      temperatureGraph = (
        <Plotly
          className="whatever"
          data={graphData}
          layout={PlotSettings.LAYOUT}
          config={PlotSettings.CONFIG}/>
      );
    } else {
      date = moment().format('MM/DD/YYYY h:mm A');
    }
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
        {temperatureGraph}
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
