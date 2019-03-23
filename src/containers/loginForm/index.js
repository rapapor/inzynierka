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
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      login: '',
      password: '',
      filledEmail: '',
      error: {
        visibility: false,
        description: ''
      },
    }
  }

  handleChange = () => {
    const { reg } = this.state
    if (reg.test(this.loginInput.current.value)) {
      this.setState({ error: { visibility: false, description: '' } })
    }
    this.setState({ login: this.loginInput.current.value})
    this.setState({ password: this.passInput.current.value})
  }

  showError = (description) => {
    this.setState({ error: { visibility: true, description: description } })
  }

  confirmLogIn = () => {
    const { login, password, reg } = this.state
    const { setToken } = this.props
    
    if (reg.test(login)) {
      let user = {
        username: login,
        password: password,
      }
      api.login(user).then(res => {
        setToken(res.token)
        window.location.replace('/start/')
      }).catch(error => {
        console.log(error)
      })
      this.setState({ error: { visibility: false, description: '' } })
    }
    else {
      this.showError('Zły format email')
    }
    
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
            placeholder={'Email'}
            onChange={this.handleChange}
            refs={this.loginInput}
            value={this.state.login}
            error={this.state.error}
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