import feedback from 'feedback'
import * as apiConst from '../apiConst'
import * as types from '../actionTypes'

export const createDish = (id, dish) => {
  const _id = dish.id
  delete dish.id
  delete dish.y_index
  delete dish.images
  return _id ?
    feedback.patch(
      apiConst.DISHES + _id,
      types.DISH_UPDATE,
      { dish }
    )
    :
    feedback.post(
      apiConst.DISH_CREATE.replace('{id}', id),
      types.DISHES_CREATE,
      { dish }
    )
}

export const selectDish = index => ({
  index,
  type: types.DISH_SELECT + feedback.statuses.SUCCESS
})

export const dishDialogOpen = (open, edit) => ({
  dishDialog: { open, edit },
  type: types.DISH_DIALOG_OPEN + feedback.statuses.SUCCESS
})

export const moveDish = value => ({
  type: types.DISH_MOVE + feedback.statuses.SUCCESS,
  value
})

export const changeOrder = newOrder =>
  feedback.patch(apiConst.DISHES_CHANGE_ORDER,
    types.DISHES_CHANGE_ORDER,
    { dish: { new_order: newOrder } }
  )

export const deleteDish = id =>
  feedback.destroy(apiConst.DISHES + id, types.DISH_DESTROY)
