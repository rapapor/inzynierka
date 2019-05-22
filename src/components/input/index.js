import React from 'react';

import './style.sass'

const input = ({ disabled, placeholder, onChange, refs, type, value, error = {visibility: false} }) => {
  return (
    <div class="col-md-6">
      <div className={`form-group bmd-form-group ${value} ${value !== '' ? 'filled' : ''}`}>
        <label class="bmd-label-floating">{placeholder}</label>
        <input type="text" 
          className={'form-control'}
          disabled={disabled}
          onChange={onChange}
          type={type}
          ref={refs}
          value={value}
        />
      </div>
      <span className={`error-valid ${error.visibility ? 'show' : ''}`}>{error.description}</span>
    </div>
  )
}

export default input