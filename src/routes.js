import { MainLayout } from './components'
import { Blogs, News, Menu, Reports } from 'features'

const routes = [
  {
    path: '/',
    component: MainLayout,
    routes: [
       ...Menu.routes,
       ...News.routes,
       ...Blogs.routes,
       ...Reports.routes
    ]
  }
]

export default routes
