import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'

class CategoriesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categorySlected: 0
    }
  }

  categoriesList = () => {
    const { categories } = this.props
    return categories ? categories.map(category =>
      <li
        role="option"
        aria-selected={ category.id === this.state.categorySlected ? 'true' : 'false' }
        onClick={this.handleSelect}
        key={category.id}
        value={category.id}
      >
        {category.title}
      </li>
    ) : null
  }

  handleSelect = event => {
    const id = event.target.value
    const { getCategory, fetching, categories, selectCategory } = this.props
    this.setState({
      categorySlected: id
    })
    categories.find(categ => categ.id === id).dishes ? selectCategory(id) : !fetching && getCategory(id)
  }

  componentDidMount = () => {
    const { fetching, categories, getCategories } = this.props
    !fetching && !categories.length && getCategories()
  }

  render = () => {
    return (
      <ul id="ss_elem_list"
        role="listbox"
        aria-labelledby="ss_elem">
        { this.categoriesList() }
      </ul>
    )
  }

}

const mapStateToProps = state => {
  const { payload, fetching } = state.categories
  return {
    categories: payload,
    fetching,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.categories
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(CategoriesList)
export default WrappedComponent
