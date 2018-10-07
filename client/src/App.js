import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './pages/About';
import Bloom from './pages/Bloom';
import Register from './pages/Register';
import TweetForm from './components/TweetForm';
import Nav from './components/Nav';
import Authenticators from './pages/Authenticators';
import Assets from './pages/Assets';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route exact path="/" component={About} />
        <Route exact path="/bloom" component={Bloom} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/authenticators" component={Authenticators} />
        <Route exact path="/assets" component={Assets} />
      </div>
    </Router>
  );
};

export default App;
