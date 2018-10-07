import React, { Component } from 'react';

class Form extends Component {
  state = {
    searchTerm: ''
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchTerm);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="searchTerm"
          value={this.state.term}
          onChange={this.handleChange}
          placeholder="Search movie"
        />
      </form>
    );
  }
}

export default Form;
