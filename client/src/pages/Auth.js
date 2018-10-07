import React, { Component } from 'react';
import authAbi from '../contracts/registrarNoProxy.json';
const web3 = window.web3 && new window.Web3(window.web3.currentProvider);

class Auth extends Component {
  state = {
    authAddress: '0x335b018382cf360246692d03bfd3490bd45ea162',
    auth: null
  };

  _getContract = (abi, address) => {
    const Contract = web3.eth.contract(abi);
    const ContractInstance = Contract.at(address);
    console.log('CONTRACT', ContractInstance);
    return ContractInstance;
  };

  getAuth = () => {
    const AuthInstance = this._getContract(authAbi, this.state.authAddress);
    console.log(AuthInstance);
    // const auth = AuthInstance.allIDs.call((err, data) => {
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
