const category = {
  title: '',
  cooking_time: ''
}

export const createCategory = props => ({
  ...category,
  ...props
})
