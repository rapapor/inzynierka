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
    const { globalState: { currentPage } } = this.props
    return (
      <section className='menu-container'>
        <div className='logo-container'>
          <a href='/'><img src={logo} alt='logo'/></a>
        </div>
        <MenuButton icon={startIcon} label={'Start'} onClick={() => this.goTo('dashboard')} active={currentPage === 'dashboard' ? true : false}/>
        <MenuButton icon={houseIcon} label={'Twoje nieruchomości'} onClick={() => this.goTo('immovables')} active={currentPage === 'immovables' ? true : false}/>
        <MenuButton icon={ad} label={'Ogłoszenia'} onClick={() => this.goTo('advertisements')} active={currentPage === 'advertisements' ? true : false}/>
        <MenuButton icon={tenant} label={'Najemcy'} onClick={() => this.goTo('tenant')} active={currentPage === 'tenant' ? true : false}/>
        <MenuButton icon={invoice} label={'Faktury'} onClick={() => this.goTo('invoice')} active={currentPage === 'invoice' ? true : false}/>
        <MenuButton icon={check} label={'Rachunki i zuzycia'} onClick={() => this.goTo('checkPages')} active={currentPage === 'checkPages' ? true : false}/>
        <MenuButton icon={options} label={'Ustawienia'} onClick={() => this.goTo('options')} active={currentPage === 'options' ? true : false}/>
      </section>
    )
  }
}

export default Menu