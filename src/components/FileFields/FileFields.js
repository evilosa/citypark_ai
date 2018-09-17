import React from 'react'
import PropTypes from 'prop-types'

const MAX_FIELDS = 20

class FileFields extends React.Component {

  constructor(props) {
    super(props)
    this.state = { items: [this.newItem(0)] }
    this.oldvalues = {}
    this.files = {}
  }

  newItem = id => ({
    id,
    body: (
      <div className="file-item" key={id}>
        <input
          type='file'
          name={this.props.name}
          onFocus={e => this.handleFocus(e, id)}
          onChange={e => this.handleAddItem(e, id)}
        />
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

export default FileFields
