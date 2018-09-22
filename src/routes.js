import { MainLayout } from './components'
import { Blogs, News, Menu } from 'features'

const routes = [
  {
    path: '/',
    component: MainLayout,
    routes: [
       ...Menu.routes,
       ...News.routes,
       ...Blogs.routes,
    ]
  }
]

export default routes
