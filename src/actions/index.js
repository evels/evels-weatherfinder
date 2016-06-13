import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
import * as keys from '../constants/Keys'

export function getWeather(input) {
  //TODO:
  //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyAjbzKlWbbaZZKU9PaP3Gk3kGba9agSc1s
  //could add fun lat/lng => address finder here

  if (!(input.lat && input.lng && input.date)) {
    return dispatch => {
      //using cors, would configure headers in prod, but this is okay for now
      return fetch(`http://cors.io/?u=https://api.forecast.io/forecast/${keys.FORECAST}/${input.lat},${input.lng},${input.date}/`)
        .then(response => response.json())
        .then(json => dispatch(receiveWeather(json)))
    }
  } else {
    console.log('Invalid inputs');
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
