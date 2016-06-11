import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
import * as keys from '../constants/Keys'

export function getWeather(data) {
  return dispatch => {
    return fetch(`http://cors.io/?u=https://api.forecast.io/forecast/${keys.FORECAST}/${data.lat},${data.lng}/`)
      .then(response => response.json())
      .then(json => dispatch(receiveWeather(json)))
  }
}

function receiveWeather(json) {
  return {
    type: types.GET_WEATHER,
    data: json,
  }
}
