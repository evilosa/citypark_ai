export const BLOGS = {
  PATH: '/blogs',
  TITLE: 'Блог шеф-повара'
}
export const BLOGS_NEW = {
  PATH: BLOGS.PATH + '/create',
  TITLE: 'Добавить запись'
}

export const BLOGS_EDIT = { 
  PATH: BLOGS.PATH + '/:id',
  TITLE: 'Редактирование записи'
}