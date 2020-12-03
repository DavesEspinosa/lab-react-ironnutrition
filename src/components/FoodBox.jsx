import React, { Component } from 'react';

class FoodBox extends Component {
  state = {
    quantity: 1,
  };
  handleQuantity = (event) => {
    const { value } = event.target;

    this.setState({
      quantity: Number(value),
    });
  };
  render() {
    const { food } = this.props;
    return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={food.image} alt="" />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{food.name}</strong> <br />
                <small>{food.calories}</small>
              </p>
            </div>
          </div>
          <div className="media-right">
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  onChange={this.handleQuantity}
                  value={this.state.quantity}
                  type="number"
                />
              </div>
              <div className="control">
                <button
                  onClick={() =>
                    this.props.countFood({
                      ...this.props.food,
                      quantity: this.state.quantity,
                    })
                  }
                  className="button is-info"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default FoodBox;
