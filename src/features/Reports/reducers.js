import * as t from './actionTypes'

const initialState = {
  isLoading: false,
  error: '',
  salesCombined: [],
  salesTotal: [],
  salesByCookingPlace: [],
  salesByCookingType: [],
  averageBill: [],
  minimalStore: [],
  cardDiscount: [],
  cash: [],
  hotelSales: [],
  charts: []  
}

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_REPORT_DATA: {
      if (action.meta) {
        if (action.meta.done) {
          return { ...state, isLoading: false, error: false, [action.meta.reportKey]: action.payload }
        }
        
        if (action.meta.error) {
          return { ...state, isLoading: false, error: action.payload, [action.meta.reportKey]: [] }
        }
        
        return { ...state, isLoading: true, error: '', [action.meta.reportKey]: [] }
      }
      
      return state
    }
    default:
      return state
  }
}

export default reportsReducer
