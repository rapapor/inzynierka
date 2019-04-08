import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom"
import api from './../../api'
import plusIcon from './../../assets/images/card-property-items/plusik.png'
import Button from './../../components/button'
import SmallCardProperty from './../../components/smallCardProperty'
import './style.sass'

class Property extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myFlats: []
    }
    this.adresRef = React.createRef();
  }

  componentDidMount(){
    var token = localStorage.getItem('token')
    api.getFlatsList(token).then(res => {
      console.log(res)
      this.setState({myFlats: res})
    }).catch(error => {
      console.log(error)
    })
  }

  generateFlatsCard = (flats) => {
    let statusText = ''
    let status = ''
    switch (flats.flatStatus) {
      case "FOR_RENT":
        statusText = 'Do wynajęcia'
        status = 'for-rent'
        break;
      case "RENTED":
        statusText = 'Wynajęte'
        status = 'rented'
        break;
      case "ACTIVE":
        statusText = 'Aktywne'
        status = 'active'
        break;
      case "INACTIVE":
        statusText = 'Nieaktywne'
        status = 'inactive'
        break;
      default:
        statusText = 'Aktywne'
        status = 'active'
        break;
    }
    return <SmallCardProperty
      surface={flats.surface}
      street={flats.street}
      bail={flats.bail}
      img={flats.imagesUrls[0]}
      status={{text: statusText, color: status}}
      key={flats.id}
    />
  }

  render(){
    const { myFlats } = this.state
    if(!localStorage.getItem('token')){
      return (
        <Redirect to="/login/" />
      )
    }
    return (
      <section className="section-property">
        <header className='button-property-container'>
          <Link to='/add-property/'><Button type={'accept'} icon={plusIcon} label={'Dodaj'} /></Link>
        </header>
        <main className='main-container-property'>
          {myFlats.map(flats => this.generateFlatsCard(flats))}
        </main>
        <footer></footer>
      </section>
    )
  }
}

export default Property