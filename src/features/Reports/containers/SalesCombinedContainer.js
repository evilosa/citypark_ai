import { connect } from 'react-redux'

import { SalesCombined } from '../components/SalesCombined'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = {
  //TODO add action
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const SalesCombinedContainer = ReduxWrapper(SalesCombined)