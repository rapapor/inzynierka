import React from 'react';
import TopNav from './../../components/topNav'

import './style.sass'
 
const mainWrapper = ({ children, background }) => {
  return (
      <div className="main-panel" style={{backgroundColor: background}}>
      tutaj komponent TopNav jeśli nie jest to strona logowania
        {/* <TopNav alerts={alertsArr} fnc={this.generateAlert}/> */}
        <div className="content">
          <div className="container-fluid">
            {children}
          </div>
        </div>
        <footer class="footer">
          <div class="container-fluid">
            <div class="copyright float-right">
              Made with <i class="material-icons">favorite</i> by
              COORENT Inc. © 2019
            </div>
          </div>
        </footer>
      </div>
  )
}

export default mainWrapper