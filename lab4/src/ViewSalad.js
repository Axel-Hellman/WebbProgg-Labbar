import React from "react";

const ViewSalad = props => (
  <div className="container">
    <h3>List of orders</h3>
    <table className="table">
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
        {props.orders.map((salad, id) => (
          <tr key={id}>
            <th scope="row">{id + 1}</th>
            <td>{salad.foundation}</td>
            <td>{salad.protein}</td>
            <td>{salad.extra.join(", ")}</td>
            <td>{salad.dressing}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ViewSalad;
