import React from 'react'
import './style.sass'
import logo from './../../assets/images/logos/logo-01.png'

import MenuButton from './../../components/menuButton'

const Menu = () => {
  return (
    <div className='sidebar' data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
      <div className="logo">
        <a href="" className="simple-text logo-normal">
          <img src={logo} alt='logo' className="img-fluid" style={{width:'70%'}}/>
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {/* ikony dostepne na https://materializecss.com/icons.html */}
          <MenuButton href={'/dashboard/'} label={'Dashboard'} icon={'dashboard'}/>
          <MenuButton href={'/estate/'} label={'Twoje nieruchomości'} icon={'home'}/>
          <MenuButton href={'/tenant/'} label={'Najemcy'} icon={'people_outline'}/>
          <MenuButton href={'/invoices/'} label={'Faktury'} icon={'content_paste'}/>
          <MenuButton href={'/logout/'} label={'Wyloguj'} icon={'remove_circle_outline'}/>
          <MenuButton href={'/dashboard/'} label={'Pobierz aplikację'} icon={'phone_android'} aditionalClassName={'active-pro'}/>
        </ul>
      </div>
    </div>
  )
}
export default Menu