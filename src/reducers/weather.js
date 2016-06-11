const initialState = {
};

export default function weather(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_WEATHER':
      return Object.assign({}, state, { data: action.data });
    case 'SET_DATE':
      return Object.assign({}, state, { date: action.date });
    default:
      return state
  }
}
