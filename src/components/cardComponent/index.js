import React from 'react';

import './style.sass'
 
const cardComponent = ({ children, label }) => {
  return (
      <div className="card-container card-style">
        <span className="section-label">{label}</span>
        <div className="card-content">{children}</div>
      </div>
  )
}

export default cardComponent