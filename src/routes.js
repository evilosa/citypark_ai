import { MainLayout } from './components'
import { Blogs, News, Menu, Rooms } from 'features'

const routes = [
  {
    path: '/',
    component: MainLayout,
    routes: [
       ...Menu.routes,
       ...News.routes,
       ...Blogs.routes,
       ...Rooms.routes
    ]
  }
]

export default routes
