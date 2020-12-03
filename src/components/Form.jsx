import React, { Component } from 'react';

class Form extends Component {
  state = {
    name: '',
    image: '',
    calories: 0,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, image, calories } = this.state;

    this.props.pushFood({
      name,
      image,
      calories,
    });

    this.setState({
      name: '',
      image: '',
      calories: 0,
    });
  };

  render() {
    console.log('state', this.state);
    console.log('props', this.props);
    const { image, calories, name } = this.state;
    return (
      //with the ternary on App.js, no need to add the classname
      <form
        onSubmit={this.handleSubmit}
        // className={`${isHidden ? '' : 'is-hidden'}`}
        style={{ marginTop: '4em' }}
      >
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              value={name}
              onChange={this.handleChange}
              name="name"
              type="text"
              placeholder="Food!"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Calories</label>
          <div className="control">
            <input
              className="input"
              value={calories}
              onChange={this.handleChange}
              name="calories"
              type="number"
              placeholder="Number input"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input
              className="input"
              value={image}
              onChange={this.handleChange}
              name="image"
              type="text"
              placeholder="https://www.google.com/url"
            />
          </div>
        </div>

        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
