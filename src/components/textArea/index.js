import React from 'react';

import './style.sass'

const textarea = ({ rows, cols, disabled, placeholder, onChange, refs, type, value, error = {visibility: false} }) => {
  return (
    <div className="col-md-6">
      <div className={`form-group bmd-form-group ${value} ${value !== '' ? 'filled' : ''}`}>
        <label className="bmd-label-floating">{placeholder}</label>
        <textarea
          rows={rows}
          cols={cols}
          className={`form-control`}
          onChange={onChange}
          ref={refs}
        />
      </div>
      <span className={`error-valid ${error.visibility ? 'show' : ''}`}>{error.description}</span>
    </div>
  )
}

export default textarea