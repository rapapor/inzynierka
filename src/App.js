import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"


import LoginPages from './pages/login'
import Dashboard from './pages/dashboard'

import Menu from './containers/menu'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {}
    }
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          {document.location.pathname !== '/' && <Menu />}
          <Route path='/' exact component={LoginPages} />
          <Route path='/start/' component={Dashboard} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
