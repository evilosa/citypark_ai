import { connect } from 'react-redux'

import { SalesTotal } from '../components/SalesTotal'
import { fetchSalesTotal } from '../actions/restaurant/fetchSalesTotal'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.salesTotal,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchSalesTotal
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const SalesTotalContainer = ReduxWrapper(SalesTotal)