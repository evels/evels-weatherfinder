// export default function counter(state = 0, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     default:
//       return state;
//   }
// }

import { combineReducers } from 'redux'
import weather from './weather'

const rootReducer = combineReducers({
  weather
})

export default rootReducer
