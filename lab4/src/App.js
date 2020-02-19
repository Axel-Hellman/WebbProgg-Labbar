import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import ComposeSalad from "./ComposeSalad";
import ViewSalad from "./ViewSalad";
import Salad from "./Salad";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], inventory: {}, loading: true };

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

  fetchInventory() {
    const types = ["foundations", "proteins", "extras", "dressings"];

    Promise.all(types.map(type => this.fetchByType(type)))
      .then(data => this.objectFlattner(data))
      .then(inventory => this.setState({ inventory, loading: false }));
  }

  fetchServerOrders() {
    fetch("http://localhost:8080/orders")
      .then(res => res.json())
      .then(data => data.map(order => order.order))
      .then(orders => this.setState({ orders }));
  }

  fetchLocalOrders() {
    const orders = JSON.parse(window.localStorage.getItem("orders"));
    if (orders != null) {
      orders.forEach(order => Object.setPrototypeOf(order, Salad));
      this.setState({ orders });
    }
  }

  componentDidMount() {
    this.fetchInventory();
    this.fetchLocalOrders();
  }

  addSalad(salad) {
    const newOrders = this.state.orders.concat(salad);
    this.setState({ orders: newOrders });
    window.localStorage.setItem("orders", JSON.stringify(newOrders));

    fetch("http://localhost:8080/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(salad)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
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
          <Redirect from="/" to="/compose-salad" exact />
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
