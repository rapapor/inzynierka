import React from 'react';
import './style.sass'

const MenuButton = ({ label, onClick, icon }) => {
  return (
    <div className='menu-button' onClick={onClick}>
      {icon && <img src={icon} alt='btn-icon'/>}
      {label}
    </div>
  )
}

export default MenuButton