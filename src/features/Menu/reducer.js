import { toPayload } from 'utils'
import feedback, { getStatus, getAction, statuses } from 'feedback'
import * as types from './actionTypes'

const initialState = {
  fetching: null,
  payload: [],
  errors: {},
  category_index: 0,
  dish_index: null,
  dialog: {
    open: false,
    edit: false
  }
}

const menuReducer = (state, action) => {
  if (getStatus(action.type) === statuses.SUCCESS)
    switch (getAction(action.type)) {

      case types.CATEGORIES_CREATE:
        return {
          ...state,
          dialog: initialState.dialog,
          payload: [...state.payload, action.payload]
        }

      case types.CATEGORIES_SHOW: {
        let category_index
        const payload = state.payload.map((category, index) => {
          if (category.id === action.payload.id) {
            category_index = index
            return action.payload
          }
          else return category
        })
        return {
          ...state,
          ...initialState,
          category_index,
          payload
        }
      }
      case types.CATEGORIES_UPDATE:
        return {
          ...state,
          dialog: initialState.dialog,
          payload: state.payload.map(category => category.id === action.payload.id ? action.payload : category)
        }

      case types.CATEGORY_DESTROY:
        return {
          ...state,
          ...initialState,
          payload: state.payload.filter(category => category.id !== action.payload.id)
        }

      case types.CATEGORY_MOVE: {
        let { category_index } = state
        let payload = [...state.payload]
        const { value } = action
        const i = payload.findIndex(item => item.id === payload[category_index].id)
        if (i + value < payload.length && i + value >= 0) {
          let category = payload[i]
          payload[i] = payload[i + value]
          payload[i + value] = category
          payload[i + value].y_index = payload[i].y_index
          payload[i].y_index = category.y_index
          category_index += value
        }
        return { ...state, category_index, payload }
      }

      case types.CATEGORY_SELECT:
        return {
          ...state,
          category_index: state.payload.findIndex(item => item.id === action.id)
        }

      case types.CATEGORY_NEW_SHOW:
        const { open, edit } = action.dialog
        return {
          ...state,
          dialog: { open, edit }
        }

      case types.DISHES_CREATE: {
        let { payload, category_index } = state
        payload[category_index].dishes = [...payload[category_index].dishes, action.payload]
        return toPayload(state, payload)
      }

      case types.DISH_EDIT: {
        const { payload, category_index } = state
        return {
          ...state,
          dish_index: payload[category_index].dishes.findIndex(item => item.id === action.id)
        }
      }

      case types.DISH_UPDATE: {
        let { payload, category_index } = state
        payload[category_index].dishes = payload[category_index].dishes.map(dish =>
          dish.id === action.payload.id ? action.payload : dish
        )
        return toPayload(state, payload)
      }

      case types.DISH_DESTROY:
        let { payload, category_index } = state
        payload[category_index].dishes = payload[category_index].dishes.filter(dish => dish.id !== action.payload.id)
        return toPayload(state, payload)

      default: return false
    }
}

export default (state = initialState, action) =>
  menuReducer(state, action) ||
  feedback.reducer(
    state,
    action,
    [
      types.CATEGORIES_INDEX,
      types.CATEGORIES_SHOW,
      types.CATEGORIES_CREATE,
      types.CATEGORIES_UPDATE,
      types.CATEGORY_DESTROY,
      types.DISHES_CREATE,
      types.DISH_UPDATE,
      types.DISH_DESTROY
    ]
  )
