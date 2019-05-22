import React from 'react';

import './style.sass'
 
const chartStats = ({ id, type, name, value, description }) => {
  return (
    <div className="col-md-4">
      <div className="card card-chart">
        <div className={`card-header card-header-${type}`}>
          <div className="ct-chart" id={id}></div>
        </div>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-category">{value}</p>
        </div>
        <div className="card-footer">
          <div className="stats">
            <i className="material-icons">access_time</i> {description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default chartStats