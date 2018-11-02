const dish = {
  title: '',
  description: '',
  weight: '',
  cost: '',
  can_order: true,
  code: '',
  hidden: false,
  imageAttributes: {
    value: '',
    files: []
  }
}

export const createDish = props => ({
  ...dish,
  ...props
})
