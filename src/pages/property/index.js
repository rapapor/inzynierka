import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom"
import api from './../../api'
import plusIcon from './../../assets/images/card-property-items/plusik.png'
import Button from './../../components/button'
import SmallCardProperty from './../../components/smallCardProperty'
import swal from '@sweetalert/with-react'
import MoodButton from './../../components/moodbuttons'

import './style.sass'
 
class Property extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myFlats: [],
      propertyId: false
    }
    this.adresRef = React.createRef();
  }

  componentDidMount(){
   this.loadFlats()
  }

  loadFlats = () => {
    var token = localStorage.getItem('token')
    api.getFlatsList(token).then(res => {
      console.log(res)
      this.setState({myFlats: res})
    }).catch(error => {
      console.log(error)
    })
  }

  deleteProperty = (id) => {
    const token = localStorage.getItem('token')
    api.deleteProperty(id, token).then(res => {
      this.loadFlats()
    })
  }

  generateFlatsCard = (flats) => {
    let statusText = ''
    let status = ''
    switch (flats.propertyStatus) {
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
      id={flats.id}
      onDelete={this.deleteProperty}
      onChangeStatus={this.handleChangeStatus}
      onClickBills={this.addBills}
    />
  }
  addBills = (id) => {
    this.setState({ propertyId: id})
    }


  onPick = (id, val, label) => {
    const token = localStorage.getItem('token')
    api.updateProperty(id, token, val).then(res => {
      if(res){
        swal("Zmieniłeś status tego mieszkania!", `Aktualny status:  ${label}`, "success")
      } else {
        swal(
          <div>
            <h1>Uups przepraszamy, coś poszło nie tak</h1>
            <p>
              Prosimy spróbować ponownie.
            </p>
          </div>
        )
      }
      this.loadFlats()
    }).catch(error => {
      console.log(error)
    })
    
  }

  handleChangeStatus = (id) => {
    swal({
      text: "Zmień status swojej nieruchomości.",
      buttons: {
        cancel: "Anuluj",
      },
      content: (
        <div>
          <MoodButton
            label={'Do wynajęcia'}
            id={id}
            val={'FOR_RENT'}
            onClick={this.onPick}
          />
          <MoodButton
            label={'Wynajęte'}
            id={id}
            val={'RENTED'}
            onClick={this.onPick}
          />
          <MoodButton
            label={'Aktywne'}
            id={id}
            val={'ACTIVE'}
            onClick={this.onPick}
          />
          <MoodButton
            label={'Nieaktywne'}
            id={id}
            val={'INACTIVE'}
            onClick={this.onPick}
          />
        </div>
      )
    })
  }
  

  render(){
    const { myFlats, propertyId } = this.state
    if(!localStorage.getItem('token')){
      return (
        <Redirect to="/login/" />
      )
    } else if ( propertyId ) {
      return (<Redirect to={{pathname:"/add-bills/", state: {id: propertyId}}} />)
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