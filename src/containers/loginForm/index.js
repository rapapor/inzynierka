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
      filledEmail: '',
    }
  }

  handleChange = () => {
    this.setState({ login: this.loginInput.current.value})
    this.setState({ password: this.passInput.current.value})
  }

  confirmLogIn = () => {
    const { login, password } = this.state
    const { setToken } = this.props
    const user = {
      username: login,
      password: password,
    }
    api.login(user).then(res => {
      setToken(res.token)
      window.location.replace('/start/')
    }).catch(error => {
      console.log(error)
    })
  }
  render(){
    if (this.props.token){
      return (
      <Redirect to="/start/" />
    )
  }
    return (
      <div className='login-form'>
        <div className='login-form-input-content'>
          <Input
            placeholder={'Użytkownik'}
            onChange={this.handleChange}
            refs={this.loginInput}
            value={this.state.login}
          />
          <Input
            placeholder={'Hasło'}
            onChange={this.handleChange}
            refs={this.passInput}
            type={'password'}
            value={this.state.password}
          />
        </div>
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