import React from 'react';
import './style.sass'

const button = ({ label, onClick, type, disabled, customStyle, icon, btnType }) => {
  return (
    <button
      className={`btn btn-${type} pull-right`}
      onClick={onClick}
      disabled={disabled}
      style={(customStyle)}
      type={btnType}
    >
      {label}
      {icon && <img src={icon} width='20px' height='20px' alt='btn icon'/>}
    </button>
  )
}

export default button