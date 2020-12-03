import React, { Component } from 'react';
import foods from './foods.json';
import 'bulma/css/bulma.css';
import './App.css';
import FoodBox from './components/FoodBox';
import Form from './components/Form';
import Search from './components/Search';
import FoodList from './components/FoodList';

class App extends Component {
  state = {
    isHidden: false,
    foods,
    searcher: foods,
    todayFood: [],
  };

  showForm = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  };

  searcherFood = (input) => {
    const searcher = this.state.foods.filter((el) =>
      el.name.toLowerCase().includes(input.toLowerCase())
    );
    this.setState({ searcher });
  };

  pushFood = (food) => {
    const foods = [...this.state.foods];
    foods.unshift(food);

    this.setState({
      foods,
      //you update the state with the new property, because of the search
      searcher: foods,
      isHidden: false,
    });
  };

  countFood = (foodPlus) => {
    let todayFood = [...this.state.todayFood];
    let found = todayFood.find((el) => el.name === foodPlus.name);

    foodPlus.calories *= foodPlus.quantity;

    if (found) {
      found.quantity += foodPlus.quantity;
      found.calories += foodPlus.calories;
    } else {
      todayFood.push(foodPlus);
    }

    this.setState({
      todayFood,
    });
  };

  handleDelete = (foodObj) => {
    const newFoodList = [...this.state.todayFood];

    const filteredFoodList = newFoodList.filter((foodItem) => {
      if (foodItem.name === foodObj.name) {
        return false;
      } else {
        return true;
      }
    });
    const totalCalories = this.state.totalCalories - foodObj.calories;

    this.setState({ todayFood: filteredFoodList, totalCalories: totalCalories });
  };

  render() {
    const totalCalories = this.state.todayFood.reduce(
      (acc, val) => acc + val.calories,
      0
    );
    return (
        <div className="container">
          <h1 className="title">IronNutrition</h1>
          <Search searcherFood={this.searcherFood}></Search>
          <div className="columns">
            {/* Here I changed this.state.foods by the searcher one, to display just what I am searching */}
            <div className="column">
              {this.state.searcher.map((foodBox, i) => {
                return (
                  <FoodBox key={i} food={foodBox} countFood={this.countFood} />
                );
              })}
            </div>

            <div className="column">
              <h2 className="subtitle">Today's foods</h2>
              <ul>
                {this.state.todayFood.map((food, i) => {
                  return (
                    <FoodList
                      key={i}
                      food={food}
                      handleDelete={this.handleDelete}
                    ></FoodList>
                  );
                })}
              </ul>
              <strong>{totalCalories} calories</strong>
              <div style={{ marginTop: '4em' }}>
                <button
                  onClick={this.showForm}
                  className="button is-medium is-fullwidth"
                >
                  {`${
                    this.state.isHidden ? 'Unshow the Form' : 'Show the Form'
                  }`}
                </button>
                {/* with this ternary, no need to pass props */}
                {this.state.isHidden ? <Form pushFood={this.pushFood} /> : null}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
