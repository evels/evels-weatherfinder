
const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default function weather(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_WEATHER':
      console.log('hihihihi');
      return Object.assign({}, state, { data: action.data });

    default:
      return state
  }
}
