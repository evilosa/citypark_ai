const dish = {
  title: '',
  description: '',
  weight: '',
  cost: '',
  can_order: true,
  imageAttributes: {
    value: '',
    files: []
  }
}

export const createDish = props => ({
  ...dish,
  ...props
})
