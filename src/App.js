import React, { Component } from 'react';
import Form from './components/Form';
import TrendingMovie from './components/TrendingMovie';
import './App.css';
import axios from 'axios';

class App extends Component {
  onSubmit = term => {
    this.props.history.push(`/search/${term}`);
  };

  render() {
    return (
      <div className="wrapper">
        <Form onSubmit={this.onSubmit} />
        <TrendingMovie />
      </div>
    );
  }
}

export default App;
