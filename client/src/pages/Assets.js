import React, { Component } from 'react';
import assetAbi from '../contracts/asset.json';
const web3 = window.web3 && new window.Web3(window.web3.currentProvider);


// auth 0x9020316f378adfD6c0e7D700ca87DFdFa9F5C49b
//
// 0x335b018382cf360246692d03bfd3490bd45ea162


// asset
// 0x440d90178040ec558d27c23237a315c61238e9ed
// 0x1c5D4218053dBC8B6fBc78C39EF25b21EF8Cc0eF

class Assets extends Component {
  state = {
    assetAddress: '0x440d90178040ec558d27c23237a315c61238e9ed',
    assets: null
  };

  _getContract = (abi, address) => {
    const Contract = web3.eth.contract(abi);
    const ContractInstance = Contract.at(address);
    return ContractInstance;
  };

  getAssets = () => {
    const AssetInstance = this._getContract(assetAbi, this.state.assetAddress);
    AssetInstance.getAllAssets.call((err, data) => {
      this.setState({
        assets: data
      });
    });
  };

  render() {
    const assets = this.state.assets;
    if (assets == null) { this.getAssets(); }
    return <div style={{color:"white"}}>{this.state.assets}</div>;
  }
}

export default Assets;
