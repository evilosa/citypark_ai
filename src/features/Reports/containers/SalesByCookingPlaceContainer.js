import { connect } from 'react-redux'

import { SalesByCookingPlace } from '../components/SalesByCookingPlace'
import { fetchSalesByCookingPlace } from '../actions/restaurant/fetchSalesByCookingPlace'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.salesByCookingPlace,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchSalesByCookingPlace
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const SalesByCookingPlaceContainer = ReduxWrapper(SalesByCookingPlace)