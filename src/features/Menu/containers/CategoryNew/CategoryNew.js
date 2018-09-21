import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { SpinButton, ErrorBox } from 'components'

import styles from './CategoryNewStyles'
import { createCategory } from '../../models'
import * as actions from '../../actions'
import * as types from '../../actionTypes'

class CategoryNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: createCategory()
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState(prev => ({
      ...prev,
      category: {
        ...prev.category,
        [name]: value
      }
    }))
  }

  handleSubmit = () => {
    const { category } = this.state
    const { createCategory } = this.props
    createCategory(category)
  }

  componentWillReceiveProps = nextProps => {
    const { isEditMode, category, errors } = nextProps
    const fetching = nextProps.fetching === types.CATEGORIES_CREATE || nextProps.fetching === types.CATEGORIES_UPDATE
    if (!fetching && !errors.msg) {
      if (isEditMode) {
        this.setState(prev => ({
          ...prev,
          category: createCategory(category)
        }))
      } else {
        this.setState(prev => ({
          ...prev,
          category: createCategory()
        }))
      }
      ErrorBox.clear()
    } else {
      errors.msg && ErrorBox.create(errors.msg)
    }
  }

  handleClose = () => {
    const { showCategoryNew } = this.props
    showCategoryNew(false)
  }

  render() {
    const { open, classes } = this.props
    const { title, cooking_time, id } = this.state.category
    return (
      <Dialog
        open={open || false}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Создание новой категории</DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            onChange={this.handleChange}
            value={title}
            label="Название"
            className={classes.textField}
            name="title"
            margin="normal"
            variant="outlined"
          />
          <TextField
            onChange={this.handleChange}
            value={cooking_time}
            label="Время пригтовления"
            className={classes.textField}
            name="cooking_time"
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Отмена
            </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Отарвить
            </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = state => {
  const { payload, isEditMode, fetching, errors, category_index, open } = state.categories
  return {
    open,
    isEditMode,
    fetching,
    errors,
    category: payload[category_index]
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.categories
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(CategoryNew))
export default WrappedComponent