import React, { Component } from 'react';
import axios from 'axios';

import assetAbi from '../contracts/asset.json';

class Assets extends Component {
  state = {
    assetAddress: "0x440d90178040ec558d27c23237a315c61238e9ed",
    assets: null
  }

  _getContract = (abi, address) => {
    const Contract = this.props.web3.eth.contract(abi);
    const ContractInstance = Contract.at(address);
    return ContractInstance;
  }

  getAssets = () => {
    const AssetInstance = this._getContract(assetAbi, this.state.assetAddress);
    console.log(AssetInstance);
    const assets = AssetInstance.getAllAssets.call((err, data) => {
      console.log(data);
    });
    //console.log(assets);
  }

  render() {
    this.getAssets();
    return(
      <div>{this.state.assets}</div>
    )
  }
}

export default Assets;
