import { connect } from 'react-redux'

import { SelectionSettingsOne } from '../components'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = {
  //TODO add action
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const SelectionSettingsOneContainer = ReduxWrapper(SelectionSettingsOne)