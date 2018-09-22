import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'

class DishesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dishSelected: 0
    }
  }

  handleClick = id => {
    const { editDish } = this.props
    const selected = id === this.state.dishSlected ? 0 : id
    this.setState(prev => ({
      ...prev,
      dishSlected: selected
    }))
    editDish(selected)
  }

  dishesList = () => {
    const { dishes, destroyDish } = this.props
    return dishes ? dishes.map(dish =>
       <li
         onClick={ () => this.handleClick(dish.id)}
         role="option"
         aria-selected={ dish.id === this.state.dishSlected ? 'true' : 'false' }
         className="dish-item"
         key={dish.id}>
         <img
           height="100"
           width="152"
           src={dish.images ? dish.images.preview : null}
           alt="pic"
         />
         <h2>{dish.title}</h2>
         <p>{dish.description}</p>
         <p>{dish.cost}</p>
         <i onClick={ () => destroyDish(dish.id) } className="material-icons">delete</i>
       </li>
    ) : null
  }

  render = () =>
    <ul className="dishes-list" role="listbox">
      { this.dishesList() }
    </ul>
}

const mapStateToProps = state => {
  const { payload, category_index } = state.categories
  return {
    dishes: payload[category_index] ? payload[category_index].dishes : []
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.dishes
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(DishesList)
export default WrappedComponent
