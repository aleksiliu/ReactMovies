import React, { Component } from 'react';
import Form from './components/Form';
import TrendingMovie from './components/TrendingMovie';
import './App.css';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Form />
        <TrendingMovie />
      </div>
    );
  }
}

export default App;
