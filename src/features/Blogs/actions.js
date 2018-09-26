import feedback from 'feedback'
import * as api from './apiConst'
import * as types from './actionTypes'

export const createBlogs = blog => {
  blog.id = blog.id || ''
  return feedback.actions(
    blog.id === '' ? 'POST' : 'PATCH',
    api.BLOGS + blog.id,
    types.BLOGS_CREATE,
    { blog }
  )
}

export const getBlogsList = () =>
  feedback.get(api.BLOGS, types.BLOGS_INDEX)

export const getBlogsItem = id =>
  feedback.get(api.BLOGS + id, types.BLOGS_SHOW)

export const deleteBlog = id =>
  feedback.destroy(
    api.BLOGS + id,
    types.BLOGS_DESTROY
  )

export const selectBlog = index => ({
  index,
  type: types.BLOG_SELECT + feedback.statuses.SUCCESS
})  
