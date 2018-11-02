import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'

import styles from './CategoryManagerStyles'
import * as actions from '../../actions'

const CategoryManager = ({ classes, category, categories, moveCategory, changeOrder,
  categoryDialogOpen, disabled, deleteCategory, selectedCategory }) => {

  const handleApply = () =>
    changeOrder(categories.map(category => ({
      id: category.id,
      y_index: category.y_index
    })))

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <div>
          <Button
            onClick={() => categoryDialogOpen(true)}
            mini variant="fab"
            color="primary"
            aria-label="Add"
            className={classes.button}
          >
            <AddIcon fontSize="small" />
          </Button>
          <Button
            onClick={() => categoryDialogOpen(true, true)}
            disabled={disabled}
            mini variant="fab"
            color="secondary"
            aria-label="Edit"
            className={classes.button}
          >
            <Icon style={{ color: "white" }} fontSize="small">edit_icon</Icon>
          </Button>
          <Button
            onClick={() => window.confirm(`Вы действительно хотите удалить категорию "${category.title}"?`) && deleteCategory(category.id)}
            disabled={disabled}
            mini variant="fab"
            aria-label="Delete"
            className={classes.button}
          >
            <DeleteIcon />
          </Button>
        </div>
        <div>
          <Button
            onClick={() => moveCategory(-1)}
            disabled={disabled || selectedCategory === 0}
            mini variant="fab"
            aria-label="Delete"
            className={classes.button}
          >
            <Icon fontSize="small">keyboard_arrow_up</Icon>
          </Button>
          <Button
            onClick={() => moveCategory(1)} 
            disabled={disabled || selectedCategory === categories.length - 1}
            mini variant="fab"
            aria-label="Delete"
            className={classes.button}
          >
            <Icon fontSize="small">keyboard_arrow_down</Icon>
          </Button>
          <Button
            onClick={handleApply}
            disabled={disabled}
            mini variant="fab"
            aria-label="Delete"
            className={classes.button}
          >
            <Icon fontSize="small">done</Icon>
          </Button>
        </div>
      </Toolbar>
    </div>
  )
}

const mapStateToProps = state => {
  const { payload, selectedCategory } = state.menu
  return {
    selectedCategory,
    disabled: selectedCategory === -1,
    categories: payload,
    category: payload[selectedCategory] ? payload[selectedCategory] : null
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.categories
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(CategoryManager))
export default WrappedComponent