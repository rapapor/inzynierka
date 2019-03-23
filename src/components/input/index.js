import React from 'react';

import './style.sass'

const input = ({ disabled, placeholder, onChange, refs, type, value }) => {
  return (
    <div className={`input-container ${value !=='' ? 'filled' : ''}`}>
      <input
        className={`base-input`}
        disabled={disabled}
        onChange={onChange}
        type={type}
        ref={refs}
      >
      </input>
      <label>{placeholder}</label>
    </div>
  )
}

export default input