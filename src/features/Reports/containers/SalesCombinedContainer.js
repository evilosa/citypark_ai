import { connect } from 'react-redux'

import { SalesCombined } from '../components/SalesCombined'
import { fetchSalesCombined } from '../actions/restaurant/fetchSalesCombined'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.salesCombined,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchSalesCombined
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const SalesCombinedContainer = ReduxWrapper(SalesCombined)