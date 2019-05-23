import React from 'react';

import './style.sass'

const input = ({ disabled, placeholder, onChange, refs, type, value, error = {visibility: false} }) => {
  return (
    <div className="col-md-6">
      <div className={`form-group bmd-form-group ${value} ${value !== '' ? 'filled' : ''}`}>
        <label className="bmd-label-floating">{placeholder}</label>
        <input type={type}
          className={'form-control'}
          disabled={disabled}
          onChange={onChange}
          ref={refs}
          value={value}
        />
      </div>
      <span className={`error-valid ${error.visibility ? 'show' : ''}`}>{error.description}</span>
    </div>
  )
}

export default input