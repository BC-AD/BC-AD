import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const web3 = window.web3 && new window.Web3(window.web3.currentProvider);

console.log(web3.eth);

class TweetForm extends Component {
  state = {
    url: '',
    signatureChecked: false,
    isSignatureValid: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { url } = this.state;
    const endpoint = 'http://localhost:3001/verifyTweet';
    axios.post(endpoint, {url})
      .then(res => {

        const message = res.data;
        web3.eth.accounts.recover(
          message,
          this.props.signature,
          (err, addr) => {
            if (addr == this.props.ethAddress) {
              this.setState({
                signatureChecked: true,
                isSignatureValid: true
              })
            } else {
              this.setState({
                signatureChecked: true,
                isSignatureValid: false
              })
            }
          }
        );

      })
      .catch(err => {
        console.error(err);
      });

    this.setState({url: ''});
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // verifySignature = (signature, address) => {
  //   let r = signature.slice(0, 66);
  //   let s = '0x' + signature.slice(66, 130);
  //   let v = '0x' + signature.slice(130, 132);
  //   v = web3.toDecimal(v);
  //   msg = '0x' + msg
  // }

  render() {
    const signatureChecked = this.state.signatureChecked;
    const isSignatureValid = this.state.isSignatureValid;
    return (
      <Fragment>
        {signatureChecked == false &&
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
