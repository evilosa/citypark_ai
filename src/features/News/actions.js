import feedback from 'feedback'
import * as api from './apiConst'
import * as types from './actionTypes'

export const createNews = news => {
  news.id = news.id || ''
  return feedback.actions(
    news.id === '' ? 'POST' : 'PATCH',
    api.NEWS + news.id,
    types.NEWS_CREATE,
    { news }
  )
}

export const getNewsList = () =>
  feedback.get(api.NEWS, types.NEWS_INDEX)

export const getNewsItem = id =>
  feedback.get(api.NEWS + id, types.NEWS_SHOW)

export const deleteNews = id =>
  feedback.destroy(
    api.NEWS + id,
    types.NEWS_DESTROY
  )
