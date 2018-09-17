import * as containers from './containers'
import { ROOMS } from './links'

const routes = [
  {
    path: ROOMS.URL,
    component: containers.Rooms
  }
]

export default routes