import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WeatherActions from '../actions'
import Controls from '../components/Controls'
import Map from '../components/Map'

class Weather extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { actions, weather } = this.props;
    const timezone = (weather.data) ? weather.data[0].timezone : undefined;
    return (
      <div>asdasdasd
        hi {timezone}
        <Map />
        <Controls getWeather={actions.getWeather}/>
      </div>
    );
  }
}

Weather.propTypes = {
  actions: PropTypes.object.isRequired,
  weather: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    weather: state.weather || {}
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
)(Weather)
