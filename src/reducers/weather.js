const initialState = {
};

export default function weather(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_WEATHER':
      return Object.assign({}, state, { data: action.data });
      break;
    case 'GET_WEATHER_PREVIOUS_DAY':
      return Object.assign({}, state, { dataPreviousDay: action.dataPreviousDay });
      break;
    case 'SET_DATE':
      return Object.assign({}, state, { date: action.date });
      break;
    default:
      return state
  }
}
