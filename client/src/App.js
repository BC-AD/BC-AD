import React, { Component } from 'react';
import './App.css';
import CreateIdentityForm from './components/CreateIdentityForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CreateIdentityForm />
      </div>
    );
  }
}

export default App;
