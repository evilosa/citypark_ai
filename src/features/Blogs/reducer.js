import { toPayload } from 'utils'
import feedback, { getStatus, getAction, statuses } from 'feedback'
import * as types from './actionTypes'

const initialState = {
  fetching: null,
  payload: [],
  errors: {}
}

const blogsReducer = (state, action) => {
  if (getStatus(action.type) === statuses.SUCCESS)
    switch (getAction(action.type)) {
      case types.BLOGS_DESTROY:
        return toPayload(state,
          state.payload.filter(item => item.id !== action.payload.id)
        )
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
