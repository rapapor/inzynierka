import React from 'react';


import './style.sass'

const cardComponent = ({ children, label, description = "" }) => {
  return (

    <div className=" col-md-12 card-container card-style">
      <div className="section-label">
        <h4 className="card-title">{label}</h4>
        <p className="card-category">{description}</p>
      </div>
      <div className="card-content">{children}</div>
    </div>

  )
}

export default cardComponent