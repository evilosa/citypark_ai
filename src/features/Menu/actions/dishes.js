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

export const editDish = id => ({
  type: types.DISH_EDIT + feedback.statuses.SUCCESS,
  id
})

export const destroyDish = id =>
  feedback.destroy(apiConst.DISHES + id, types.DISH_DESTROY)
