const { REACT_APP_API_PLACEHOLDER } = process.env
export const CATEGORIES               = REACT_APP_API_PLACEHOLDER + '/categories/'
export const CATEGORIES_CHANGE_ORDER  = CATEGORIES + 'change_order'
export const DISH_CREATE              = CATEGORIES + '{id}/dishes'
export const DISHES                   = REACT_APP_API_PLACEHOLDER + '/dishes/'
