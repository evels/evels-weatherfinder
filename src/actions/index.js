import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
import * as keys from '../constants/Keys'

export function getWeather(input, previous) {
  return dispatch => {
    //using cors, would configure headers in prod, but this is okay for now
    return fetch(`http://cors.io/?u=https://api.forecast.io/forecast/${keys.FORECAST}/${input.lat},${input.lng},${input.date}/`)
      .then(response => response.json())
      .then(json => {
        if (previous) {
          dispatch(receiveWeatherPreviousDay(json))
        } else {
          dispatch(receiveWeather(json))
        }
      })
  }
}

function receiveWeather(json) {
  return {
    type: types.GET_WEATHER,
    data: json
  }
}

function receiveWeatherPreviousDay(json) {
  return {
    type: types.GET_WEATHER_PREVIOUS_DAY,
    dataPreviousDay: json
  }
}

export function setDate(date) {
  return {
    type: types.SET_DATE,
    date
  }
}
