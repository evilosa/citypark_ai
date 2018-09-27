import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { renderRoutes } from 'react-router-config'
import Button from '@material-ui/core/Button'

import { Menu, News, Blogs, User } from 'features'
import { AdminResource } from 'features/User/containers'

class MainLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentTab: Menu.links.MENU.PATH
    }
  }

  handleChange = (event, currentTab) => {
    const { history } = this.props
    history.push(currentTab)
    this.setState({ currentTab })
  }

  componentDidMount = () => {
    const { history, location: { pathname } } = this.props
    const { currentTab } = this.state
    pathname === "/" ? history.push(currentTab) : this.setState({ currentTab: pathname })
  }

  render = () => {
    const { route, signOut } = this.props
    const { currentTab } = this.state
    return (
      <AdminResource>
        <AppBar className="app-bar" position="static">
          <Tabs value={currentTab} onChange={this.handleChange}>
            <Tab value={Menu.links.MENU.PATH} label={Menu.links.MENU.TITLE} />
            <Tab value={News.links.NEWS.PATH} label={News.links.NEWS.TITLE} />
            <Tab value={Blogs.links.BLOGS.PATH} label={Blogs.links.BLOGS.TITLE} />
          </Tabs>
          <Button onClick={() => signOut()} color="inherit">Выйти</Button>
        </AppBar>
        <Typography component="div" style={{ height: "100%" }}>
          {route && renderRoutes(route.routes)}
        </Typography>
      </AdminResource>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signOut: User.actions.auth.signOut
}, dispatch)

const ReduxWrapper = connect(null, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(MainLayout)
export default WrappedComponent