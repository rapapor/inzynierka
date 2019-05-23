import React, { Component } from 'react';
import { Link } from "react-router-dom"
import swal from '@sweetalert/with-react'
import {  NavLink } from "react-router-dom";
import api from './../../api'

import './style.sass'
class TopNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertsArr: []
    }

  }

  componentDidMount() {
    this.loadAlert()
  }

  loadAlert = () => {
    var token = localStorage.getItem('token')
    api.getFlatsList(token).then(res => {
      this.setState({
        alertsArr: res.map(
          flat => flat.alerts.map(
            a => {
              if (a.visible) {
                return { ...a, flat_id: flat.id, flat_street: flat.street }
              }
              else {
                return false
              }
            }
          )
        ).flat()
      })
    }).catch(error => {
      console.log(error)
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
        alertType = 'alert-secondary'
        break;
    }
    if (alert.visible) {
      return <div key={alert.id} className="dropdown-item">
        <div className={"alert alert-with-icon " + alertType} data-notify="container">
          <i className="material-icons" data-notify="icon">add_alert</i>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.deleteAlert(alert.id, alert.flat_id)}>
            Usuń
          </button>
          <span data-notify="message">W dniu {alert.createdDate} z mieszkania {alert.flat_street}. Przyszło zgłoszenie o trści: {alert.description}</span>
        </div>
      </div>
    } else {
      return false
    }
  }
  render() {
    const { alertsArr } = this.state
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">notifications</i>
                {alertsArr.length > 0 && <span className="notification">{alertsArr.length}</span>}
                <p className="d-lg-none d-md-block">
                  Some Actions
              </p>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                {alertsArr.map(alert => this.generateAlert(alert))}
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="#pablo" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">person</i>
                <p className="d-lg-none d-md-block">
                  Account
              </p>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                <NavLink to={'/dashboard/'} className="dropdown-item">Profile</NavLink>
                <NavLink className="dropdown-item" to={'/dashboard/'}>Settings</NavLink>
                <div className="dropdown-divider"></div>
                <Link to='/logout/' className="dropdown-item">Log out</Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}


export default TopNav