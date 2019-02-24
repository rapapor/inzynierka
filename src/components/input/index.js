import React from 'react';

import './style.sass'

const input = ({ disabled, placeholder, onChange, refs, type }) => {
  return (
    <input
      className={`base-input`}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      ref={refs}
    >
    </input>
  )
}

export default input