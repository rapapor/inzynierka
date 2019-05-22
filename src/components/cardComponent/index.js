import React from 'react';

import './style.sass'
 
const cardComponent = ({ children, label, description }) => {
  return (
        <div className="col-md-12">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 clclassNameass="card-title ">{label}</h4>
              <p className="card-category">{description}</p>
            </div>
            <div className="card-body">
                {children}
            </div>
          </div>
        </div>
  )
}

export default cardComponent