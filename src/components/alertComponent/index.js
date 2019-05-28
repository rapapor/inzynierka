import React, { Component } from 'react';
import swal from '@sweetalert/with-react'
import bell from './../../assets/images/bell.png'
import api from './../../api'

import './style.sass'
class alertComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertsArr: [],
      showAlert: false,
    }

  }

  componentDidMount() {
    this.loadAlert()
  }

  loadAlert = () => {
    var token = localStorage.getItem('token')
    let myAlerts = []
    api.getFlatsList(token).then(res => {
      res.map(flat => flat.alerts.map(
        a => {
          
            if (a.visible) {
              return  myAlerts.push({ ...a, flat_id: flat.id, flat_street: flat.street })
            } else {
              return false
            }
        }
      ))
      this.setState({alertsArr: myAlerts})
    }).catch(error => {
      console.log(error)
    })
  }

  deleteAlert = (alertID, propertyID) => {
    swal({
      title: "Usuwasz / rozwiązujesz ten alert",
      text: "Po usunięciu alertu nie będzie on już dla Ciebie widoczny",
      icon: "warning",
      buttons: {
        cancel: "Anuluj",
        accept: {
          text: "Chcę usunąć alert",
          value: "accept"
        },
      },
    }).then((value) => {
      switch (value) {
        case "accept":
          api.resolveAlert(propertyID, alertID).then(res => {
            if (res && res.status === 200) {
              swal({
                title: "Brawo!!",
                text: "Rozwiązałeś kolejny problem",
                icon: "success",
                button: "OK",
              }).then(() => {
                this.loadAlert()
              })
            } else {
              swal({
                title: "Coś poszło nie tak",
                text: "Bardzo przepraszamy niestety nie udało się usunąć alertu, spróbuj ponownie",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then(() => {
                this.loadAlert()
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
        alertType = 'alert-primary'
        break;
    }
    if (alert.visible) {
      return <div key={alert.id} className={`alert ${alertType}`} role="alert">
                <i className="far fa-bell ico"></i>
                <p className="alert-desc"> W dniu {alert.createdDate} z mieszkania {alert.flat_street}. Przyszło zgłoszenie o trści: {alert.description}</p>
                <span className="resolve-alert" onClick={() => this.deleteAlert(alert.id, alert.flat_id)}>Usuń</span>
            </div>
    } else {
      return false
    }

    
    
  }

  showAlert = () => {
    const { showAlert } = this.state
    this.setState({ showAlert: showAlert ? false : true })
    
  }
  render() {
    const { alertsArr, showAlert } = this.state
    return (
      <div className="alert-container">
        <p>
          <span className="alertToogle" onClick={this.showAlert}>
            <img alt="bell-alert" className="alert-bell-img" src={bell}/>
            <span className="counter-alert">{alertsArr.length}</span>
          </span>
        </p>
        { showAlert && <div className="alert-content">
        {alertsArr.map(alert => this.generateAlert(alert))}
        </div>}
      </div>
      
    )
  }
}


export default alertComponent