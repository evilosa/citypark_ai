import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'

const CategoryManager = ({ category, categories, moveCategory, changeOrder, editCategory, deleteCategory }) => {

  const handleApply = () =>
    changeOrder(categories.map(category => ({
      id: category.id,
      y_index: category.y_index
    })))

  return (
    <div id="categories-manager">
      <div>
        <i className="material-icons" onClick={ () => moveCategory(-1) }>keyboard_arrow_up</i>
        <i className="material-icons" onClick={ () => moveCategory(1) }>keyboard_arrow_down</i>
        <i className="material-icons" onClick={ handleApply }>done</i>
      </div>
      <div>
        <i className="material-icons" onClick={ editCategory }>edit</i>
        <i className="material-icons" onClick={ () => category && deleteCategory(category.id) }>delete</i>
      </div>
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
const WrappedComponent = ReduxWrapper(CategoryManager)
export default WrappedComponent
