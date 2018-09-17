import { toPayload } from 'utils'
import feedback, { getStatus, getAction, statuses } from 'feedback'
import * as types from './actionTypes'

const initialState = {
  fetching: null,
  payload: [],
  errors: {}
}

const newsReducer = (state, action) => {
  if (getStatus(action.type) === statuses.SUCCESS)
    switch (getAction(action.type)) {
      case types.NEWS_DESTROY:
        return toPayload(state,
          state.payload.filter(item => item.id !== action.payload.id)
        )
      default: return false
    }
}

export default (state = initialState, action) =>
  newsReducer(state, action) ||
  feedback.reducer(state, action, [
    types.NEWS_CREATE,
    types.NEWS_INDEX,
    types.NEWS_SHOW,
    types.NEWS_DESTROY
  ]
)
