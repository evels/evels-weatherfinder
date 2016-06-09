import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'

export function getWeather(text) {
  return dispatch => {
    return fetch(`http://cors.io/?u=https://api.forecast.io/forecast/c03215974eec432dbdb1a5c941e06e1c/37.8267,-122.423`)
      .then(response => response.json())
      .then(json => dispatch(receiveWeather(text, json)))
  }
}

function receiveWeather(text, json) {
  var data = [];
  data.push(json);
  return {
    type: types.GET_WEATHER,
    text,
    data,
    // posts: json.data.children.map(child => child.data),
    // receivedAt: Date.now()
  }
}
