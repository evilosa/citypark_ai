import * as components from './components'
import * as links from './links'

const routes = [
  {
    path: links.MENU.PATH,
    exact: true,
    component: components.Menu
  }
]

export default routes
