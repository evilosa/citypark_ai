import { connect } from 'react-redux'

import { SelectionSettingsTwoForHotel } from '../components'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = {
  //TODO add action
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const SelectionSettingsTwoForHotelContainer = ReduxWrapper(SelectionSettingsTwoForHotel)