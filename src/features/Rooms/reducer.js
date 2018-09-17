import feedback from 'feedback'
import * as types from './actionTypes'

const initialState = {
  fetching: null,
  payload: [],
  errors: {}
}

export default (state = initialState, action) =>
  feedback.reducer(state, action, [
    types.ROOMS_INDEX,
    types.ROOMS_UPDATE
  ]
)
