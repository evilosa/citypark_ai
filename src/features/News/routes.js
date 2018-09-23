import * as containers from './containers'
import * as links from './links'

const routes = [
  {
    path: links.NEWS.PATH,
    exact: true,
    component: containers.NewsList
  },
  {
    path: links.NEWS_NEW.PATH,
    component: containers.CreateNews
  },
  {
    path: links.NEWS_EDIT.PATH,
    component: containers.CreateNews
  }
]

export default routes
