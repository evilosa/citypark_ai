import { connect } from 'react-redux'

import { Charts } from './Charts'
import { fetchDataForCharts } from '../../actions/other/fetchDataForCharts'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.charts,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchDataForCharts
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const ChartsContainer = ReduxWrapper(Charts)