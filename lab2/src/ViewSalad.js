import React, { Component } from "react";

const ViewSalad = props => (
  <div className="container">
    <h3>List of salads</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Foundation</th>
          <th scope="col">Protein</th>
          <th scope="col">Extras</th>
          <th scope="col">Dressing</th>
        </tr>
      </thead>
      <tbody>
        {props.salads.map((salad, id) => (
          <tr key={id}>
            <th scope="row">{id + 1}</th>
            <td>{salad.foundation}</td>
            <td>{salad.protein}</td>
            <td>{Object.keys(salad.extra).join(", ")}</td>
            <td>{salad.dressing}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ViewSalad;
