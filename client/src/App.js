import React, { Component } from 'react';
import './App.css';
import CreateIdentityForm from './components/CreateIdentityForm';

const web3 = new window.Web3(window.web3.currentProvider);

// TODO: poll for the web3 address and then timeout

class App extends Component {
  state = {
    ethAddress: web3.eth.accounts[0]
  }

  render() {
    const ethAddress = this.state.ethAddress;
    return (
      <div className="App">
        {!web3 && <div>"Web3 was not detected :("</div>}
        {web3 && ethAddress &&
          <CreateIdentityForm ethAddress={ethAddress} />
        }
        {web3 && !ethAddress &&
          <div>Loading...</div>
        }
      </div>
    );
  }
}

export default App;
