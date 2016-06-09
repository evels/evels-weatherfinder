import { Router, Route, Link, browserHistory } from 'react-router'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import '../sass/app.scss'

import App from './containers/App'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
