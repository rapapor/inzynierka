import React from 'react';
import './style.sass'

const button = ({ label, onClick, type, disabled }) => {
  return (
    <button
      className={`btn btn-${type}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default button