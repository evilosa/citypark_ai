import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import * as actions from '../../actions'

class DishesList extends React.Component {

  dishesList = () => {
    const { dishes, selectedDish, selectDish, dishDialogOpen } = this.props
    return dishes ? dishes.map((dish, index) =>
      <ListItem
        className="list-item"
        onClick={() => selectDish(index)}
        onDoubleClick={() => dishDialogOpen(true, true)}
        selected={index === selectedDish ? true : false}
        key={dish.id}
      >
        {
          dish.images ?
            <img
              height="100"
              width="152"
              src={dish.images.preview}
              alt="pic"
            />
            : null
        }
        <div>
          <h2>{dish.title}</h2>
          <p>{dish.description}</p>
          <p>{dish.cost}</p>
        </div>
      </ListItem>
    ) : null
  }

  render = () =>
    <List className="dishes-list">
      {this.dishesList()}
    </List>
}

const mapStateToProps = state => {
  const { payload, selectedCategory, selectedDish } = state.menu
  return {
    selectedDish,
    dishes: payload[selectedCategory] ? payload[selectedCategory].dishes : []
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions.dishes
}, dispatch)

const ReduxWrapper = connect(mapStateToProps, mapDispatchToProps)
const WrappedComponent = ReduxWrapper(DishesList)
export default WrappedComponent