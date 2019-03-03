import React, { Component } from 'react';


import LoginPages from './pages/login'

import Menu from './containers/menu'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 'loginPages',
      userInfo: {}
    }
  }

  setPages = (setPages) => {
    this.setState({ currentPage: setPages})
  }

  setUserInfo = (userInfo) => {
    this.setState({ userInfo: userInfo})
  }

  renderPages = () => {
    const { currentPage } = this.state
    switch(currentPage) {
      case 'loginPages':
        return <LoginPages setUserInfo={this.setUserInfo} setPages={this.setPages}/>;
      case 'dashboard':
        return <div>temp dashboard mock</div>// <Dashboard />
      case 'immovables':
        return <div>temp immovables mock</div>// <immovables />
      case 'advertisements':
        return <div>temp advertisements mock</div>// <advertisements />
      case 'tenant':
        return <div>temp tenant mock</div>// <tenant />
      case 'invoice':
        return <div>temp invoice mock</div>// <invoice />
      case 'checkPages':
        return <div>temp checkPages mock</div>// <checkPages />
      case 'options':
        return <div>temp options mock</div>// <options />
      default:
        return <LoginPages />;
    }
  }

  render() {
    const { currentPage } = this.state
    return (
      <React.Fragment>
        {currentPage !== 'loginPages' && <Menu globalState={this.state} setPages={this.setPages} />}
        {this.renderPages()}
      </React.Fragment>
    );
  }
}

export default App;
