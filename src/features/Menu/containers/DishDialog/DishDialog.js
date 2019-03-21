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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Snackbars } from 'components'
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
      dish: {
        ...prev.dish,
        ...(() => target ? { [target.name]: target.value } : prop)()
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

  handleOnBlur1CCode = () => {
    const lengthDishCode = 9
    let { code } = this.state.dish
    if (code.length < lengthDishCode) {
      code = '0'.repeat(lengthDishCode - code.length) + code
      this.setState(prev => ({
        ...prev,
        dish: {
          ...prev.dish,
          code
        }}))
    }
  }

  componentWillReceiveProps = nextProps => {
    const { dish, errors } = nextProps
    const fetching = nextProps.fetching === types.DISHES_CREATE || nextProps.fetching === types.DISH_UPDATE
    if (!fetching && !errors.msg) {
      this.setState({
        dish: createDish(dish)
      })
    } else {
      errors.msg && Snackbars.error(errors.msg)
    }
  }

  render() {
    const { id, title, cost, weight, can_order, description, code, hidden, imageAttributes, weighter } = this.state.dish
    const { fetching, dishDialogOpen, classes, dishDialog: { open } } = this.props
    return (
      <Dialog
        open={open || false}
        onClose={() => dishDialogOpen(false, true)}
        aria-labelledby="form-categoryDialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-categoryDialog-title">{ id ? 'Изменение блюда' : 'Добавление нового блюда'}</DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            required
            onChange={this.handleChange}
            value={title}
            label="Название"
            className={classes.textField}
            name="title"
            margin="normal"
            variant="outlined"
          />
          <div className={classes.textGroup}>
            <TextField
              onChange={this.handleChange}
              className={classes.textField}
              value={weight}
              label="Масса / Кол-во"
              name="weight"
              margin="normal"
              variant="outlined"
            />
            <TextField
              required
              onChange={this.handleChange}
              className={classes.textField}
              value={cost}
              label="Цена"
              name="cost"
              margin="normal"
              variant="outlined"
              inputProps={{ type: "number" }}
            />
            <TextField
              onChange={this.handleChange}
              onBlur={this.handleOnBlur1CCode}
              className={classes.textField}
              value={code}
              label="Код в 1С"
              name="code"
              margin="normal"
              variant="outlined"
              required
            />
          </div>
          <TextField
            onChange={this.handleChange}
            className={classes.textField}
            label="Описание"
            name="description"
            multiline
            rowsMax="4"
            value={description}
            margin="normal"
            variant="outlined"
          />
          <div className={classes.formBottom}>
            <input
              onChange={event => this.handleChange({ imageAttributes: event.target })}
              name="image_attributes"
              value={imageAttributes.value}
              accept="image/*"
              className={classes.input}
              id="outlined-button-file"
              type="file"
            />
            <label htmlFor="outlined-button-file">
              <Button variant="outlined" component="span" className={classes.button}>
                { imageAttributes.files.length ? imageAttributes.files[0].name : "Загрузить фото" }
             </Button>
            </label>
            <FormControlLabel
              control={
                <Switch
                  onChange={() => this.handleChange({ hidden: !hidden })}
                  checked={hidden}
                  name="can_order"
                  color="primary"
                />
              }
              label="Скрыть"
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={() => this.handleChange({ can_order: !can_order })}
                  checked={can_order}
                  name="can_order"
                  color="primary"
                />
              }
              label="Доступно на вынос"
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={() => this.handleChange({ weighter: !weighter })}
                  checked={weighter}
                  name="weighter"
                  color="primary"
                />
              }
              label="Весовое"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dishDialogOpen(false, true)} color="primary">
            Отмена
          </Button>
          <div className={classes.wrapper}>
            <Button onClick={this.handleSubmit} color="primary" disabled={!!fetching}>
              { id ? 'Изменить' : 'Добавить' }
            </Button>
            { fetching && <CircularProgress size={24} className={classes.buttonProgress} /> }
          </div>
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
    dish: payload[selectedCategory] && payload[selectedCategory].dishes ? payload[selectedCategory].dishes[selectedDish] : {},
    fetching,
    errors
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.dishes
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(DishNew))
export default WrappedComponent