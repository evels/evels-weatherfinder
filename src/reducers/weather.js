import moment from 'moment'
import * as location from '../constants/Location'

const initialState = {
  date: moment(),
  data: {}
};

export default function weather(state = initialState, action = {}) {
  console.log(action);
  switch (action.type) {
    case 'GET_WEATHER':
      return Object.assign({}, state, { data: action.data });
    case 'SET_DATE':
      return Object.assign({}, state, { date: action.date });
    default:
      return state
  }
}
