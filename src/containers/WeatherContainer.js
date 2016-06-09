import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WeatherActions from '../actions'
import Controls from '../components/Controls'

class WeatherContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { actions, weather } = this.props
    return (
      <div>asdasdasd
        hi {weather.data[0].timezone}
        <Controls getWeather={actions.getWeather}/>
      </div>
    )
  };
}

WeatherContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  weather: PropTypes.array.isRequired,
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
)(WeatherContainer)
