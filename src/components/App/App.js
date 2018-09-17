import * as React from 'react'

import { Provider } from 'react-redux'

import store, { history } from 'store'
import { ConnectedRouter } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'

import routes from 'routes'

const App = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>{renderRoutes(routes)}</ConnectedRouter>
  </Provider>


export default App
