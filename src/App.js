import React, { Component } from 'react';
import logo from './assets/images/logo.jpg'

class App extends Component {

  state = {
    contacts: ''
  };

  componentDidMount() {

    fetch('https://ffr-api.herokuapp.com/auth', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin',
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
  })
}

  render() {
    return (
      <div className="App">
        <img width="1200" alt='' src={logo} />
      </div>
    );
  }
}

export default App;
