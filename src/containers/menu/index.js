import React, { Component } from 'react'
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
class Menu extends Component {
  constructor(props) {
    super(props)
    
  }

  goTo = (direction) => {
    const { setPages } = this.props
    setPages(direction)
  }

  
  render(){
    return (
      <section className='menu-container'>
        <div className='logo-container'>
          <img src={logo} />
        </div>
        <MenuButton icon={startIcon} label={'Start'} onClick={() => this.goTo('loginPages')} />
        <MenuButton icon={houseIcon} label={'Twoje nieruchomości'} onClick={() => this.goTo('loginPages')} />
        <MenuButton icon={ad} label={'Ogłoszenia'} onClick={() => this.goTo('loginPages')} />
        <MenuButton icon={tenant} label={'Najemcy'} onClick={() => this.goTo('loginPages')} />
        <MenuButton icon={invoice} label={'Faktury'} onClick={() => this.goTo('loginPages')} />
        <MenuButton icon={check} label={'Rachunki i zuzycia'} onClick={() => this.goTo('loginPages')} />
        <MenuButton icon={options} label={'Ustawienia'} onClick={() => this.goTo('loginPages')} />
      </section>
    )
  }
}

export default Menu