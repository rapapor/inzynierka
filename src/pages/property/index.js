import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import api from './../../api'
import houseIcon from './../../assets/images/ico-btn/ikony_all-02.png'
import Input from './../../components/input'
import './style.sass'

class Property extends Component {
  constructor(props) {
    super(props)
    this.adresRef = React.createRef();
    this.state = {
      adres: '',
      showModal: false,
      showCloseTag: ''
    }
  }

  componentDidMount(){
    var token = localStorage.getItem('token')
    api.getFlatsList(token).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error)
    })
  }

  handleChange = () => {
    this.setState({ adres: this.adresRef.current.value})
  }

  showModal = () => {
    if (this.state.showModal) {
      this.setState({ showModal: false, showCloseTag: ''})
    } else {
      this.setState({ showModal: true, showCloseTag: 'close-tag'})
    }
    
  }
  render(){
    console.log(this.state.adres)
    if(!localStorage.getItem('token')){
      return (
        <Redirect to="/start/" />
      )
    }
    return (
      <section className="main-property">
        <header></header>
        <main className='main-container-property'>
          { this.state.showModal && <section className='modalForm card-style'>
            <header className='addProperty-header'>
              <img src={houseIcon} alt='house-icon' />
              <h2>Dodaj Nieruchomość</h2>
            </header>
            <main className='row'>
              <div className='col-xl-35'>
                <Input
                  placeholder={'Adres'}
                  onChange={this.handleChange}
                  refs={this.adresRef}
                  value={this.state.adres}
                />
                <Input
                  placeholder={'Cena za m2'}
                  onChange={this.handleChange}
                  refs={this.adresRef}
                  value={this.state.adres}
                />
                <Input
                  placeholder={'Powierzchnia'}
                  onChange={this.handleChange}
                  refs={this.adresRef}
                  value={this.state.adres}
                />
              </div>
              <div className='col-xl-35'>
                <Input
                  placeholder={'Miasto'}
                  onChange={this.handleChange}
                  refs={this.adresRef}
                  value={this.state.adres}
                />
                <Input
                  placeholder={'Status'}
                  onChange={this.handleChange}
                  refs={this.adresRef}
                  value={this.state.adres}
                />
                <Input
                  placeholder={'Typ'}
                  onChange={this.handleChange}
                  refs={this.adresRef}
                  value={this.state.adres}
                />
              </div>
            </main>
            <footer></footer>
          </section>}
          <div className='action-container'>
            <div className='single-action'>
              <div onClick={this.showModal} className={`plus-button ${this.state.showCloseTag}`}></div>
            </div>
          </div>
        </main>
        <footer></footer>
      </section>
    )
  }
}

export default Property