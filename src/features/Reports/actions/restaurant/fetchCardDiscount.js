import axios from 'axios'
import * as t from '../../actionTypes'

const reportKey = 'cardDiscount'
const baseUrl = 'http://185.175.119.14:8091'

export const fetchCardDiscount = (StartPeriod, EndPeriod) => async dispatch => {
  dispatch({
    type: t.FETCH_REPORT_DATA,
    meta: { reportKey }
  })

  try {
    const response = await axios.get(`${baseUrl}/citypark_reports/hs/reports/v1/card_discounts?StartPeriod=${StartPeriod}&EndPeriod=${EndPeriod}`, {
      method: 'get',
      headers: {
        Authorization: 
        'Basic d3M6d1kxNkRSY1Y='
      }
    })
    const { data } = response
    if (data) {
      console.log(data)
      dispatch({
        type: t.FETCH_REPORT_DATA,
        payload: data,
        meta: { done: true, reportKey }
      })
    }
  } catch (exception) {
    dispatch({
      type: t.FETCH_REPORT_DATA,
      payload: exception.message,
      meta: { error: true, reportKey }
    })
  }
}