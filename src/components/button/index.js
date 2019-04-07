import React from 'react';
import './style.sass'

const button = ({ label, onClick, type, disabled, customStyle, icon }) => {
  return (
    <button
      className={`btn btn-${type}`}
      onClick={onClick}
      disabled={disabled}
      style={(customStyle)}
    >
    {icon && <img src={icon} width='20px' height='20px' alt='btn icon'/>}
    {label}
    </button>
  )
}

export default button