import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"


import LoginPages from './pages/login'
import Dashboard from './pages/dashboard'

import Menu from './containers/menu'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/(login)" component={LoginContainer}/>
          <Route component={DefaultContainer}/>
        </Switch>
      </Router>
    )
  }
}

export default App;

const LoginContainer = () => (
  <div className="container">
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={LoginPages} />
  </div>
)

const DefaultContainer = () => (
  <div>
  <div className="container">
    <Menu />
    <Route path="/start/" component={Dashboard} />
  </div>
  </div>
)