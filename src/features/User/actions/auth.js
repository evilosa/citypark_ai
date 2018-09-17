import feedback from 'feedback'
import * as apiConst from '../apiConst'
import * as types from '../actionTypes'

export const signIn = user =>
  feedback.post(
    apiConst.SIGN_IN,
    types.USER_SIGN_IN,
    { user }
  )

export const getUser = () =>
  feedback.get(
    apiConst.PROFILE,
    types.USER_SHOW
  )

export const signOut = () =>
  feedback.destroy(
    apiConst.SIGN_OUT,
    types.USER_DESTROY
  )
