import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"


import LoginPages from './pages/login'
import Dashboard from './pages/dashboard'

import Menu from './containers/menu'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      userInfo: {},
    }
  }

  setToken = (actualToken) => {
    this.setState({ token: actualToken})
  }

  render() {
    const { token } = this.state
    if (!token) {
      return (
      <Router>
        <Switch>
          <Route path="/" render={() => <LoginPages setToken={this.setToken}/>} />
        </Switch>
      </Router>
      )
    }
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login" render={() => <LoginPages setToken={this.setToken}/>} />
          <Route path="/start/" render={() => <React.Fragment> <Menu /> <Dashboard globalState={this.state}/></React.Fragment>} />
          <Route path="/estate/" render={() => <React.Fragment> <Menu /> <Dashboard globalState={this.state}/></React.Fragment>} />
          <Route path="/classifieds/" render={() => <React.Fragment> <Menu /> <Dashboard globalState={this.state}/></React.Fragment>} />
          <Route path="/tenant/" render={() => <React.Fragment> <Menu /> <Dashboard globalState={this.state}/></React.Fragment>} />
          <Route path="/invoices/" render={() => <React.Fragment> <Menu /> <Dashboard globalState={this.state}/></React.Fragment>} />
          <Route path="/bills/" render={() => <React.Fragment> <Menu /> <Dashboard globalState={this.state}/></React.Fragment>} />
          <Route path="/options/" render={() => <React.Fragment> <Menu /> <Dashboard globalState={this.state}/></React.Fragment>} />
        </Switch>
      </Router>
    )
  }
}
export default App;

