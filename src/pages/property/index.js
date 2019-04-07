import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import api from './../../api'
import plusIcon from './../../assets/images/card-property-items/plusik.png'
import Button from './../../components/button'
import SmallCardProperty from './../../components/smallCardProperty'
import './style.sass'

class Property extends Component {
  constructor(props) {
    super(props)
    this.adresRef = React.createRef();
  }

  componentDidMount(){
    var token = localStorage.getItem('token')
    api.getFlatsList(token).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error)
    })
  }

  render(){
    if(!localStorage.getItem('token')){
      return (
        <Redirect to="/start/" />
      )
    }
    return (
      <section className="section-property">
        <header className='button-property-container'>
          <Button type={'accept'} icon={plusIcon} label={'Dodaj'} customStyle={{padding: 0}}/>
        </header>
        <main className='main-container-property'>
          <SmallCardProperty />
          <SmallCardProperty />
          <SmallCardProperty />
          <SmallCardProperty />
          <SmallCardProperty />
          <SmallCardProperty />
        </main>
        <footer></footer>
      </section>
    )
  }
}

export default Property