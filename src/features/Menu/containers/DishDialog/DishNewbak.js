import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createDish } from '../../models'
import * as actions from '../../actions'
import * as types from '../../actionTypes'
import { base64Loader } from 'utils'
import { SpinButton, ErrorBox } from 'components'

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

  render = () => {
    const { id, title, cost, weight, can_order, description, imageAttributes } = this.state.dish
    const { fetching } = this.props
    return (
      <div id="new-dish-layout">
        <div id="new-dish-header">
          <h5>Создать блюдо</h5>
        </div>
        <div id="new-dish-content">
          <div id="dish-left">
            <input
              onChange={this.handleChange}
              type="text"
              name="title"
              placeholder="Название"
              required="true"
              value={title}
            />
            <div id="mass-cost">
              <input
                onChange={this.handleChange}
                type="text"
                name="weight"
                placeholder="Масса / Количество"
                value={weight}
              />
              <input
                onChange={this.handleChange}
                type="text"
                name="cost"
                placeholder="Цена"
                value={cost}
              />
            </div>
          </div>
          <textarea
            onChange={this.handleChange}
            type="text"
            name="description"
            id="dish-description"
            placeholder="Описание"
            value={description}
          />
        </div>
        <div id="image-submit"> 
          <input
            onChange={event => this.handleChange({ imageAttributes: event.target })}
            type="file"
            name="image_attributes"
            value={imageAttributes.value}
          />
          <div>
            <input
              onChange={() => this.handleChange({can_order: !can_order})}
              type="checkbox"
              id="can_order_input"
              name="can_order"
              checked={can_order}
            />  
            <label htmlFor="can_order_input">Доступно на вынос</label>
          </div> 
          {
            this.props.category ?
            <SpinButton
              spin={ fetching === types.DISHES_CREATE || fetching === types.DISH_UPDATE }
              className="btn"
              onClick={this.handleSubmit}
            >
              { id ? "Изменить" : "Создать" }
            </SpinButton> : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { payload, selectedCategory, selectedDish, fetching, errors } = state.categories
  return {
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
