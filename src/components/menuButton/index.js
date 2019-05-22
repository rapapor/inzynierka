import React from 'react';
import {  NavLink } from "react-router-dom";
import './style.sass'

const MenuButton = ({ label, onClick, icon, active, href, aditionalClassName }) => {
  return (
    <li className={`nav-item ${aditionalClassName}`} >
      <NavLink className={`nav-link`} to={href}>
        <i className="material-icons">{icon}</i>
        <p>{label}</p>
      </NavLink>
    </li>
  )
}

export default MenuButton