import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { renderRoutes } from 'react-router-config'
import Button from '@material-ui/core/Button'

import { Menu, News, Blogs, User, Reports } from 'features'
import { AdminResource } from 'features/User/containers'

const isMenuHidden = pathname => {
  const matching = /\/reports/.exec(pathname)
  return !!matching
}
class MainLayout extends React.Component {

  constructor(props) {
    super(props)
    
    const { history: { location: { pathname } }} = props
    this.state = {
      currentTab: Menu.links.MENU.PATH,
      isMenuHidden: isMenuHidden(pathname)
    }
  }

  handleChange = (event, currentTab) => {
    const { history, history: { location: { pathname }} } = this.props
    this.setState({ currentTab, isMenuHidden: isMenuHidden(currentTab) }, () => {
      history.push(currentTab)
    })
  }

  componentDidMount = () => {
    const { history, location: { pathname } } = this.props
    const { currentTab } = this.state
    pathname === "/" ? history.push(currentTab) : this.setState({ currentTab: pathname, isMenuHidden: isMenuHidden(pathname) })
  }

  render = () => {
    const { route, signOut } = this.props
    const { currentTab, isMenuHidden } = this.state
    return (
      <AdminResource>
        {!isMenuHidden && <AppBar className="app-bar" position="static">
          <Tabs value={currentTab} onChange={this.handleChange}>
            <Tab value={Menu.links.MENU.PATH} label={Menu.links.MENU.TITLE} />
            <Tab value={News.links.NEWS.PATH} label={News.links.NEWS.TITLE} />
            <Tab value={Blogs.links.BLOGS.PATH} label={Blogs.links.BLOGS.TITLE} />
            <Tab value={Reports.links.REPORTS.PATH} label={Reports.links.REPORTS.TITLE} />
          </Tabs>
          <Button onClick={() => signOut()} color="inherit">Выйти</Button>
        </AppBar>}
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