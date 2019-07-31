import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { Blogs, News, Menu, User, Reports } from 'features'

export default (history) => combineReducers({
  router: connectRouter(history),
  user: User.reducer,
  menu: Menu.reducer,
  news: News.reducer,
  blogs: Blogs.reducer,
  reports: Reports.reducers
})
