import React from 'react';
import './style.sass'

const button = ({ label, onClick, type, disabled, customStyle, icon, btnType }) => {
  return (
    <button
      className={`btn btn-${type}`}
      onClick={onClick}
      disabled={disabled}
      style={(customStyle)}
      type={btnType}
    >
    {icon && <img src={icon} width='20px' height='20px' alt='btn icon'/>}
    {label}
    </button>
  )
}

export default button