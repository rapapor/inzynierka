import React, { Component } from 'react';
import LoginForm from './../../containers/loginForm'
import MainWrapper from './../../components/mainWrapper'

import logo from './../../assets/images/logos/logo-01.png'
import './style.sass'

class LoginPages extends Component {
  render(){
    return (
      <div className='container'>
        <MainWrapper background="#fff">
          <div className="login-title">
            <img className="img-fluid" alt='logo' src={logo} />
          </div>
          <LoginForm token={this.props.token} setToken={this.props.setToken}/>
        </MainWrapper>
      </div>
    )
  }
}

export default LoginPages