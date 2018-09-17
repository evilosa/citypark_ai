import React from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import { SignOut } from 'features/User/containers'

class Navigation extends React.Component {

  menuItems = () => {
    const { role } = this.props.user
    switch (role) {
      case 1:
        return (
          <Link to="/rooms">
            <div className="header-btn">Номера</div>
          </Link>
        )
      case 2:
        return [
          <Link key="1" to="/menu">
            <div className="header-btn">Меню</div>
          </Link>,
          <Link key="2" to="/news">
            <div className="header-btn">Новости</div>
          </Link>,
          <Link key="3" to="/blogs">
            <div className="header-btn">Блог</div>
          </Link>,
          <Link key="4" to="/rooms">
            <div className="header-btn">Номера</div>
          </Link>
        ]
      default:
        return null    
    }
  }

  componentDidMount = () => {
    const { history, location: { pathname }, user: { role } } = this.props
    if (pathname === "/") role === 2 ? history.push('/menu') : history.push('/rooms')
  }

  render = () =>
    <div id="navigation">
      <div id="pages">      
        { this.menuItems() }
      </div>
      <SignOut className="header-btn" />
    </div>
}

const mapStateToProps = state => ({
  user: state.user.payload
})

const ReduxWrapper = connect(mapStateToProps)
const WrappedComponent = ReduxWrapper(withRouter(Navigation))
export default WrappedComponent
