import { connect } from 'react-redux'

import { MonthProfit } from '../components/MonthProfit'
import { fetchMonthProfit } from '../actions/other/fetchMonthProfit'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.monthProfit,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchMonthProfit
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const MonthProfitContainer = ReduxWrapper(MonthProfit)