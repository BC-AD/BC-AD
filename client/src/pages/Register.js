import React, { Fragment, Component } from 'react';
import CreateIdentityForm from '../components/CreateIdentityForm';
import {RequestQRCode, RequestData} from '@bloomprotocol/share-kit'

import '../App.css';
import './Register.css';

const web3 = window.web3 && new window.Web3(window.web3.currentProvider);

class Home extends Component {
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
    if (!ethAddress) {
      this._getEthAddress();
    }

    console.log(web3);
    return (
      <Fragment>
        <div className="App-Header">
          <p className="subtitle">Register to be an asset authenticator</p>
        </div>
        {!web3 && <div>"Web3 must be enabled to register."</div>}
        {web3 &&
          ethAddress && (
            <CreateIdentityForm web3={web3} ethAddress={ethAddress} />
          )}
        {web3 &&
          !ethAddress && <div style={{ color: 'white' }}>Loading...</div>}
      </Fragment>
    );
  }
}

export default Home;
