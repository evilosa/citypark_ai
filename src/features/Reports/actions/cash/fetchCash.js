import axios from 'axios'
import * as t from '../../actionTypes'
import settings from '../../../../config/settings'

const reportKey = 'cash'

export const fetchCash = (EndPeriod) => async dispatch => {
  dispatch({
    type: t.FETCH_REPORT_DATA,
    meta: { reportKey }
  })
  try {
    const response = await axios.get(`${settings.baseUrlRestaurant}/citypark_reports/hs/reports/v1/cash?EndPeriod=${EndPeriod}`, {
      method: 'get',
      headers: {
        Authorization: 
        'Basic d3M6d1kxNkRSY1Y='
      }
    })
    const { data } = response
    console.log(data)
    if (data) {
      
      dispatch({
        type: t.FETCH_REPORT_DATA,
        payload: data,
        meta: { done: true, reportKey }
      })
    }
  } catch (exception) {
    dispatch({
      type: t.FETCH_REPORT_DATA,
      error: exception.message,
      meta: { error: true, reportKey }
    })
  }
}