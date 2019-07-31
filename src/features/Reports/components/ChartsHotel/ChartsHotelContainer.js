import { connect } from 'react-redux'

import { ChartsHotel } from './ChartsHotel'
import { fetchHotelSalesForCharts } from '../../actions/hotel/fetchHotelSalesForCharts'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.hotelCharts,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchHotelSalesForCharts
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const ChartsHotelContainer = ReduxWrapper(ChartsHotel)