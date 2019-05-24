import React from 'react';
import AlertComponent from './../alertComponent'
const contentWrapper = ({ children }) => {
  return (
    <section className="main-content">
      <AlertComponent />
      <div className="content">
        <div className="Container-fluid">
          {children}
        </div>
      </div>
    </section>
  )
}

export default contentWrapper