import { connect } from 'react-redux'

import { AverageBill } from '../components/AverageBill'
import { fetchAverageBill } from '../actions/restaurant/fetchAverageBill'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.averageBill,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchAverageBill
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const AverageBillContainer = ReduxWrapper(AverageBill)