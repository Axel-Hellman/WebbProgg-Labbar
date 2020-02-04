import React, { Component } from "react";

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  formSelect(key) {
    const inventory = this.props.inventory;
    const arr = Object.keys(inventory).filter(name => inventory[name][key]);

    return (
      <div className="form-group">
        <label>{key[0].toUpperCase() + key.slice(1)}</label>
        <select
          id={key}
          onChange={event => this.onFormChange(key, event)}
          className="form-control"
          value={this.state.value}
        >
          <option disabled selected value style={{ display: "none" }}>
            -- select an option --
          </option>
          {arr.map(name => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onFormSubmit}>
          {this.formSelect("foundation")}
          {this.formSelect("protein")}
          {this.formSelect("extra")}
          {this.formSelect("dressing")}
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ComposeSalad;
