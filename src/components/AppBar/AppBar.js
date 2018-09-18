import React from 'react'
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MaterialMenu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { Menu } from 'features'

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      title: ''
    }
  }

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handelMenuItemClick = event => {
    const { id } = event.target
    const { history } = this.props
    const { MENU } = Menu.links
    let title
    switch (id) {
      case "menu":
        title = MENU.TITLE
        history.push(MENU.PATH)
        break
      default:
    } 
    this.setState({ 
      anchorEl: null,
      title 
    })
  }

  render = () => {
    const { anchorEl, title } = this.state
    return (
      <div className="grow">
        <AppBar position="static">
          <Toolbar>
            <IconButton className="app-bar_menu-button" color="inherit" aria-label="Menu">
              <MenuIcon onClick={this.handleMenuClick} />
              <MaterialMenu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handelMenuItemClick}
              >
                <MenuItem id="menu" onClick={this.handelMenuItemClick}>{Menu.links.MENU.TITLE}</MenuItem>
                <MenuItem id="news" onClick={this.handelMenuItemClick}>My account</MenuItem>
                <MenuItem id="blog" onClick={this.handelMenuItemClick}>Logout</MenuItem>
              </MaterialMenu>
            </IconButton>
            <Typography variant="title" color="inherit" className="grow">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(MenuAppBar)