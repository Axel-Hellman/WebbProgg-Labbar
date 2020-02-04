import React from "react";
import logo from "./logo.svg";
import "./App.css";
import inventory from "./inventory.ES6";
import ComposeSalad from "./ComposeSalad";

function App() {
  return (
    <div>
      <div className="jumbotron text-center">
        <h1>My Own Salad Bar</h1>
        <p>Here you can order custom made salads!</p>
      </div>
      <ComposeSalad inventory={inventory}></ComposeSalad>
    </div>
  );
}

export default App;
