import { connect } from 'react-redux'

import { HotelSales } from '../components/HotelSales'
import { fetchHotelSales } from '../actions/hotel/fetchHotelSales'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.hotelSales,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchHotelSales
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const HotelSalesContainer = ReduxWrapper(HotelSales)