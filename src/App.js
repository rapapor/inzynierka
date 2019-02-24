import React, { Component } from 'react';
import logo from './assets/images/logo.jpg'

import LoginPages from './pages/login'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pages: 'loginPages'
    }
  }

  setPages(actualPages) {
    this.setState({ pages: actualPages})
  }

  renderPages = () => {
    const { pages } = this.state
    switch(pages) {
      case 'loginPages':
        return <LoginPages />;
      case 'dashboard':
        return <div>temp dashboard mock</div>// <Dashboard />
      default:
        return <LoginPages />;
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderPages()}
      </React.Fragment>
    );
  }
}

export default App;
