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
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {props.orders.map((order, id) => (
          <tr key={order.id}>
            <th scope="row">{id + 1}</th>
            <td>{order.foundation.name}</td>
            <td>{order.protein.name}</td>
            <td>{order.extra.map(item => item.name).join(", ")}</td>
            <td>{order.dressing.name}</td>
            <td>{order.price()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ViewSalad;
