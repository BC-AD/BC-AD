import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const web3 = window.web3 && new window.Web3(window.web3.currentProvider);
const vsAbi = '../contracts/verifySignature.json';

console.log(web3.eth);

class TweetForm extends Component {
  state = {
    url: '',
    signatureChecked: false,
    isSignatureValid: false,
    vsAddress: '0x6c8c085700b5c170d82911462ba4d9ee6eca0cf0'
  };

  _getContract = (abi, address) => {
    const Contract = web3.eth.contract(abi);
    const ContractInstance = Contract.at(address);
    return ContractInstance;
  };

  _validSignature = (sig, msg, signer) => {
    let r = sig.slice(0, 66);
    let s = '0x' + sig.slice(66, 130);
    let v = '0x' + sig.slice(130, 132);
    //v = web3.toDecimal(v);
    const message = '0x' + web3.sha3(msg);
    const VSInstance = this._getContract(vsAbi, this.state.vsAddress);
    const result = VSInstance.verify.call(message, v, r, s);
    console.log(result);
    return result == signer;
  }

  handleSubmit = e => {
    e.preventDefault();
    const { url } = this.state;
    const endpoint = 'http://localhost:3001/verifyTweet';
    axios.post(endpoint, {url})
      .then(res => {
        const twitterSignature = res.data;
        if (this._validSignature(twitterSignature, this.props.message, this.props.ethAddress)) {
          this.setState({
            signatureChecked: true,
            isSignatureValid: true
          });
        } else {
          this.setState({
            signatureChecked: true,
            isSignatureValid: false
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
    this.setState({url: ''});
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const signatureChecked = this.state.signatureChecked;
    const isSignatureValid = this.state.isSignatureValid;
    return (
      <Fragment>
        {!signatureChecked && !isSignatureValid &&
          <Form className="form-container" onSubmit={this.handleSubmit}>
            <Input
              placeholder="Enter Your Tweet URL"
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleChange}
            />
            <Button
              className="btn-text"
              color="info"
              size="lg"
              outline
              color="info"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Form>
        }
        {signatureChecked && isSignatureValid &&
          <div>Success</div>
        }
      </Fragment>
    );
  }
}

export default TweetForm;
