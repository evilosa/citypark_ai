const category = {
  title: '',
  cooking_time: '',
  hidden: false,
}

export const createCategory = props => ({
  ...category,
  ...props
})
