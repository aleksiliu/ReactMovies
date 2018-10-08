import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

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
    if (this.state.searchTerm.trim() === '') {
      return false;
    }
    this.props.history.push(`/search/${this.state.searchTerm}`);
    this.setState({
      searchTerm: ''
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="searchTerm"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder="Search movie"
        />
      </form>
    );
  }
}

export default withRouter(Form);
