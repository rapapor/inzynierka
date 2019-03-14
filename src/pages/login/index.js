import React, { Component } from 'react';
import LoginForm from './../../containers/loginForm'
import './style.sass'

class LoginPages extends Component {
  render(){
    return (
      <div className='login-pages'>
        <div className='login-container'>
          <LoginForm setToken={this.props.setToken}/>
        </div>
      </div>
    )
  }
}

export default LoginPages