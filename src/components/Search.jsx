import React, { Component } from 'react';

class Search extends Component {
  state = {
    input: '',
  };
  handleSearch = (event) => {
    const { value } = event.target;
    this.props.searcherFood(value);
    this.setState({
      input: value,
    });
  };

  render() {
    console.log('this.props :>> ', this.props);
    return (
      <div>
        <input
          type="text"
          className="input search-bar"
          onChange={this.handleSearch}
          placeholder="Search"
          value={this.state.input}
        />
      </div>
    );
  }
}

export default Search;
