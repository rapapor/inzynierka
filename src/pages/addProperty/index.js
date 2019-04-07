import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import Button from './../../components/button'

import './style.sass'


class AddProperty extends Component {
  constructor(props) {
    super(props)
  }

  onFormSubmit = () => {
    console.log('submitted')
  }

  render(){
    if(!localStorage.getItem('token')){
      return (
        <Redirect to="/login/" />
      )
    }
    return (
      <div className="addProperty-container">
        <form className="addProperty-form" onSubmit={this.onFormSubmit}>
          <div className="base-info-container card-style"></div>
          <div className="additionalInfo-container">
            <div className="localization-container card-style"></div>
            <div className="otherInfo-container card-style"></div>
          </div>
          <div className="confirm-btn-container">
            <Button type="accept" label={'Zapisz'} btnType={'submit'}/>
          </div>
        </form>
      </div>
    )
  }
}

export default AddProperty