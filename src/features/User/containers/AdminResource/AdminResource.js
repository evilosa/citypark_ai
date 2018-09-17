import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { LoginForm } from '../../components'
import * as actions from '../../actions'
import { ErrorBox } from 'components'
import * as types from '../../actionTypes'

class AdminResource extends React.Component {

  componentDidMount = () => {
    const { fetching } = this.props
    !fetching && this.props.getUser()
  }

  componentWillReceiveProps = nextProps => {
    const { errors } = nextProps
    const fetching = nextProps.fetching === types.USER_SIGN_IN
    !fetching && !errors.msg ? ErrorBox.clear() :
      errors.msg && ErrorBox.create([errors.msg])
  }

  render = () => {
    const { user, children, signIn, signOut, fetching } = this.props
    return fetching === types.USER_SHOW ? null : user.id ?
      user.role > 0 ? children :
      <div>
        <h1>403 Forbidden</h1>
        <button onClick={signOut}>Выход</button>
      </div>
    : <LoginForm signIn={signIn} />
  }
}

const mapStateToProps = state => ({
  user: state.user.payload,
  errors: state.user.errors,
  fetching: state.user.fetching
})

const mapDispatchToProps = dispatch => bindActionCreators ({
  ...actions.auth
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(AdminResource)
export default WrappedComponent
