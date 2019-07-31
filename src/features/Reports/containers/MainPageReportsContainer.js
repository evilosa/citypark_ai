import { connect } from 'react-redux'

import { MainPageReports } from '../components'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = {
  //TODO add action
}

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)

export const MainPageReportsContainer = ReduxWrapper(MainPageReports)