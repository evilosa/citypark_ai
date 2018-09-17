import React from 'react'
import PropTypes from 'prop-types'

import { createUser } from '../../models'
import { SpinButton } from 'components'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: createUser()
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value
      }
    }))
  }

  handleSubmit = () => {
    const { user } = this.state
    const { signIn } = this.props
    signIn(user)
  }

  render = () =>
    <main className="align">
      <div className="grid">
        <div className="form login">
          <header className="login__header">
            <h3 className="login__title">Login</h3>
          </header>
          <div className="login__body">
            <div className="form__field">
              <input
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form__field">
              <input
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <footer className="login__footer">
            <SpinButton className="form_button" onClick={this.handleSubmit}>Login</SpinButton>
          </footer>
        </div>
      </div>
    </main>
}

LoginForm.propTypes = {
  signIn: PropTypes.func.isRequired
}

export default LoginForm
