import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import styles from './FileFieldsStyles'

const MAX_FIELDS = 20

class FileFields extends React.Component {

  constructor(props) {
    super(props)
    this.state = { 
      items: [this.newItem(0)] 
    }
    this.oldvalues = {}
    this.files = {}
  }

  newItem = id => ({
    id,
    body: (
      <div className="file-item" key={id}>
        <input
          name={this.props.name}
          onClick={e => this.handleFocus(e, id)}
          onChange={e => this.handleAddItem(e, id)}
          accept="image/*"
          style={{ display: 'none' }}
          type="file"
          id={"button-file-" + id}
        />
        <label htmlFor={"button-file-" + id}>
          <Button id={"file-button-" + id} variant="outlined" component="span" className={this.props.classes.button}>
            Загрузить фото
          </Button>
        </label>
        <i className="material-icons" onClick={() => this.handleDeleteItem(id)}>delete</i>
      </div>
    )
  })

  handleFocus = (event, id) =>
    this.oldvalues[id] = event.target.value

  handleAddItem = (event, id) => {
    const { items } = this.state
    const { onChange, name } = this.props
    const { value, files } = event.target
    if (value === '') this.handleDeleteItem(id)
    this.files[id] = files[0]
    document.getElementById("file-button-" + id).innerHTML = files[0].name
    onChange({ [name]: Object.values(this.files) })
    if (items.length < MAX_FIELDS && this.oldvalues[id] === '')
      this.setState({
        items: [...items, this.newItem(Date.now())]
      })
  }

  handleDeleteItem = id => {
    delete this.files[id]
    if (this.oldvalues[id] === undefined) return
    if (this.state.items.length === 1) {
      this.setState({ items: [this.newItem(Date.now())] })
      return
    }
    this.setState({ items: this.state.items.filter(item => item.id !== id) })
  }

  render = () =>
    <div className="file-fields">
      { this.state.items.map(item => item.body) }
    </div>
}

FileFields.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

const StylesWrapper = withStyles(styles)
export default StylesWrapper(FileFields)
