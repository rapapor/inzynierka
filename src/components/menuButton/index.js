import React from 'react';
import './style.sass'

const MenuButton = ({ label, onClick, icon, active }) => {
  return (
    <div className='menu-button'>
      {icon && <img src={icon} alt='btn-icon'/>}
      <span className="menu-label">{label}</span>
    </div>
  )
}

export default MenuButton