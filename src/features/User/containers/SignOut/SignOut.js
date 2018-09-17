import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'

const SignOut = ({ signOut, className }) =>
  <div className={className} onClick={signOut}>Выйти</div>

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.auth
}, dispatch)

const ReduxWrapper = connect(null, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(SignOut)
export default WrappedComponent
