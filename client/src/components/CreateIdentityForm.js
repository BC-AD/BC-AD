import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input } from 'reactstrap';
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
    return (
      <Form className="form-container">
        <Input />
      </Form>
    );
  }
}

export default CreateIdentityForm;
