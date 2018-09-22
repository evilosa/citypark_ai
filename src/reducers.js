import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { Blogs, News, Menu, User, Rooms } from 'features'

export default combineReducers({
  routing: routerReducer,
  user: User.reducer,
  menu: Menu.reducer,
  news: News.reducer,
  blogs: Blogs.reducer,
})
