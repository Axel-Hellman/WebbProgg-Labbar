import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import inventory from "./inventory.ES6";
import ComposeSalad from "./ComposeSalad";
import ViewSalad from "./ViewSalad";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { salads: [] };

    this.addSalad = this.addSalad.bind(this);
  }

  addSalad(salad) {
    console.log(salad);
    this.setState({ salads: this.state.salads.concat(salad) });
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>My Own Salad Bar</h1>
          <p>Here you can order custom made salads!</p>
        </div>
        <ComposeSalad inventory={inventory} parentCallback={this.addSalad} />
        <br />
        <ViewSalad salads={this.state.salads} />
      </div>
    );
  }
}

export default App;
