import React, { Component, Fragment } from 'react';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import TweetForm from './TweetForm.js';
import { Form, Input, Button, Label, Modal, ModalBody, ModalFooter } from 'reactstrap';
import './CreateIdentityForm.css';

import bloomLogo from '../assets/bloom_logo.png';

class CreateIdentityForm extends Component {
  state = {
    address: this.props.ethAddress,
    message: null,
    name: '',
    signature: null,
    modal: false,
    tweetFormVisible: false
  };

  toggle = this.toggle.bind(this);

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signMessage = e => {
    e.preventDefault();
    const web3 = this.props.web3;
    const message = {
      name: this.state.name,
      eth_address: this.state.address
    };
    this.setState({
      message
    });
    web3.personal.sign(
      web3.fromUtf8(JSON.stringify(message)),
      web3.eth.coinbase,
      (err, signature) => {
        this.setState({ signature });
      }
    );
    this.setState({ name: '' });
    this.toggle();
  };

  navigateToBloom = () => {
    window.location = '/bloom';
  }

  _showTweetForm = () => {
    this.setState({tweetFormVisible: true})
  }

  render() {
    const ethAddress = this.props.ethAddress;
    const tweetFormVisible = this.state.tweetFormVisible;
    const signature = this.state.signature;
    return (
      <div className="container">
        {!tweetFormVisible && (
        (signature === null) ? (
          <Fragment>
            <Form className="form-container" onSubmit={this.signMessage}>
              <Label className="form-label" for="name">First and Last Name</Label>
              <Input
                placeholder="Satoshi Nakamoto"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <Label className="form-label" for="name">Ethereum Address</Label>
              <Input
                placeholder={ethAddress}
                type="text"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
              <Button
                className="btn-text"
                color="info"
                size="lg"
                block
                outline
                color="info"
                onClick={this.signMessage}
              >
                Submit
              </Button>
            </Form>
            <div className="loginButtons" onClick={this.navigateToBloom}>
              <div style={{color: 'white'}}>Register with Bloom</div>
              <img className="bloomLogo" src={bloomLogo} />
            </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalBody className="text-center font-weight-bold">
                Please sign the message in MetaMask.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.toggle}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </Fragment>
        ) : (
          <Fragment>
            <div className="twitter-share">
              <h5>
                Success! Click here to share your signature in a new tweet.
              </h5>
              <TwitterShareButton
                url="http://twitter.com"
                title={this.state.signature}
              >
                {this.state.signature}
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            <Button
              className="btn-text"
              color="info"
              size="lg"
              outline
              color="info"
              onClick={this._showTweetForm}
            >
              I tweeted!
            </Button>
          </Fragment>
        )
      )}
      {tweetFormVisible &&
        <TweetForm
          message={this.state.message}
          ethAddress={this.state.ethAddress}
          signature={this.state.signature}
          />
      }
      </div>
    );
  }
}

export default CreateIdentityForm;
