import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Form, Input, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

class TweetForm extends Component {
  state = {
    url: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const { url } = this.state;
    const endpoint = 'http://localhost:3001/verifyTweet';

    axios
      .post(endpoint, {
        url
      })
      .then(response => {
        alert(response);
      })
      .catch(error => {
        alert('There was an error verifying the signature');
      });
    this.setState({
      url: ''
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Fragment>
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
        {/* <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody className="text-center font-weight-bold">
            Please sign the message in MetaMask.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal> */}
      </Fragment>
    );
  }
}

export default TweetForm;
