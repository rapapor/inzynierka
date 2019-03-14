import React, { Component } from 'react';
import api from './../../api'
import './style.sass'

class Dashboard extends Component {

  componentDidMount(){
    const { globalState } = this.props
    api.getFlatsList(globalState.token).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error)
    })
    
  }
  render(){
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