import { connect } from 'react-redux'

import { CardDiscount } from '../components/CardDiscount'
import { fetchCardDiscount } from '../actions/restaurant/fetchCardDiscount'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.cardDiscount,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchCardDiscount
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const CardDiscountContainer = ReduxWrapper(CardDiscount)