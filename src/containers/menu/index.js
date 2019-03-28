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
      <NavLink to='/logout/'><div className='logo-container'><img src={logo} alt='logo'/></div></NavLink>
      <NavLink activeClassName='border-active' to='/start/'><MenuButton icon={startIcon} label={'Start'} /><div className="border-half"></div></NavLink>
      <NavLink activeClassName='border-active' to='/estate/'><MenuButton icon={houseIcon} label={'Twoje nieruchomości'} /><div className="border-half"></div></NavLink>
      <NavLink activeClassName='border-active' to='/classifieds/'><MenuButton icon={ad} label={'Ogłoszenia'} /><div className="border-half"></div></NavLink>
      <NavLink activeClassName='border-active' to='/tenant/'><MenuButton icon={tenant} label={'Najemcy'} /><div className="border-half"></div></NavLink>
      <NavLink activeClassName='border-active' to='/invoices/'><MenuButton icon={invoice} label={'Faktury'} /><div className="border-half"></div></NavLink>
      <NavLink activeClassName='border-active' to='/bills/'><MenuButton icon={check} label={'Rachunki i zuzycia'} /><div className="border-half"></div></NavLink>
      <NavLink activeClassName='border-active' to='/options/'><MenuButton icon={options} label={'Ustawienia'} /><div className="border-half"></div></NavLink>
      <NavLink activeClassName='border-active' to='/logout/'><MenuButton icon={options} label={'Wyloguj'} /><div className="border-half"></div></NavLink>
    </section>
  )
}
export default Menu