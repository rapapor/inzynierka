import React, { Component } from 'react';
import { Redirect } from "react-router-dom"

class Logout extends Component {
  removeToken = () => {
    this.props.setToken('')
    localStorage.removeItem('token')
  }
  render(){
    if(!localStorage.getItem('token')){
      return (
        <Redirect to="/login/" />
      )
    }
    return (
      <React.Fragment>
        {this.removeToken()}
        <Redirect to="/login/" />
      </React.Fragment>
    )
  }
}

export default Logout