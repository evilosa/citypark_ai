import { connect } from 'react-redux'

import { Cash } from '../components/Cash'
import { fetchCash } from '../actions/cash/fetchCash'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.cash,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchCash
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const CashContainer = ReduxWrapper(Cash)