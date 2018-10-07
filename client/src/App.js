import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TweetForm from './components/TweetForm';

// TODO: poll for the web3 address and then timeout

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/tweeturl" component={TweetForm} />
      </div>
    </Router>
  );
};

export default App;
