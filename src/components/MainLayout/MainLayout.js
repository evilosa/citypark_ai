import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { renderRoutes } from 'react-router-config'

import { Menu } from 'features'

class MainLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0
    }
  }

  handleChange = (event, currentTab) => {
    const { history } = this.props
    switch (currentTab) {
      case 0: history.push(Menu.links.MENU.PATH)
      default:
    }
    this.setState({ currentTab })
  }

  render = () => {
    const { route } = this.props
    const { currentTab } = this.state
    return (
      <div id="container">
        <AppBar position="static">
          <Tabs value={currentTab} onChange={this.handleChange}>
            <Tab label={ Menu.links.MENU.TITLE } />
            <Tab label="Item Two" />
            <Tab label="Item Three" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        <Typography component="div" style={{ height: "100%" }}>
          {route && renderRoutes(route.routes)}
        </Typography>
      </div>
    )
  }
}

export default MainLayout