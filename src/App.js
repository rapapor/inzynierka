import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"


import LoginPages from './pages/login'
import Property from './pages/property'
import AddProperty from './pages/addProperty'
import Logout from './pages/logout'
import Tenant from './pages/tenant'
import Invoices from './pages/invoices'
import AddBills from './pages/addBills'
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
    localStorage.setItem('token', actualToken)
  }

  render() {
    if (!localStorage.getItem('token')) {
      return (
        <Router>
          <Switch>
            <Route path="/" render={() => <LoginPages setToken={this.setToken}/>} />
          </Switch>
        </Router>
      )
    }
    return (
      <div className='wrapper'>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/login" render={() => <LoginPages token={this.state.token} setToken={this.setToken}/>} />   
            <Route path="/dashboard/" render={() => <React.Fragment> <Menu /> <Dashboard globalState={this.state}/></React.Fragment>} />       
            <Route path="/estate/" render={() => <React.Fragment> <Menu /> <Property globalState={this.state}/></React.Fragment>} />
            <Route path="/tenant/" render={() => <React.Fragment> <Menu /> <Tenant globalState={this.state}/></React.Fragment>} />
            <Route path="/invoices/" render={() => <React.Fragment> <Menu /> <Invoices globalState={this.state}/></React.Fragment>} />
            <Route path="/add-bills/" component={AddBills} />
            <Route path="/add-property/" render={() => <React.Fragment> <Menu /> <AddProperty globalState={this.state}/></React.Fragment>} />
            <Route path="/logout/" render={() => <React.Fragment> <Menu /> <Logout setToken={this.setToken}/></React.Fragment>} />
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App;

