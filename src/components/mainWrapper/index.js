import React from 'react';
import TopNav from './../../components/topNav'

import './style.sass'

const mainWrapper = ({children, background}) =>
  <div className="main-panel" style={{backgroundColor: background}}>
    <TopNav/>
    <div className="content">
      <div className="container-fluid">
        {children}
      </div>
    </div>
    <footer className="footer">
      <div className="container-fluid">
        <div className="copyright float-right">
          Made with <i className="material-icons">favorite</i> by
          COORENT Inc. © 2019
        </div>
      </div>
    </footer>
  </div>

export default mainWrapper