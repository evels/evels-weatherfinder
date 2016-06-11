import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WeatherActions from '../actions'
import * as location from '../constants/Location'
import Weather from '../components/Weather'

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getWeather({ lat: location.DEFAULT_LAT, lng: location.DEFAULT_LNG });
  }

  render() {
    const {
      actions,
      weather
    } = this.props;
    return (
      <div className="app">
        <Weather
          {...actions}
          weatherData={weather.data}
        />
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
    weather: state.weather
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
