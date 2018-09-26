import * as containers from './containers'
import * as links from './links'

const routes = [
  {
    path: links.BLOGS.PATH,
    exact: true,
    component: containers.BlogsList
  },
  {
    path: links.BLOGS_NEW.PATH,
    component: containers.BlogsNew
  },
  {
    path: links.BLOGS_EDIT.PATH,
    component: containers.BlogsNew
  }
]

export default routes
