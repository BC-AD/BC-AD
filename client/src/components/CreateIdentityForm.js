import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'reactstrap';
import './CreateIdentityForm.css';

class CreateIdentityForm extends Component {
  state = {
    address: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const { address } = this.state;
    const endpoint = 'some endpoint'; // TODO: create server side endpoint

    axios
      .post(endpoint, {
        address: address
      })
      .then(response => {
        alert(response);
      })
      .catch(error => {
        alert('There was an error verifying your identity');
      });
    this.setState({
      address: ''
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const ethAddress = this.props.ethAddress;
    return (
      <div className="container">
        <Form className="form-container" onSubmit={this.handleSubmit}>
          <Input placeholder={ethAddress} />
          <Button color="info" onSubmit={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateIdentityForm;
