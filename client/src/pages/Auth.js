import React, { Component } from 'react';
import authAbi from '../contracts/registrarNoProxy.json';
const web3 = window.web3 && new window.Web3(window.web3.currentProvider);

class Auth extends Component {
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
    // const auth = AuthInstance.getAllAuth.call((err, data) => {
    //   console.log(data);
    // });
    //console.log(Auth);
  };

  render() {
    this.getAuth();
    return <div>{this.state.auth}</div>;
  }
}

export default Auth;
