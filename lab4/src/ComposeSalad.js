import React, { Component } from "react";
import Salad from "./Salad";

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = { foundation: "", protein: "", extra: {}, dressing: "" };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormSelectChange = this.onFormSelectChange.bind(this);
    this.onFormCheckboxChange = this.onFormCheckboxChange.bind(this);
  }

  onFormSelectChange(key, event) {
    event.target.parentElement.classList.add("was-validated");
    this.setState({
      [key]: event.target.value
    });
  }

  onFormCheckboxChange(key, item, event) {
    const obj = { ...this.state[key] };
    obj[item] = event.target.checked;
    this.setState({
      [key]: obj
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    event.target.classList.add("was-validated");

    if (event.target.checkValidity()) {
      const salad = new Salad(
        this.state.foundation,
        this.state.protein,
        Object.keys(this.state.extra).filter(key => this.state.extra[key]),
        this.state.dressing
      );
      this.setState({
        foundation: "",
        protein: "",
        extra: {},
        dressing: ""
      });
      this.props.parentCallback(salad);
      this.props.history.push("/view-salad");
    }
  }

  formSelect(key, isRequired = false) {
    const inventory = this.props.inventory;
    const arr = Object.keys(inventory).filter(name => inventory[name][key]);

    return (
      <div className="form-group">
        <label>{key[0].toUpperCase() + key.slice(1)}</label>
        <select
          id={key}
          required={isRequired}
          onChange={event => this.onFormSelectChange(key, event)}
          className="form-control"
          value={this.state[key]}
        >
          <option defaultValue value="" style={{}}>
            None
          </option>
          {arr.map(name => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <div className="invalid-feedback">required, select one</div>
      </div>
    );
  }

  formCheckbox(key) {
    const inventory = this.props.inventory;
    const arr = Object.keys(inventory).filter(name => inventory[name][key]);

    return (
      <div>
        <label>{key[0].toUpperCase() + key.slice(1) + "s"}</label>
        <div>
          {arr.map(item => (
            <div key={item} className="form-check form-check-inline">
              <input
                className="form-check-input"
                name={item}
                type="checkbox"
                checked={this.state[key][item]}
                onChange={event => this.onFormCheckboxChange(key, item, event)}
              />
              <label className="form-check-label">{item}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onFormSubmit} noValidate>
          {this.formSelect("foundation", true)}
          {this.formSelect("protein")}
          {this.formCheckbox("extra")}
          {this.formSelect("dressing", true)}
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ComposeSalad;
