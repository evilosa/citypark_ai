import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import * as actions from '../../actions'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

class DishesList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dishSelected: 0
    }
  }

  handleClick = id => {
    const { editDish } = this.props
    const selected = id === this.state.dishSlected ? 0 : id
    this.setState(prev => ({
      ...prev,
      dishSlected: selected
    }))
    editDish(selected)
  }

  dishesList = () => {
    const { dishes, destroyDish } = this.props
    return dishes ? dishes.map(dish =>
      <ListItem
        className="dish-item"
        onClick={() => this.handleClick(dish.id)}
        selected={dish.id === this.state.dishSlected ? true : false}
        key={dish.id}
      >
        <img
          height="100"
          width="152"
          src={dish.images ? dish.images.preview : null}
          alt="pic"
        />
        <div>
          <h2>{dish.title}</h2>
          <p>{dish.description}</p>
          <p>{dish.cost}</p>
        </div>
      </ListItem>
    ) : null
  }

  render = () => {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <List className="dishes-list">
          {this.dishesList()}
        </List>
      </div>
    )
  }
}

DishesList.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const { payload, selectedCategory } = state.menu
  return {
    dishes: payload[selectedCategory] ? payload[selectedCategory].dishes : []
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.dishes
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(DishesList))
export default WrappedComponent