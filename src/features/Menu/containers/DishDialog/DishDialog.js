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

import styles from './DishDialogStyles'
import { createDish } from '../../models'
import * as actions from '../../actions'
import * as types from '../../actionTypes'
import { base64Loader } from 'utils'

class DishNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dish: createDish()
    }
  }

  handleChange = prop => {
    const { target } = prop
    this.setState(prev => ({
      ...prev,
      dish: {
        ...prev.dish,
        ...(() => target ? {[target.name]: target.value} : prop)()
      }
    }))
  }

  handleSubmit = () => {
    let dish = { ...this.state.dish } //так нужно для загрузки файлов
    const { createDish, category: { id } } = this.props
    base64Loader(dish.imageAttributes.files[0] ? [dish.imageAttributes.files[0]] : [])
      .then(images => {
        if (images) dish.image_attributes = images[0]
        delete dish.imageAttributes
        createDish(id, dish)
      })
  }

  componentWillReceiveProps = nextProps => {
    const { dish, errors } = nextProps
    const fetching = nextProps.fetching === types.DISHES_CREATE || nextProps.fetching === types.DISH_UPDATE
    if (!fetching && !errors.msg) {
      this.setState(prev => ({
        ...prev,
        dish: createDish(dish)
      }))
      ErrorBox.clear()
    } else {
      errors.msg && ErrorBox.create(errors.msg)
    }
  }

  handleClose = () => {
    const { categoryDialogOpen } = this.props
    categoryDialogOpen(false)
  }

  render() {
    const { id, title, cost, weight, can_order, description, imageAttributes } = this.state.dish
    const { fetching, classes, categoryDialog: { open } } = this.props
    return (
      <Dialog
        open={open || false}
        onClose={this.handleClose}
        aria-labelledby="form-categoryDialog-title"
      >
        <DialogTitle id="form-categoryDialog-title">Создание нового блюда</DialogTitle>
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
            value={weight}
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
  const { payload, dishDialog, selectedCategory, selectedDish, fetching, errors } = state.menu
  return {
    dishDialog,
    category: payload[selectedCategory],
    dish: payload[selectedCategory] ? payload[selectedCategory].dishes[selectedDish] : {},
    fetching,
    errors
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.dishes
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(DishNew)
export default WrappedComponent