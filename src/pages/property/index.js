import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom"
import api from './../../api'
import plusIcon from './../../assets/images/card-property-items/plusik.png'
import Button from './../../components/button'
import SmallCardProperty from './../../components/smallCardProperty'
import swal from '@sweetalert/with-react'
import MoodButton from './../../components/moodbuttons'
import MainWrapper from './../../components/mainWrapper'
import CardComponent from './../../components/cardComponent'

import './style.sass'
 
class Property extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myFlats: [],
      propertyId: false,
      alertsArr: []
    }
    this.adresRef = React.createRef();
  }

  componentDidMount(){
   this.loadFlats()
  }

  loadFlats = () => {
    var token = localStorage.getItem('token')
    api.getFlatsList(token).then(res => {
      this.setState({
        myFlats: res,
        alertsArr: res.map(
          flat => flat.alerts.map(
            a => { return {...a, flat_id: flat.id, flat_street: flat.street} }
          )
        ).flat()
      })      
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

  deleteAlert = (alertID, propertyID) => {
    swal({
      title: "Usuwasz / rozwiązujesz ten alert",
      text: "Jeżeli usuniesz ten alert tzn że został rozwiązany i już go nie zobaczysz",
      icon: "warning",
      buttons: {
        cancel: "Anuluj",
        accept: {
          text: "Chcę usunąc alert",
          value: "accept"
        },
      },
    }).then((value) => {
      switch (value) {
        case "accept":
        api.resolveAlert(propertyID,alertID).then(res => {
          if (res && res.status === 200) {
            swal({
              title: "Brawo!!",
              text: "Rozwiązałeś kolejny problem",
              icon: "success",
              button: "OK",
            }).then( () => {
              this.loadFlats()
            })
          } else {
            swal({
              title: "Coś poszło nie tak",
              text: "Bardzo przepraszamy niestety nie udało się usunąć alertu, spróbuj ponownie",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then( () => {
              this.loadFlats()
            })
          }
        })
        break;
        default:
        swal("Przed usunięciem alertów upewnij się czy zostały rozwiązane")
      }
    })
    
  }
  
  generateAlert = (alert) => {
    let alertType = 'alert-primary'
    switch (alert.alertType) {
      case "PAYMENT":
        alertType = 'alert-warning'
        break;
      case "DAMAGES":
        alertType = 'alert-danger'
        break;
      case "COMPLAINT":
        alertType = 'alert-dark'
        break;
      case "EQUIPMENT":
        alertType = 'alert-primary'
        break;
      default:
        alertType = 'alert-secondary'
        break;
    }
    if (alert.visible) {
      return  <a class="dropdown-item">
                <div className={"alert alert-with-icon " + alertType} data-notify="container">
                  <i class="material-icons" data-notify="icon">add_alert</i>
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => this.deleteAlert(alert.id, alert.flat_id)}>
                    <i class="material-icons">Usuń</i>
                  </button>
                  <span data-notify="message">W dniu {alert.createdDate} z mieszkania {alert.flat_street}. Przyszło zgłoszenie o trści: {alert.description}</span>
                </div>
              </a>
    } else {
      return false
    }
    
  }

  render(){
    const { myFlats, propertyId, alertsArr } = this.state
    console.log(alertsArr)
    if(!localStorage.getItem('token')){
      return (
        <Redirect to="/login/" />
      )
    } else if ( propertyId ) {
      return (<Redirect to={{pathname:"/add-bills/", state: {id: propertyId}}} />)
    }
    return (
      <MainWrapper>
        <CardComponent label="Nieruchomości" description="lorem ipsum" >
          <div className="row justify-content-end">
            <Link to='/add-property/' className="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">add</i></Link>
          </div>
          <div className="row">
            {myFlats.map(flats => this.generateFlatsCard(flats))}
          </div>
        </CardComponent>
      </MainWrapper>
    )
  }
}

export default Property