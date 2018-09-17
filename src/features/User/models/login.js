const user = {
  email: '',
  password: '',
  remember_me: true
}

export const createUser = props => ({
  ...user,
  ...props
})
