import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import api from './../../api'
import './style.sass'

class Dashboard extends Component {

  componentDidMount(){
    const { globalState } = this.props
    console.log(localStorage.getItem('token'))
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
      <section>
        <header></header>
        <main><p>dashboard</p></main>
        <footer></footer>
      </section>
    )
  }
}

export default Dashboard