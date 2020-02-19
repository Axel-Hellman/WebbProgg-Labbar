import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import ComposeSalad from "./ComposeSalad";
import ViewSalad from "./ViewSalad";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], inventory: {} };

    this.addSalad = this.addSalad.bind(this);
  }

  objectFlattner(data) {
    return data.reduce((acc, curr) => {
      return { ...curr, ...acc };
    }, {});
  }

  async fetchByItem(type, item) {
    return fetch(`http://localhost:8080/${type}/${item}`)
      .then(res => res.json())
      .then(data => ({ [item]: data }));
  }

  async fetchByType(type) {
    return fetch(`http://localhost:8080/${type}`)
      .then(res => res.json())
      .then(data => Promise.all(data.map(item => this.fetchByItem(type, item))))
      .then(data => this.objectFlattner(data));
  }

  componentDidMount() {
    const types = ["foundations", "proteins", "extras", "dressings"];

    Promise.all(types.map(type => this.fetchByType(type)))
      .then(data => this.objectFlattner(data))
      .then(data => this.setState({ inventory: data }));
  }

  addSalad(salad) {
    this.setState({ orders: this.state.orders.concat(salad) });
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
                inventory={this.state.inventory}
                parentCallback={this.addSalad}
              />
            )}
          />
          <Route
            path="/view-salad"
            exact
            render={props => (
              <ViewSalad {...props} orders={this.state.orders} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
