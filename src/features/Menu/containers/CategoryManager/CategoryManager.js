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

const CategoryManager = ({ classes, category, categories, moveCategory, changeOrder, showCategoryNew, editCategory, deleteCategory }) => {

  const handleApply = () =>
    changeOrder(categories.map(category => ({
      id: category.id,
      y_index: category.y_index
    })))

  return (
    <div>
      <Toolbar>
        <Button onClick={() => showCategoryNew(true)} mini variant="fab" color="primary" aria-label="Add" className={classes.button}>
          <AddIcon fontSize="small" />
        </Button>
        <Button onClick={ editCategory } mini variant="fab" color="secondary" aria-label="Edit" className={classes.button}>
          <Icon fontSize="small">edit_icon</Icon>
        </Button>
        <Button onClick={ () => category && deleteCategory(category.id) } mini variant="fab" aria-label="Delete" className={classes.button}>
          <DeleteIcon />
        </Button>
      </Toolbar>
    </div>
  )
}

const mapStateToProps = state => {
  const { payload, category_index } = state.categories
  return {
    categories: payload,
    category: payload[category_index] ? payload[category_index] : null
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.categories
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(CategoryManager))
export default WrappedComponent