import React from 'react';
import { Link } from "react-router-dom"

import './style.sass'

const TopNav = ({alerts, fnc, }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <a className="navbar-brand" href="#pablo">Dashboard<div className="ripple-container"></div></a>
        </div>
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
              <span className="notification">{alerts.length}</span>
              <p className="d-lg-none d-md-block">
                Some Actions
              </p>
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
              {alerts.map(alert => fnc(alert))}
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
              <a className="dropdown-item" href="#">Profile</a>
              <a className="dropdown-item" href="#">Settings</a>
              <div className="dropdown-divider"></div>
              <Link to='/logout/' className="dropdown-item">Log out</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default TopNav