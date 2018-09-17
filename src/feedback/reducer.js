import { PENDING, SUCCESS, FAILURE } from './actionStatuses'

const initialState = {
  fetching: null,
  payload: {},
  errors: {}
}

export const getAction = type => {
  const fnd = /@@\w+/.exec(type)
  return fnd ? fnd[0] : null
}

export const getStatus = type => {
  const fnd = /\/\w+/.exec(type)
  return fnd ? fnd[0] : null
}

const defaultReducer = (state = initialState, { type, payload, errors } = {}, actionTypes = []) =>
   actionTypes.includes(getAction(type)) ? {
    ...state,
    ...{
      [PENDING]: () => ({
        errors: {},
        fetching: getAction(type)
      }),
      [SUCCESS]: () => ({
        fetching: null,
        payload
      }),
      [FAILURE]: () => ({
        fetching: null,
        errors
      })
    }[getStatus(type)]()
  }
  : state

export default defaultReducer
