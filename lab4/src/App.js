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
import Loader from "react-loader-spinner";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server_url: "https://wkqy6rpw25.sse.codesandbox.io",
      orders: [],
      inventory: {},
      loading_inventory: true,
      loading_orders: true
    };

    this.addSalad = this.addSalad.bind(this);
  }

  objectFlattner(data) {
    return data.reduce((acc, curr) => {
      return { ...curr, ...acc };
    }, {});
  }

  async fetchByItem(type, item) {
    return fetch(`${this.state.server_url}/${type}/${item}`)
      .then(res => res.json())
      .then(data => ({ [item]: data }));
  }

  async fetchByType(type) {
    return fetch(`${this.state.server_url}/${type}`)
      .then(res => res.json())
      .then(data => Promise.all(data.map(item => this.fetchByItem(type, item))))
      .then(data => this.objectFlattner(data));
  }

  fetchInventory() {
    const types = ["foundations", "proteins", "extras", "dressings"];

    Promise.all(types.map(type => this.fetchByType(type)))
      .then(data => this.objectFlattner(data))
      .then(inventory =>
        this.setState({ inventory, loading_inventory: false })
      );
  }

  /**
   * Not used, modified local server to save orders.
   */
  fetchServerOrders() {
    fetch(`http://localhost:8080/orders`)
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
    this.setState({ loading_orders: false });
  }

  componentDidMount() {
    setTimeout(_ => this.fetchInventory(), 1500);
    setTimeout(_ => this.fetchLocalOrders(), 1000);
    //this.fetchInventory();
    //this.fetchLocalOrders();
  }

  addSalad(salad) {
    const newOrders = this.state.orders.concat(salad);
    this.setState({ orders: newOrders });
    window.localStorage.setItem("orders", JSON.stringify(newOrders));

    fetch(`${this.state.server_url}/orders/`, {
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
              <div>
                <div className="container text-center">
                  <Loader
                    className="my-auto"
                    type="TailSpin"
                    visible={this.state.loading_inventory}
                  />
                </div>
                <ComposeSalad
                  {...props}
                  inventory={this.state.inventory}
                  parentCallback={this.addSalad}
                />
              </div>
            )}
          />
          <Route
            path="/view-salad"
            exact
            render={props => (
              <div>
                <div className="container text-center">
                  <Loader
                    className="my-auto"
                    type="TailSpin"
                    visible={this.state.loading_orders}
                  />
                </div>
                <ViewSalad {...props} orders={this.state.orders} />
              </div>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
