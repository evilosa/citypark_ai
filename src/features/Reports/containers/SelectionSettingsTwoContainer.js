import { connect } from 'react-redux'

import { SelectionSettingsTwo } from '../components'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = {
  //TODO add action
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const SelectionSettingsTwoContainer = ReduxWrapper(SelectionSettingsTwo)