import axios from 'axios'
import * as t from '../../actionTypes'
import settings from '../../../../config/settings'

const reportKey = 'hotelCharts'

export const fetchHotelSalesForCharts = (StartPeriod, EndPeriod) => async dispatch => {
  dispatch({
    type: t.FETCH_REPORT_DATA,
    meta: { reportKey }
  })

  try {
    const response = await axios.get(`${settings.baseUrlHotel}/CityParkHotel/hs/reports/v1/month_sales?StartPeriod=${StartPeriod}&EndPeriod=${EndPeriod}`, {
      method: 'get',
      headers: {
        Authorization: 
          'Basic d3M6d1kxNkRSY1Y='
      }
    })
    const { data } = response
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
      payload: exception.message,
      meta: { error: true, reportKey }
    })
  }
}