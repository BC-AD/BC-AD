import React, { Component } from 'react';
import assetAbi from '../contracts/asset.json';
import './Assets.css';
const web3 = window.web3 && new window.Web3(window.web3.currentProvider);

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
      let temp = [];
      const result = data.map(d => {
        let uid = data.indexOf(d);
        AssetInstance.getVerifiersForAsset.call(uid, (err, data) => {
          console.log(data);
        });
        return <div key={d}>{d}</div>;
      });
      this.setState({ assets: result });
    });
  };

  render() {
    const assets = this.state.assets;
    if (assets == null) {
      this.getAssets();
    }
    return (
      <div className="asset-container">
        <h2 className="asset-title">Assets</h2>
        <div className="assets">{assets}</div>
      </div>
    );
  }
}

export default Assets;
