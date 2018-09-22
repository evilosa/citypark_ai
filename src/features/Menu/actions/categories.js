import feedback from 'feedback'
import * as apiConst from '../apiConst'
import * as types from '../actionTypes'

export const getCategories = () =>
  feedback.get(apiConst.CATEGORIES, types.CATEGORIES_INDEX)

export const createCategory = category => {
  category.id = category.id || ''
  return feedback.actions(
    category.id === '' ? 'POST' : 'PATCH',
    apiConst.CATEGORIES + category.id,
    category.id === '' ? types.CATEGORIES_CREATE : types.CATEGORIES_UPDATE,
    { category }
  )
}

export const getCategory = id =>
  feedback.get(apiConst.CATEGORIES + id, types.CATEGORIES_SHOW)

export const moveCategory = value => ({
  type: types.CATEGORY_MOVE + feedback.statuses.SUCCESS,
  value
})

export const changeOrder = newOrder =>
  feedback.patch(apiConst.CATEGORIES_CHANGE_ORDER,
    types.CATEGORIES_CHANGE_ORDER,
    { category: { new_order: newOrder } }
  )

export const selectCategory = id => ({
  id,
  type: types.CATEGORY_SELECT + feedback.statuses.SUCCESS
})

export const deleteCategory = id =>
  feedback.destroy(apiConst.CATEGORIES + id, types.CATEGORY_DESTROY)

export const categoryDialogOpen = (open, edit) => ({
  categoryDialog: { open, edit },
  type: types.CATEGORY_DIALOG_OPEN + feedback.statuses.SUCCESS
})