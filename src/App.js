import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"

import ContentWrapper from './components/contentWrapper'

import LoginPages from './pages/login'
import Property from './pages/property'
import AddProperty from './pages/addProperty'
import Logout from './pages/logout'
import Tenant from './pages/tenant'
import Invoices from './pages/invoices'
import AddBills from './pages/addBills'

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
      <div className='container'>
        <Router>
          <Switch>
            <Route path="/" render={() => <LoginPages setToken={this.setToken}/>} />
          </Switch>
        </Router>
      </div>
      )
    }
    return (
      <div className='container-fluid'>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/login" render={
              () => <LoginPages token={this.state.token} setToken={this.setToken}/>}
            />          
            <Route path="/estate/" render={
              () => <React.Fragment>
                      <Menu />
                      <ContentWrapper>
                        <Property globalState={this.state}/>
                      </ContentWrapper>
                    </React.Fragment>}
            />
            <Route path="/tenant/" render={
              () => <React.Fragment>
                      <Menu />
                      <ContentWrapper>
                        <Tenant globalState={this.state}/>
                      </ContentWrapper>
                    </React.Fragment>}
            />
            <Route path="/invoices/" render={
              () => <React.Fragment>
                      <Menu />
                      <ContentWrapper>
                        <Invoices globalState={this.state}/>
                      </ContentWrapper>
                    </React.Fragment>}
            />
            <Route path="/add-property/" render={
              () => <React.Fragment>
                      <Menu />
                      <ContentWrapper>
                        <AddProperty globalState={this.state}/>
                      </ContentWrapper>
                    </React.Fragment>}
            />
            <Route path="/logout/" render={
              () => <React.Fragment>
                      <Menu />
                      <ContentWrapper>
                        <Logout setToken={this.setToken}/>
                      </ContentWrapper>
                    </React.Fragment>}
            />
            <Route path="/add-bills/" component={AddBills} />
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App;

