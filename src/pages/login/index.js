import React, { Component } from 'react';
import LoginForm from './../../containers/loginForm'
import './style.sass'

class LoginPages extends Component {
  render(){
    return (
      <div className='login-pages'>
        <div className='login-container'>
          <LoginForm setUserInfo={this.props.setUserInfo} setPages={this.props.setPages} />
        </div>
      </div>
    )
  }
}

export default LoginPages