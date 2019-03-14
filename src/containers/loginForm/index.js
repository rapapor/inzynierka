import React, { Component } from 'react'
import './style.sass'
import api from './../../api'
import { Redirect } from "react-router-dom"

import Input from './../../components/input'
import Button from './../../components/button'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.loginInput = React.createRef();
    this.passInput = React.createRef();
    this.state = {
      login: '',
      password: '',
    }
  }

  handleChange = () => {
    this.setState({ login: this.loginInput.current.value })
    this.setState({ password: this.passInput.current.value })
  }

  confirmLogIn = () => {
    const { login, password } = this.state
    const { setToken } = this.props
    const user = {
      username: login,
      password: password
    }
    api.login(user).then(res => {
      setToken(res.token)
    }).catch(error => {
      console.log(error)
    })
  }
  render(){
    if (this.props.token){
      return (
      <Redirect to="/start/" />
    )
    }else {
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
}

export default LoginForm