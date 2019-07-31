import { MainLayout } from './components'
import { Blogs, News, Menu, Reports } from 'features'

const routes = [
  ...Reports.routes,
  {
    path: '/',
    component: MainLayout,
    routes: [
       ...Menu.routes,
       ...News.routes,
       ...Blogs.routes
    ]
  },
]

export default routes
