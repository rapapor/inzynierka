import React from 'react';

import './style.sass'

const input = ({ disabled, placeholder, onChange, refs, type, value, error = {visibility: false} }) => {
  return (
    <div className={`input-container ${value} ${value !== '' ? 'filled' : ''}`}>
      <input
        className={`base-input`}
        disabled={disabled}
        onChange={onChange}
        type={type}
        ref={refs}
      >
      </input>
      <label>{placeholder}</label>
      <span className={`error-valid ${error.visibility ? 'show' : ''}`}>{error.description}</span>
    </div>
  )
}

export default input