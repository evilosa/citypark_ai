//import * as components from './components'
import * as containers from './containers'

export const BLOGS          = '/blogs'
export const CREATE_BLOGS   = BLOGS + '/create'
export const BLOGS_SHOW     = BLOGS + '/:id'

const routes = [
  {
    path: BLOGS,
    exact: true,
    component: containers.BlogsList
  },
  {
    path: CREATE_BLOGS,
    component: containers.CreateBlogs
  },
  {
    path: BLOGS_SHOW,
    component: containers.CreateBlogs
  }
]

export default routes
