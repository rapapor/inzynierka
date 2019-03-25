import React from 'react';
import './style.sass'

const button = ({ label, onClick, type, disabled, customStyle }) => {
  return (
    <button
      className={`btn btn-${type}`}
      onClick={onClick}
      disabled={disabled}
      style={(customStyle)}
    >
      {label}
    </button>
  )
}

export default button