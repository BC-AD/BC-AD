import React, { Component, Fragment } from 'react';
import { TwitterShareButton, TwitterIcon } from 'react-share';

import { Form, Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import './CreateIdentityForm.css';

class CreateIdentityForm extends Component {
  state = {
    address: this.props.ethAddress,
    name: '',
    signature: null,
    modal: false
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
    const certificate = {
      name: this.state.name,
      eth_address: this.state.address
    };
    web3.personal.sign(
      web3.fromUtf8(JSON.stringify(certificate)),
      web3.eth.coinbase,
      (err, signature) => {
        this.setState({ signature }, () => {
          console.log('state', this.state.signature);
        });
      }
    );
    this.setState({ name: '' });
    this.toggle();
  };

  render() {
    const ethAddress = this.props.ethAddress;
    return (
      <div className="container">
        {this.state.signature === null ? (
          <Fragment>
            <Form className="form-container" onSubmit={this.signMessage}>
              <Input
                placeholder="Enter Your Full Name"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
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
              href="/tweeturl"
            >
              I Tweeted
            </Button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default CreateIdentityForm;
