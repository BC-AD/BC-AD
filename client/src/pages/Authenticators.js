import React, { Component } from 'react';
import authAbi from '../contracts/registrarNoProxy.json';
const web3 = window.web3 && new window.Web3(window.web3.currentProvider);

const users = [
  '0xCd4473A15D8C97eb25abDcEad68950ead14F0068',
  '0x006Daa4467d7A54b9eE769E56A015C0797d9b6fC',
  '0x3886a3a8257D724ad922bc9AD11B6356369B7843',
  '0x84Ee47bBc4168745a0eD45dE92Fe3E5F33205b2B',
  '0x9738411DB62B53d2fF8FB92b1Da4797e2e1ab1A0'
];

class Authenticators extends Component {
  state = {
    authAddress: '0x599e30594d75a67c1899e0eaa167072e3f3ec610',
    auth: null
  };

  _getContract = (abi, address) => {
    const Contract = web3.eth.contract(abi);
    const ContractInstance = Contract.at(address);
    return ContractInstance;
  };

  getAuth = () => {
    const AuthInstance = this._getContract(authAbi, this.state.authAddress);
    console.log(AuthInstance);
    let userData = [];
    for (var addr in users) {
      console.log(AuthInstance.getUserData.getData(addr));
    }
  };

  render() {
    this.getAuth();
    return <div>{this.state.auth}</div>;
  }
}

export default Authenticators;
