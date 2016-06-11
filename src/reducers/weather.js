const initialState = {
  data: {}
};

export default function weather(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_WEATHER':
      return Object.assign({}, state, { data: action.data });
    default:
      return state
  }
}
