import { toPayload } from 'utils'
import feedback, { getStatus, getAction, statuses } from 'feedback'
import * as types from './actionTypes'

const initialState = {
  fetching: null,
  payload: [],
  errors: {},
  selectedCategory: -1,
  selectedDish: -1,
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
        let { selectedCategory, payload } = state
        let _payload = [...state.payload]
        const { value } = action
        //Object.freeze(payload[selectedCategory]) //из-за этой строски получим исключение в строке 54 "Cannot assign to read only property 'y_index' of object '#<Object>'"
        const prevYIndex = payload[selectedCategory].y_index //почему-то меняется объект в исходном массиве, поэтому без доп переменной не обойтись
        if (selectedCategory + value < payload.length && selectedCategory + value >= 0) {
          _payload[selectedCategory] = payload[selectedCategory + value]
          _payload[selectedCategory + value] = payload[selectedCategory]
          _payload[selectedCategory + value].y_index = payload[selectedCategory + value].y_index
          _payload[selectedCategory].y_index = prevYIndex
          selectedCategory += value
        }
        return { ...state, selectedCategory, payload: _payload }
      }

      case types.CATEGORY_SELECT: {
        const { index } = action
        return { ...state, selectedCategory: index }
      }

      case types.CATEGORY_DIALOG_OPEN: {
        const { open, edit } = action.categoryDialog
        return { ...state, categoryDialog: { open, edit } }
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
        return { ...state, selectedDish: index }
  

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
