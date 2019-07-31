import { connect } from 'react-redux'

import { MinimalStore } from '../components/MinimalStore'
import { fetchMinimalStore } from '../actions/restaurant/fetchMinimalStore'

const mapStateToProps = (state, ownProps) => ({
  items: state.reports.minimalStore,
  isLoading: state.reports.isLoading,
  error: state.reports.error
})

const mapDispatchToProps = {
  fetchMinimalStore
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const MinimalStoreContainer = ReduxWrapper(MinimalStore)