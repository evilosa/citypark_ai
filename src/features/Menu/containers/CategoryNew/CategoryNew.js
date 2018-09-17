import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createCategory } from '../../models'
import * as actions from '../../actions'
import * as types from '../../actionTypes'
import { SpinButton, ErrorBox } from 'components'

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

  render = () => {
    const { title, cooking_time, id } = this.state.category
    const { fetching } = this.props
    return (
      <div id="category-new">
        <div id="category-new-header">
          <h5>Создать категорию</h5>
        </div>
        <div id="category-new-content">
          <input
            onChange={this.handleChange}
            className="categ-input"
            type="text"
            name="title"
            value={title}
            placeholder="Название"
          />
          <div id="category-bottom">
            <input
              onChange={this.handleChange}
              className="categ-input"
              type="text"
              name="cooking_time"
              placeholder="Время приготовления"
              value={cooking_time}
            />
            <SpinButton
              spin={ fetching === types.CATEGORIES_CREATE || fetching === types.CATEGORIES_UPDATE }
              className="btn" onClick={this.handleSubmit}>
              { id ? "Изменить" : "Создать" }
            </SpinButton>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { payload, isEditMode, fetching, errors, category_index } = state.categories
  return {
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
const WrappedComponent = ReduxWrapper(CategoryNew)
export default WrappedComponent
