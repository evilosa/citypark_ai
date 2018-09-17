//import * as components from './components'
import * as containers from './containers'

export const NEWS          = '/news'
export const CREATE_NEWS   = NEWS + '/create'
export const NEWS_SHOW     = NEWS + '/:id'

const routes = [
  {
    path: NEWS,
    exact: true,
    component: containers.NewsList
  },
  {
    path: CREATE_NEWS,
    component: containers.CreateNews
  },
  {
    path: NEWS_SHOW,
    component: containers.CreateNews
  }
]

export default routes
