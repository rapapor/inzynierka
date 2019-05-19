import React from 'react'
import {  NavLink } from "react-router-dom";
import './style.sass'

import houseIcon from './../../assets/images/ico-btn/ikony_all-02.png'
import tenant from './../../assets/images/ico-btn/ikony_all-18.png'
import invoice from './../../assets/images/ico-btn/ikony_all-15.png'

import options from './../../assets/images/ico-btn/ikony_all-03.png'

import logo from './../../assets/images/logos/logo-01.png'

import MenuButton from './../../components/menuButton'

const Menu = () => {
  return (
    <section className='menu-container'>
      <NavLink to='/logout/'><div className='logo-container'><img src={logo} alt='logo'/></div></NavLink>
      <NavLink activeClassName='border-active' to='/estate/'><MenuButton icon={houseIcon} label={'Twoje nieruchomości'} /><div className="border-half"></div></NavLink>
      <NavLink activeClassName='border-active' to='/tenant/'><MenuButton icon={tenant} label={'Najemcy'} /><div className="border-half"></div></NavLink>
      <NavLink activeClassName='border-active' to='/invoices/'><MenuButton icon={invoice} label={'Faktury'} /><div className="border-half"></div></NavLink>
      <NavLink activeClassName='border-active' to='/logout/'><MenuButton icon={options} label={'Wyloguj'} /><div className="border-half"></div></NavLink>
    </section>
  )
}
export default Menu