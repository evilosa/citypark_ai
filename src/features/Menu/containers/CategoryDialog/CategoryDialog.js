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
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { Snackbars } from 'components'

import styles from './CategoryDialogStyles'
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

  handleChange = prop => {
    const { target } = prop
    this.setState(prev => ({
      category: {
        ...prev.category,
        ...(() => target ? { [target.name]: target.value } : prop)()
      }
    }))
  }

  handleSubmit = () => {
    const { category } = this.state
    const { createCategory } = this.props
    createCategory(category)
  }

  componentWillReceiveProps = nextProps => {
    const { category, errors, categoryDialog: { edit } } = nextProps
    const fetching = nextProps.fetching === types.CATEGORIES_CREATE || nextProps.fetching === types.CATEGORIES_UPDATE
    if (!fetching && !errors.msg) {
      if (edit) {
        this.setState({
          category: createCategory(category)
        })
      } else {
        this.setState({
          category: createCategory()
        })
      }
      Snackbars.close()
    } else {
      errors.msg && Snackbars.error(errors.msg)
    }
  }

  handleClose = () => {
    const { categoryDialogOpen } = this.props
    categoryDialogOpen(false)
  }

  render = () => {
    const { categoryDialog: { open }, classes, fetching } = this.props
    const { title, cooking_time, hidden, id } = this.state.category
    return (
      <Dialog
        open={open || false}
        onClose={this.handleClose}
        aria-labelledby="form-categoryDialog-title"
      >
        <DialogTitle id="form-categoryDialog-title">{ id ? 'Изменение категории' : 'Добавление новой категории'}</DialogTitle>
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
          <TextField
            required
            onChange={this.handleChange}
            value={cooking_time}
            label="Время пригтовления"
            className={classes.textField}
            name="cooking_time"
            margin="normal"
            variant="outlined"
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Отмена
            </Button>
          <div className={classes.wrapper}>
            <Button onClick={this.handleSubmit} color="primary" disabled={!!fetching}>
              {id ? 'Изменить' : 'Добавить'}
            </Button>
            {fetching && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = state => {
  const { payload, fetching, errors, selectedCategory, categoryDialog } = state.menu
  return {
    categoryDialog,
    fetching,
    errors,
    category: payload[selectedCategory],
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.categories
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const StylesWrapper = withStyles(styles)
const WrappedComponent = ReduxWrapper(StylesWrapper(CategoryNew))
export default WrappedComponent