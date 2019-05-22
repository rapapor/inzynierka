import React from 'react';

import './style.sass'
 
const cardStats = ({ icon, type,  name, value, description }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="card card-stats">
        <div className={`card-header card-header-${type} card-header-icon`}>
          <div className="card-icon">
            <i className="material-icons">{icon}</i>
          </div>
          <p className="card-category">{name}</p>
          <h3 className="card-title">{value}</h3>
        </div>
        <div className="card-footer">
          <div className="stats">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default cardStats