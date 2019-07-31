import { connect } from 'react-redux'

import { SalesByCookingType } from '../components/SalesByCookingType'
import { fetchSalesByCookingType } from '../actions/restaurant/fetchSalesByCookingType'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.salesByCookingType,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchSalesByCookingType
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const SalesByCookingTypeContainer = ReduxWrapper(SalesByCookingType)