import React from 'react'
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { renderRoutes } from 'react-router-config'

import { Menu, News } from 'features'
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
    const { route } = this.props
    const { currentTab } = this.state
    return (
      <AdminResource>
        <div id="container">
          <AppBar position="static">
            <Tabs value={currentTab} onChange={this.handleChange}>
              <Tab value={Menu.links.MENU.PATH} label={Menu.links.MENU.TITLE} />
              <Tab value={News.links.NEWS.PATH} label={News.links.NEWS.TITLE} />
              <Tab label="Item Three" href="#basic-tabs" />
            </Tabs>
          </AppBar>
          <Typography component="div" style={{ height: "100%" }}>
            {route && renderRoutes(route.routes)}
          </Typography>
        </div>
      </AdminResource>
    )
  }
}

export default withRouter(MainLayout)