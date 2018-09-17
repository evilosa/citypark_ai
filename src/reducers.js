import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { Blogs, News, Menu, User, Rooms } from 'features'

export default combineReducers({
  routing: routerReducer,
  user: User.reducer,
  categories: Menu.reducer,
  news: News.reducer,
  blogs: Blogs.reducer,
  rooms: Rooms.reducer
})
