import { toPayload } from 'utils'
import feedback, { getStatus, getAction, statuses } from 'feedback'
import * as types from './actionTypes'

const initialState = {
  fetching: null,
  payload: [],
  errors: {},
  selectedCategory: 0,
  selectedDish: null,
  categoryDialog: {
    open: false,
    edit: false
  },
  dishDialog: {
    open: false,
    edit: false
  }
}

const menuReducer = (state, action) => {
  const { fetching, categoryDialog, selectedDish, dishDialog  } = initialState
  if (getStatus(action.type) === statuses.SUCCESS)
    switch (getAction(action.type)) {

      case types.CATEGORIES_CREATE: 
        return { ...state, fetching, categoryDialog, payload: [...state.payload, action.payload] }

      case types.CATEGORIES_UPDATE:
        return { ...state, fetching, categoryDialog,
          payload: state.payload.map(category => category.id === action.payload.id ? action.payload : category)
        }

      case types.CATEGORIES_SHOW: {
        const { payload } = state
        const selectedCategory = payload.findIndex(item => item.id === action.payload.id)
        payload[selectedCategory] = action.payload
        return { ...initialState, selectedCategory, payload } 
      }
      
      case types.CATEGORY_DESTROY:
        return { ...initialState, payload: state.payload.filter(category => category.id !== action.payload.id) }

      case types.CATEGORY_MOVE: {
        let { selectedCategory } = state
        let payload = [...state.payload]
        const { value } = action
        const i = payload.findIndex(item => item.id === payload[selectedCategory].id)
        if (i + value < payload.length && i + value >= 0) {
          const category = payload[i]
          payload[i] = payload[i + value]
          payload[i + value] = category
          payload[i + value].y_index = payload[i].y_index
          payload[i].y_index = category.y_index
          selectedCategory += value
        }
        return { ...state, selectedCategory, payload }
      }

      case types.CATEGORY_SELECT:
        return {
          ...state,
          selectedCategory: state.payload.findIndex(item => item.id === action.id)
        }

      case types.CATEGORY_DIALOG_OPEN: {
        const { open, edit } = action.categoryDialog
        return {
          ...state,
          categoryDialog: { open, edit }
        }
      }

      case types.DISHES_CREATE: {
        let { payload, selectedCategory } = state
        payload[selectedCategory].dishes = [...payload[selectedCategory].dishes, action.payload]
        return { ...state, fetching, selectedDish, dishDialog, payload }
      }

      case types.DISH_UPDATE: {
        let { payload, selectedCategory } = state
        payload[selectedCategory].dishes = payload[selectedCategory].dishes.map(dish =>
          dish.id === action.payload.id ? action.payload : dish
        )
        return { ...state, fetching, dishDialog, payload }
      }

      case types.DISH_SELECT: 
        const { index } = action
        return { ...state, selectedDish: state.selectedDish === index ? null : index }
  

      case types.DISH_DIALOG_OPEN: {
        const { open, edit } = action.dishDialog
        const { selectedDish } = state
        return {
          ...state,
          selectedDish: edit ? selectedDish : null,
          dishDialog: { open, edit }
        }
      }

      case types.DISH_DESTROY:
        let { payload, selectedCategory } = state
        payload[selectedCategory].dishes = payload[selectedCategory].dishes.filter(dish => dish.id !== action.payload.id)
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
