import * as components from './components'

export const MENU    = '/menu/'

const routes = [
  {
    path: MENU,
    exact: true,
    component: components.Menu
  }
]

export default routes
