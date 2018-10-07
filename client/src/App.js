import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TweetForm from './components/TweetForm';
import Nav from './components/Nav';
import Auth from './pages/Auth';
import Assets from './pages/Assets';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Nav} />
        <Route exact path="/" component={Home} />
        <Route exact path="/tweeturl" component={TweetForm} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/assets" component={Assets} />
      </div>
    </Router>
  );
};

export default App;
