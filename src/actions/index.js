import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
import * as keys from '../constants/Keys'

export function getWeather(input) {
  return dispatch => {
    return fetch(`http://cors.io/?u=https://api.forecast.io/forecast/${keys.FORECAST}/${input.lat},${input.lng},${input.date}/`)
      .then(response => response.json())
      .then(json => {console.log(json); dispatch(receiveWeather(json))})
  }
}

function receiveWeather(json) {
  return {
    type: types.GET_WEATHER,
    data: json
  }
}
