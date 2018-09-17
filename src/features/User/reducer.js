import feedback from 'feedback'
import * as types from './actionTypes'

const initialState = {
  fetching: null,
  payload: {},
  errors: {}
}

export default (state = initialState, action) =>
  feedback.reducer(
    state,
    action,
    [
      types.USER_SHOW,
      types.USER_SIGN_IN,
      types.USER_DESTROY
    ]
  )
