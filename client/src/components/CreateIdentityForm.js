import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'reactstrap';
import './CreateIdentityForm.css';

class CreateIdentityForm extends Component {
  state = {
    address: '',
    name: ''
  };

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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signMessage = e => {
    e.preventDefault();
    console.log('Signed Message');
    const web3 = this.props.web3;
    const certificate = {
      name: e.target.name,
      eth_address: e.target.eth_address
    };
    web3.personal.sign(
      web3.fromUtf8(JSON.stringify(certificate)),
      web3.eth.coinbase,
      console.log
    );
  };

  render() {
    const ethAddress = this.props.ethAddress;
    return (
      <div className="container">
        <Form className="form-container" onSubmit={this.signMessage}>
          <Input placeholder="Enter Your Full Name" />
          <Input placeholder={ethAddress} />
          <Button color="info" onClick={this.signMessage}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateIdentityForm;
