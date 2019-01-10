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

const DishManager = ({ classes, dishDialogOpen, moveDish, deleteDish, dish, dishes, disableButtons, disableAddButton, changeOrder, selectedDish }) => {

  const handleApply = () =>
    changeOrder(dishes.map(dish => ({
      id: dish.id,
      y_index: dish.y_index
    })))

  return (
    <Toolbar className={classes.toolbar}>
      <div>
        <Button
          onClick={() => dishDialogOpen(true)}
          disabled={disableAddButton}
          mini variant="fab"
          color="primary"
          aria-label="Add"
          className={classes.button}
        >
          <AddIcon fontSize="small" />
        </Button>
        <Button
          onClick={() => dishDialogOpen(true, true)}
          disabled={disableButtons}
          mini variant="fab"
          color="secondary"
          aria-label="Edit"
          className={classes.button}
        >
          <Icon style={{ color: "white" }} fontSize="small">edit_icon</Icon>
        </Button>
        <Button
          onClick={() => window.confirm(`Вы действительно хотите удалить блюдо "${dish.title}"?`) && deleteDish(dish.id)}
          disabled={disableButtons}
          mini variant="fab"
          aria-label="Delete"
          className={classes.button}
        >
          <DeleteIcon />
        </Button>
      </div>
      <div>
        <Button
          onClick={() => moveDish(-1)}
          disabled={disableButtons || selectedDish === 0}
          mini variant="fab"
          aria-label="Delete"
          className={classes.button}
          title="Переместить блюдо вверх"
        >
          <Icon fontSize="small">keyboard_arrow_up</Icon>
        </Button>
        <Button
          onClick={() => moveDish(1)}
          disabled={disableButtons || selectedDish === dishes.length - 1}
          mini variant="fab"
          aria-label="Delete"
          className={classes.button}
          title="Переместить блюдо вниз"
        >
          <Icon fontSize="small">keyboard_arrow_down</Icon>
        </Button>
        <Button
          onClick={handleApply}
          disabled={disableButtons}
          mini variant="fab"
          aria-label="Delete"
          className={classes.button}
          title="Применить"
        >
          <Icon fontSize="small">done</Icon>
        </Button>
      </div>
    </Toolbar>
  )
}

const mapStateToProps = state => {
  const { payload, selectedCategory, selectedDish } = state.menu
  return {
    selectedDish,
    disableAddButton: selectedCategory === -1,
    disableButtons: selectedDish === -1,
    dish: payload[selectedCategory] && payload[selectedCategory].dishes ? payload[selectedCategory].dishes[selectedDish] : {},
    dishes: payload[selectedCategory] ? payload[selectedCategory].dishes : []
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.dishes
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(DishManager))
export default WrappedComponent