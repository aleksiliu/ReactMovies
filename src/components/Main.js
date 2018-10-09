import React, { Component } from 'react';
import Form from './Form';
import TrendingMovie from './TrendingMovie';
import '../App.css';

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
