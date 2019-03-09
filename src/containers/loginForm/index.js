import React, { Component } from 'react'
import './style.sass'
import api from './../../api'

import Input from './../../components/input'
import Button from './../../components/button'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.loginInput = React.createRef();
    this.passInput = React.createRef();
    this.state = {
      login: '',
      password: ''
    }
  }

  handleChange = () => {
    this.setState({ login: this.loginInput.current.value })
    this.setState({ password: this.passInput.current.value })
  }

  confirmLogIn = () => {
    const { login, password } = this.state
    const user = {
      login: login,
      password: password
    }
    const response = api.login(user)
    if (response.user_type) {
      document.location.pathname = '/start/'
    }

  }
  render(){
    return (
      <div className='login-form'>
      <Input
        placeholder={'Użytkownik'}
        onChange={this.handleChange}
        refs={this.loginInput}
      />
      <Input
        placeholder={'Hasło'}
        onChange={this.handleChange}
        refs={this.passInput}
        type={'password'}
      />
      <Button
        label={'Zaloguj'}
        type={'accept'}
        onClick={this.confirmLogIn}
      />
      </div>
    )
  }
}

export default LoginForm