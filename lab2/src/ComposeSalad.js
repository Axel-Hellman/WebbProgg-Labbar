import React, { Component } from "react";

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log(event);
  }

  render() {
    const inventory = this.props.inventory;
    let foundations = Object.keys(inventory).filter(
      name => inventory[name].foundation
    );
    let proteins = Object.keys(inventory).filter(
      name => inventory[name].protein
    );
    let extras = Object.keys(inventory).filter(name => inventory[name].extra);
    let dressings = Object.keys(inventory).filter(
      name => inventory[name].dressing
    );

    return (
      <div className="container">
        <ul>
          {foundations.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <form onSubmit={this.onFormSubmit}>
          <div class="form-group">
            <label for="foundation">Foundation</label>
            <select id="foundation" className="form-control">
              {foundations.map(name => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
          <div class="form-group">
            <label for="protein">Protein</label>
            <select id="protein" className="form-control">
              {proteins.map(name => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
          <div class="form-group">
            <label for="extra">Extra</label>
            <select id="extra" className="form-control">
              {extras.map(name => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
          <div class="form-group">
            <label for="dressing">Dressing</label>
            <select id="dressing" className="form-control">
              {dressings.map(name => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ComposeSalad;
