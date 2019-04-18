import React from 'react';

import './style.sass'

const textarea = ({ rows, cols, disabled, placeholder, onChange, refs, type, value, error = {visibility: false} }) => {
  return (
    <div className={`textarea-container ${value !== '' ? 'filled' : ''}`}>
      <textarea
        rows={rows}
        cols={cols}
        className={`base-text_area`}
        onChange={onChange}
        ref={refs}
      >
      </textarea>
      <label>{placeholder}</label>
      <span className={`error-valid ${error.visibility ? 'show' : ''}`}>{error.description}</span>
    </div>
  )
}

export default textarea