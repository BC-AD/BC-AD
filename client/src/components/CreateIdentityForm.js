import React, { Component } from 'react';
import axios from 'axios';
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

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { address } = this.state;
  //   const endpoint = 'some endpoint'; // TODO: create server side endpoint

  //   axios
  //     .post(endpoint, {
  //       address: address
  //     })
  //     .then(response => {
  //       alert(response);
  //     })
  //     .catch(error => {
  //       alert('There was an error verifying your identity');
  //     });
  //   this.setState({
  //     address: ''
  //   });
  // };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signMessage = e => {
    console.log(this.state.address);
    e.preventDefault();
    console.log('Signed Message');
    const web3 = this.props.web3;
    const certificate = {
      name: this.state.name,
      eth_address: this.state.address
    };
    web3.personal
      .sign(
        web3.fromUtf8(JSON.stringify(certificate)),
        web3.eth.coinbase,
        console.log
        // null,
        // console.log
        // res => {
        //   this.setState({ signature: res });
        //   console.log(this.state.signature);
        // }
      )
      .then(res => {
        this.setState({ signature: res });
        console.log(this.state.signature);
      });
    this.setState({ name: '' });
    this.toggle();
  };

  render() {
    const ethAddress = this.props.ethAddress;
    return (
      <div className="container">
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
      </div>
    );
  }
}

export default CreateIdentityForm;
