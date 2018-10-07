import React, { Component } from 'react';
import axios from 'axios';

class Assets extends Component {
  state = {
    assets: null
  }

  getAssets = () => {
    this.props.web3.eth.getCode(
      "0x599E30594d75A67c1899E0EAa167072E3f3ec610",
      (err, data) => {
        console.log(data);
      });
  }

  render() {
    this.getAssets();
    return(
      <div>{this.state.assets}</div>
    )
  }
}

export default Assets;
