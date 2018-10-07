import React, { Component } from 'react';
import './App.css';
import CreateIdentityForm from './components/CreateIdentityForm';
import Assets from './pages/Assets';

const web3 = window.web3 && new window.Web3(window.web3.currentProvider);

class App extends Component {
  state = {
    ethAddress: null
  };
  
  _getEthAddress = () => {
    setTimeout(() => {
      const ethAddress = web3 && web3.eth.accounts[0];
      this.setState({
        ethAddress
      });
    }, 2000);
  };

  render() {
    const ethAddress = this.state.ethAddress;
    if (!ethAddress) { this._getEthAddress(); }
    return (
      <div className="App">
        <div className="App-Header">
          <h1 className="title">BC/AD</h1>
          <p className="subtitle">Blockchain Artifact Database</p>
        </div>
        {!web3 && <div>"Web3 was not detected :("</div>}
        {web3 &&
          ethAddress && (
            <div>
              <CreateIdentityForm web3={web3} ethAddress={ethAddress} />
              <Assets web3={web3} />
            </div>
          )}
        {web3 && !ethAddress && <div style={{color:"white"}}>Loading...</div>}
      </div>
    );
  }
}

export default App;
