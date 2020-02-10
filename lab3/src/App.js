import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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
    this.setState({ salads: this.state.salads.concat(salad) });
  }

  Home() {
    return <p>Hello World!</p>;
  }

  render() {
    return (
      <Router>
        <div className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <Link className="nav-link" to="compose-salad">
                Komponera din egen sallad
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="view-salad">
                Se alla sallader
              </Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path="/" exact component={this.Home} />
          <Route
            path="/compose-salad"
            exact
            render={props => (
              <ComposeSalad
                {...props}
                inventory={inventory}
                parentCallback={this.addSalad}
              />
            )}
          />
          <Route
            path="/view-salad"
            exact
            render={props => (
              <ViewSalad {...props} salads={this.state.salads} />
            )}
          />
        </Switch>
      </Router>

      /*
      <div>
        <div className="jumbotron text-center">
          <h1>My Own Salad Bar</h1>
          <p>Here you can order custom made salads!</p>
        </div>
        <ComposeSalad inventory={inventory} parentCallback={this.addSalad} />
        <br />
        <ViewSalad salads={this.state.salads} />
      </div>
      */
    );
  }
}

export default App;
