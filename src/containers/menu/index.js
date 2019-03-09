import React from 'react'
import {  NavLink } from "react-router-dom";
import './style.sass'

import startIcon from './../../assets/images/ico-btn/ikony_all-04.png'
import houseIcon from './../../assets/images/ico-btn/ikony_all-02.png'
import ad from './../../assets/images/ico-btn/ikony_all-11.png'
import tenant from './../../assets/images/ico-btn/ikony_all-18.png'
import invoice from './../../assets/images/ico-btn/ikony_all-15.png'
import check from './../../assets/images/ico-btn/ikony_all-13.png'
import options from './../../assets/images/ico-btn/ikony_all-03.png'

import logo from './../../assets/images/logos/logo-01.png'

import MenuButton from './../../components/menuButton'

const Menu = () => {
  return (
    <section className='menu-container'>
      <NavLink to='/'><div className='logo-container'><img src={logo} alt='logo'/></div></NavLink>
      <NavLink activeClassName='border-active' to='/start/'><MenuButton icon={startIcon} label={'Start'} /></NavLink>
      <NavLink activeClassName='border-active' to='/'><MenuButton icon={houseIcon} label={'Twoje nieruchomości'} /></NavLink>
      <NavLink activeClassName='border-active' to='/'><MenuButton icon={ad} label={'Ogłoszenia'} /></NavLink>
      <NavLink activeClassName='border-active' to='/'><MenuButton icon={tenant} label={'Najemcy'} /></NavLink>
      <NavLink activeClassName='border-active' to='/'><MenuButton icon={invoice} label={'Faktury'} /></NavLink>
      <NavLink activeClassName='border-active' to='/'><MenuButton icon={check} label={'Rachunki i zuzycia'} /></NavLink>
      <NavLink activeClassName='border-active' to='/'><MenuButton icon={options} label={'Ustawienia'} /></NavLink>
    </section>
  )
}
export default Menu