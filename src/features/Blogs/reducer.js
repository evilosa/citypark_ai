import feedback, { getStatus, getAction, statuses } from 'feedback'
import * as types from './actionTypes'

const initialState = {
  fetching: null,
  payload: [],
  errors: {},
  selectedBlog: -1
}

const blogsReducer = (state, action) => {
  if (getStatus(action.type) === statuses.SUCCESS)
    switch (getAction(action.type)) {
      case types.BLOGS_DESTROY:
        return {
          ...initialState,
          payload: state.payload.filter(item => item.id !== action.payload.id)
        }
      case types.BLOG_SELECT:
        return { ...state, selectedBlog: action.index }
      default: return false
    }
}

export default (state = initialState, action) =>
  blogsReducer(state, action) ||
  feedback.reducer(state, action, [
    types.BLOGS_CREATE,
    types.BLOGS_INDEX,
    types.BLOGS_SHOW,
    types.BLOGS_DESTROY
  ]
)
