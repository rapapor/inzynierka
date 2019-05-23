
import React, { Component } from 'react';
import LoginForm from './../../containers/loginForm'

import logo from './../../assets/images/logos/logo-01.png'
import './style.sass'

class LoginPages extends Component {
  render(){
    return (
      <div className='login-page-container'>
        <div className='login-page-content login-card-style'>
          <div className="login-title">
            <img alt='logo' src={logo} />
          </div>
            <LoginForm token={this.props.token} setToken={this.props.setToken}/>
        </div>
      </div>
    )
  }
}

export default LoginPages