import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
import * as keys from '../constants/Keys'

export function getWeather(input) {
  return dispatch => {
    //using cors, would configure headers in prod, but this is okay for now
    return fetch(`http://cors.io/?u=https://api.forecast.io/forecast/${keys.FORECAST}/${input.lat},${input.lng},${input.date}/`)
      .then(response => response.json())
      .then(json => dispatch(receiveWeather(json)))
  }
}

function receiveWeather(json) {
  return {
    type: types.GET_WEATHER,
    data: json
  }
}

export function setDate(date) {
  return {
    type: types.SET_DATE,
    date
  }
}
