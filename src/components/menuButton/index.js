import React from 'react';
import './style.sass'

const MenuButton = ({ label, onClick, icon, active }) => {
  return (
    <div className={`menu-button ${active === true ? 'active' : ''}`} onClick={onClick}>
      {icon && <img src={icon} alt='btn-icon'/>}
      {label}
    </div>
  )
}

export default MenuButton