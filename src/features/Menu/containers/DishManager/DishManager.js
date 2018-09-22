import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'

import styles from './DishManagerStyles'
import * as actions from '../../actions'

const DishManager = ({ classes, dishDialogOpen, deleteDish, dish, disableButtons, disableAddButton }) =>
  <Toolbar className={classes.toolbar}>
    <Button onClick={() => dishDialogOpen(true)} disabled={disableAddButton} mini variant="fab" color="primary" aria-label="Add" className={classes.button}>
      <AddIcon fontSize="small" />
    </Button>
    <Button onClick={() => dishDialogOpen(true, true)} disabled={disableButtons} mini variant="fab" color="secondary" aria-label="Edit" className={classes.button}>
      <Icon style={{ color: "white" }} fontSize="small">edit_icon</Icon>
    </Button>
    <Button onClick={() => dish && deleteDish(dish.id)} disabled={disableButtons} mini variant="fab" aria-label="Delete" className={classes.button}>
      <DeleteIcon />
    </Button>
  </Toolbar>

const mapStateToProps = state => {
  const { payload, selectedCategory, selectedDish } = state.menu
  return {
    disableAddButton: selectedCategory === null,
    disableButtons: selectedDish === null,
    dish: payload[selectedCategory] && payload[selectedCategory].dishes ? payload[selectedCategory].dishes[selectedDish] : {},
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.dishes
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(DishManager))
export default WrappedComponent