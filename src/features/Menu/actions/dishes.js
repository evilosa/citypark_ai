import feedback from 'feedback'
import * as apiConst from '../apiConst'
import * as types from '../actionTypes'

export const createDish = (id, dish) =>
  dish.id ?
    feedback.patch(
      apiConst.DISHES + dish.id,
      types.DISH_UPDATE,
      { dish }
    )
  :
    feedback.post(
      apiConst.DISH_CREATE.replace('{id}', id),
      types.DISHES_CREATE,
      { dish }
    )

export const dishDialogOpen = (open, edit) => ({
  dishDialog: {
    open,
    edit,
    type: types.DISH_DIALOG_OPEN + feedback.statuses.SUCCESS
  }
})

export const destroyDish = id =>
  feedback.destroy(apiConst.DISHES + id, types.DISH_DESTROY)
