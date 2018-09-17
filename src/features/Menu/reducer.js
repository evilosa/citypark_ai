import { toPayload } from 'utils'
import feedback, { getStatus, getAction, statuses } from 'feedback'
import * as types from './actionTypes'

const initialState = {
  fetching: null,
  payload: [],
  errors: {},
  category_index: null,
  dish_index: null
}

const menuReducer = (state, action) => {
  if (getStatus(action.type) === statuses.SUCCESS)
    switch (getAction(action.type)) {

      case types.CATEGORIES_CREATE:
        return toPayload(state, [...state.payload, action.payload])

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
        return toPayload(state,
          state.payload.map(category => category.id === action.payload.id ? action.payload : category)
        )

      case types.CATEGORY_DESTROY:
        return {
          ...state,
          ...initialState,
          payload: state.payload.filter(category => category.id !== action.payload.id)
        }

      case types.CATEGORY_MOVE: {
        let { category_index } = state
        const payload = state.payload.map((category, index, array) => {
          if (action.value > 0) {
            if (category.id === state.payload[category_index].id) {
              if (index < array.length - 1) {
                let y_index = category.y_index
                category = { ...category, y_index: array[index + 1].y_index }
                array[index + 1].y_index = y_index
                category_index = index + 1
                return category
              }
              else return category
            }
            else return category
          } else {
            if (category.id === state.payload[category_index].id) {
              if (index > 0) {
                let y_index = category.y_index
                category = { ...category, y_index: array[index - 1].y_index }
                array[index - 1].y_index = y_index
                category_index = index - 1
                return category
              }
              else return category
            }
            else return category
          }
        }).sort((a, b) => parseFloat(a.y_index) - parseFloat(b.y_index))
      return { ...state, category_index, payload }
    }

    case types.CATEGORY_EDIT:
      return {
        ...state,
        isEditMode: !state.isEditMode
      }

    case types.CATEGORY_SELECT:
      return {
        ...state,
        category_index: state.payload.findIndex(item => item.id === action.id)
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
