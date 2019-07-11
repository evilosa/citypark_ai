import * as containers from './containers'
import * as links from './links'

const routes = [
  {
    path: links.REPORTS.PATH,
    exact: true,
    component: containers.ReportsContainer
  }
]

export default routes